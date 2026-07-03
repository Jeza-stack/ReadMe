# Implementation Notes
Limitations and practical discoveries recorded here — the Canonical Specification is never edited from implementation.

| Date | Note | Affects |
|---|---|---|
| 2026-07-03 | readme-data.json English I already contains 5 units (Poetry/Prose/Short Stories/Language Competency/Workplace) with works carrying fullText, difficultWords, authorInfo, contentAnalysis, faqs, quiz — richer than expected; migration maps these to the Literature Guide schema. | Phase 2 migration |
| 2026-07-03 | english2.json / english4.json at repo root duplicate course structures; treat readme-data.json as source of truth, archive the loose files. | Phase 2 migration |
