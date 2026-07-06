# ReadMe 2.0 — Project Board
Session rule: ONE item → implement → verify locally → commit → PUSH → preview → tick here → stop. No exceptions. master changes only at phase completion (v2.0 release).

## Phase 1 — Foundation docs
- [x] Master Design Specification (approved)
- [x] Content Style Guide (approved)
- [x] JB review + lock (tag `phase-1-complete`)

## Phase 2 — Platform (order revised per JB: pedagogy first, polish last)
- [x] 1. Homepage (This Week + two-tier)
- [x] 2. Navigation
- [x] 3. English Course shell (course home + week pages)
- [x] 4. Literature Guide template (live, reviewable by JB as lecturer)
- [x] 5. MDX rendering pipeline (+ frontmatter validation)
- [x] 6. JSON→MDX migration (per docs/MIGRATION_CHECKLIST.md — all four English courses, 69 files)
- [x] 7. Search
- [x] 8. Related content
- [x] 9. SEO
- [x] 10. Polish (Loading… fixed in 2.1, footer in 2.2, "(Soon)" buttons replaced with honest status in 2.10)

## Phase 3 — English Courses
- [x] English I (complete — via MDX migration)
- [x] English II (via MDX migration, 10 guides + 8 lessons)
- [x] English III (via MDX migration, 10 guides + 7 lessons)
- [x] English IV (via MDX migration, 9 guides + 8 lessons)

## Phase 4 — CEFR
- [x] B1 full academy (8 lessons across 6 skills at /cefr/b1; A1–C2 frames live with honest empty states; legacy /level pages retained)

## Phase 5 — AI for Students
- [x] Launch set (fundamentals, prompt library seed, integrity guide, glossary — /ai-for-students)

## Phase 6 — Soft Skills
- [x] Programme map + 2 modules (Communication Essentials, Teamwork — /soft-skills/programme; legacy blog retained at /soft-skills)

## Phase 7 — Academic Success
- [x] 3 seed guides (essay writing, referencing, exam prep — /academic-success, worked examples included)

## Phase 8 — IQ Test (Cognitive Assessment)
- [x] Rebuilt results → per-domain profile + strengths + recommendations + FAQ + Limitations (mock-IQ number removed per constitution)

## Phase 9 — Launch
- [x] Lighthouse ≥90 — home 90/100/100/100, B1 lesson 94/96/100/100 (production build, reports/lighthouse-*.json, 2026-07-06)
- [x] Student-journey test — Home → English I → Ozymandias = 2 clicks
- [ ] Merge readme-2.0 → master (fast-forward, 34 commits, 0 behind) — **JB one click**: https://github.com/Jeza-stack/ReadMe/compare/master...readme-2.0?expand=1
- [ ] Smoke test read-me-self.vercel.app after deploy

---
## ERA SHIFT (2026-07-04): Platform Build (Era 1) COMPLETE → Teaching-Driven Content (Era 2)
Phase 2 platform build is done (all 10 items). Infrastructure now fades into the background. New rhythm: **Teach → Observe → Record → Improve → Publish** (docs/EDITORIAL_CALENDAR.md). Before pillar population (CEFR B1 → Academic Success → AI for Students → Soft Skills → IQ Test), JB completes the four/five-visitor journey review + copyright triage. Snapshot: docs/RELEASE_NOTES.md.
