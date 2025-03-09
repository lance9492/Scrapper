/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `name` (text) - User's full name
      - `email` (text) - User's email
      - `role` (text) - User role (individual/company)
      - `is_admin` (boolean) - Admin status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `material_prices`
      - `id` (uuid, primary key)
      - `material_type` (text) - Type of material
      - `grade` (text) - Material grade
      - `price_per_kg` (decimal) - Current price
      - `updated_at` (timestamp)
      - `updated_by` (uuid) - References profiles.id

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('individual', 'company')),
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create material_prices table
CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg decimal NOT NULL CHECK (price_per_kg >= 0),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES profiles(id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Material prices policies
CREATE POLICY "Anyone can view material prices"
  ON material_prices
  FOR SELECT
  TO authenticated
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

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_material_prices_updated_at
  BEFORE UPDATE ON material_prices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();