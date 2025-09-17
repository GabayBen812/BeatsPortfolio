-- Add profile settings table
CREATE TABLE IF NOT EXISTS profile_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_title TEXT,
  profile_description TEXT,
  profile_image_url TEXT,
  profile_username TEXT,
  show_contact_info BOOLEAN DEFAULT false,
  contact_email TEXT,
  contact_phone TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add new columns to beats table for profile management
ALTER TABLE beats 
ADD COLUMN IF NOT EXISTS show_on_profile BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS profile_order INTEGER;

-- Enable Row Level Security for profile_settings
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profile_settings table
CREATE POLICY "Users can view their own profile settings" ON profile_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile settings" ON profile_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile settings" ON profile_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile settings" ON profile_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Allow public read access to profile_settings for public profiles
CREATE POLICY "Anyone can view profile settings for public profiles" ON profile_settings
  FOR SELECT USING (true);

-- Create function to update updated_at timestamp for profile_settings
CREATE OR REPLACE FUNCTION update_profile_settings_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at for profile_settings
DROP TRIGGER IF EXISTS update_profile_settings_updated_at ON profile_settings;
CREATE TRIGGER update_profile_settings_updated_at 
  BEFORE UPDATE ON profile_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_profile_settings_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profile_settings_user_id ON profile_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_beats_show_on_profile ON beats(show_on_profile);
CREATE INDEX IF NOT EXISTS idx_beats_profile_order ON beats(profile_order);
