# Spaz SsG System Architecture

## Overview
The Spaz SsG ecosystem is structured around a centralized, secure backend powered by Supabase, serving two primary authorized client interfaces:
1. **Official Website & Web Admin Control Center** (`index.html` / Next.js web application with Supabase client).
2. **Standalone iOS Companion App** (`apps/admin-ios` built with Expo & React Native).

Both client applications communicate directly with the Supabase backend over secure HTTPS/WSS channels, ensuring real-time synchronization, strict database Row Level Security (RLS), and single-owner administrative authorization.

---

## Architecture Components

```
[ Spaz SsG Website ] <--- HTTPS / RLS ---> [ Supabase Backend ] <--- HTTPS / RLS ---> [ Spaz SsG Admin iOS App ]
                                                 |
                                          (PostgreSQL + Storage)
```

### 1. Backend & Database (Supabase)
- **Supabase Auth**: Manages secure administrator authentication (single-user provisioning, MFA support, JWT tokens).
- **Supabase PostgreSQL**: Relational database storing music releases, featured tracks, social links, announcements, system settings, and audit logs.
- **Supabase Storage**: Secure cloud storage buckets (`media`, `artwork`, `videos`) with strict upload policies.
- **Row Level Security (RLS)**: Enforces authorization rules at the database level so only the verified Spaz SsG administrator account can execute write, update, or delete operations.

### 2. Public Website & Web Admin
- **Public Frontend**: High-performance, responsive dark-mode artist website (`index.html`), featuring music streaming links, Apple Music badge, Spotify player embeds, social links, live broadcast announcements, and the 3D spinning logo.
- **Admin Control Center**: Integrated protected management route (`#admin`) authenticated via Supabase Auth, enabling real-time content updates, release management, and media uploads.

### 3. Standalone iOS Companion App (`apps/admin-ios`)
- **Framework**: Expo / React Native.
- **Security**: Local session persistence using Expo SecureStore (iOS Keychain) + Face ID biometric unlock.
- **Connectivity**: Direct API communication with Supabase backend.
- **Features**: Push notifications, release management, media upload, and instant synchronization with the website.
