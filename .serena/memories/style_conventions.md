# Style and Conventions

- Language/Framework: TypeScript with Next.js App Router. React components in PascalCase; hooks/utilities in camelCase.
- File/Folder Naming: Route segments lower-case nouns (e.g., `app/accounts`, `app/reports`), API routes under `app/api/<name>/route.ts`.
- Components: Place shared components in `src/components`; presentational subcomponents in `src/components/ui` (PascalCase filenames).
- Styling: Tailwind v4 utility classes + DaisyUI components; dark mode via `next-themes` with `class` strategy; Inter font via `next/font`.
- Linting: ESLint (`next/core-web-vitals` + TS). Run `npm run lint` before PRs; fix warnings where feasible.
- Formatting: Prefer 2-space indentation. If Prettier is added, keep defaults consistent. Avoid inline CSS when Tailwind fits.
- Prisma: Access through `src/lib/prisma.ts` singleton. Avoid long-lived connections in serverless; keep logging as configured for dev.
- Types: Use explicit prop interfaces; avoid `any`. Keep server route handlers typed (e.g., `export async function GET()`/`POST(req: Request)`).
- Env/Secrets: Use `.env` for `DATABASE_URL` and other secrets; never commit `.env`.
