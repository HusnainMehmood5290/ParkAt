/*
  # ParkAT Application Schema

  ## Overview
  This migration creates the complete database schema for the ParkAT parking application.

  ## Tables Created
  
  ### 1. users
  Stores user account information for both vehicle owners and space providers.
  - `id` (uuid, primary key) - Matches Supabase Auth user ID
  - `email` (text, unique) - User email address
  - `firstName` (text) - User first name
  - `lastName` (text) - User last name
  - `cnic` (text) - National ID number
  - `phone` (text) - Phone number
  - `registerType` (jsonb) - Indicates user type (vehicleowner, spaceprovider)
  - `isCompleteProfile` (boolean) - Profile completion status
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. vehicles
  Stores registered vehicle information.
  - `id` (uuid, primary key) - Auto-generated
  - `ownerId` (uuid, foreign key) - References users.id
  - `vehicleNumber` (text, unique) - Vehicle registration number
  - `length` (numeric) - Vehicle length
  - `width` (numeric) - Vehicle width
  - `height` (numeric) - Vehicle height
  - `document` (text) - Document URL from storage
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. spaces
  Stores parking space information.
  - `id` (uuid, primary key) - Auto-generated
  - `ownerId` (uuid, foreign key) - References users.id
  - `ownerName` (text) - Space owner name
  - `length` (numeric) - Space length
  - `width` (numeric) - Space width
  - `height` (numeric) - Space height
  - `document` (text) - Document URL from storage
  - `location` (jsonb) - Geographic location data
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can read their own data
  - Users can create and update their own records
  - Public can search for available parking spaces
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  cnic text,
  phone text,
  "registerType" jsonb DEFAULT '{"vehicleowner": false, "spaceprovider": false}'::jsonb,
  "isCompleteProfile" boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "ownerId" uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  "vehicleNumber" text UNIQUE NOT NULL,
  length numeric NOT NULL,
  width numeric NOT NULL,
  height numeric NOT NULL,
  document text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create spaces table
CREATE TABLE IF NOT EXISTS spaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "ownerId" uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  "ownerName" text NOT NULL,
  length numeric NOT NULL,
  width numeric NOT NULL,
  height numeric NOT NULL,
  document text NOT NULL,
  location jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Vehicles table policies
CREATE POLICY "Users can view own vehicles"
  ON vehicles FOR SELECT
  TO authenticated
  USING (auth.uid() = "ownerId");

CREATE POLICY "Users can insert own vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "ownerId");

CREATE POLICY "Users can update own vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (auth.uid() = "ownerId")
  WITH CHECK (auth.uid() = "ownerId");

CREATE POLICY "Users can delete own vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (auth.uid() = "ownerId");

-- Spaces table policies
CREATE POLICY "Users can view own spaces"
  ON spaces FOR SELECT
  TO authenticated
  USING (auth.uid() = "ownerId");

CREATE POLICY "All authenticated users can view all spaces"
  ON spaces FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own spaces"
  ON spaces FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "ownerId");

CREATE POLICY "Users can update own spaces"
  ON spaces FOR UPDATE
  TO authenticated
  USING (auth.uid() = "ownerId")
  WITH CHECK (auth.uid() = "ownerId");

CREATE POLICY "Users can delete own spaces"
  ON spaces FOR DELETE
  TO authenticated
  USING (auth.uid() = "ownerId");

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vehicles_owner ON vehicles("ownerId");
CREATE INDEX IF NOT EXISTS idx_vehicles_number ON vehicles("vehicleNumber");
CREATE INDEX IF NOT EXISTS idx_spaces_owner ON spaces("ownerId");
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
