/*
  # Initial Database Schema

  1. New Tables
    - profiles
      - User profiles with additional information
    - listings
      - Marketplace listings for scrap metal
    - messages
      - Chat messages between users
    - material_prices
      - Current and historical material prices
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access patterns for each table

  3. Changes
    - Initial schema creation
    - Core functionality tables
    - Required indexes and constraints
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  company_name text,
  company_registration text,
  vat_number text,
  phone text,
  is_buyer boolean DEFAULT false,
  is_seller boolean DEFAULT false,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  metal_type text NOT NULL,
  weight numeric NOT NULL,
  images text[] NOT NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Listings policies
CREATE POLICY "Anyone can view active listings"
  ON listings FOR SELECT
  USING (status = 'active');

CREATE POLICY "Sellers can create listings"
  ON listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_seller = true
  ));

CREATE POLICY "Sellers can update their own listings"
  ON listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Material prices table
CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg numeric NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(material_type, grade)
);

-- Enable RLS
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;

-- Material prices policies
CREATE POLICY "Anyone can view material prices"
  ON material_prices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can update prices"
  ON material_prices FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND is_admin = true
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_listings_metal_type ON listings(metal_type);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_material_prices_type ON material_prices(material_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
    BEFORE UPDATE ON listings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();