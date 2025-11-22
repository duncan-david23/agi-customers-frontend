import { createClient } from '@supabase/supabase-js'



const SUPABASE_URL = "https://wdxzxobpzpmqdpthcrhl.supabase.co"
const SUPABASE_KEY = "sb_publishable_B6vMXSqjAJz5SJBbOKtuHA_jvY6tF7s"



export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)