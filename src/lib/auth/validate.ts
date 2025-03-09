import { supabase } from '../supabase/config'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw new Error(getAuthErrorMessage(error.message))
  }

  return data.user
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    throw new Error(getAuthErrorMessage(error.message))
  }

  return data.user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(getAuthErrorMessage(error.message))
  }
}

function getAuthErrorMessage(message: string): string {
  // Map Supabase error messages to user-friendly messages
  if (message.includes('Invalid login credentials')) {
    return 'Invalid email or password'
  }
  if (message.includes('Email not confirmed')) {
    return 'Please verify your email address'
  }
  if (message.includes('User already registered')) {
    return 'An account already exists with this email'
  }
  return message
}