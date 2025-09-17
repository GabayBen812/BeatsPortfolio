-- Step 1: Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Anyone can view users for public profiles" ON users;
DROP POLICY IF EXISTS "Users can manage their own data" ON users;
DROP POLICY IF EXISTS "Anyone can view profile settings for public profiles" ON profile_settings;
DROP POLICY IF EXISTS "Users can view their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Users can insert their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Users can update their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Users can delete their own profile settings" ON profile_settings;
DROP POLICY IF EXISTS "Anyone can view public beats" ON beats;
DROP POLICY IF EXISTS "Users can view their own beats" ON beats;
DROP POLICY IF EXISTS "Users can insert their own beats" ON beats;
DROP POLICY IF EXISTS "Users can update their own beats" ON beats;
DROP POLICY IF EXISTS "Users can delete their own beats" ON beats;

-- Step 3: Create new policies for public access
-- Users table - allow public read access
CREATE POLICY "Anyone can view users for public profiles" ON users
  FOR SELECT USING (true);

-- Users table - allow users to manage their own data
CREATE POLICY "Users can manage their own data" ON users
  FOR ALL USING (auth.uid() = id);

-- Profile settings - allow public read access
CREATE POLICY "Anyone can view profile settings for public profiles" ON profile_settings
  FOR SELECT USING (true);

-- Profile settings - allow users to manage their own settings
CREATE POLICY "Users can view their own profile settings" ON profile_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile settings" ON profile_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile settings" ON profile_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile settings" ON profile_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Beats - allow public read access to beats marked as public
CREATE POLICY "Anyone can view public beats" ON beats
  FOR SELECT USING (show_on_profile = true);

-- Beats - allow users to manage their own beats
CREATE POLICY "Users can view their own beats" ON beats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own beats" ON beats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own beats" ON beats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own beats" ON beats
  FOR DELETE USING (auth.uid() = user_id);
