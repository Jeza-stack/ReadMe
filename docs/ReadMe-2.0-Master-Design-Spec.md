# ReadMe 2.0 — Master Design Specification
**Status:** Draft for JB review (Phase 1B) · **Authority:** Implementation guidance under the Canonical Specification v1.0 (read-only constitution). This document may evolve with practical detail; it can never alter the constitution.

---

## 1. Identity

- **Platform:** ReadMe 2.0 — Public Academic Knowledge Platform
- **Mission:** Free, high-quality, academically rigorous English Literature, Language, AI Literacy, Research, and Professional Skills education — students first, Pacific and developing-world learners especially.
- **Formula:** Teaching Experience + AI Assistance + Beautiful Design + Excellent Structure + Continuous Improvement.
- **Version:** visible "v2.0" in footer; Release Notes page; Recently Updated feed.

## 2. Audiences & journeys

### Journey A — Enrolled student (primary)
1. Lands on homepage → **This Week** card for their course (e.g., English II · Week 5)
2. One tap → week page: read-before-class · tutorial discussion question · revision links
3. From week page → literature guide for the prescribed work
4. Exam period → course Revision page → sample answers
**Test: homepage → English II Week 3 in ≤ 2 clicks.**

### Journey B — Public visitor (secondary)
1. Arrives via search (a poem guide, "CEFR B1 grammar", "IQ test") → excellent standalone page
2. Related-content blocks lead deeper → discovers pillars → returns for the Knowledge Feed

## 3. Information architecture (routes)

```
/                             Home (This Week → English Courses → Explore → Feed → About)
/courses/english-i…iv         Course home (Overview·Syllabus·Weeks·Works·Revision·Further Reading)
/courses/<course>/week/<n>    Weekly module
/literature/<work-slug>       Literature guide (shared across courses)
/cefr  /cefr/<level>          CEFR academy per level (a1–c2)
/cefr/<level>/<lesson>        Lesson
/ai-for-students/…            Fundamentals·Prompt Library·Study Skills·Assignments·Ethics·Tools·Tutorials·Case Studies·Updates
/soft-skills/…                Programme map + modules
/academic-success/<guide>     Essay writing · referencing · exam prep · …
/iq-test                      IQ Test (Cognitive Assessment) — overview → sections → profile
/articles  /articles/<slug>   Knowledge Feed + article pages
/about                        About Dr JB
/release-notes  /roadmap
/search
```
Existing `/level/a1…c2` routes 301-redirect to `/cefr/<level>`.

## 4. Design system

### 4.1 Typography (JB to approve)
- **Headings:** Fraunces (serif — academic, warm; LitCharts-adjacent gravitas). Fallback: Georgia.
- **Body:** Inter (already familiar from JB's tooling). 16px base, 1.7 line height, 65–75ch measure.
- **Mono/labels:** JetBrains Mono for metadata chips (reading time, level, week).

### 4.2 Colour (APPROVED — JB, Phase 1B)
- **Ink:** #1A2333 (text) on #FFFFFF / #FAF9F6 (paper)
- **Primary:** deep teal #0F6B5C — nav, links, buttons
- **One accent per pillar, consistent everywhere (no rainbow pages):**
  English Courses **Burgundy** #7B2D3B · CEFR **Blue** #0369A1 · AI for Students **Purple** #6D28D9 · Soft Skills **Green** #059669 · Academic Success **Orange** #C2540A · IQ Test **Slate** #475569 · Articles **Neutral** #6B7280
  (thin card top-bars + tags only; pages stay calm)
- **Dark mode:** #0E141F paper, #E8EDF4 ink, same accents at 80 % saturation.

### 4.3 Layout rules
- Max content width 720px (prose) / 1080px (index grids); generous whitespace; card grids 1-col mobile → 3-col desktop
- Sticky in-page sidebar (desktop) / collapsible ToC (mobile) on guide pages
- Every page ends with the **What Next** block (max 3 actions) — Four-Question Framework enforced structurally

## 5. Content models (MDX frontmatter schemas)
Canonical machine-readable copies live in `content/_schemas/*.schema.json`. Summary:

| Type | Required frontmatter | Notes |
|---|---|---|
| **literature** | title, slug, author, courses[], units[], type(poem/prose/story/play), summary, themes[], tags[], updated | body sections: Overview·Background·Author·Summary·Themes·Characters·Symbolism·Devices·Quotes·ExamQs·Interpretations·Discussion·Vocabulary·Timeline·FurtherReading (all optional per work) |
| **course-week** | course, week, title, readBefore[], discussionQuestion, revision[], updated | drives This Week |
| **cefr-lesson** | level(a1–c2), skill(grammar/vocab/reading/listening/speaking/writing), title, canDo[], tags[], updated | |
| **ai-article** | section(fundamentals/prompts/study/assignments/ethics/tools/tutorials/cases/updates), title, audience[], tags[], updated | |
| **soft-skills / academic-success** | module/guide, title, tags[], updated | |
| **article** | title, dek, cover, tags[], readingTime, editorsPick?, updated | Knowledge Feed |
| all types | related[] (slugs across types) | powers the knowledge web |

`semester.json` (repo root of content/): `{ semester, startDate, weeks: { "english-i": currentWeek, … } }` — static, hand-updated weekly (or by JB COG OS later).

## 6. Component specifications
Reuse existing shadcn/Radix primitives; new components:

| Component | Purpose |
|---|---|
| `ThisWeekCard` | course, week n, read-before, discussion Q, revision link |
| `PillarCard` | Explore grid item (icon, accent bar, blurb) |
| `GuideSidebar` | sticky section nav from MDX headings |
| `ThemeTag` / `LevelChip` / `MetaBar` | theme colour tags; CEFR level; reading-time/updated strip |
| `QuoteBlock` | quotation + speaker/context + theme tags |
| `CanDoTable` | CEFR can-do statements per skill |
| `WhatNext` | end-of-page block, ≤3 actions (enforces 3-3-3) |
| `RelatedGrid` | related[] resolution across content types |
| `PosterHero` | latest article as homepage poster |
| `QuizInline` | migrate existing quiz JSON (client component, no tracking) |
| `SearchDialog` | client-side index (FlexSearch/minisearch over build-time JSON index) |

## 7. Technical architecture
- **Stack unchanged:** Next.js 16 App Router, React 19, Tailwind, shadcn. Static generation (`generateStaticParams`) everywhere; zero server state; free-tier friendly.
- **MDX pipeline:** `@next/mdx` + gray-matter (or contentlayer-style custom loader in `src/lib/content.ts`): read `content/**`, validate frontmatter against schemas, build nav/search/related indexes at build time.
- **Migration:** `scripts/migrate-json-to-mdx.ts` converts readme-data.json works (fullText, difficultWords→Vocabulary, authorInfo→Author, contentAnalysis→Themes/Analysis, faqs→Discussion, quiz→QuizInline) into `content/literature/*.mdx`. Originals archived, not deleted.
- **Search:** build-time JSON index (title, headings, tags, dek) → client SearchDialog. No external service.
- **Known fixes in Phase 2:** homepage "Loading…" (client component without SSR fallback), dead "(Soon)" assessment buttons, footer/course list mismatch.

## 8. Page templates (specs)
1. **Home** — This Week strip → English Courses grid → Explore pillars → PosterHero + feed (Latest·Editor's Pick·Recently Updated) → About teaser → CTA "Find your CEFR level in 15 minutes — free"
2. **Course Home** — hero (name, semester, outcomes) → syllabus accordion → week grid → works by unit → revision → further reading
3. **Weekly Module** — Why am I here (week context) → read-before links → lesson notes → discussion question → WhatNext
4. **Literature Guide** — MetaBar → GuideSidebar → sections (per schema) → QuoteBlocks → exam Qs → WhatNext + RelatedGrid
5. **CEFR Level Home** — overview + CanDoTable → skills tabs (grammar/vocab/4 skills) → common mistakes → weekly study plan → assessment
6. **CEFR Lesson / AI Article / Soft Skills Module / Academic Success Guide** — shared prose template + type-specific blocks; all end WhatNext
7. **IQ Test (Cognitive Assessment)** — overview (honest framing per constitution) → How it Works → timed sections (Reasoning·Pattern·Verbal·Numerical·Working Memory·Attention) → Results: cognitive profile, strengths, recommendations → FAQ → Limitations & Disclaimer
8. **Article** — poster header, dek, prose, tags, related
9. **Release Notes / Roadmap** — simple MDX lists

## 9. Quality gates (build-time where possible)
- Frontmatter schema validation fails the build on missing required fields
- Every page: WhatNext present; related[] non-empty (warn); updated date current on edit
- Manual: Content Quality Standard checklist (style guide §9) before publish
- Lighthouse mobile/SEO ≥ 90 (homepage + one guide) each phase

## 10. Phase 1B decisions (RESOLVED 2026-07-03)
1. Typography: **Fraunces + Inter approved**
2. Colour: **approved with one-accent-per-pillar rule** (see §4.2)
3. Logo: **keep for v2.0** — branding deferred to v3
4. Units: **structure confirmed from readme-data.json** (E-I: 5 units/16 works · E-II: 6/18 · E-III: 5/17 · E-IV: 6/17) — full inventory in `docs/MIGRATION_CHECKLIST.md`; JB reviews unit content during migration
5. `semester.json`: **JB updates manually weekly** (<5 min; not automated)
6. About page: **concise, not a CV** — who I am · why the site exists · why trust it. Photo + bio still to be supplied.
