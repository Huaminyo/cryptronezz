# Cryptonez

Cryptonez is a production-style full-stack Web3 airdrop platform built with Next.js App Router, TypeScript, TailwindCSS, Drizzle ORM, Neon PostgreSQL, Auth.js, and Cloudflare Turnstile.

## Architecture

- **Presentation layer**: Next.js App Router pages in `app/`
- **Components layer**: reusable UI cards in `components/cryptonez`
- **Domain layer**: business logic in `lib/cryptonez`
- **Security layer**: anti-bot, rate limit, and captcha verification in `lib/security`
- **Data layer**: Drizzle schema/client/migrations in `lib/db`

## Features

- Marketing landing page with dark Web3 styling
- User dashboard for points, tasks, referral status, wallet status
- Task engine with supported task types
- Referral engine with anti-abuse logic
- Leaderboard API and page
- Admin API/page to manage tasks and monitor suspicious activity
- Auth.js guest + wallet credential flow scaffold
- Cloudflare Turnstile verification on sensitive operations

## Installation

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

- `POSTGRES_URL`: Neon/PostgreSQL connection string
- `AUTH_SECRET`: Auth.js secret
- `NEXTAUTH_URL`: app base URL
- `TURNSTILE_SECRET`: Cloudflare Turnstile secret key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Turnstile site key for client rendering

## Database Setup

1. Configure `POSTGRES_URL` in `.env`
2. Generate migration SQL (optional if creating new migration):
   ```bash
   npx drizzle-kit generate
   ```
3. Run migrations:
   ```bash
   npm run db:migrate
   ```

## Deployment Guide

1. Deploy on Vercel (recommended) with Node runtime.
2. Provision Neon PostgreSQL and set `POSTGRES_URL`.
3. Add Auth.js and Turnstile environment variables in deployment settings.
4. Run migration in CI/CD before startup:
   ```bash
   npm run db:migrate
   ```
5. Set production domain in `NEXTAUTH_URL`.

## Scripts

- `npm run dev` – start local development server
- `npm run build` – build for production
- `npm run start` – run production server
- `npm run db:migrate` – execute Drizzle migrations
