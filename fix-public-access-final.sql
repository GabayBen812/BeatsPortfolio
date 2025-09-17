-- DISABLE RLS temporarily to test
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE profile_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE beats DISABLE ROW LEVEL SECURITY;

-- Wait a moment, then re-enable with simple policies
-- (Run this part separately after the above)

-- Re-enable RLS with simple public access
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

-- Create simple public access policies
CREATE POLICY "public_users_select" ON users FOR SELECT TO anon USING (true);
CREATE POLICY "public_profile_settings_select" ON profile_settings FOR SELECT TO anon USING (true);
CREATE POLICY "public_beats_select" ON beats FOR SELECT TO anon USING (show_on_profile = true);

-- Allow authenticated users to manage their own data
CREATE POLICY "users_own_data" ON users FOR ALL TO authenticated USING (auth.uid() = id);
CREATE POLICY "profile_settings_own_data" ON profile_settings FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "beats_own_data" ON beats FOR ALL TO authenticated USING (auth.uid() = user_id);
