/*
  # Initial Database Schema

  1. Tables
    - users
    - profiles
    - listings
    - bids
    - messages
    - materials
    - material_prices

  2. Security
    - RLS policies for each table
    - Secure defaults
*/

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (handled by Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  company_name text,
  company_reg_number text,
  vat_number text,
  phone text,
  is_company boolean default false,
  is_verified boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Listings table
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  price decimal(10,2) not null,
  location text not null,
  metal_type text not null,
  weight decimal(10,2) not null,
  status text default 'active' check (status in ('active', 'sold', 'expired')),
  images text[] default array[]::text[],
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Bids table
create table public.bids (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz default now() not null
);

-- Messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  listing_id uuid references public.listings(id) on delete cascade,
  content text not null,
  read boolean default false,
  created_at timestamptz default now() not null
);

-- Materials reference table
create table public.materials (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text,
  created_at timestamptz default now() not null
);

-- Material prices table
create table public.material_prices (
  id uuid default uuid_generate_v4() primary key,
  material_id uuid references public.materials(id) on delete cascade not null,
  grade text not null,
  price_per_kg decimal(10,2) not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.bids enable row level security;
alter table public.messages enable row level security;
alter table public.materials enable row level security;
alter table public.material_prices enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Listings policies
create policy "Listings are viewable by everyone"
  on public.listings for select
  using (true);

create policy "Users can create listings"
  on public.listings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own listings"
  on public.listings for update
  using (auth.uid() = user_id);

-- Bids policies
create policy "Users can view bids on their listings"
  on public.bids for select
  using (
    auth.uid() = user_id or 
    auth.uid() in (
      select user_id from public.listings where id = listing_id
    )
  );

create policy "Users can create bids"
  on public.bids for insert
  with check (auth.uid() = user_id);

-- Messages policies
create policy "Users can view their messages"
  on public.messages for select
  using (
    auth.uid() = sender_id or 
    auth.uid() = receiver_id
  );

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

-- Materials policies
create policy "Materials are viewable by everyone"
  on public.materials for select
  using (true);

-- Material prices policies
create policy "Material prices are viewable by everyone"
  on public.material_prices for select
  using (true);

create policy "Only admins can update prices"
  on public.material_prices for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Functions
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- Triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Initial data
insert into public.materials (name, description) values
  ('Copper', 'High-value non-ferrous metal widely used in electrical and construction industries'),
  ('Aluminum', 'Lightweight, corrosion-resistant metal used in various industries'),
  ('Steel', 'Most commonly recycled metal, essential for construction and manufacturing'),
  ('Brass', 'Valuable copper-zinc alloy used in plumbing and decorative applications');