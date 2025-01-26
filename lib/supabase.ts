import { createClient } from "@supabase/supabase-js";

// Hardcoded values (for development only)
const supabaseUrl = "https://qfqknamuvypndphwehbl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcWtuYW11dnlwbmRwaHdlaGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjc0NTksImV4cCI6MjA1MjgwMzQ1OX0.i3gHL4uQKuM-U5be379PyXvjTaJNUGuKWO6wO0rKd7w";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test the connection only in browser
if (typeof window !== "undefined") {
  async function testConnection() {
    try {
      console.log("Attempting to connect to Supabase...");
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Supabase connection error:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });
      } else {
        console.log("Supabase connection successful");
      }
    } catch (error) {
      console.error("Fatal Supabase connection error:", {
        error:
          error instanceof Error
            ? {
                message: error.message,
                name: error.name,
                stack: error.stack,
              }
            : error,
      });
    }
  }

  testConnection().catch(console.error);
}

export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  updated_at?: string;
};
