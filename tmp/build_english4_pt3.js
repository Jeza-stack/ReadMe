const fs = require('fs');
const english4 = JSON.parse(fs.readFileSync('english4.json', 'utf8'));

// UNIT IV: LANGUAGE COMPETENCY
const unit4 = {
  name: "Unit IV: Language Competency",
  works: [
    {
      title: "Advanced Communication & Defensibility",
      slug: "language-competency-adv",
      category: "Unit IV: Language Competency",
      author: "Grammar Guide",
      fullText: "LANGUAGE COMPETENCY CONCEPTS\n\n1. Refuting, Arguing & Debating\n- Refuting: To formally prove a statement or theory to be wrong or false. Requires transitional phrases like 'While I understand your point, the data suggests...' or 'That assumption overlooks...'.\n- Debating: A formalized structure of presenting an argument, requiring claim, evidence, and impact.\n\n2. Making Suggestions & Responding\n- Modals of Advice: Using 'could', 'should', 'might want to' instead of commands.\n- Asking for help: 'I would appreciate your insight on...' rather than 'Tell me how to...'.\n\n3. Interview Mechanics\n- Face to Face: Relies heavily on non-verbal cues. 55% of communication is physical.\n- Telephone: Requires hyper-articulation and active listening sounds ('I see', 'Yes', 'Understood') since physical cues are missing.\n- Video Conferencing: Involves managing digital latency, eye contact directly into the camera lens, and background curation.",
      difficultWords: [
        { word: "Defensibility", definition: "The quality of being justifiable by argument.", connotation: "A robust, bulletproof argument.", example: "The defensibility of your thesis is questionable." }
      ],
      authorInfo: { biography: "Based on 'Role Play-Theory and Practice' and advanced communications modules.", historicalContext: "Crucial for upper-intermediate C1/C2 transitions.", writingStyle: "Direct, pedagogical.", majorWorks: [], influence: "" },
      contentAnalysis: {
        summary: "This unit focuses on conversational agility—how to strongly disagree without being offensive, how to solicit help politely, and how to conquer modern interviewing challenges across various mediums.",
        themes: ["Diplomacy", "Debate", "Adaptation"],
        literaryDevices: [],
        criticalAnalysis: "True fluency is not just vocabulary; it's the ability to modulate tone based on the emotional objective of the conversation.",
        relevance: "Essential for corporate environments and high-level academic discourse."
      },
      faqs: [
        { question: "Why is telephone interviewing considered uniquely difficult?", answer: "Because it completely strips away body language, forcing the candidate to rely 100% on tone of voice and articulation to convey enthusiasm and competence." }
      ],
      quiz: [
        {
          question: "When video conferencing, what is the best way to simulate direct eye contact with the interviewer?",
          options: ["Looking at their face on the screen", "Looking directly into your device's camera lens", "Looking at your own picture", "Closing your eyes and focusing on their voice"],
          correctAnswer: "Looking directly into your device's camera lens",
          explanation: "Looking at the screen makes it appear as if you are looking down. To create the illusion of eye contact, you must look directly into the camera lens."
        }
      ]
    }
  ]
};

// UNIT V: ENGLISH FOR WORKPLACE
const unit5 = {
  name: "Unit V: English for Workplace",
  works: [
    {
      title: "Workplace Documentation & Digital Profiles",
      slug: "workplace-english-adv",
      category: "Unit V: English for Workplace",
      author: "Professional Guide",
      fullText: "ENGLISH FOR WORKPLACE\n\n1. Job Applications (Cover Letters, CV, Resume)\n- CV (Curriculum Vitae): A detailed, multi-page document outlining your entire academic and professional history. Used mostly in academia or Europe/Asia.\n- Resume: A short, targeted one-page summary of your experience specific to the job you are applying for (common in North America).\n- Cover Letter: A narrative document introducing the resume, explaining 'why' you are perfect for the company culture.\n\n2. Creating a Digital Profile (LinkedIn)\n- Headlines should be outcome-oriented rather than just a job title (e.g., 'Transforming Data into Insights | BI Analyst' rather than just 'Data Analyst').\n- The Summary must be written in the first person.\n\n3. Form Filling & Transactions\n- The language of UI/UX is highly specific: 'Submit', 'Authorize', 'Authenticate', 'Mandatory Fields'. Comprehending banking, railway, and online account creation jargon is basic survival English.\n\n4. Body Language (Kinesics)\n- Maintain a naturally upright posture.\n- Mirrored body language builds subconscious rapport.\n- Fidgeting (playing with pens, touching hair) communicates anxiety and under-confidence.",
      difficultWords: [
        { word: "Kinesics", definition: "The study of the way in which certain body movements and gestures serve as a form of non-verbal communication.", connotation: "A scientific approach to body language.", example: "Her kinesics during the interview showed extreme confidence." }
      ],
      authorInfo: { biography: "Aggregated from 'How to Build a Professional Digital Profile'.", historicalContext: "Digital era workplace readiness.", writingStyle: "Instructional.", majorWorks: [], influence: "" },
      contentAnalysis: {
        summary: "This component is entirely practical, covering the paperwork and digital footprint required to secure employment. It highlights the difference between CVs and Resumes and provides actionable LinkedIn optimization strategies.",
        themes: ["Digital Identity", "Professionalism", "Non-verbal communication"],
        literaryDevices: [],
        criticalAnalysis: "In the modern era, English proficiency guarantees nothing if a candidate's digital profile and physical presence are poorly communicated.",
        relevance: "Directly translates to a student's ability to get hired."
      },
      faqs: [],
      quiz: [
        {
          question: "Which document is typically a short, 1-page summary highly targeted toward a specific job application?",
          options: ["A Curriculum Vitae (CV)", "A Resume", "A Cover Letter", "A LinkedIn Profile"],
          correctAnswer: "A Resume",
          explanation: "A resume is a brief, targeted summary, whereas a CV is a comprehensive, multi-page academic and professional history."
        }
      ]
    }
  ]
};

// UNIT VI: CONTEMPORARY ISSUES
const unit6 = {
  name: "Unit VI: Contemporary Issues",
  works: [
    {
      title: "Contemporary Seminars & Webinars",
      slug: "contemporary-issues-iv",
      category: "Unit VI: Contemporary Issues",
      author: "Contemporary Guide",
      fullText: "This section relies on dynamic content delivered via Expert lectures, online seminars, and webinars.\n\nAdvanced topics include the impact of globalization on English dialects, the ethics of AI generation in academia, and high-level negotiation tactics.\n\nThis unit functions practically; students must watch seminars and subsequently debate their contents to apply the skills from Unit IV.",
      difficultWords: [],
      authorInfo: { biography: "", historicalContext: "", writingStyle: "", majorWorks: [], influence: "" },
      contentAnalysis: {
        summary: "A practical application space for advanced communicative English.",
        themes: ["Application", "Active Engagement"],
        literaryDevices: [],
        criticalAnalysis: "",
        relevance: "Tests all previously learned grammar, body language, and debate skills in a live setting."
      },
      faqs: [],
      quiz: []
    }
  ]
};

english4.categories.push(unit4, unit5, unit6);
fs.writeFileSync('english4.json', JSON.stringify(english4, null, 2));
console.log('Successfully wrote english4.json for all remaining Units.');
