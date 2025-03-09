/*
  # Initial Database Schema

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - name (text)
      - email (text)
      - is_admin (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - material_prices
      - id (uuid)
      - material_type (text)
      - grade (text) 
      - price_per_kg (decimal)
      - updated_at (timestamp)

    - listings
      - id (uuid)
      - user_id (uuid, references auth.users)
      - title (text)
      - description (text)
      - price (decimal)
      - location (text)
      - metal_type (text)
      - weight (decimal)
      - images (text[])
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate security policies
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text,
  email text UNIQUE NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create material_prices table
CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg decimal NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(material_type, grade)
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL,
  location text NOT NULL,
  metal_type text NOT NULL,
  weight decimal NOT NULL,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Material prices policies
CREATE POLICY "Anyone can read material prices"
  ON material_prices
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can update material prices"
  ON material_prices
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Listings policies
CREATE POLICY "Anyone can read listings"
  ON listings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can create listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings"
  ON listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);