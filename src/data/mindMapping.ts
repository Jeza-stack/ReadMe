/**
 * Content layer for the Mind Mapping Studio lesson (/mind-mapping).
 *
 * Teaching content is kept separate from presentation so it can be re-rendered elsewhere
 * later (per-module routes, a printed workbook, slides) without rewriting it.
 * MindMappingLesson.tsx renders this; it does not author it.
 *
 * Design Goal: by the end, the learner thinks "I understand what a mind map is, I know why
 * it works, and I can confidently create my own personality mind map."
 */

export const TOTAL_SECTIONS = 5;

/** Lowers beginner anxiety before anything else is read. */
export const REASSURANCE =
  'No previous experience is required. You can complete this lesson at your own pace.';

/** The five steps of the journey — one path, no branching. */
export const JOURNEY_STEPS: { num: string; label: string }[] = [
  { num: '①', label: 'Understand' },
  { num: '②', label: 'Watch' },
  { num: '③', label: 'Build' },
  { num: '④', label: 'Reflect' },
  { num: '⑤', label: 'Go Further' },
];

/** Expectation management, not a progress tracker. Keyed by step number. */
export const SECTION_TIMES: Record<number, string> = {
  1: '≈ 5 minutes',
  2: '≈ 6 minutes',
  3: '≈ 8 minutes',
  4: '≈ 6 minutes',
  5: 'browse at your own pace',
};

/** One takeaway per step — what survives the week. Keyed by step number. */
export const TAKEAWAYS: Record<number, string> = {
  1: 'A mind map is not about drawing. It is about organising thinking.',
  2: 'Every good map starts messy. Structure is something you find, not something you plan.',
  3: 'The map you just built is data about you that did not exist an hour ago.',
  4: 'A goal without a first action is still just a wish.',
};

/** History and cognitive science that motivate. Keyed by step number. */
export const DID_YOU_KNOW: Record<number, string> = {
  1: 'Tony Buzan popularised modern mind mapping in the 1970s as a way of reflecting how the brain naturally connects ideas — though the idea of drawing knowledge as branches goes back centuries.',
  2: 'Your brain processes an image far faster than a sentence. This is why a keyword beside a small doodle is remembered long after a paragraph is forgotten.',
};

/** Feedback, not assessment: pick an option, see the answer and why. Never scored, never saved. */
export const MINI_CHECKS: {
  section: number;
  question: string;
  options: string[];
  correctIndex: number;
  why: string;
}[] = [
  {
    section: 1,
    question: 'Where should a mind map begin?',
    options: ['Top left', 'The centre', 'Bottom of the page'],
    correctIndex: 1,
    why: 'Starting in the centre lets ideas radiate in every direction. Starting in a corner forces a list.',
  },
  {
    section: 2,
    question: 'Which is better on a branch?',
    options: ['Long sentences', 'Single keywords'],
    correctIndex: 1,
    why: 'A keyword forces you to decide what the idea actually is — and stays short enough to see the whole map at once.',
  },
];

/* ── Section 1 — Why Mind Mapping? (Why should I care?) ───────────────────────── */

export const WHY_QUESTIONS: string[] = [
  'Do you forget what you study?',
  'Do your notes become messy?',
  'Do you struggle to organise ideas?',
  'Do you want to understand yourself better?',
];

export const WHY_BENEFITS: string[] = [
  'Think clearly',
  'Remember more',
  'Connect ideas',
  'Solve problems',
  'Understand yourself',
];

export const MESSY_NOTES_CONTRAST = {
  before: { label: 'Linear notes', lines: ['1. Introduction…', '2. Key point…', '3. Another point…', '4. More text…', '5. Even more text…'] },
  after: { label: 'A mind map', note: 'One centre. Four branches. Every idea visible at once.' },
} as const;

/* ── Section 2 — What Is Mind Mapping? (What is it?) ──────────────────────────── */

export const WHAT_IS =
  'A mind map is a visual diagram that arranges ideas around one central subject, letting them branch outward instead of running top to bottom.';

export const NOTES_COMPARISON: { label: string; traits: string[]; good: boolean }[] = [
  { label: 'Traditional notes', traits: ['Linear', 'Hard to connect', 'Easy to forget'], good: false },
  { label: 'Mind map', traits: ['Visual', 'Connected', 'Easy to remember'], good: true },
];

/* ── Section 3 — Why Does It Work? (Why does it work?) ────────────────────────── */

export const WHY_IT_WORKS: { title: string; body: string }[] = [
  { title: 'Radiant thinking', body: 'Your brain naturally connects ideas outward from a centre. A mind map copies that shape instead of fighting it.' },
  { title: 'Keywords', body: 'One keyword triggers many memories. A sentence only triggers itself.' },
  { title: 'Colours', body: 'Colour improves recognition. You recall where an idea sat and what colour it wore.' },
  { title: 'Images', body: 'Pictures are remembered faster than text — even a rough doodle beats a neat paragraph.' },
  { title: 'Associations', body: 'Connections create understanding. The link between two branches is often the real insight.' },
];

/** The learner watches one thought become five. Static — no animation in v2.0. */
export const ASSOCIATION_CHAIN: string[] = ['Apple', 'Fruit', 'Tree', 'Nature', 'Health'];

/* ── Section 4 — Five Golden Rules (How do I do it?) ──────────────────────────── */

export const GOLDEN_RULES: {
  rule: string;
  title: string;
  explanation: string;
  goodExample: string;
  poorExample: string;
}[] = [
  {
    rule: 'Rule 1',
    title: 'Start in the centre',
    explanation: 'Put your subject in the middle of the page. Everything else earns its place by connecting back to it.',
    goodExample: '"ME" in the middle, space all around it',
    poorExample: '"ME" in the top-left corner, ideas running downward',
  },
  {
    rule: 'Rule 2',
    title: 'Use keywords',
    explanation: 'One word per branch. It forces clarity and keeps the whole map readable at a glance.',
    goodExample: 'Analytical',
    poorExample: 'I am quite good at analysing problems when I have time',
  },
  {
    rule: 'Rule 3',
    title: 'Create branches',
    explanation: 'Main themes radiate from the centre; details branch off those. Structure comes from the shape, not from numbering.',
    goodExample: 'Strengths → Analytical → Spots patterns fast',
    poorExample: 'A single long list of twenty unrelated words',
  },
  {
    rule: 'Rule 4',
    title: 'Use colours',
    explanation: 'Give each branch its own colour so your eye groups them without reading a single word.',
    goodExample: 'Green for Strengths, blue for Values',
    poorExample: 'Everything in black biro',
  },
  {
    rule: 'Rule 5',
    title: 'Keep growing',
    explanation: 'A map is never finished. Add to it as you notice things — that is the whole point of keeping it.',
    goodExample: 'Revisited monthly, two branches added',
    poorExample: 'Drawn once, filed away, never seen again',
  },
];

/* ── Section 5 — Build-Along (Can I see one?) ─────────────────────────────────── */

/** Consumed by PersonalityMindMapPreview. Also the map the Build-Along constructs. */
export const PERSONALITY_MAP = {
  centre: 'ME',
  branches: [
    { name: 'Strengths', colorClass: 'text-emerald-400', borderClass: 'border-emerald-400/40', dotClass: 'bg-emerald-400', items: ['Communication', 'Leadership', 'Creativity'] },
    { name: 'Weaknesses', colorClass: 'text-rose-400', borderClass: 'border-rose-400/40', dotClass: 'bg-rose-400', items: ['Procrastination', 'Public speaking'] },
    { name: 'Values', colorClass: 'text-sky-400', borderClass: 'border-sky-400/40', dotClass: 'bg-sky-400', items: ['Respect', 'Integrity', 'Learning'] },
    { name: 'Goals', colorClass: 'text-amber-400', borderClass: 'border-amber-400/40', dotClass: 'bg-amber-400', items: ['Graduate', 'Improve English', 'Start business'] },
  ],
  crossLink: 'Communication ⇢ supports ⇢ Improve English',
} as const;

export const BUILD_ALONG_STAGES: {
  stage: 1 | 2 | 3 | 4;
  title: string;
  why: string;
  explanation: string;
  tryIt: string;
  checkpoint: string;
}[] = [
  {
    stage: 1,
    title: 'Stage 1 — The centre',
    why: 'Why? Because every branch needs something to hang from. Without a centre you are writing a list.',
    explanation: 'One word in the middle of the page: ME. That is the whole stage. It looks like nothing, and it decides everything that follows.',
    tryIt: 'Try it yourself: take a blank page and write ME in the middle. Leave space all around it.',
    checkpoint: 'Before moving on, make sure your centre is actually in the middle — not at the top.',
  },
  {
    stage: 2,
    title: 'Stage 2 — Four branches',
    why: 'Why? Because four clear categories beat twenty loose thoughts. The categories do the sorting for you.',
    explanation: 'Add four lines radiating from the centre: Strengths, Weaknesses, Values, Goals. Give each its own colour. Still no detail — just the skeleton.',
    tryIt: 'Try it yourself: draw your four branches outward from ME, each in a different colour.',
    checkpoint: 'Before moving on, make sure you have added your four main branches — and that each has its own colour.',
  },
  {
    stage: 3,
    title: 'Stage 3 — Keywords',
    why: 'Why? Because this is where the map starts telling you something you did not already know.',
    explanation: 'Now hang keywords off each branch. One word each. Do not judge them yet — capture first, sort later. Messy is correct at this stage.',
    tryIt: 'Try it yourself: add 2–4 keywords to every branch. Resist writing sentences.',
    checkpoint: 'Before moving on, check every entry is a keyword or short phrase — if any is a sentence, cut it down.',
  },
  {
    stage: 4,
    title: 'Stage 4 — Cross-links',
    why: 'Why? Because the connection between two branches is usually the insight. It is the part you did not plan.',
    explanation: 'Draw a dashed line between branches that relate. Here, Communication supports Improve English — a strength pointed at a goal. Now the map is finished.',
    tryIt: 'Try it yourself: find one strength that could serve one goal, and link them with a dashed line.',
    checkpoint: 'Before moving on, make sure you have at least one cross-link. A map with no links is just four lists.',
  },
];

/* ── Section 6 — Your Turn (Can I build mine?) ────────────────────────────────── */

export type BranchKey = 'strengths' | 'weaknesses' | 'values' | 'goals';

export const BRANCHES: {
  key: BranchKey;
  name: string;
  heading: string;
  /** The reframe — what to think about *instead* of the obvious thing. */
  lead: string;
  prompts: string[];
  ask: string;
  examples: string[];
  placeholder: string;
  colorClass: string;
  ringClass: string;
}[] = [
  {
    key: 'strengths',
    name: 'Strengths',
    heading: 'Discover your strengths',
    lead: "Don't think about skills first. Think about moments.",
    prompts: [
      'When do people ask for my help?',
      'What makes me lose track of time?',
      'What achievement makes me proud?',
      'What do I enjoy learning?',
    ],
    ask: 'Now write 3–5 strengths.',
    examples: ['Good listener', 'Helpful', 'Curious', 'Creative', 'Honest'],
    placeholder: 'e.g. Good listener',
    colorClass: 'text-emerald-400',
    ringClass: 'border-emerald-400/30',
  },
  {
    key: 'weaknesses',
    name: 'Weaknesses',
    heading: 'Name your weak spots',
    lead: "Don't list faults. Think about situations — a weakness is usually a pattern, not a defect.",
    prompts: [
      'What do I put off until the last minute?',
      'Which situations drain me?',
      'When did I last say yes when I meant no?',
      'What would a close friend gently tell me?',
    ],
    ask: 'Now write 2–4 honestly.',
    examples: ['Procrastination', 'Shy speaking', 'Says yes too fast', 'Impatient'],
    placeholder: 'e.g. Procrastination',
    colorClass: 'text-rose-400',
    ringClass: 'border-rose-400/30',
  },
  {
    key: 'values',
    name: 'Values',
    heading: 'Find your values',
    lead: "Don't write what sounds good. Look at decisions you have already made.",
    prompts: [
      'Where does my time actually go?',
      'Where does my money actually go?',
      'What would I refuse to do, even for a reward?',
      'Who do I admire, and why?',
    ],
    ask: 'Now write 3–5 — keep it short.',
    examples: ['Respect', 'Family', 'Integrity', 'Learning', 'Freedom'],
    placeholder: 'e.g. Respect',
    colorClass: 'text-sky-400',
    ringClass: 'border-sky-400/30',
  },
  {
    key: 'goals',
    name: 'Goals',
    heading: 'Set your goals',
    lead: "Don't start with five years. Start with this semester and work outward.",
    prompts: [
      'What do I want by the end of this semester?',
      'What about this year?',
      'Where do I want to be in five years?',
      'How would I know I had got there?',
    ],
    ask: 'Now write 2–4. Make each one specific.',
    examples: ['Graduate', 'Improve English', 'Start a business', 'Get fit'],
    placeholder: 'e.g. Graduate',
    colorClass: 'text-amber-400',
    ringClass: 'border-amber-400/30',
  },
];

/* ── Section 7 — Reflection (How do I improve?) ───────────────────────────────── */

export const REFLECTION_QUESTIONS: { key: string; question: string }[] = [
  { key: 'q1', question: 'What surprised you?' },
  { key: 'q2', question: 'Which branch was hardest to fill?' },
  { key: 'q3', question: 'What does that tell you?' },
  { key: 'q4', question: "What is one change you'll make this week?" },
];

/* ── Section 8 — GROW Coaching ────────────────────────────────────────────────── */

export const GROW_INTRO =
  'GROW is not another form to fill in. It is the conversation a coach would have with you about the goals you just wrote down — four questions, in order.';

export const GROW_FIELDS: { key: string; letter: string; title: string; prompt: string }[] = [
  { key: 'goal', letter: 'G', title: 'Goal', prompt: 'What do you want? State it specifically enough that you would know if you hit it.' },
  { key: 'reality', letter: 'R', title: 'Reality', prompt: 'Where are you now? What is genuinely in the way — including the weaknesses you just listed?' },
  { key: 'options', letter: 'O', title: 'Options', prompt: 'What could you try? Which of your strengths could you point at this?' },
  { key: 'will', letter: 'W', title: 'Will', prompt: 'What will you do first, and when? Who will notice if you do not?' },
];

/* ── Section 9 — Common Beginner Mistakes ─────────────────────────────────────── */

export const BEGINNER_MISTAKES: { mistake: string; better: string }[] = [
  { mistake: 'Writing paragraphs', better: 'Cut each one to a single keyword. If it needs a sentence, it needs its own branch.' },
  { mistake: 'Too many branches', better: 'Four to seven main branches. More than that and you are listing, not mapping.' },
  { mistake: 'No colours', better: 'One colour per branch. It costs nothing and does half the remembering for you.' },
  { mistake: 'No images', better: 'Add a rough doodle beside key ideas. It does not need to be good — it needs to be yours.' },
  { mistake: 'Copying others', better: "Use someone else's map as a shape, never as content. A copied map teaches you nothing about you." },
  { mistake: 'Making it perfect', better: 'Start messy. Refine later. A neat empty map is worth less than a scruffy honest one.' },
];

/* ── Section 10 — Real-Life Applications (Where can I use it next?) ───────────── */

export const APPLICATIONS: { tab: string; centre: string; items: string[] }[] = [
  { tab: 'Education', centre: 'A subject', items: ['Chapter summaries', 'Exam revision', 'Essay plans', 'Lecture notes'] },
  { tab: 'Business', centre: 'A business', items: ['Marketing', 'Customers', 'Finance', 'Operations'] },
  { tab: 'Research', centre: 'A question', items: ['Literature themes', 'Methods', 'Findings', 'Gaps'] },
  { tab: 'Career', centre: 'Your career', items: ['Skills', 'Experience', 'Network', 'Next role'] },
  { tab: 'Personal Growth', centre: 'You', items: ['Habits', 'Relationships', 'Health', 'Learning'] },
];

/* ── Section 11 — Software ────────────────────────────────────────────────────── */

export const TOOL_GROUPS: {
  audience: string;
  tools: { name: string; url: string }[];
  note: string;
}[] = [
  {
    audience: 'Beginners',
    tools: [
      { name: 'MindMeister', url: 'https://www.mindmeister.com' },
      { name: 'Coggle', url: 'https://coggle.it' },
    ],
    note: 'Browser-based and intuitive. Nothing to install — start in a minute.',
  },
  {
    audience: 'Students',
    tools: [
      { name: 'Canva', url: 'https://www.canva.com' },
      { name: 'PowerPoint', url: 'https://www.microsoft.com/microsoft-365/powerpoint' },
    ],
    note: 'Not built for mind maps, but perfectly capable — and already on your machine.',
  },
  {
    audience: 'Professionals',
    tools: [
      { name: 'XMind', url: 'https://xmind.app' },
      { name: 'MindNode', url: 'https://www.mindnode.com' },
      { name: 'Miro', url: 'https://miro.com' },
    ],
    note: 'Structured maps, presentation views, and infinite canvases for working with others.',
  },
];

export const TOOLS_CLOSING = 'Great mind maps come from clear thinking — not expensive software.';

export const TOOLS_DISCLAIMER =
  'These applications are listed for educational purposes only. This page is not affiliated with, endorsed by, or sponsored by any of them. All product names and trademarks are the property of their respective owners.';

/* ── Section 12 — Common Questions ────────────────────────────────────────────── */

export const COMMON_QUESTIONS: { question: string; answer: string }[] = [
  { question: 'Can I draw on paper?', answer: 'Yes — and for your first map, paper is usually better. There are no menus between you and the idea. Move it to software once the thinking is done.' },
  { question: "What if I can't think of any strengths?", answer: 'Ask someone who knows you. We are reliably bad at seeing our own strengths because they feel ordinary from the inside — that is exactly what makes them strengths.' },
  { question: 'How many branches should I have?', answer: 'Four to seven main branches. Fewer feels empty; more turns the map back into a list.' },
  { question: 'Should I use sentences?', answer: 'No. One keyword per branch. If you cannot compress it, you have not decided what it is yet.' },
  { question: 'How often should I update my map?', answer: 'Once a month is plenty. The value is in noticing what changed since last time.' },
  { question: 'Can I make one for exams?', answer: 'Yes — this is one of the strongest uses. One map per chapter, drawn from memory, then checked against your notes. The gaps you find are exactly what to revise.' },
  { question: "What's the difference between a mind map and a concept map?", answer: 'A mind map has one centre and radiates outward. A concept map links many ideas in a web with labelled relationships. Mind maps are better for thinking; concept maps for describing a system.' },
  { question: 'Paper or digital?', answer: 'Paper to think, digital to keep. Paper is faster and less judgemental; digital is easier to rearrange and share.' },
  { question: 'How many colours should I use?', answer: 'One per main branch. Colour is doing a job — grouping — so more colours than branches just adds noise.' },
  { question: 'Is there one correct answer?', answer: 'No. Your map is correct if it is honest and useful to you. Nobody else can grade your values.' },
];

/* ── Section 13 — Your Challenge ──────────────────────────────────────────────── */

export const SUCCESS_CHECKLIST: string[] = [
  'Explain what mind mapping is?',
  'Build a mind map?',
  'Identify your strengths?',
  'Identify your values?',
  'Plan your goals?',
  'Create a visual version?',
];

export const CHALLENGE = {
  title: 'Your challenge',
  intro: "Congratulations — you've created the content for your first personality mind map.",
  steps: [
    'Open Canva or XMind.',
    'Turn your ideas into a colourful visual map.',
    'Print it.',
    "Keep it where you'll see it.",
    'Return after one month and update it.',
  ],
  close: 'Watch yourself grow.',
} as const;

/* ── Section 14 — Practice Beyond This Lesson ─────────────────────────────────── */

export const PRACTICE_INTRO =
  'The best way to improve mind mapping is to use it on different kinds of problems.';

/** Educational activities, not navigation. Deliberately not links. */
export const PRACTICE_CHALLENGES: { icon: string; title: string; prompt: string }[] = [
  { icon: '📚', title: 'Study Planning', prompt: 'Create a mind map for one subject you are studying.' },
  { icon: '🎯', title: 'Goal Planning', prompt: 'Create a one-year personal goal map.' },
  { icon: '💼', title: 'Career Planning', prompt: 'Map the skills and experiences needed for your future career.' },
  { icon: '💡', title: 'Business Idea', prompt: 'Turn one business idea into a complete mind map.' },
  { icon: '📖', title: 'Book Summary', prompt: 'Read one chapter of a book and summarise it as a mind map.' },
];
