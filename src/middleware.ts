import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    'https://ruwamuiacthfubitkmva.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1d2FtdWlhY3RoZnViaXRrbXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0Njg4ODAsImV4cCI6MjA1NzA0NDg4MH0.uprmazMZOEEfwnC0Q5uN_vV1hTVLJaqJXn7h43ZS_AE',
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.delete({ name, ...options })
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/marketplace/create', '/messages']
  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path)) && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Auth routes - redirect to dashboard if already logged in
  const authPaths = ['/auth/login', '/auth/register']
  if (authPaths.includes(req.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/marketplace/create/:path*',
    '/messages/:path*',
    '/auth/:path*'
  ]
}