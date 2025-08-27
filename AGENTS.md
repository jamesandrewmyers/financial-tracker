# Repository Guidelines

## Project Structure & Module Organization
- App router: `src/app` (routes, layouts, pages). Examples: `src/app/transactions/page.tsx`, `src/app/api/transactions/route.ts`.
- UI components: `src/components` and `src/components/ui` (PascalCase files).
- Data access: Prisma client in `src/lib/prisma.ts` and generated client in `src/generated/prisma`.
- Database schema/migrations/seed: `prisma/` (`schema.prisma`, `migrations/`, `seed.ts`).
- Static assets: `public/`. Global styles: `src/app/globals.css` (Tailwind v4).

## Build, Test, and Development Commands
- `npm run dev`: Start Next.js in dev mode (Turbopack) at `localhost:3000`.
- `npm run build`: Production build.
- `npm start`: Run the production server.
- `npm run lint`: ESLint over the repo.
- Database helpers (examples): `docker compose up -d postgres`, `npx prisma generate`, `npx prisma migrate dev`.

## Coding Style & Naming Conventions
- Language: TypeScript. Framework: Next.js App Router.
- Linting: ESLint with `next/core-web-vitals` + TypeScript rules (`eslint.config.mjs`). Fix issues before PRs.
- Indentation/formatting: 2 spaces; prefer consistent Prettier formatting if added.
- Names: React components in PascalCase (`TransactionList.tsx`), hooks/utilities camelCase, route segments lowercase nouns (`app/accounts`, `app/reports`). API routes live in `app/api/<name>/route.ts`.

## Testing Guidelines
- No test framework is configured yet. Recommended: Vitest + Testing Library for units, Playwright for e2e.
- Naming: `*.test.ts`/`*.test.tsx` near source or in `__tests__/`.
- Aim for critical-path coverage (auth, transactions, reports). Add `npm test` script when tooling is introduced.

## Commit & Pull Request Guidelines
- Use clear, scoped commits. Conventional Commits encouraged: `feat: add transaction import`, `fix(api): handle empty payload`.
- PRs should include: concise description, screenshots for UI changes, steps to verify locally, and linked issues.
- Keep diffs focused; run `npm run lint` and ensure builds pass before requesting review.

## Security & Configuration Tips
- Secrets live in `.env` (e.g., `DATABASE_URL`). Do not commit `.env`.
- Local DB: use `docker-compose.yml` (`postgres` service). Apply schema with `npx prisma migrate dev`; seed via `prisma/seed.ts` after generating the client.
- Review access patterns in `src/lib/prisma.ts`; avoid long-lived connections in serverless contexts.

