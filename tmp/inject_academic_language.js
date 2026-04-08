const fs = require('fs');
const dataPath = 'src/data/readme-data.json';
const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const course = {
  name: "Academic Language",
  slug: "academic-language",
  description: "Master formal academic writing, research terminology, citation methods, and scholarly discourse required for university-level studies and professional publications.",
  image: "https://images.unsplash.com/photo-1523050335456-c6bb7f9ccb7a?auto=format&fit=crop&q=80&w=800",
  dataAiHint: "academic writing and research",
  categories: [
    {
      name: "Academic Writing Foundations",
      works: [
        {
          title: "Essay & Report Structures",
          slug: "essay-report-structures",
          category: "Academic Writing Foundations",
          author: "Academic Faculty",
          fullText: "ACADEMIC ESSAY & REPORT STRUCTURES\n\nA well-structured academic essay is the cornerstone of university-level communication. Unlike creative writing, academic essays demand rigid organizational frameworks that demonstrate logical reasoning.\n\n1. THE FIVE-PARAGRAPH ESSAY\nIntroduction → Body Paragraph 1 → Body Paragraph 2 → Body Paragraph 3 → Conclusion\n\nThe introduction must contain:\n- A hook (an attention-grabbing opening sentence)\n- Background context (2-3 sentences providing necessary information)\n- A thesis statement (the central argument expressed in one precise sentence)\n\nEach body paragraph follows the PEEL structure:\n- Point: State the argument\n- Evidence: Provide data, quotes, or examples\n- Explanation: Analyze the evidence\n- Link: Connect back to the thesis\n\n2. ACADEMIC REPORT STRUCTURE\nTitle Page → Abstract → Introduction → Literature Review → Methodology → Results → Discussion → Conclusion → References → Appendices\n\nThe Abstract is a 150-250 word summary of the entire report. It must be self-contained—a reader should understand the full scope of the research from the abstract alone.\n\n3. CRITICAL DISTINCTIONS\n- Descriptive writing tells WHAT happened\n- Analytical writing tells WHY it happened\n- Critical writing evaluates WHETHER the explanation is valid\n- Reflective writing examines WHAT YOU LEARNED from it",
          difficultWords: [
            { word: "Thesis Statement", definition: "A concise sentence that summarizes the main claim or argument of an academic essay.", connotation: "The intellectual backbone of every scholarly paper.", example: "Her thesis statement argued that social media accelerates political polarization." },
            { word: "Abstract", definition: "A brief summary of a research article, thesis, review, or academic paper.", connotation: "The gateway through which academics decide whether to read the full paper.", example: "The abstract outlined the study's methodology and key findings in 200 words." },
            { word: "Methodology", definition: "A system of methods used in a particular area of study or activity.", connotation: "The scientific blueprint ensuring research is replicable.", example: "The methodology section described the survey design and sample size." },
            { word: "Empirical", definition: "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.", connotation: "Grounded in real-world data collection.", example: "The study relied on empirical evidence gathered over three years." },
            { word: "Discourse", definition: "Written or spoken communication or debate on a particular topic.", connotation: "Formal, structured intellectual exchange.", example: "Academic discourse requires objectivity and evidence-based reasoning." }
          ],
          authorInfo: { biography: "Based on Harvard Writing Center guidelines and APA Publication Manual (7th Edition).", historicalContext: "Academic writing standards evolved from medieval university traditions.", writingStyle: "Prescriptive, instructional.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This module teaches the foundational architectural blueprints of academic communication: the five-paragraph essay, the PEEL body paragraph method, and the formal report structure from Abstract to Appendices.", themes: ["Logical Structure", "Evidence-Based Writing", "Critical Thinking"], literaryDevices: [], criticalAnalysis: "Academic writing is not about literary beauty—it is about constructing airtight logical arguments. Mastering the PEEL method transforms vague opinions into defensible scholarly positions. The distinction between descriptive, analytical, critical, and reflective writing represents the intellectual maturity ladder that separates undergraduate work from postgraduate research.", relevance: "Essential for every university student, researcher, and professional publishing in peer-reviewed journals." },
          faqs: [
            { question: "What is the difference between a thesis statement and a topic sentence?", answer: "A thesis statement is the central argument of the entire essay (appears in the introduction). A topic sentence is the main argument of a single body paragraph." },
            { question: "How long should an academic abstract be?", answer: "Typically 150-250 words. It must summarize the objective, methodology, key findings, and conclusion of the entire paper." },
            { question: "What does PEEL stand for?", answer: "Point, Evidence, Explanation, Link. It is the gold-standard framework for constructing individual body paragraphs in academic essays." },
            { question: "When should I use first person ('I') in academic writing?", answer: "Generally avoided in formal research papers. However, reflective essays and some qualitative research methodologies permit first-person narration." }
          ],
          quiz: [
            { question: "In the PEEL paragraph structure, what does the 'E' for Evidence require?", options: ["An emotional appeal", "Data, quotes, or concrete examples supporting the point", "An etymology of a word", "A personal anecdote"], correctAnswer: "Data, quotes, or concrete examples supporting the point", explanation: "Evidence must be verifiable and directly support the Point made at the start of the paragraph." },
            { question: "Which section of a formal academic report is a self-contained 150-250 word summary?", options: ["Introduction", "Methodology", "Abstract", "Conclusion"], correctAnswer: "Abstract", explanation: "The Abstract must allow a reader to understand the full scope of the research without reading the entire paper." },
            { question: "Which type of academic writing evaluates WHETHER an explanation is valid?", options: ["Descriptive", "Analytical", "Critical", "Reflective"], correctAnswer: "Critical", explanation: "Critical writing moves beyond description and analysis to actively judge the validity and quality of arguments." },
            { question: "Where does the thesis statement typically appear in a five-paragraph essay?", options: ["At the end of the conclusion", "In the first body paragraph", "At the end of the introduction", "In the title"], correctAnswer: "At the end of the introduction", explanation: "The thesis statement closes the introduction, acting as a bridge into the body paragraphs." }
          ]
        },
        {
          title: "APA & MLA Citation Styles",
          slug: "apa-mla-citation-styles",
          category: "Academic Writing Foundations",
          author: "Academic Faculty",
          fullText: "CITATION STYLES: APA vs MLA\n\nPlagiarism is the most severe academic offense. Proper citation is not optional—it is the ethical backbone of all scholarly work.\n\nAPA (American Psychological Association) — 7th Edition\nUsed in: Psychology, Education, Social Sciences, Business\nIn-text: (Author, Year) — e.g., (Smith, 2024)\nReference list entry: Author, A. A. (Year). Title of work in italics. Publisher. https://doi.org/xxxxx\n\nMLA (Modern Language Association) — 9th Edition\nUsed in: Literature, Humanities, Arts, Cultural Studies\nIn-text: (Author Page) — e.g., (Smith 42)\nWorks Cited entry: Author. Title of Work. Publisher, Year.\n\nKEY DIFFERENCES:\n1. APA emphasizes the YEAR of publication (recency of research matters in science)\n2. MLA emphasizes the PAGE NUMBER (specific textual evidence matters in humanities)\n3. APA uses a 'Reference List'; MLA uses a 'Works Cited' page\n4. APA uses title case for headings; MLA uses sentence case\n\nHARVARD REFERENCING (used globally in UK, Australia, India):\nSimilar to APA but with slight formatting variations. In-text: (Author Year) without comma.\n\nAVOIDING PLAGIARISM:\n- Direct Quotation: Use exact words in quotation marks with full citation\n- Paraphrasing: Rewrite the idea entirely in your own words, still cite the source\n- Summarizing: Condense the main argument into a brief overview, still cite\n- Self-plagiarism: Resubmitting your own previous work without acknowledgment is also plagiarism",
          difficultWords: [
            { word: "Plagiarism", definition: "The practice of taking someone else's work or ideas and passing them off as one's own.", connotation: "The gravest academic crime, punishable by expulsion.", example: "The student was expelled for plagiarism after copying an entire paragraph without citation." },
            { word: "Paraphrasing", definition: "Expressing the meaning of something written or spoken using different words.", connotation: "A critical academic skill demonstrating genuine comprehension.", example: "She paraphrased the author's argument effectively while maintaining the original meaning." },
            { word: "Bibliography", definition: "A list of the books and articles consulted by an author in producing a work.", connotation: "The scholarly trail of evidence supporting your research.", example: "Her bibliography contained over 40 peer-reviewed sources." },
            { word: "DOI", definition: "Digital Object Identifier — a persistent, unique alphanumeric string assigned to digital content.", connotation: "The permanent digital address ensuring a source is always findable.", example: "Always include the DOI when citing online journal articles in APA format." }
          ],
          authorInfo: { biography: "Based on APA Publication Manual 7th Ed. and MLA Handbook 9th Ed.", historicalContext: "Citation standards formalized in the 20th century to combat academic fraud.", writingStyle: "Prescriptive, rule-based.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This module provides a rigorous comparison of APA and MLA citation formats, including in-text citations, reference lists, and strategies for avoiding plagiarism.", themes: ["Academic Integrity", "Research Ethics", "Standardized Formatting"], literaryDevices: [], criticalAnalysis: "Citation is not bureaucratic busywork—it is intellectual honesty encoded into formatting. APA's emphasis on publication year reflects the scientific need for currency; MLA's emphasis on page numbers reflects the humanistic need for precise textual evidence. Mastering both systems signals to the academy that you respect the intellectual labor of those who came before you.", relevance: "Mandatory knowledge for every student submitting research papers at any university worldwide." },
          faqs: [
            { question: "When should I use APA vs MLA?", answer: "APA for sciences, psychology, education, business. MLA for literature, humanities, arts, and cultural studies. Always check your professor's syllabus requirements." },
            { question: "Is paraphrasing without citation still plagiarism?", answer: "Absolutely yes. Even if you rewrite every single word, the original idea still belongs to someone else and must be cited." },
            { question: "What is a DOI and why is it important?", answer: "A Digital Object Identifier is a permanent URL for academic articles. Unlike regular web links that can break, a DOI ensures the source is always locatable." }
          ],
          quiz: [
            { question: "In APA in-text citation, which element is emphasized alongside the author?", options: ["Page number", "Publisher", "Year of publication", "Title"], correctAnswer: "Year of publication", explanation: "APA format is (Author, Year) because scientific fields prioritize the recency of research." },
            { question: "Which citation style uses a 'Works Cited' page instead of a 'Reference List'?", options: ["APA", "MLA", "Harvard", "Chicago"], correctAnswer: "MLA", explanation: "APA uses 'References'; MLA uses 'Works Cited' as the title for the bibliography page." },
            { question: "Resubmitting your own previously graded essay for a new assignment without acknowledgment is called:", options: ["Fair use", "Self-plagiarism", "Paraphrasing", "Summarizing"], correctAnswer: "Self-plagiarism", explanation: "Even recycling your own work without disclosure is considered an academic integrity violation." },
            { question: "What does DOI stand for?", options: ["Department of Information", "Digital Object Identifier", "Data Output Index", "Document Online Interface"], correctAnswer: "Digital Object Identifier", explanation: "A DOI is a permanent, unique identifier assigned to digital academic content." }
          ]
        }
      ]
    },
    {
      name: "Research Skills & Scholarly Discourse",
      works: [
        {
          title: "Research Methodology & Critical Reading",
          slug: "research-methodology",
          category: "Research Skills & Scholarly Discourse",
          author: "Academic Faculty",
          fullText: "RESEARCH METHODOLOGY & CRITICAL READING\n\nResearch is not gathering opinions—it is systematically investigating a question using evidence.\n\nTYPES OF RESEARCH:\n1. Quantitative Research: Uses numerical data, statistics, and measurable variables (e.g., surveys with 500 respondents analyzing correlation between screen time and GPA).\n2. Qualitative Research: Uses interviews, observations, and thematic analysis to explore complex human experiences (e.g., 15 in-depth interviews about student anxiety).\n3. Mixed Methods: Combines both quantitative and qualitative approaches for comprehensive findings.\n\nTHE RESEARCH PROCESS:\nStep 1: Identify a Research Gap — What hasn't been studied yet?\nStep 2: Formulate a Research Question — Specific, measurable, achievable\nStep 3: Literature Review — Survey existing scholarship to build your foundation\nStep 4: Design Methodology — Choose your data collection method\nStep 5: Collect Data — Execute surveys, interviews, or experiments\nStep 6: Analyze Results — Apply statistical or thematic analysis\nStep 7: Draw Conclusions — Answer your original question\nStep 8: Peer Review — Submit for expert evaluation\n\nCRITICAL READING FRAMEWORK (SQ3R Method):\nS — Survey: Skim headings, abstracts, and conclusions\nQ — Question: Turn headings into questions before reading\nR1 — Read: Read actively, annotating key arguments\nR2 — Recite: Summarize each section in your own words\nR3 — Review: Re-read your notes and connect themes\n\nEVALUATING SOURCES (CRAAP Test):\nC — Currency: When was it published? Is it up-to-date?\nR — Relevance: Does it directly address your research question?\nA — Authority: Who wrote it? Are they qualified?\nA — Accuracy: Is it peer-reviewed? Are claims supported by evidence?\nP — Purpose: What is the author's intent? Is there bias?",
          difficultWords: [
            { word: "Peer Review", definition: "Evaluation of scientific or academic work by others working in the same field.", connotation: "The ultimate quality-control mechanism in scholarship.", example: "The journal uses double-blind peer review to ensure objectivity." },
            { word: "Literature Review", definition: "A comprehensive survey of previously published scholarly work on a specific topic.", connotation: "Demonstrates you understand the existing knowledge landscape.", example: "Her literature review cited 35 studies spanning two decades." },
            { word: "Hypothesis", definition: "A proposed explanation for a phenomenon, made as a starting point for further investigation.", connotation: "A testable prediction that drives the entire study.", example: "The hypothesis stated that increased exercise reduces anxiety levels." },
            { word: "Correlation", definition: "A mutual relationship or connection between two or more variables.", connotation: "Does NOT imply causation — a critical distinction in research.", example: "There was a strong correlation between sleep duration and test scores." }
          ],
          authorInfo: { biography: "Based on Creswell's Research Design (6th Ed.) and the SQ3R method by Francis Robinson.", historicalContext: "Modern research methodology formalized in the 20th century.", writingStyle: "Instructional, systematic.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "This module teaches the complete research pipeline from identifying a gap to peer review, along with the SQ3R critical reading framework and the CRAAP test for evaluating source credibility.", themes: ["Evidence-Based Inquiry", "Source Evaluation", "Systematic Investigation"], literaryDevices: [], criticalAnalysis: "The distinction between correlation and causation is perhaps the single most important concept in modern research literacy. Students who cannot critically evaluate whether a source passes the CRAAP test are vulnerable to misinformation. The SQ3R method transforms passive reading into active intellectual engagement.", relevance: "Foundational for any student conducting undergraduate dissertations, postgraduate theses, or professional research." },
          faqs: [
            { question: "What is the difference between quantitative and qualitative research?", answer: "Quantitative uses numbers, statistics, and measurable data. Qualitative uses interviews, observations, and thematic analysis of human experiences." },
            { question: "Does correlation imply causation?", answer: "Absolutely not. Correlation means two variables move together, but it does not prove one causes the other. Ice cream sales and drowning rates both rise in summer—but ice cream does not cause drowning." },
            { question: "What is the CRAAP test?", answer: "A framework for evaluating sources: Currency, Relevance, Authority, Accuracy, and Purpose." }
          ],
          quiz: [
            { question: "Which research type uses interviews and thematic analysis rather than numerical data?", options: ["Quantitative", "Qualitative", "Statistical", "Experimental"], correctAnswer: "Qualitative", explanation: "Qualitative research explores human experiences through non-numerical methods like interviews." },
            { question: "In the SQ3R method, what does the first 'R' stand for?", options: ["Review", "Recite", "Read", "Research"], correctAnswer: "Read", explanation: "The three Rs are Read, Recite, and Review, performed after Survey and Question." },
            { question: "What does the 'A' for Authority check in the CRAAP test?", options: ["Is the article attractive?", "Who wrote it and are they qualified?", "Is it available online?", "Is it written in English?"], correctAnswer: "Who wrote it and are they qualified?", explanation: "Authority verifies the author's credentials, institutional affiliation, and expertise." },
            { question: "Which step comes immediately after 'Literature Review' in the research process?", options: ["Draw Conclusions", "Design Methodology", "Peer Review", "Publish"], correctAnswer: "Design Methodology", explanation: "After surveying existing scholarship, you design how you will collect your own data." }
          ]
        }
      ]
    }
  ]
};

// Inject
const idx = d.courses.findIndex(c => c.slug === 'academic-language');
if (idx !== -1) { d.courses[idx] = course; } else { d.courses.push(course); }
fs.writeFileSync(dataPath, JSON.stringify(d, null, 2));
console.log("Injected Academic Language course successfully.");
