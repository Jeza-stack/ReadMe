# Implementation Notes
Limitations and practical discoveries recorded here — the Canonical Specification is never edited from implementation.

| Date | Note | Affects |
|---|---|---|
| 2026-07-03 | readme-data.json English I already contains 5 units (Poetry/Prose/Short Stories/Language Competency/Workplace) with works carrying fullText, difficultWords, authorInfo, contentAnalysis, faqs, quiz — richer than expected; migration maps these to the Literature Guide schema. | Phase 2 migration |
| 2026-07-03 | english2.json / english4.json at repo root duplicate course structures; treat readme-data.json as source of truth, archive the loose files. | Phase 2 migration |
| 2026-07-03 | "This Week" feature REMOVED by JB decision (classroom reality): different teachers cover different topics in different weeks, so a platform-asserted current week risks posting incorrect information. semester.json deleted. Weekly Modules retained — they publish only when JB drops a week-N.mdx file, so the platform never asserts a schedule it doesn't control. Homepage This Week block and course-page This Week section removed. | Constitution amendment (freeze-rule clause a); homepage; course shell |
