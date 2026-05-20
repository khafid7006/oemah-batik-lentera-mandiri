import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.error(
    'Supabase Error: VITE_SUPABASE_URL environment variable is missing, empty, or using a placeholder value in the .env file.'
  );
}

if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.error(
    'Supabase Error: VITE_SUPABASE_ANON_KEY environment variable is missing, empty, or using a placeholder value in the .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
