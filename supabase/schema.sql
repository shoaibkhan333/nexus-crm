-- Run this in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  email text default '',
  company text default '',
  phone text default '',
  status text default 'lead',
  avatar text default '',
  last_contact date default current_date,
  value numeric default 0,
  created_at timestamptz default now()
);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  company text default '',
  value numeric default 0,
  stage text default 'lead',
  contact_id text default '',
  probability int default 20,
  close_date date,
  owner text default '',
  created_at timestamptz default now()
);

alter table contacts enable row level security;
alter table deals enable row level security;

create policy "Users manage own contacts" on contacts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own deals" on deals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
