import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: prices, error } = await supabase
    .from('material_prices')
    .select('*')
    .order('material_type')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(prices)
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 403 }
    )
  }

  const updates = await request.json()

  const { error } = await supabase
    .from('material_prices')
    .upsert(updates.map((update: any) => ({
      ...update,
      updated_at: new Date().toISOString()
    })))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}