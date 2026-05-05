//import AsyncStorage from "@react-native"
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rhyujdftfdcvzghcxoov.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeXVqZGZ0ZmRjdnpnaGN4b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMzg3MTAsImV4cCI6MjA5MjgxNDcxMH0.tlGv2-k4fmsaL-HIKEP0GiuqajnhsXILfgL7AU-6LBM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);