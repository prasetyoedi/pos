import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dudunxcdeewvluyxkfup.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZHVueGNkZWV3dmx1eXhrZnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MTkyNTMsImV4cCI6MjA0ODA5NTI1M30.4JltbboqxPih-Q9eimCBjkpNr8o_dsYtC92loD0d3h0'
// const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)