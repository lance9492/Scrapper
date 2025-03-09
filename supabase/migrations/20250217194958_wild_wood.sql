/*
  # Create Listings Tables

  1. New Tables
    - listings
      - id (uuid)
      - title (text)
      - description (text)
      - price (numeric)
      - location (text)
      - metal_type (text)
      - weight (numeric)
      - user_id (uuid, references profiles)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for listing access and management
*/

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  location text NOT NULL,
  metal_type text NOT NULL,
  weight numeric NOT NULL CHECK (weight > 0),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active listings"
  ON listings
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);