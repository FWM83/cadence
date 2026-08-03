# Cadence — Cloud Sync Setup (one time, ~10 minutes)

Gives every user a login and keeps their progress synced across phone + desktop.

## 1. Create a free Supabase project
1. Go to **supabase.com** → Start your project → sign up (free tier is plenty).
2. **New project** → name it `cadence` → pick any region near you → set a database password (save it somewhere; you won't need it in the app).
3. Wait ~2 minutes for it to provision.

## 2. Create the profiles table
Open **SQL Editor** in the left sidebar → New query → paste this → **Run**:

```sql
create table if not exists profiles (
  user_id    uuid primary key references auth.users on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "read own profile"   on profiles for select using (auth.uid() = user_id);
create policy "insert own profile" on profiles for insert with check (auth.uid() = user_id);
create policy "update own profile" on profiles for update using (auth.uid() = user_id);
```

Row-level security means each person can only ever read or write their own row — even though
everyone shares the same public anon key.

## 3. Turn off email confirmation (optional, but easier for a small group)
**Authentication → Sign In / Providers → Email** → turn **Confirm email** OFF.
With it on, each new user must click a confirmation link before their first sign-in.

## 4. Get your two values
**Project Settings → API**:
- **Project URL** → e.g. `https://abcdefgh.supabase.co`
- **anon / public** key → the long `eyJhbGci...` string

⚠️ Use the **anon/public** key, never the `service_role` key. The anon key is meant to be
embedded in client apps; RLS is what protects the data.

## 5. Connect Cadence
In the app: **Settings → Cloud sync & profile** → paste the URL and anon key → **Save**.
Then **Create account** with your email + password. Repeat on your phone (same email/password)
and both devices will share one profile.

To add other people: they just tap **Create account** with their own email. Each gets a
private profile automatically — no admin work for you.

## How syncing behaves
- Saves to the cloud ~1.4s after any change.
- Pulls fresh whenever the app opens or regains focus (switching back from another app).
- Last-write-wins: if both devices changed things, the most recent save wins.
- Offline still works — changes save locally and push next time you're connected.
- The sync badge next to the CADENCE title shows: `local`, `syncing…`, `synced`, `offline`, or `sync error`.
