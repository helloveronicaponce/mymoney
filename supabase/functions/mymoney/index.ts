import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")

const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } })
  }

  try {
    // GET - Load data
    if (req.method === "GET") {
      const [
        { data: transactions },
        { data: creditCards },
        { data: debts },
        { data: investments },
      ] = await Promise.all([
        supabase.from("transactions").select("*"),
        supabase.from("credit_cards").select("*"),
        supabase.from("debts").select("*"),
        supabase.from("investments").select("*"),
      ])

      return new Response(
        JSON.stringify({
          transactions,
          creditCards,
          debts,
          investments,
          lastSync: new Date().toISOString(),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
    }

    // POST - Save data (future implementation)
    if (req.method === "POST") {
      return new Response(
        JSON.stringify({ success: true, message: "Data received" }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
    }

    return new Response("Method not allowed", { status: 405 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
