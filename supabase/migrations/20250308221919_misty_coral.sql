/*
  # Listings and Related Tables

  1. New Tables
    - listings
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - price (decimal)
      - location (text)
      - material_type (text)
      - weight_kg (decimal)
      - user_id (uuid, references profiles)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - listing_images
      - id (uuid, primary key)
      - listing_id (uuid, references listings)
      - url (text)
      - created_at (timestamptz)
    
    - bids
      - id (uuid, primary key)
      - listing_id (uuid, references listings)
      - user_id (uuid, references profiles)
      - amount (decimal)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Create policies for listings access
    - Create policies for images access
    - Create policies for bids access
*/

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL,
  location text NOT NULL,
  material_type text NOT NULL,
  weight_kg decimal NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create listing images table
CREATE TABLE IF NOT EXISTS listing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  amount decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Listings policies
CREATE POLICY "Anyone can view active listings"
  ON listings
  FOR SELECT
  TO anon, authenticated
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

-- Listing images policies
CREATE POLICY "Anyone can view listing images"
  ON listing_images
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = listing_images.listing_id
      AND listings.status = 'active'
    )
  );

CREATE POLICY "Users can add images to own listings"
  ON listing_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = listing_images.listing_id
      AND listings.user_id = auth.uid()
    )
  );

-- Bids policies
CREATE POLICY "Users can view bids on their listings"
  ON bids
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = bids.listing_id
      AND listings.user_id = auth.uid()
    )
    OR
    auth.uid() = user_id
  );

CREATE POLICY "Users can create bids"
  ON bids
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND
    EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = bids.listing_id
      AND listings.status = 'active'
      AND listings.user_id != auth.uid()
    )
  );

CREATE POLICY "Users can update own bids"
  ON bids
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);