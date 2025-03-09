/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - full_name (text)
      - company_name (text, nullable)
      - company_registration (text, nullable)
      - vat_number (text, nullable)
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

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  company_name text,
  company_registration text,
  vat_number text,
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
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
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
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, full_name, created_at, updated_at)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', now(), now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();