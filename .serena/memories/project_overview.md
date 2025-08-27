# Financial Tracker — Project Overview

- Purpose: Personal finance tracker to record accounts and transactions, view reports, and experiment with modern Next.js UI components.
- Tech Stack: Next.js 15 (App Router, TypeScript, React 19), Tailwind CSS v4 + DaisyUI, Prisma ORM (PostgreSQL), Node.js (npm). Optional Headless UI + Heroicons.
- Data Layer: Prisma schema in `prisma/schema.prisma`; generated client in `src/generated/prisma` (output configured in schema); Prisma singleton at `src/lib/prisma.ts`.
- App Structure: Routes/layout under `src/app` (e.g., `src/app/api/transactions/route.ts`, `src/app/transactions/page.tsx`); shared components in `src/components` and `src/components/ui`.
- Styling: Tailwind v4 with plugins `@tailwindcss/forms`, `@tailwindcss/typography`, and DaisyUI theme `corporate`. Global styles in `src/app/globals.css`.
- Linting: ESLint flat config in `eslint.config.mjs` extending `next/core-web-vitals` and `next/typescript`.
- DB & Local Dev: Postgres via `docker-compose.yml` service `postgres`. Seed script at `prisma/seed.ts`. Migrations in `prisma/migrations/`.
- Key Pages:
  - `src/app/page.tsx`: dashboard with transaction form and list
  - `src/app/api/transactions/route.ts`: REST API for listing/creating transactions
- Notes: Some duplicate/legacy files exist (`src/api/transactions/route.ts`, `tailwind.config.js`, built CSS like `out.css`); prefer App Router paths and `tailwind.config.mjs`.
