# Project Audit Report — 2025-08-09T

Scope: Scalability & structure audit focusing on dead code, unused assets, and scripts.

Findings

- Unused nested Tailwind config: `src/tailwind.config.ts`
  - Evidence: no references found; root `tailwind.config.ts` is used by tooling.
  - Action: remove `src/tailwind.config.ts`.

- Orphan assets directory: `Assests/`
  - Evidence: no references found to `Assests` or files within.
  - Action: remove `Assests/`.

- Components usage review:
  - A1 lesson components (`src/components/A1*`): used by pages under `src/app/level/a1/*` -> retain.
  - Blog/Assessment components (`BlogClient`, `BlogPostCard`, `QuickAssessment`, `SampleQuestions`): confirmed used by soft-skills and assessment pages -> retain.

- package.json scripts:
  - Scripts present: dev, build, start, lint, typecheck -> all used; none removed.

- Inefficient data handling:
  - `src/lib/data.ts`: O(n) lookups acceptable for current dataset; no heavy usage; retain as-is.

Removals (confirmed)

- Delete: `src/tailwind.config.ts`
- Delete: `Assests/`

Post-change checklist

- Run typecheck and build after removals
- Commit as: `refactor: remove unused code and commands`