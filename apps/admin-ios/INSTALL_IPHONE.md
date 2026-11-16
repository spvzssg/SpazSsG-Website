# How to Install Spaz SsG Admin on Your iPhone

This guide provides the fastest and easiest ways to install and run the **Spaz SsG Admin** app on your iPhone.

---

## Method 1: Instant Testing with Expo Go (Fastest & Easiest)
Expo Go allows you to run and test the app on your iPhone in under 2 minutes without any Apple Developer certificates.

### Step 1: Get Expo Go on your iPhone
1. Open the **App Store** on your iPhone.
2. Search for and install **Expo Go**.

### Step 2: Start the Development Server on your PC
1. Open PowerShell / terminal in the repository root and navigate to the iOS app folder:
   ```bash
   cd apps/admin-ios
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
   *(Make sure your PC and iPhone are connected to the same Wi-Fi network, or use tunnel mode: `npx expo start --tunnel`)*

### Step 3: Open on your iPhone
1. Open your iPhone's camera app and scan the **QR code** displayed in your terminal.
2. Tap the notification banner to open the project in **Expo Go**.
3. Log in with your admin credentials (`admin` / `spazssg2026`) and manage your website instantly!

---

## Method 2: Permanent Standalone App via EAS Build (TestFlight / Ad-Hoc)
If you want a standalone app icon on your iPhone home screen without needing Expo Go:

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Log in to your Expo Account
```bash
eas login
```

### Step 3: Configure and Build for iOS
1. Initialize EAS project configuration:
   ```bash
   eas build:configure
   ```
2. Build a development/preview build for iOS:
   ```bash
   eas build --platform ios --profile preview
   ```
3. Once the build completes, Expo will provide a direct download link / QR code. Scan it with your iPhone to install the standalone **Spaz SsG Admin** app directly onto your device.
