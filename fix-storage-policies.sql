-- Fix storage policies for beats and covers buckets
-- This ensures users can upload to their own folders

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own beats" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view beats" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own beats" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own covers" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own covers" ON storage.objects;

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

-- Also create a policy to allow listing buckets (optional)
CREATE POLICY "Authenticated users can list buckets" ON storage.buckets
  FOR SELECT USING (auth.role() = 'authenticated');
