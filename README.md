# Spaz SsG — Official Website & Private Admin Ecosystem

Official digital home of independent East Coast hip-hop recording artist **Spaz SsG**.

- Tagline: **No Sleep, Just Dreams**
- Repository: [spvzssg/SpazSsG-Website](https://github.com/spvzssg/SpazSsG-Website)

---

## Architecture & Deliverables
1. **Public Website (`index.html`)**:
   - Standalone portable HTML/CSS/JS file containing complete branding, Apple Music badge & Spotify embeds, social ecosystem, LIVE broadcast links, 3D spinning logo webm video in the About section, and Everything Spaz directory.
2. **Private Web Admin Control Center (`#admin`)**:
   - Secure management dashboard supporting music releases, site settings, and announcements with session persistence.
3. **Standalone iOS Companion App (`apps/admin-ios`)**:
   - Expo / React Native mobile app for remote content management.
4. **Backend & Database (`supabase/`)**:
   - PostgreSQL schema, Supabase Auth, and Row Level Security (RLS) policies.
5. **Documentation (`documentation/`)**:
   - Comprehensive guides for architecture, security, database schema, deployment, and iOS builds.

---

## Documentation Links
- [Architecture Guide](./documentation/architecture.md)
- [Security Model](./documentation/security.md)
- [Database Schema](./documentation/database.md)
- [Website Deployment](./documentation/deployment.md)
- [iOS Companion App Build Guide](./documentation/ios-build.md)
