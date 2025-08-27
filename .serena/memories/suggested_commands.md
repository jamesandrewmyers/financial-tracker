# Suggested Commands

## App lifecycle
- Dev server: `npm run dev` (Next.js + Turbopack at http://localhost:3000)
- Build: `npm run build` (production build)
- Start: `npm start` (run production server)
- Lint: `npm run lint`

## Database
- Start Postgres (Docker): `docker compose up -d postgres`
- Generate Prisma client: `npx prisma generate`
- Apply migrations (dev): `npx prisma migrate dev`
- Create migration: `npx prisma migrate dev --name <change>`
- Studio (GUI): `npx prisma studio`
- Seed data (after generate/migrate): `ts-node prisma/seed.ts` or `node --loader ts-node/esm prisma/seed.ts` (configure runner as needed)

## Environment
- Set DB URL: create `.env` with `DATABASE_URL="postgresql://finance:financepass@localhost:5432/finance_db"`

## Useful local tools (Darwin)
- List files: `ls -la`
- Search files: `rg <pattern>` (ripgrep) or `grep -R <pattern> .`
- Git basics: `git status`, `git add -p`, `git commit -m "feat: ..."`
