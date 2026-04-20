import { createClient } from '@supabase/supabase-js';

// SECURE: Use environment variables, never hardcode credentials!
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUser() {
  console.log('Creating user...');
  const { data, error } = await supabase.auth.signUp({
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'your-secure-password',
  });
  
  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created successfully:', data.user?.id);
  }
}

// Uncomment and provide environment variables to run
// createUser();
