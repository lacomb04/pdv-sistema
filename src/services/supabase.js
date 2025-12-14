import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// TEM QUE TER A PALAVRA 'const' E NÃO PODE TER 'default'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
