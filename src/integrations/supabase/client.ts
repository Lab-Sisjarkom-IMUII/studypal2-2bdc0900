import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get Supabase configuration from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Validate required environment variables (non-blocking)
if (!SUPABASE_URL) {
  console.warn(
    '⚠️ VITE_SUPABASE_URL is not set. Supabase features will be disabled.\n' +
    'Please add it to your .env file or configure it in Vercel environment variables.\n' +
    'Example: VITE_SUPABASE_URL=https://your-project.supabase.co'
  );
}

if (!SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️ VITE_SUPABASE_ANON_KEY is not set. Supabase features will be disabled.\n' +
    'Please add it to your .env file or configure it in Vercel environment variables.\n' +
    'Example: VITE_SUPABASE_ANON_KEY=your-anon-key-here'
  );
}

// Create Supabase client with fallback for missing configuration
// Using placeholder values when env vars are missing to prevent crashes
const supabaseUrl = SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  // Global error handling
  global: {
    headers: {
      'x-client-info': 'study-pal@1.0.0',
    },
  },
});
