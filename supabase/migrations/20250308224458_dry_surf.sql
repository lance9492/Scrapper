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

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create listings table if it doesn't exist
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

-- Create bids table if it doesn't exist
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create images table if it doesn't exist
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create material_prices table if it doesn't exist
CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg numeric NOT NULL CHECK (price_per_kg >= 0),
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
DO $$ 
BEGIN
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
  ALTER TABLE images ENABLE ROW LEVEL SECURITY;
  ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;
  ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Create policies if they don't exist
DO $$ 
BEGIN
  -- Profiles policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can read all profiles') THEN
    CREATE POLICY "Users can read all profiles"
      ON profiles FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile"
      ON profiles FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Listings policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'listings' AND policyname = 'Anyone can read active listings') THEN
    CREATE POLICY "Anyone can read active listings"
      ON listings FOR SELECT
      USING (status = 'active');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'listings' AND policyname = 'Users can create listings') THEN
    CREATE POLICY "Users can create listings"
      ON listings FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'listings' AND policyname = 'Users can update own listings') THEN
    CREATE POLICY "Users can update own listings"
      ON listings FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  -- Bids policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bids' AND policyname = 'Users can read bids on their listings') THEN
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
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bids' AND policyname = 'Users can create bids') THEN
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
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bids' AND policyname = 'Users can update own bids') THEN
    CREATE POLICY "Users can update own bids"
      ON bids FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  -- Images policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'images' AND policyname = 'Anyone can read images') THEN
    CREATE POLICY "Anyone can read images"
      ON images FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'images' AND policyname = 'Users can insert images on own listings') THEN
    CREATE POLICY "Users can insert images on own listings"
      ON images FOR INSERT
      TO authenticated
      WITH CHECK (
        auth.uid() IN (
          SELECT user_id FROM listings WHERE id = listing_id
        )
      );
  END IF;

  -- Material prices policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'material_prices' AND policyname = 'Anyone can read material prices') THEN
    CREATE POLICY "Anyone can read material prices"
      ON material_prices FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'material_prices' AND policyname = 'Only admins can update prices') THEN
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
  END IF;

  -- Messages policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Users can read their own messages') THEN
    CREATE POLICY "Users can read their own messages"
      ON messages FOR SELECT
      TO authenticated
      USING (
        auth.uid() = sender_id
        OR
        auth.uid() = receiver_id
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Users can send messages') THEN
    CREATE POLICY "Users can send messages"
      ON messages FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = sender_id);
  END IF;
END $$;

-- Create or replace function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_listings_updated_at') THEN
    CREATE TRIGGER update_listings_updated_at
      BEFORE UPDATE ON listings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bids_updated_at') THEN
    CREATE TRIGGER update_bids_updated_at
      BEFORE UPDATE ON bids
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert initial material prices if they don't exist
INSERT INTO material_prices (material_type, grade, price_per_kg)
SELECT m.material_type, m.grade, m.price_per_kg
FROM (VALUES
  ('Copper', 'A+', 100.00),
  ('Copper', 'A', 95.00),
  ('Copper', 'B', 90.00),
  ('Aluminum', 'A', 30.00),
  ('Aluminum', 'B', 25.00),
  ('Steel', 'A', 4.00),
  ('Steel', 'B', 3.50),
  ('Brass', 'A', 50.00),
  ('Brass', 'B', 45.00)
) AS m(material_type, grade, price_per_kg)
WHERE NOT EXISTS (
  SELECT 1 FROM material_prices 
  WHERE material_type = m.material_type 
  AND grade = m.grade
);