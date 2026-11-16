# Spaz SsG Website Deployment Guide

## Prerequisites
- Node.js (v18+)
- Supabase Project (URL and Anon Key)

## Local Development
1. Clone the repository.
2. Open `index.html` in your browser or run a local static server:
   ```bash
   npx serve .
   ```
3. Access the admin dashboard via `#admin`.

## Production Deployment (Vercel / Netlify / GitHub Pages)
1. Push `index.html` to the GitHub repository (`spvzssg/SpazSsG-Website`).
2. Connect the repository to your hosting provider (e.g., GitHub Pages or Vercel).
3. Ensure custom domain and SSL are correctly configured.
