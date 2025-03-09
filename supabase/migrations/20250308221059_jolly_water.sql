/*
  # Initial Schema Setup

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - full_name (text)
      - company_name (text, nullable)
      - company_registration (text, nullable)
      - vat_number (text, nullable)
      - is_admin (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - material_prices
      - id (uuid, primary key)
      - material_type (text)
      - grade (text)
      - price_per_kg (decimal)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  company_name text,
  company_registration text,
  vat_number text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create material prices table
CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg decimal NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;

-- Create policies
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
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name, created_at, updated_at)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', now(), now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert initial material prices
INSERT INTO material_prices (material_type, grade, price_per_kg) VALUES
  ('Copper', 'A+', 100.00),
  ('Copper', 'A', 95.00),
  ('Copper', 'B', 90.00),
  ('Copper', 'C', 45.00),
  ('Aluminum', 'A', 30.00),
  ('Aluminum', 'B', 25.00),
  ('Aluminum', 'C', 20.00),
  ('Steel', 'A', 4.00),
  ('Steel', 'B', 3.50),
  ('Brass', 'A+', 55.00),
  ('Brass', 'A', 50.00),
  ('Brass', 'B', 45.00);