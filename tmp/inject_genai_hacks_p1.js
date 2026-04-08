const fs = require('fs');
const dataPath = 'src/data/readme-data.json';
const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const course = {
  name: "Students Hack to Use GenAI",
  slug: "chat-gpt-safety",
  description: "The top 15 battle-tested GenAI power moves that the top 1% of global achievers use to 10x their learning, research, and career outcomes. Master the hacks that separate amateurs from elite performers.",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  dataAiHint: "generative AI hacks and student productivity",
  categories: [
    {
      name: "Learning & Comprehension Hacks",
      works: [
        {
          title: "Hack #1: The Feynman Prompt — Explain Like I'm 12",
          slug: "hack-feynman-prompt",
          category: "Learning & Comprehension Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #1: THE FEYNMAN PROMPT\n\nThe Prompt: 'Explain [complex topic] as if I'm a 12-year-old. Use everyday analogies and no jargon.'\n\nWhy It Works: Nobel laureate Richard Feynman believed that if you can't explain something simply, you don't understand it. This prompt forces the AI to strip away academic complexity and deliver the core concept in crystal-clear language.\n\nAdvanced Variations:\n- 'Explain quantum entanglement using only a pizza delivery analogy.'\n- 'Teach me the concept of inflation as if I own a lemonade stand.'\n- 'Break down the theory of relativity using a train metaphor.'\n\nPro Tip: After getting the simple explanation, follow up with: 'Now give me the university-level version with technical terminology.' This two-pass approach gives you both intuition AND precision.\n\nReal-World Impact: Top 1% students use this to pre-learn difficult topics BEFORE attending lectures, giving them a massive comprehension advantage in class.",
          difficultWords: [
            { word: "Feynman Technique", definition: "A learning method where you explain concepts in the simplest possible terms to identify gaps in understanding.", connotation: "The gold standard for deep, permanent learning.", example: "She used the Feynman Technique to master organic chemistry." },
            { word: "Abstraction", definition: "The process of removing physical, spatial, or temporal details to focus on core concepts.", connotation: "Essential for simplifying complex systems.", example: "The AI's abstraction of the 50-page paper into 3 sentences was impressive." }
          ],
          authorInfo: { biography: "Inspired by Richard Feynman's teaching methodology.", historicalContext: "Adapted for GenAI prompting in 2024.", writingStyle: "Instructional, practical.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack leverages the Feynman learning technique through AI prompting to convert complex academic concepts into intuitive, analogy-driven explanations.", themes: ["Deep Learning", "Simplification", "Cognitive Scaffolding"], literaryDevices: [], criticalAnalysis: "The two-pass approach (simple→technical) is extraordinarily powerful because it builds mental scaffolding. The brain anchors new information to familiar analogies first, then layers technical precision on top.", relevance: "Used by top students at MIT, Stanford, and IITs to pre-learn before lectures." },
          faqs: [{ question: "Does oversimplifying harm deep understanding?", answer: "No—it builds the foundation. The follow-up technical prompt adds precision. You get both intuition AND rigor." }],
          quiz: [{ question: "What is the Feynman Technique fundamentally about?", options: ["Memorizing formulas", "Explaining concepts simply to reveal understanding gaps", "Speed reading", "Writing longer essays"], correctAnswer: "Explaining concepts simply to reveal understanding gaps", explanation: "Feynman believed simplicity reveals mastery, and confusion reveals knowledge gaps." }]
        },
        {
          title: "Hack #2: The Socratic Debate Partner",
          slug: "hack-socratic-debate",
          category: "Learning & Comprehension Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #2: THE SOCRATIC DEBATE PARTNER\n\nThe Prompt: 'I believe [your thesis]. Act as a world-class professor who completely disagrees with me. Challenge every point I make with rigorous counter-arguments. Don't be gentle.'\n\nWhy It Works: Echo chambers kill critical thinking. By forcing the AI to aggressively challenge your position, you discover weaknesses in your argument, find evidence you hadn't considered, and build an intellectually bulletproof thesis.\n\nAdvanced Variations:\n- 'Debate me on whether social media improves democracy. You take the opposing side. Use academic sources.'\n- 'I think renewable energy can fully replace fossil fuels by 2040. Destroy my argument with data.'\n\nPro Tip: After the debate, ask: 'Now summarize the 3 strongest counter-arguments I need to address in my essay.' This gives you a ready-made list of critical points to preemptively refute.\n\nReal-World Impact: Oxford and Cambridge debaters use this technique to stress-test arguments before tournaments.",
          difficultWords: [
            { word: "Socratic Method", definition: "A form of cooperative dialogue where questions stimulate critical thinking and expose contradictions.", connotation: "The foundation of Western philosophical education.", example: "The professor used the Socratic method to challenge every assumption." },
            { word: "Steel-manning", definition: "Presenting the strongest possible version of an opponent's argument before rebutting it.", connotation: "The intellectually honest opposite of a straw-man fallacy.", example: "He steel-manned the opposition's case before dismantling it point by point." }
          ],
          authorInfo: { biography: "Inspired by Socratic dialogue and competitive debate methodology.", historicalContext: "Adapted for AI-assisted argumentation.", writingStyle: "Adversarial, instructional.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack transforms the AI into an intellectual adversary, stress-testing your arguments to build unassailable academic positions.", themes: ["Critical Thinking", "Argumentation", "Intellectual Rigor"], literaryDevices: [], criticalAnalysis: "The genius is in the follow-up prompt. By asking the AI to summarize counter-arguments, you generate a roadmap for strengthening your own thesis.", relevance: "Used by debate champions and law students globally." },
          faqs: [{ question: "Won't this make me doubt my own arguments?", answer: "That's the point. Doubt reveals weak points. Addressing those weak points makes your final argument unbreakable." }],
          quiz: [{ question: "What is 'steel-manning' in debate?", options: ["Attacking a weak version of an argument", "Presenting the strongest possible version of your opponent's argument", "Ignoring the opposition", "Repeating your point louder"], correctAnswer: "Presenting the strongest possible version of your opponent's argument", explanation: "Steel-manning is the intellectually honest opposite of a straw-man fallacy." }]
        },
        {
          title: "Hack #3: The Exam Question Predictor",
          slug: "hack-exam-predictor",
          category: "Learning & Comprehension Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #3: THE EXAM QUESTION PREDICTOR\n\nThe Prompt: 'Based on this syllabus [paste syllabus], generate the 20 most likely exam questions a university professor would ask. Include 10 short-answer and 10 essay-type questions. For each question, provide a model answer outline.'\n\nWhy It Works: Professors follow predictable patterns. They test key concepts, compare/contrast themes, and evaluate critical application. AI can reverse-engineer these patterns from any syllabus.\n\nAdvanced Variations:\n- 'Generate 10 trick questions a tough grader would use to test whether students actually read the material vs. relying on summaries.'\n- 'Create a mock exam paper with mark allocations for [subject] based on Bloom's Taxonomy levels.'\n\nPro Tip: Cross-reference AI-predicted questions with past exam papers (often available through your university library). The overlap is often shocking.\n\nReal-World Impact: Students who predict exam questions score 20-35% higher on average by focusing revision on high-probability topics.",
          difficultWords: [
            { word: "Bloom's Taxonomy", definition: "A hierarchical classification of cognitive skills: Remember → Understand → Apply → Analyze → Evaluate → Create.", connotation: "The framework universities use to design exam difficulty levels.", example: "The essay question required Bloom's highest level: Create." }
          ],
          authorInfo: { biography: "Based on educational psychology and exam design research.", historicalContext: "Bloom's Taxonomy created in 1956, now standard in exam design.", writingStyle: "Strategic, instructional.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack uses AI to reverse-engineer exam patterns from syllabi, generating high-probability questions and model answers.", themes: ["Strategic Study", "Exam Preparation", "Pattern Recognition"], literaryDevices: [], criticalAnalysis: "This is not about cheating—it's about studying smarter. Understanding what examiners test and how they test it is a legitimate metacognitive skill.", relevance: "Used by top-performing students at leading universities worldwide." },
          faqs: [{ question: "Is this cheating?", answer: "Absolutely not. Predicting exam questions is a legitimate study strategy. You still need to learn the material to answer them." }],
          quiz: [{ question: "What is the highest level of Bloom's Taxonomy?", options: ["Remember", "Analyze", "Create", "Evaluate"], correctAnswer: "Create", explanation: "The hierarchy is: Remember → Understand → Apply → Analyze → Evaluate → Create." }]
        },
        {
          title: "Hack #4: The Reverse-Engineering Mentor",
          slug: "hack-reverse-engineering",
          category: "Learning & Comprehension Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #4: THE REVERSE-ENGINEERING MENTOR\n\nThe Prompt: 'Here is a piece of writing that scored an A+ in my university course: [paste text]. Analyze exactly what makes this exceptional. Break down the structure, argumentation style, vocabulary level, and techniques I should replicate.'\n\nWhy It Works: Instead of asking AI to write FOR you, you ask it to teach you WHY excellent work works. This builds transferable skills rather than creating dependency.\n\nAdvanced Variations:\n- 'Compare this A+ essay with this C-grade essay. List the exact differences in structure, evidence, and analysis depth.'\n- 'Extract the top 5 writing techniques used in this Harvard Business Review article that I can apply to my own writing.'\n\nPro Tip: Build a personal 'excellence database' by saving the AI's analysis of every A+ piece you encounter. Over time, you develop an instinct for quality.\n\nReal-World Impact: Rhodes Scholars and Fulbright winners consistently study exemplary work to internalize excellence patterns.",
          difficultWords: [
            { word: "Metacognition", definition: "Awareness and understanding of one's own thought processes.", connotation: "Thinking about thinking—the highest level of learning autonomy.", example: "Her metacognitive skills allowed her to identify exactly where her understanding broke down." }
          ],
          authorInfo: { biography: "Based on deliberate practice theory by Anders Ericsson.", historicalContext: "Reverse-engineering excellence is a core deliberate practice strategy.", writingStyle: "Analytical, instructional.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack uses AI to deconstruct high-performing work, extracting replicable patterns and techniques without creating AI dependency.", themes: ["Deliberate Practice", "Self-Improvement", "Analytical Learning"], literaryDevices: [], criticalAnalysis: "The critical distinction: you are not asking AI to write—you are asking AI to teach you WHY great writing works. This builds permanent skill.", relevance: "Used by scholarship applicants and academic high-achievers globally." },
          faqs: [{ question: "How is this different from copying?", answer: "You are learning techniques and structural patterns, not copying content. It's like studying a master painter's brushstrokes to improve your own painting." }],
          quiz: [{ question: "What is metacognition?", options: ["Speed reading", "Thinking about your own thinking processes", "Memorization technique", "A type of meditation"], correctAnswer: "Thinking about your own thinking processes", explanation: "Metacognition is self-awareness about how you learn, enabling you to optimize your strategies." }]
        }
      ]
    },
    {
      name: "Research & Writing Hacks",
      works: [
        {
          title: "Hack #5: The Literature Review Accelerator",
          slug: "hack-literature-review",
          category: "Research & Writing Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #5: THE LITERATURE REVIEW ACCELERATOR\n\nThe Prompt: 'I am writing a research paper on [topic]. Identify the 10 most influential academic papers published in the last 5 years on this topic. For each paper, provide: the authors, year, key findings, and how it relates to my research question: [your question].'\n\nWhy It Works: Literature reviews are the most time-consuming part of any research project. AI can map the academic landscape in minutes, giving you a starting scaffold.\n\nCRITICAL WARNING: Always verify every citation. AI frequently hallucinates fake papers with real-sounding author names. Use Google Scholar or Semantic Scholar to confirm each paper exists.\n\nAdvanced Variations:\n- 'Identify the main academic debates and disagreements within the field of [topic]. Who are the key opposing scholars?'\n- 'Create a timeline of how the academic consensus on [topic] has evolved over the past 20 years.'\n\nPro Tip: Use Perplexity AI (which provides cited sources) instead of ChatGPT for literature mapping, as it reduces hallucination risk significantly.",
          difficultWords: [
            { word: "Scaffold", definition: "A temporary framework used to support the construction of something.", connotation: "An initial structure that guides deeper work.", example: "The AI-generated outline served as a scaffold for her 40-page thesis." }
          ],
          authorInfo: { biography: "Based on academic research methodology best practices.", historicalContext: "AI-assisted literature review emerged as a legitimate methodology tool in 2024.", writingStyle: "Strategic, cautionary.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack accelerates the literature review process while critically warning about AI hallucination risks in citation generation.", themes: ["Research Efficiency", "Citation Verification", "Academic Integrity"], literaryDevices: [], criticalAnalysis: "The hack's greatest strength is its built-in warning. Students who blindly cite AI-suggested papers risk catastrophic academic consequences. The emphasis on verification transforms this from a shortcut into a skill.", relevance: "Essential for postgraduate researchers and dissertation writers." },
          faqs: [{ question: "Can I trust AI-generated citations?", answer: "NEVER blindly. Always verify every paper exists on Google Scholar. AI frequently invents plausible-sounding but non-existent papers." }],
          quiz: [{ question: "Why is it dangerous to blindly use AI-generated academic citations?", options: ["They are always correct", "AI frequently hallucmates fake papers", "They are too expensive", "They are illegal"], correctAnswer: "AI frequently hallucmates fake papers", explanation: "LLMs can generate convincing but entirely fabricated citations—always verify on Google Scholar." }]
        },
        {
          title: "Hack #6: The Writing Style Chameleon",
          slug: "hack-writing-chameleon",
          category: "Research & Writing Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #6: THE WRITING STYLE CHAMELEON\n\nThe Prompt: 'Rewrite this paragraph in the exact writing style of [The Economist / Harvard Business Review / New York Times Op-Ed / Academic Journal]. Maintain my core argument but adjust tone, vocabulary, and sentence structure.'\n\nWhy It Works: Different contexts demand different registers. An email to your professor sounds different from a LinkedIn post, which sounds different from a research paper. AI can demonstrate the exact stylistic shifts needed.\n\nAdvanced Variations:\n- 'Convert my informal blog draft into a formal academic paper suitable for peer review.'\n- 'Transform this technical report into a TED Talk script that a general audience would find compelling.'\n- 'Rewrite this paragraph at a CEFR B2 level, then rewrite it at C2 level. Highlight the differences.'\n\nPro Tip: Use this hack to develop your OWN range. After seeing how AI adapts to multiple styles, practice writing those styles independently until they become natural.\n\nReal-World Impact: Professional writers and journalists actively use this technique to adapt pitch materials for different publication styles.",
          difficultWords: [
            { word: "Register", definition: "The level of formality in language use, determined by context and audience.", connotation: "The social gear-shifting that distinguishes competent communicators from amateurs.", example: "She shifted her register from casual to formal when addressing the board." }
          ],
          authorInfo: { biography: "Based on sociolinguistic register theory.", historicalContext: "Register adaptation is a core CEFR communicative competence.", writingStyle: "Demonstrative, practical.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack teaches students to use AI as a writing coach for adapting tone, vocabulary, and structure across different professional and academic registers.", themes: ["Stylistic Versatility", "Register Awareness", "Professional Communication"], literaryDevices: [], criticalAnalysis: "The key insight is using AI as a demonstration tool, not a writing tool. By studying how the same content transforms across registers, students internalize the patterns and develop independent versatility.", relevance: "Critical for journalists, academics, and business professionals who write for diverse audiences." },
          faqs: [{ question: "Is this the same as asking AI to write my essay?", answer: "No. You are asking AI to demonstrate stylistic adaptation on YOUR existing content. The ideas remain yours; only the delivery shifts." }],
          quiz: [{ question: "What does 'register' mean in linguistics?", options: ["A list of students", "The level of formality in language determined by context", "A musical term", "A database entry"], correctAnswer: "The level of formality in language determined by context", explanation: "Register awareness allows you to shift between casual, professional, and academic communication." }]
        },
        {
          title: "Hack #7: The Outline Architect",
          slug: "hack-outline-architect",
          category: "Research & Writing Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #7: THE OUTLINE ARCHITECT\n\nThe Prompt: 'I need to write a 3000-word essay on [topic]. Create a highly detailed outline with: a compelling thesis statement, 5 section headings, 3 sub-points per section with specific evidence suggestions, a counterargument section, and a conclusion that circles back to the thesis. Do NOT write the essay—only the architectural outline.'\n\nWhy It Works: The hardest part of writing is not writing—it's organizing. An outline is the architectural blueprint. With a strong outline, the actual writing becomes mechanical.\n\nAdvanced Variations:\n- 'Create two competing outlines for the same essay topic—one arguing FOR and one AGAINST. I will choose the stronger structure.'\n- 'Design an outline using the Toulmin argumentation model: Claim, Data, Warrant, Backing, Qualifier, Rebuttal.'\n\nPro Tip: The explicit instruction 'Do NOT write the essay' is crucial. It forces the AI to focus on structure rather than producing content you'd be tempted to submit.\n\nReal-World Impact: Published authors, including bestselling non-fiction writers, use AI for structural outlining while writing every word themselves.",
          difficultWords: [
            { word: "Toulmin Model", definition: "An argumentation framework consisting of Claim, Data, Warrant, Backing, Qualifier, and Rebuttal.", connotation: "The most rigorous formal structure for constructing academic arguments.", example: "The debate team structured their case using the Toulmin Model." }
          ],
          authorInfo: { biography: "Based on rhetorical theory and writing pedagogy.", historicalContext: "The Toulmin Model was developed by Stephen Toulmin in 1958.", writingStyle: "Structural, instructional.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack separates the structural planning of an essay from the writing itself, using AI solely for architectural organization.", themes: ["Writing Architecture", "Structural Planning", "Academic Independence"], literaryDevices: [], criticalAnalysis: "The power of this hack is the explicit boundary: AI designs the skeleton, you write the body. This maintains academic integrity while eliminating the 'blank page paralysis' that cripples most writers.", relevance: "Used by professional authors and academic writers worldwide." },
          faqs: [{ question: "Does using AI for an outline count as plagiarism?", answer: "Generally no, because you are generating structure, not content. However, always check your institution's AI policy." }],
          quiz: [{ question: "Why does the prompt specify 'Do NOT write the essay'?", options: ["To save AI processing power", "To force focus on structure rather than producing submittable content", "To confuse the AI", "Because AI cannot write essays"], correctAnswer: "To force focus on structure rather than producing submittable content", explanation: "The boundary ensures you use AI for planning while maintaining full ownership of the written output." }]
        }
      ]
    },
    {
      name: "Career & Productivity Hacks",
      works: [
        {
          title: "Hack #8: The Recruiter Simulation",
          slug: "hack-recruiter-simulation",
          category: "Career & Productivity Hacks",
          author: "GenAI Strategy",
          fullText: "HACK #8: THE RECRUITER SIMULATION\n\nThe Prompt: 'Act as a senior recruiter at [specific company like Google/McKinsey/Goldman Sachs]. I am applying for [specific role]. Here is my resume: [paste resume]. Interview me with the 10 toughest behavioral and technical questions you would ask. After each of my answers, rate me out of 10 and tell me exactly how to improve.'\n\nWhy It Works: Interview preparation is expensive ($100-500/hour for professional coaches). AI provides unlimited free practice with instant, technical feedback.\n\nAdvanced Variations:\n- 'Conduct a McKinsey case interview. Give me a market-sizing problem and evaluate my framework.'\n- 'Simulate a STAR (Situation, Task, Action, Result) behavioral interview for Amazon's Leadership Principles.'\n- 'Review my cover letter for [company]. Rewrite it targeting the exact language from their job description.'\n\nPro Tip: Record yourself answering the AI's questions aloud (not typing). This trains verbal delivery, not just content.\n\nReal-World Impact: Investment banking analysts at JP Morgan and consultants at BCG report using AI interview simulations to prepare for internal promotions.",
          difficultWords: [
            { word: "STAR Method", definition: "Situation, Task, Action, Result — a structured framework for answering behavioral interview questions.", connotation: "The universally expected format for corporate interviews.", example: "She structured her answer using the STAR method and landed the job." },
            { word: "Case Interview", definition: "A job interview where the applicant must analyze and solve a business problem in real-time.", connotation: "The dreaded gatekeeper for management consulting firms.", example: "The McKinsey case interview required him to estimate the market size for electric scooters in India." }
          ],
          authorInfo: { biography: "Based on corporate recruitment practices at top-tier firms.", historicalContext: "AI interview preparation became mainstream in 2024.", writingStyle: "Practical, career-focused.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This hack transforms AI into a free, unlimited interview coach simulating tough recruiter scenarios from specific companies.", themes: ["Career Preparation", "Interview Skills", "Professional Development"], literaryDevices: [], criticalAnalysis: "The genius is specificity. By naming the exact company and role, the AI calibrates its questions to match real-world recruitment standards. The rating/feedback loop creates a measurable improvement cycle.", relevance: "Used by MBA students at Wharton, INSEAD, and IIMs for placement preparation." },
          faqs: [{ question: "Can AI really simulate a real interview accurately?", answer: "It closely replicates the content and difficulty. However, it cannot simulate the interpersonal pressure of face-to-face interaction. Use it for content preparation, then practice with humans for delivery." }],
          quiz: [{ question: "What does STAR stand for in interview preparation?", options: ["Strategy, Tactics, Analysis, Research", "Situation, Task, Action, Result", "Strengths, Threats, Abilities, Results", "Start, Think, Act, Review"], correctAnswer: "Situation, Task, Action, Result", explanation: "STAR is the universally expected framework for structuring behavioral interview answers." }]
        }
      ]
    }
  ]
};

// Check if exists
const idx = d.courses.findIndex(c => c.slug === 'chat-gpt-safety');
if (idx !== -1) { d.courses[idx] = course; } else { d.courses.push(course); }
fs.writeFileSync(dataPath, JSON.stringify(d, null, 2));
console.log("Injected GenAI Hacks course (Part 1: Hacks 1-8) successfully.");
