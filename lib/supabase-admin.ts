import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables first
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Get environment variables after they're loaded
const supabaseUrl = "https://qfqknamuvypndphwehbl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcWtuYW11dnlwbmRwaHdlaGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjc0NTksImV4cCI6MjA1MjgwMzQ1OX0.i3gHL4uQKuM-U5be379PyXvjTaJNUGuKWO6wO0rKd7w";

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
