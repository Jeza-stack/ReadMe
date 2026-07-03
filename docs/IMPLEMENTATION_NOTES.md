# Implementation Notes
Limitations and practical discoveries recorded here — the Canonical Specification is never edited from implementation.

| Date | Note | Affects |
|---|---|---|
| 2026-07-03 | readme-data.json English I already contains 5 units (Poetry/Prose/Short Stories/Language Competency/Workplace) with works carrying fullText, difficultWords, authorInfo, contentAnalysis, faqs, quiz — richer than expected; migration maps these to the Literature Guide schema. | Phase 2 migration |
| 2026-07-03 | english2.json / english4.json at repo root duplicate course structures; treat readme-data.json as source of truth, archive the loose files. | Phase 2 migration |
| 2026-07-03 | "This Week" feature REMOVED by JB decision (classroom reality): different teachers cover different topics in different weeks, so a platform-asserted current week risks posting incorrect information. semester.json deleted. Weekly Modules retained — they publish only when JB drops a week-N.mdx file, so the platform never asserts a schedule it doesn't control. Homepage This Week block and course-page This Week section removed. | Constitution amendment (freeze-rule clause a); homepage; course shell |
| 2026-07-04 | Units IV-VI across English I-IV are language/grammar/skills lessons, not literary works (JB). LiteratureGuide gained a 'language' variant: no author persona ("Grammar Guide" etc. hidden), pedagogic labels (What This Lesson Covers / Key Learning Points / The Lesson / Practise What You Learned), authorInfo repurposed as honest Background & Sources note, lesson text rendered as markdown. Data quirk: E2/E4 work.category lacks the "Unit X:" prefix — detect unit from course structure, not work.category. Course home hides pseudo-authors for these units. | Literature Guide; course home; metadata |
