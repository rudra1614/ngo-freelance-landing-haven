// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fhhzgqesjwzsjuvmcgui.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoaHpncWVzand6c2p1dm1jZ3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzcwNjIsImV4cCI6MjA1NzQ1MzA2Mn0.D5-o8m5yuUgUkzpIOmgwg78LVi-NS0abPbTAEcNqGBM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);