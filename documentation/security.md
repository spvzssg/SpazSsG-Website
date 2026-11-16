# Spaz SsG Security & Authorization Model

## Security Principles
1. **Single-Owner Authorization**: There is exactly one authorized administrator account. No public signups, no invitation systems, and no multi-user administrative roles.
2. **Defense in Depth**: Security is enforced at multiple layers:
   - Client-side route and component protection.
   - Server-side JWT validation (Supabase Auth).
   - Database-level Row Level Security (RLS) policies.
3. **Zero Credential Exposure**: Private keys, service-role tokens, and database secrets remain strictly server-side. Only public Supabase publishable keys are exposed to client applications.

---

## Row Level Security (RLS) Policies
Every table in PostgreSQL enforces RLS:
- **SELECT**: Public tables (releases, social links, announcements) permit public read access. Private tables (audit logs, settings) permit read access only for the authorized admin.
- **INSERT / UPDATE / DELETE**: Restricted strictly to the authenticated administrator (`auth.uid() = '...'` or verified admin role check).

---

## Authentication & Session Management
- **Web App**: Uses secure HTTP-only cookies and Supabase Auth JWT sessions with automatic token refresh and expiration.
- **iOS App**: Uses Expo SecureStore (encrypting credentials in iOS Keychain) combined with Face ID local authentication as a biometric gateway.
