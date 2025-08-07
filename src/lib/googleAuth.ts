// Google OAuth integration for frontend-only setup
import { authService, type User } from './auth';

declare global {
  interface Window {
    google: any;
    googleSignInCallback: (response: any) => void;
  }
}

export interface GoogleUser {
  sub: string;
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified?: boolean;
}

// Initialize Google Sign-In
export const initializeGoogleSignIn = () => {
  if (typeof window === 'undefined' || !window.google) {
    console.warn('Google Sign-In library not loaded');
    return;
  }

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    console.warn('VITE_GOOGLE_CLIENT_ID not found in environment variables');
    return;
  }

  try {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: window.googleSignInCallback,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  } catch (error) {
    console.error('Failed to initialize Google Sign-In:', error);
  }
};

// Decode JWT token from Google
export const decodeGoogleJWT = (token: string): GoogleUser | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode Google JWT:', error);
    return null;
  }
};

// Handle Google Sign-In response
export const handleGoogleSignIn = (response: any): User | null => {
  if (!response.credential) {
    console.error('No credential in Google response');
    return null;
  }

  const googleUser = decodeGoogleJWT(response.credential);
  if (!googleUser) {
    console.error('Failed to decode Google user data');
    return null;
  }

  // Convert Google user to our User format
  const user: User = {
    id: googleUser.sub,
    email: googleUser.email,
    firstName: googleUser.given_name,
    lastName: googleUser.family_name,
    loginMethod: 'google'
  };

  // Save to localStorage
  authService.setUser(user);
  
  return user;
};

// Trigger Google Sign-In popup
export const signInWithGoogle = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google Sign-In not initialized'));
      return;
    }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      reject(new Error('Google Client ID not configured'));
      return;
    }

    // Set up callback for this specific sign-in
    window.googleSignInCallback = (response: any) => {
      try {
        const user = handleGoogleSignIn(response);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Failed to process Google sign-in'));
        }
      } catch (error) {
        reject(error);
      }
    };

    // Trigger the sign-in
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to renderButton if prompt doesn't work
        renderGoogleButton();
      }
    });
  });
};

// Render Google Sign-In button (fallback method)
const renderGoogleButton = () => {
  const buttonContainer = document.getElementById('google-signin-button');
  if (!buttonContainer || !window.google) return;

  window.google.accounts.id.renderButton(buttonContainer, {
    theme: 'outline',
    size: 'large',
    text: 'continue_with',
    shape: 'rectangular',
    width: '300'
  });
};

// Sign out from Google
export const signOutFromGoogle = () => {
  if (window.google && window.google.accounts.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  authService.logout();
};

// Check if Google Sign-In is available
export const isGoogleSignInAvailable = (): boolean => {
  return !!(window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID);
};