# Google OAuth Setup Guide for CareerLaunch

This guide will help you set up Google OAuth authentication for your CareerLaunch application.

## Prerequisites
- Google account
- Access to Google Cloud Console
- Local development environment

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "CareerLaunch Auth")
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API" and click "Enable"
4. Also enable "Google Identity Services API"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: `CareerLaunch`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes (optional for testing):
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Save and continue

## Step 4: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Configure:
   - Name: `CareerLaunch Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for Vite dev server)
     - `http://localhost:3000` (alternative port)
     - `http://127.0.0.1:5173`
   - Authorized redirect URIs:
     - `http://localhost:5173/auth/callback`
     - `http://localhost:3000/auth/callback`
5. Click "Create"
6. Copy your **Client ID** and **Client Secret**

## Step 5: Update Your Application

### Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`):
```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

**Note:** We only need the Client ID for frontend-only implementation. No Client Secret required!

2. The Google OAuth logic is already implemented! The application will:
   - Automatically detect if Google OAuth is configured
   - Show a working Google Sign-In button if `VITE_GOOGLE_CLIENT_ID` is set
   - Fall back to "Configure Google OAuth" if not set
   - Handle the complete authentication flow including JWT token decoding

### How It Works

The application uses Google's Identity Services library with the following features:

1. **Google Sign-In Script**: Already included in `index.html`
2. **JWT Token Decoding**: Automatically decodes Google's JWT response
3. **Session Management**: Stores user data in localStorage
4. **Error Handling**: Shows appropriate messages for missing configuration
5. **Loading States**: Visual feedback during authentication
6. **Automatic Detection**: Checks if Google OAuth is properly configured

## Step 6: No Additional Setup Needed!

The Google authentication is fully implemented and ready to use. No callback routes or additional components needed because we use Google's popup-based authentication flow.

## Step 7: Test Your Integration

1. Start your development server: `npm run dev`
2. Navigate to the login page
3. Click "Continue with Google"
4. You should be redirected to Google's consent screen
5. After approval, you should be redirected back to your app

## Troubleshooting

### Common Issues:

1. **"Error 400: redirect_uri_mismatch"**
   - Make sure your redirect URI in Google Console exactly matches what you're using in code

2. **"Error 403: access_blocked"**
   - Your app needs to be verified by Google for production use
   - For development, add test users in OAuth consent screen

3. **"Client ID not found"**
   - Check your environment variables
   - Make sure the client ID is correctly copied from Google Console

4. **CORS errors**
   - Make sure you've added your domain to "Authorized JavaScript origins"

### Testing with Test Users:

1. In Google Console, go to "OAuth consent screen"
2. Scroll down to "Test users"
3. Add the email addresses you want to test with
4. These users can log in even while your app is in testing mode

## Security Notes:

- Never commit your client secret to version control
- Use environment variables for all sensitive configuration
- In production, use HTTPS for all redirect URIs
- Consider implementing backend token validation for enhanced security

## Need Help?

- Check the [Google Identity documentation](https://developers.google.com/identity)
- Review the [Google OAuth 2.0 guide](https://developers.google.com/identity/protocols/oauth2)
- Test with Google's [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)