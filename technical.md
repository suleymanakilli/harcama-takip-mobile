# Teknik Dokümantasyon - Harcama Takip (Expo + Supabase)

## 💰 Maliyet ve Stack Seçimi

**Neden Google Sheets Değil de Supabase?**
- Google Sheets API: 60 istek/dakika limit, 500KB max data. 1000+ harcamada yavaşlar.
- Supabase Free: 500MB, sınırsız request, anlık sync (Realtime), SQL gücü.
- Sonuç: Supabase daha ucuz (ücretsiz) ve profesyonel.

**Stack:**
- **Frontend**: Expo SDK 50 (React Native)
- **Backend**: Supabase (PostgreSQL + Row Level Security)
- **Auth**: Google OAuth (expo-auth-session)
- **Charts**: `react-native-chart-kit` (Pie, Bar, Line) veya `victory-native`
- **CSV**: `papaparse` (web uyumlu, RN'de de çalışır)
- **PDF**: `expo-print` + `expo-sharing` (ücretsiz export)
- **Widget**: `react-native-widget-extension` (Phase 2 - MVP sonrası)
- **State**: Zustand (persist middleware ile local cache)

## 📊 Veritabanı Şeması (Supabase)

```sql
-- 1. Kategoriler (Kullanıcı tanımlı, renk + ikon)
create table categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  type text check (type in ('expense', 'income')),
  color text default '#FF6B6B',
  icon text default 'shopping-bag',
  budget_limit numeric(12,2), -- NULL ise limit yok
  created_at timestamp default now()
);

-- 2. İşlemler (Harcama/Gelir)
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  category_id uuid references categories not null,
  amount numeric(12,2) not null, -- Kuruş hassasiyeti (cent)
  type text check (type in ('expense', 'income')) not null,
  description text,
  date date not null default current_date,
  created_at timestamp default now()
);

-- 3. Bütçe Hedefleri (Aylık genel limitler)
create table budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  month int check (month between 1 and 12),
  year int,
  total_limit numeric(12,2),
  alert_threshold int default 80, -- %80'inde uyarı
  unique(user_id, month, year)
);

-- RLS Güvenlik
alter table categories enable row level security;
alter table transactions enable row level security;
alter table budgets enable row level security;

create policy "Own data only" on categories for all using (auth.uid() = user_id);
create policy "Own transactions only" on transactions for all using (auth.uid() = user_id);
create policy "Own budgets only" on budgets for all using (auth.uid() = user_id);

-- Index (Performans)
create index idx_transactions_user_date on transactions(user_id, date desc);
create index idx_transactions_category on transactions(category_id);