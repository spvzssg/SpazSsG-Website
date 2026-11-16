-- Spaz SsG Initial Database Schema & RLS Policies

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table for administrator authorization
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    username text unique not null,
    is_admin boolean default true,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Music releases table
create table public.music_releases (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    release_type text not null default 'Single',
    release_date text,
    description text,
    artwork_url text,
    spotify_url text,
    apple_music_url text,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Social links table
create table public.social_links (
    id uuid default gen_random_uuid() primary key,
    platform text not null,
    url text not null,
    handle text,
    is_active boolean default true
);

-- Announcements table
create table public.announcements (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content text not null,
    is_pinned boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site settings table
create table public.site_settings (
    key text primary key,
    value text not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.music_releases enable row level security;
alter table public.social_links enable row level security;
alter table public.announcements enable row level security;
alter table public.site_settings enable row level security;

-- Public read policies
create policy "Allow public read on music_releases" on public.music_releases for select using (true);
create policy "Allow public read on social_links" on public.social_links for select using (true);
create policy "Allow public read on announcements" on public.announcements for select using (true);
create policy "Allow public read on site_settings" on public.site_settings for select using (true);

-- Admin write policies (only authorized admin user)
create policy "Allow admin write on music_releases" on public.music_releases for all using (auth.uid() in (select id from public.profiles where is_admin = true));
create policy "Allow admin write on social_links" on public.social_links for all using (auth.uid() in (select id from public.profiles where is_admin = true));
create policy "Allow admin write on announcements" on public.announcements for all using (auth.uid() in (select id from public.profiles where is_admin = true));
create policy "Allow admin write on site_settings" on public.site_settings for all using (auth.uid() in (select id from public.profiles where is_admin = true));
