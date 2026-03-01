import { createClient } from '@supabase/supabase-js';

// Support a few env var naming conventions (NEXT_PUBLIC_ for client, plain for server)
const supabaseUrl =
	process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
	process.env.SUPABASE_PUBLISHABLE_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	process.env.SUPABASE_ANON_KEY ||
	process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	// Provide a clear message for build logs (do not print the keys themselves)
	throw new Error(
		'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).'
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
