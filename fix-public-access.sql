-- Fix public access for profile pages

-- Allow public read access to users table for profile display
CREATE POLICY "Anyone can view users for public profiles" ON users
  FOR SELECT USING (true);

-- Update the profile_settings policy to be more specific
DROP POLICY IF EXISTS "Anyone can view profile settings for public profiles" ON profile_settings;
CREATE POLICY "Anyone can view profile settings for public profiles" ON profile_settings
  FOR SELECT USING (true);

-- Allow public read access to beats that are marked as public
CREATE POLICY "Anyone can view public beats" ON beats
  FOR SELECT USING (show_on_profile = true);

-- Make sure the users table has RLS enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy for users to manage their own data
CREATE POLICY "Users can manage their own data" ON users
  FOR ALL USING (auth.uid() = id);
