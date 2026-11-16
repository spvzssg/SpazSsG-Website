# Spaz SsG Database Schema (`supabase/migrations/20261116000000_initial_schema.sql`)

## Tables

### 1. `profiles`
Stores administrator metadata.
- `id` (UUID, PK, references `auth.users`)
- `username` (TEXT, UNIQUE)
- `is_admin` (BOOLEAN, DEFAULT true)
- `updated_at` (TIMESTAMPTZ)

### 2. `music_releases`
Stores music tracks, singles, EPs, and albums.
- `id` (UUID, PK, DEFAULT gen_random_uuid())
- `title` (TEXT, NOT NULL)
- `release_type` (TEXT, NOT NULL) -- Single, EP, Album
- `release_date` (TEXT)
- `description` (TEXT)
- `artwork_url` (TEXT)
- `spotify_url` (TEXT)
- `apple_music_url` (TEXT)
- `is_featured` (BOOLEAN, DEFAULT false)
- `created_at` (TIMESTAMPTZ, DEFAULT now())

### 3. `social_links`
Stores official social media destinations.
- `id` (UUID, PK, DEFAULT gen_random_uuid())
- `platform` (TEXT, NOT NULL) -- Instagram, TikTok, YouTube, Twitch, Discord
- `url` (TEXT, NOT NULL)
- `handle` (TEXT)
- `is_active` (BOOLEAN, DEFAULT true)

### 4. `announcements`
Stores homepage announcements and news.
- `id` (UUID, PK, DEFAULT gen_random_uuid())
- `title` (TEXT, NOT NULL)
- `content` (TEXT, NOT NULL)
- `is_pinned` (BOOLEAN, DEFAULT false)
- `created_at` (TIMESTAMPTZ, DEFAULT now())

### 5. `site_settings`
Stores artist configuration and branding.
- `key` (TEXT, PK)
- `value` (TEXT, NOT NULL)
- `updated_at` (TIMESTAMPTZ, DEFAULT now())
