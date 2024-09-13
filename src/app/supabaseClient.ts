// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lldbetfrnpsaxjiponlm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZGJldGZybnBzYXhqaXBvbmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMzM4NDgsImV4cCI6MjA0MTcwOTg0OH0.tDC5nUX11I5IXpAZrk0kuE2DYDaVSECqKgCcU6I9JUg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


