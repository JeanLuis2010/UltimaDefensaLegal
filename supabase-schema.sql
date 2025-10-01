-- ===============================
-- Ultima Defensa Legal — Supabase
-- Full schema for members, metros, ZIP mapping, OTP
-- ===============================

create table if not exists udl_metros (
  id           bigserial primary key,
  metro_key    text unique not null,   -- 'nyc','mia','phl','chi','ewr','bos','wdc','orl'
  metro_name   text not null,          -- 'New York Metro'
  metro_number text not null,          -- E.164, e.g., '+16468469664'
  display_number text not null         -- pretty, e.g., '+1 646 846 9664'
);

create table if not exists udl_zip_metro (
  id         bigserial primary key,
  zip        text not null unique,     -- 5 digits string, e.g., '10001'
  city       text not null,
  state      text not null,            -- e.g., 'NY'
  metro_key  text not null references udl_metros(metro_key),
  metro_name text not null
);

create table if not exists udl_members (
  id              bigserial primary key,
  created_at      timestamptz default now(),
  member_id       text unique not null,    -- e.g., UDL-2510-ABCD-7
  token_hash      text not null,           -- client token hashed
  status          text not null check (status in ('pending_payment','active','suspended')) default 'pending_payment',
  paypal_sub_id   text,

  first_name      text,
  last_name       text,
  phone_mobile    text,                    -- E.164
  phone_secondary text,                    -- optional bound second number
  email           text,

  zip             text,
  city            text,
  state           text,
  metro_key       text not null references udl_metros(metro_key),
  metro_name      text not null,

  lang            text default 'en',       -- 'en' or 'es'
  need            text,                    -- declared main need
  ref             text                     -- referral source
);

create table if not exists udl_otp (
  id         bigserial primary key,
  member_id  text not null references udl_members(member_id),
  code       text not null,               -- 6 digits
  expires_at timestamptz not null
);

create index if not exists idx_members_status_metro on udl_members (status, metro_key);
create index if not exists idx_members_phone on udl_members (phone_mobile);

-- ===============================
-- SEED METROS (8 initial cities)
-- Replace numbers with your live Twilio numbers if different.
-- ===============================
insert into udl_metros (metro_key, metro_name, metro_number, display_number) values
  ('nyc','New York Metro',     '+16468469664','+1 646 846 9664'),
  ('mia','Miami Metro',        '+17863212961','+1 786 321 2961'),
  ('phl','Philadelphia Metro', '+12153984866','+1 215 398 4866'),
  ('chi','Chicago Metro',      '+13127785885','+1 312 778 5885'),
  ('ewr','Newark Metro',       '+19737918619','+1 973 791 8619'),
  ('bos','Boston Metro',       '+16177659946','+1 617 765 9946'),
  ('wdc','Washington DC',      '+12029536694','+1 202 953 6694'),
  ('orl','Orlando Metro',      '+13214150668','+1 321 415 0668')
on conflict (metro_key) do nothing;

-- ===============================
-- SEED ZIP → METRO (minimal starter set)
-- You can add more ZIPs anytime; routing will improve automatically.
-- ===============================
insert into udl_zip_metro (zip, city, state, metro_key, metro_name) values
  -- NYC (sample)
  ('10001','New York','NY','nyc','New York Metro'),
  ('11201','Brooklyn','NY','nyc','New York Metro'),
  ('10452','Bronx','NY','nyc','New York Metro'),
  ('11354','Flushing','NY','nyc','New York Metro'),
  -- Miami
  ('33101','Miami','FL','mia','Miami Metro'),
  ('33125','Miami','FL','mia','Miami Metro'),
  ('33165','Miami','FL','mia','Miami Metro'),
  -- Philadelphia
  ('19103','Philadelphia','PA','phl','Philadelphia Metro'),
  ('19120','Philadelphia','PA','phl','Philadelphia Metro'),
  -- Chicago
  ('60601','Chicago','IL','chi','Chicago Metro'),
  ('60647','Chicago','IL','chi','Chicago Metro'),
  -- Newark
  ('07102','Newark','NJ','ewr','Newark Metro'),
  ('07105','Newark','NJ','ewr','Newark Metro'),
  -- Boston
  ('02108','Boston','MA','bos','Boston Metro'),
  ('02134','Allston','MA','bos','Boston Metro'),
  -- Washington DC
  ('20001','Washington','DC','wdc','Washington DC'),
  ('20011','Washington','DC','wdc','Washington DC'),
  -- Orlando
  ('32801','Orlando','FL','orl','Orlando Metro'),
  ('32822','Orlando','FL','orl','Orlando Metro')
on conflict (zip) do nothing;

-- ===============================
-- DONE
-- ===============================
