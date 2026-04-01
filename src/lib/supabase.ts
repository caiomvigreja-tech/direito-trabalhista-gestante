import { createClient } from '@supabase/supabase-js';

// Hardcoded fallbacks from .env to ensure the site works on Vercel without manual configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iqdgxcxcklcwthfzygui.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZGd4Y3hja2xjd3RoZnp5Z3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzIxOTgsImV4cCI6MjA5MDQ0ODE5OH0.pvIiIyX7wT9YcDbs1pbbwkN0pQG1JUydiuN3l10hIRA';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Supabase credentials missing.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
