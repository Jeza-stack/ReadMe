# CEFR B2 Lessons — Review Report

**Prepared for:** Dr. Jaffer Basha
**Date:** 2026-07-18
**Location:** `content/cefr/b2/` — 8 lessons, live at `/cefr/b2` after deploy

All eight lessons follow the B1 house structure: a can-do statement first (CELTA/Cambridge pedagogy), then **What you can do after this lesson → The lesson → Examples → Common mistakes → Self-check**. Each lesson explicitly builds on its B1 counterpart, and examples are academic/professional with Pacific-relevant contexts (Port Moresby, Lae, Kokopo, the Sepik, sea-level rise, the informal sector). Frontmatter validates against `cefr-lesson.schema.json`; `npm run build` passes and the `/cefr` hub card now shows **8 lessons** for B2.

## Lesson inventory

### 1. Third and Mixed Conditionals — `third-and-mixed-conditionals` (grammar)
> **Can-do:** I can talk about past events that did not happen — regrets, missed chances, lucky escapes — and connect them to present results, using third and mixed conditionals.

Covers the third conditional, both mixed types (past→present and present→past), formal *Had…* inversion, and the *'d = had/would* contraction trap. Builds directly on B1 *First and Second Conditionals*.

### 2. Passive with Modals and Reporting Verbs — `passive-with-modals-and-reporting-verbs` (grammar)
> **Can-do:** I can use passive forms with modals and reporting verbs to describe rules, processes, and claims in an impersonal academic style.

Modal passives (incl. *should have been checked*), the two reporting patterns (*It is believed that… / is believed to…*), perfect infinitive, and register guidance on when *not* to use the passive. Builds on B1 *Passive Voice — Present and Past*.

### 3. Relative Clauses — Defining and Non-defining — `relative-clauses-defining-and-non-defining` (grammar)
> **Can-do:** I can combine ideas into one sentence using defining and non-defining relative clauses, punctuate them correctly, and choose the right relative pronoun.

The comma test, *that*-restrictions, pronoun dropping, *whose/where/when*, preposition + *which*, and whole-clause *which*. Includes the meaning-flip example (one brother vs several).

### 4. Reading for Inference and Author Stance — `reading-for-inference-and-stance` (reading)
> **Can-do:** I can read between the lines of a text — inferring what is implied but not stated — and identify the author's attitude from word choice and emphasis.

Inference as the "missing sentence the facts point to," stance signals (loaded word choice, hedging, scare quotes, final position, meaningful silence), and the over-inference trap exams punish. Builds on B1 *Reading for Gist and Detail*.

### 5. Speaking — Agreeing and Disagreeing with Nuance — `speaking-nuanced-agreement-and-disagreement` (speaking)
> **Can-do:** I can take a nuanced position in a discussion — conceding a point, hedging a claim, and challenging an argument without dismissing the person.

The B2 turn shape (concede → pivot → hedged counter → invite), hedging as claim-sizing, and challenging evidence/logic/scope in question form. Builds on B1 *Speaking — Opinions, Agreeing and Disagreeing*.

### 6. Vocabulary — Work and Global Issues — `vocabulary-work-and-global-issues` (vocabulary)
> **Can-do:** I can discuss employment and global issues using precise topic vocabulary and natural collocations instead of general-purpose words.

The job life cycle (*apply for → probation → promotion / made redundant vs dismissed*), work-conditions vocabulary including the informal sector, verb + noun chunks for global issues (*tackle poverty, cut emissions, displace communities*), and trend language. Builds on B1 *Vocabulary — Technology and Media* (collocation-first method).

### 7. Writing — An Opinion Essay — `writing-an-opinion-essay` (writing)
> **Can-do:** I can write an opinion essay that states a clear thesis in the introduction, supports it with developed paragraphs, and answers the strongest counter-argument.

Five-paragraph shape with thesis-first (explicitly contrasted with the B1 for-and-against essay), the "could a reasonable person disagree?" thesis test, and the concession-and-rebuttal paragraph as the B2 differentiator. IELTS Task 2 aligned; 180–250 words.

### 8. Linking Devices and Cohesion — `linking-devices-and-cohesion` (writing)
> **Can-do:** I can connect sentences and paragraphs with a range of linking devices, and use reference words and synonyms so my writing flows without repetition.

Linkers sorted by exact job (contrast vs concession is the exam pair), linker grammar (*despite* + noun, *however* punctuation), and cohesion beyond linkers: *this + summary noun* reference chains, synonym chains, old-before-new ordering.

## Section headings (identical in all 8 lessons)

1. *(opening hook paragraph — no heading)*
2. What you can do after this lesson
3. The lesson
4. Examples
5. Common mistakes
6. Self-check — what can I do now?

## Coverage map vs B1

| B2 lesson | Parallels B1 | Skill |
|---|---|---|
| Third and Mixed Conditionals | First and Second Conditionals | grammar |
| Passive with Modals and Reporting Verbs | Passive Voice — Present and Past | grammar |
| Relative Clauses | Reported Speech / sentence grammar strand | grammar |
| Reading for Inference and Stance | Reading for Gist and Detail | reading |
| Speaking with Nuance | Opinions, Agreeing and Disagreeing | speaking |
| Work and Global Issues | Technology and Media | vocabulary |
| An Opinion Essay | A For-and-Against Essay | writing |
| Linking Devices and Cohesion | (extends the essay's linking-words section) | writing |

## Verification performed

- `npm run build` — passes; content validation reports 95 files checked, 0 problems.
- `/cefr` hub card for B2 renders **"8 lessons"** (verified in prerendered HTML).
- All 8 lesson routes prerendered under `/cefr/b2/…`; search index and sitemap pick them up automatically.
