import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qwlegnebejakwwuntyrd.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bGVnbmViZWpha3d3dW50eXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2OTUxODYsImV4cCI6MjA5MTI3MTE4Nn0.lkYjF5xXwS_XW8Wi-p0YBBOxY7Bjs_HDw7PIWDTcPYQ'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Edge Function URL
export const EDGE_FUNCTION_URL = 'https://qwlegnebejakwwuntyrd.supabase.co/functions/v1/mymoney'

// Fetch data from Edge Function
export async function fetchDataFromEdgeFunction() {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar dados da Edge Function:', error)
    throw error
  }
}
