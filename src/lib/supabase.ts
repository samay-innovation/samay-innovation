import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE SETUP — one-time, ~10 minutes
 * ─────────────────────────────────────
 * 1. Go to https://supabase.com → Sign Up (free forever)
 * 2. Create a new project (e.g. "samay-innovation")
 * 3. Once created: Settings → API → copy "Project URL" and "anon public" key
 * 4. Add to .env.local (create this file in project root if it doesn't exist):
 *      VITE_SUPABASE_URL=https://xxxx.supabase.co
 *      VITE_SUPABASE_ANON_KEY=eyJhbGci...
 *      VITE_ADMIN_PASSWORD=yourChosenAdminPassword
 * 5. Add same vars to Vercel: Project Settings → Environment Variables
 *
 * 6. In Supabase → SQL Editor → run this once to create the reviews table:
 *
 *    CREATE TABLE reviews (
 *      id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
 *      name        text    NOT NULL,
 *      role        text,
 *      project     text,
 *      rating      integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
 *      review      text    NOT NULL,
 *      email       text,
 *      approved    boolean DEFAULT false,
 *      created_at  timestamptz DEFAULT now()
 *    );
 *
 *    -- RLS policies (allow full public access — reviews are non-sensitive):
 *    ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
 *    CREATE POLICY "Public can insert" ON reviews FOR INSERT WITH CHECK (true);
 *    CREATE POLICY "Public can read all" ON reviews FOR SELECT USING (true);
 *    CREATE POLICY "Anyone can update" ON reviews FOR UPDATE USING (true);
 *    CREATE POLICY "Anyone can delete" ON reviews FOR DELETE USING (true);
 *
 *    -- If you already ran the old policies, drop the old SELECT policy first:
 *    -- DROP POLICY IF EXISTS "Public can read approved" ON reviews;
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
) as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Review {
  id: string;
  name: string;
  role: string | null;
  project: string | null;
  rating: number;
  review: string;
  email: string | null;
  approved: boolean;
  created_at: string;
}
