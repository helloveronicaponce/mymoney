import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qwlegnebejakwwuntyrd.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bGVnbmViZWpha3d3dW50eXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3ODAxODYsImV4cCI6MTgzMjU0NjE4Nn0.K_YZNBKs3FYzI63xQKWGQjCfMPCZz5X8YqX5Z7w4W3I'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
