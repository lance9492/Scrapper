/*
  # Initial Schema Setup

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - name (text)
      - company_name (text, nullable)
      - registration_number (text, nullable)
      - vat_number (text, nullable)
      - account_type (text)
      - is_buyer (boolean)
      - is_seller (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for profile access
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  company_name text,
  registration_number text,
  vat_number text,
  account_type text NOT NULL CHECK (account_type IN ('individual', 'company')),
  is_buyer boolean DEFAULT false,
  is_seller boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);