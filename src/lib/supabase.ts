import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase environment variables! Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in Vercel settings.');
}

// Ensure the app doesn't crash on init if variables are missing
// We use a dummy client that will fail on actual requests but not on initial import
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase client not initialized') }) }) }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase client not initialized') }) })
      }) 
    } as any;
