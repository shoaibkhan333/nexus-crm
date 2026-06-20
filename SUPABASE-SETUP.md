# Supabase Setup (5 minutes)

## Step 1 — Create Supabase project

1. Go to **https://supabase.com** → Sign up (free)
2. **New Project** → name: `nexus-crm` → set a database password → Create
3. Wait ~2 minutes for project to be ready

## Step 2 — Run database schema

1. Supabase Dashboard → **SQL Editor** → **New query**
2. Copy all content from `supabase/schema.sql` and paste
3. Click **Run**

## Step 3 — Get API keys

1. Dashboard → **Project Settings** → **API**
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## Step 4 — Local `.env` file

Create file `.env` in project root:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Restart dev server: `npm run dev`

## Step 5 — Vercel env variables

1. **vercel.com** → your project → **Settings** → **Environment Variables**
2. Add both variables (same names as above)
3. **Redeploy** the project

## Step 6 — Disable email confirmation (optional, for testing)

Supabase → **Authentication** → **Providers** → Email → turn off **Confirm email**

Now you can sign up and login instantly!

---

## What you get

- Login / Signup page
- Contacts & deals saved to PostgreSQL
- Data synced per user (Row Level Security)
- Logout button in header
- "Cloud sync" badge when logged in

Without `.env` → app works in demo mode (no login required).
