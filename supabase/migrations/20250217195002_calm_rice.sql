/*
  # Create Messages System

  1. New Tables
    - conversations
      - id (uuid)
      - listing_id (uuid, references listings)
      - buyer_id (uuid, references profiles)
      - seller_id (uuid, references profiles)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - messages
      - id (uuid)
      - conversation_id (uuid, references conversations)
      - sender_id (uuid, references profiles)
      - content (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for conversation and message access
*/

CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) NOT NULL,
  buyer_id uuid REFERENCES profiles(id) NOT NULL,
  seller_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) NOT NULL,
  sender_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON conversations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can view messages in own conversations"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = conversation_id
      AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in own conversations"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = conversation_id
      AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
    )
    AND sender_id = auth.uid()
  );