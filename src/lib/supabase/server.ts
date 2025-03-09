import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    'https://ruwamuiacthfubitkmva.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1d2FtdWlhY3RoZnViaXRrbXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0Njg4ODAsImV4cCI6MjA1NzA0NDg4MH0.uprmazMZOEEfwnC0Q5uN_vV1hTVLJaqJXn7h43ZS_AE',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting error
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete({ name, ...options })
          } catch (error) {
            // Handle cookie removal error
          }
        }
      }
    }
  )
}