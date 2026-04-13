import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iqdgxcxcklcwthfzygui.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZGd4Y3hja2xjd3RoZnp5Z3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzIxOTgsImV4cCI6MjA5MDQ0ODE5OH0.pvIiIyX7wT9YcDbs1pbbwkN0pQG1JUydiuN3l10hIRA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUser() {
  console.log('Creating user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'caiomvigreja@gmail.com',
    password: '@!gestante',
  });
  
  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('User created successfully:', data.user?.id);
  }
}

createUser();
