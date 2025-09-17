-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create beats table
CREATE TABLE IF NOT EXISTS beats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT,
  bpm INTEGER,
  key TEXT,
  file_url TEXT NOT NULL,
  cover_image_url TEXT,
  file_size INTEGER,
  duration DECIMAL(10,2), -- in seconds
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES 
  ('beats', 'beats', true, 52428800, ARRAY['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'audio/m4a']),
  ('covers', 'covers', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for beats table
CREATE POLICY "Users can view their own beats" ON beats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own beats" ON beats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own beats" ON beats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own beats" ON beats
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage policies for beats bucket
CREATE POLICY "Users can upload their own beats" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'beats' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view beats" ON storage.objects
  FOR SELECT USING (bucket_id = 'beats');

CREATE POLICY "Users can delete their own beats" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'beats' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policies for covers bucket
CREATE POLICY "Users can upload their own covers" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'covers' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anyone can view covers" ON storage.objects
  FOR SELECT USING (bucket_id = 'covers');

CREATE POLICY "Users can delete their own covers" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'covers' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_beats_updated_at ON beats;
CREATE TRIGGER update_beats_updated_at 
  BEFORE UPDATE ON beats 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_beats_user_id ON beats(user_id);
CREATE INDEX IF NOT EXISTS idx_beats_created_at ON beats(created_at DESC);
