# When You Finish a Task

- Run linter: `npm run lint` and fix issues.
- Build locally: `npm run build` to catch type and build errors.
- If DB schema changed: run `npx prisma generate` and `npx prisma migrate dev`; update `prisma/seed.ts` if needed.
- Update docs: add/adjust README snippets and component docs as needed.
- Verify UI: run `npm run dev`, smoke test key pages (`/`, `/transactions`, `/accounts`, `/reports`).
- Check API: test `GET/POST /api/transactions` with the app or `curl`.
- Prepare PR: ensure focused diffs, include description and screenshots for UI changes.
