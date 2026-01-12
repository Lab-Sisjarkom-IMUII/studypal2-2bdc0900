import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration with automatic fallback to env.template values
// This allows the app to work in production without manual Vercel configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDY8v3SLwPtMQKN4G68vQ_It6BcaihiWew',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'studypal-67e38.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'studypal-67e38',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'studypal-67e38.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '973792751959',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:973792751959:web:b5e9a8d3c1f2a6e7d4b5c3',
};

// Check if using custom Firebase configuration
const isUsingCustomConfig = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

export const isFirebaseConfigured = true; // Always configured with fallback

// Log configuration status in development
if (import.meta.env.DEV) {
  if (isUsingCustomConfig) {
    console.log('✅ Firebase: Using custom environment variables');
  } else {
    console.log('ℹ️ Firebase: Using default configuration from env.template');
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
