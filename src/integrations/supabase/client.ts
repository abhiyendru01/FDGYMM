
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cmhfdngjxvqnkorpslge.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaGZkbmdqeHZxbmtvcnBzbGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzg5NTQsImV4cCI6MjA2MDc1NDk1NH0.WlfyegsF42gaqBo7zp7DsvZ9gUcbf5KN1lzMHklyOK0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
