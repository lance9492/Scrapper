import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ruwamuiacthfubitkmva.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1d2FtdWlhY3RoZnViaXRrbXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0Njg4ODAsImV4cCI6MjA1NzA0NDg4MH0.uprmazMZOEEfwnC0Q5uN_vV1hTVLJaqJXn7h43ZS_AE'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})