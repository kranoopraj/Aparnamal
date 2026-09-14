create table if not exists album_content (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
