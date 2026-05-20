-- SQL Migration Schema for Oemah Batik Lentera Mandiri CMS

-- 1. Table: site_config
CREATE TABLE IF NOT EXISTS site_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL,
    logo_url TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    contact_info TEXT, -- Stored as stringified JSON to support complex fields (email, whatsapp, maps_url, instagram, etc.)
    address TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for site_config
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on site_config" 
ON site_config FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin modification on site_config" 
ON site_config FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 2. Table: gallery
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'Tulis',
    philosophy TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on gallery" 
ON gallery FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin modification on gallery" 
ON gallery FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Table: education
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for education
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on education" 
ON education FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin modification on education" 
ON education FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 4. Table: activities
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date TEXT,
    location TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for activities
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on activities" 
ON activities FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin modification on activities" 
ON activities FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 5. Table: destinations
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    image_url TEXT,
    maps_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for destinations
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on destinations" 
ON destinations FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin modification on destinations" 
ON destinations FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6. Table: contacts
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS for contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public submission on contacts" 
ON contacts FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow admin view/modification on contacts" 
ON contacts FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- ALTER TABLE site_config to support dynamic website images
ALTER TABLE site_config
ADD COLUMN IF NOT EXISTS footer_logo_url TEXT,
ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
ADD COLUMN IF NOT EXISTS about_image_url TEXT,
ADD COLUMN IF NOT EXISTS about_image_2_url TEXT,
ADD COLUMN IF NOT EXISTS about_image_3_url TEXT,
ADD COLUMN IF NOT EXISTS about_image_4_url TEXT,
ADD COLUMN IF NOT EXISTS destination_image_url TEXT,
ADD COLUMN IF NOT EXISTS cta_image_url TEXT;
