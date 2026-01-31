-- Harcama Takip - Supabase Database Schema
-- Run this in Supabase SQL Editor

-- 1. Kategoriler (Kullanıcı tanımlı, renk + ikon)
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  type text check (type in ('expense', 'income')),
  color text default '#FF6B6B',
  icon text default 'shopping-bag',
  budget_limit numeric(12,2),
  created_at timestamp default now()
);

-- 2. İşlemler (Harcama/Gelir)
create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  category_id uuid references categories not null,
  amount numeric(12,2) not null,
  type text check (type in ('expense', 'income')) not null,
  description text,
  date date not null default current_date,
  created_at timestamp default now()
);

-- 3. Bütçe Hedefleri (Aylık genel limitler)
create table if not exists budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  month int check (month between 1 and 12),
  year int,
  total_limit numeric(12,2),
  alert_threshold int default 80,
  unique(user_id, month, year)
);

-- RLS Güvenlik (Row Level Security)
alter table categories enable row level security;
alter table transactions enable row level security;
alter table budgets enable row level security;

-- Politikalar: Kullanıcılar sadece kendi verilerini görebilir
create policy "Own data only" on categories for all using (auth.uid() = user_id);
create policy "Own transactions only" on transactions for all using (auth.uid() = user_id);
create policy "Own budgets only" on budgets for all using (auth.uid() = user_id);

-- Performans için Indexler
create index if not exists idx_transactions_user_date on transactions(user_id, date desc);
create index if not exists idx_transactions_category on transactions(category_id);
create index if not exists idx_categories_user on categories(user_id);

-- Function: Yeni kullanıcı için varsayılan kategoriler oluştur
create or replace function create_default_categories()
returns trigger as $$
begin
  insert into categories (user_id, name, type, color, icon) values
    (new.id, 'Yemek', 'expense', '#FF6B6B', 'food'),
    (new.id, 'Ulaşım', 'expense', '#4ECDC4', 'car'),
    (new.id, 'Market', 'expense', '#45B7D1', 'cart'),
    (new.id, 'Eğlence', 'expense', '#DDA0DD', 'gamepad-variant'),
    (new.id, 'Sağlık', 'expense', '#96CEB4', 'medical-bag'),
    (new.id, 'Maaş', 'income', '#51CF66', 'cash'),
    (new.id, 'Ek Gelir', 'income', '#98D8C8', 'cash-plus');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: Yeni kullanıcı kaydında varsayılan kategorileri oluştur
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure create_default_categories();

