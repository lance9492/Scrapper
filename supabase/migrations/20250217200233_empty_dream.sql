/*
  # Material Prices Management

  1. New Tables
    - `material_prices`
      - `id` (uuid, primary key)
      - `material_type` (text)
      - `grade` (text)
      - `price_per_kg` (numeric)
      - `updated_at` (timestamptz)
      - `updated_by` (uuid)

  2. Security
    - Enable RLS
    - Add policies for admins to manage prices
    - Add policy for anyone to view prices
*/

CREATE TABLE IF NOT EXISTS material_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_type text NOT NULL,
  grade text NOT NULL,
  price_per_kg numeric NOT NULL CHECK (price_per_kg >= 0),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES profiles(id)
);

-- Add admin column to profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;
  END IF;
END $$;

ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;

-- Anyone can view prices
CREATE POLICY "Anyone can view material prices"
  ON material_prices
  FOR SELECT
  TO public
  USING (true);

-- Only admins can manage prices
CREATE POLICY "Admins can manage material prices"
  ON material_prices
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Insert initial prices
INSERT INTO material_prices (material_type, grade, price_per_kg) VALUES
('Copper - Bright Copper (Millberry)', 'A+', 100),
('Copper - Heavy Copper (Berry)', 'A', 95),
('Copper - Light Copper', 'B', 90),
('Copper - Insulated Copper Wire', 'C', 45),
('Aluminum - Clean Aluminum', 'A', 30),
('Aluminum - Cast Aluminum', 'B', 25),
('Aluminum - Aluminum Cans', 'C', 20),
('Steel - HMS 1', 'A', 4.00),
('Steel - HMS 2', 'B', 3.50),
('Steel - 304 Stainless Steel', 'A', 32),
('Steel - 316 Stainless Steel', 'A+', 36)
ON CONFLICT DO NOTHING;