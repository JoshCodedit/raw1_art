import { createClient } from "@supabase/supabase-js"; // Only import createClient, SupabaseClient isn't needed
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

// Create and assign the Supabase client to the variable `db`
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// Export the db variable
export default db;
