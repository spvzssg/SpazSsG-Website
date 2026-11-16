# Spaz SsG Admin iOS Companion App Build Guide

## Prerequisites
- Node.js & npm
- Expo CLI (`npx expo`)
- Apple Developer Account (for TestFlight / App Store distribution)

## Setup & Development
1. Navigate to the iOS app directory:
   ```bash
   cd apps/admin-ios
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development build in Expo Go or iOS Simulator:
   ```bash
   npx expo start --ios
   ```

## Building for TestFlight / App Store
1. Configure `app.json` with bundle identifier (`com.spazssg.admin`) and provisioning profiles.
2. Build standalone binary using EAS Build:
   ```bash
   eas build --platform ios
   ```
3. Submit to TestFlight for private beta testing:
   ```bash
   eas submit --platform ios
   ```
