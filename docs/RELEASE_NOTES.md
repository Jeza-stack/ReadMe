# ReadMe 2.0 — Release Notes

## v2.0 Release Candidate — Platform Build Complete (2026-07-04)
Tag: `content-architecture-complete`. Branch `readme-2.0` (not yet merged to `master`; production still serves v1 until the four-visitor review + copyright triage are done).

**The transition:** ReadMe crossed from a website-redevelopment project into a sustainable academic publishing platform. The architectural decisions are made; what remains is educational content, driven by teaching.

### Completed
- **Governance:** Canonical Specification, Master Design Spec, Content Style Guide, Project Board, Implementation Notes, Current Mission, Copyright & Literary Content Policy
- **Engineering:** MDX-first content system, build-time frontmatter validation gate, typed schemas, static generation (152 pages), build-time search index (94 entries), related-content engine, ReadMe-brand SEO/OG metadata
- **Educational design:** Literature Guide + Language Lesson templates (Skills Workshop specified, deferred), Four-Question Framework, 3-3-3 rule, three-pass editorial workflow, student-first two-tier navigation
- **Content:** all four English courses (68 works) migrated to MDX; Pass 2 UK-English editing on 30 language lessons; v1 archived at `archive/readme-data-v1.json`
- **Workflows:** course-by-course migration, JB review, copyright approval (Pending/Approved/Needs Review), rollback via MDX-delete, JSON fallback retained one semester

### Known remaining work (content, JB-paced)
- Four/five-visitor journey review (highest value — do before merge)
- Copyright triage: 33 rows Pending in `MIGRATION_CHECKLIST.md`
- Pillar population priority: CEFR B1 → Academic Success → AI for Students → Soft Skills → IQ Test (Cognitive Assessment)
- Per-work review boxes (reviewed / links / diagrams / quiz / mobile)
- Merge `readme-2.0` → `master` and deploy once review passes
- Remove JSON fallback after one full semester taught on MDX

### Deliberately NOT planned (parked)
User accounts · certificates · gamification · forums · badges · complex analytics. Advantage is clarity and academic quality, not platform complexity.
