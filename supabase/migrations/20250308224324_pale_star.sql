/*
  # Initial Database Schema Setup

  1. Tables Created:
    - profiles (user profiles)
    - listings (scrap metal listings)
    - bids (listing bids)
    - images (listing images)
    - material_prices (current market prices)
    - messages (user communications)

  2. Security:
    - Row Level Security (RLS) enabled on all tables
    - Policies for data access control
    - Secure user management
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  location text NOT NULL,
  metal_type text NOT NULL,
  weight numeric NOT NULL CHECK (weight > 0),
  status text DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create material_prices table
CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg numeric NOT NULL CHECK (price_per_kg >= 0),
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Listings policies
CREATE POLICY "Anyone can read active listings"
  ON listings FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create listings"
  ON listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Bids policies
CREATE POLICY "Users can read bids on their listings"
  ON bids FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM listings WHERE id = listing_id
    )
    OR
    auth.uid() = user_id
  );

CREATE POLICY "Users can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND
    auth.uid() NOT IN (
      SELECT user_id FROM listings WHERE id = listing_id
    )
  );

CREATE POLICY "Users can update own bids"
  ON bids FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Images policies
CREATE POLICY "Anyone can read images"
  ON images FOR SELECT
  USING (true);

CREATE POLICY "Users can insert images on own listings"
  ON images FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM listings WHERE id = listing_id
    )
  );

-- Material prices policies
CREATE POLICY "Anyone can read material prices"
  ON material_prices FOR SELECT
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

-- Messages policies
CREATE POLICY "Users can read their own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id
    OR
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bids_updated_at
  BEFORE UPDATE ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial material prices
INSERT INTO material_prices (material_type, grade, price_per_kg) VALUES
  ('Copper', 'A+', 100.00),
  ('Copper', 'A', 95.00),
  ('Copper', 'B', 90.00),
  ('Aluminum', 'A', 30.00),
  ('Aluminum', 'B', 25.00),
  ('Steel', 'A', 4.00),
  ('Steel', 'B', 3.50),
  ('Brass', 'A', 50.00),
  ('Brass', 'B', 45.00)
ON CONFLICT DO NOTHING;