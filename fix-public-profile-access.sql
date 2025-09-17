-- Fix public profile access issues

-- First, let's make sure the users table allows public read access
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view users for public profiles" ON users;
DROP POLICY IF EXISTS "Users can manage their own data" ON users;

-- Create new policies for users table
CREATE POLICY "Anyone can view users for public profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own data" ON users
  FOR ALL USING (auth.uid() = id);

-- Make sure RLS is enabled on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Fix profile_settings policies
DROP POLICY IF EXISTS "Anyone can view profile settings for public profiles" ON profile_settings;
DROP POLICY IF EXISTS "Users can view their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Users can insert their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Users can update their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Users can delete their own profile settings" ON profile_settings;

-- Create new profile_settings policies
CREATE POLICY "Anyone can view profile settings for public profiles" ON profile_settings
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own profile settings" ON profile_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile settings" ON profile_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile settings" ON profile_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile settings" ON profile_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Fix beats policies for public access
DROP POLICY IF EXISTS "Anyone can view public beats" ON beats;
DROP POLICY IF EXISTS "Users can view their own beats" ON beats;
DROP POLICY IF EXISTS "Users can insert their own beats" ON beats;
DROP POLICY IF EXISTS "Users can update their own beats" ON beats;
DROP POLICY IF EXISTS "Users can delete their own beats" ON beats;

-- Create new beats policies
CREATE POLICY "Anyone can view public beats" ON beats
  FOR SELECT USING (show_on_profile = true);

CREATE POLICY "Users can view their own beats" ON beats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own beats" ON beats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own beats" ON beats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own beats" ON beats
  FOR DELETE USING (auth.uid() = user_id);

-- Make sure all tables have RLS enabled
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;
