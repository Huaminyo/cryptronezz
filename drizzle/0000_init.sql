CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  wallet_address varchar(255),
  email varchar(255),
  name varchar(255) NOT NULL,
  referral_code varchar(30) NOT NULL UNIQUE,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id serial PRIMARY KEY,
  title varchar(150) NOT NULL,
  description text NOT NULL,
  points integer NOT NULL,
  type varchar(30) NOT NULL,
  link varchar(500) NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS task_completions (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id),
  task_id integer NOT NULL REFERENCES tasks(id),
  ip_address varchar(100) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS task_completion_unique ON task_completions(user_id, task_id);

CREATE TABLE IF NOT EXISTS referrals (
  id serial PRIMARY KEY,
  referrer_user_id integer NOT NULL REFERENCES users(id),
  referred_user_id integer NOT NULL REFERENCES users(id),
  ip_address varchar(100) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS points (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id),
  amount integer NOT NULL,
  source varchar(50) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS suspicious_activity (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id),
  ip_address varchar(100) NOT NULL,
  action varchar(80) NOT NULL,
  reason text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
