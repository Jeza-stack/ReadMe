const fs = require('fs');
const english2 = JSON.parse(fs.readFileSync('english2.json', 'utf8'));

// UNIT III: FICTION
const unit3 = {
  name: "Unit III: Fiction",
  works: [
    {
      title: "The Alchemist",
      slug: "the-alchemist",
      category: "Unit III: Fiction",
      author: "Paulo Coelho",
      fullText: "[Core Summary and Passages of The Alchemist]\n\nThe story follows Santiago, a young Andalusian shepherd who dreams of finding a worldly treasure located near the Egyptian pyramids. He meets Melchizedek, the King of Salem, who tells him about 'Personal Legends'—the one thing a person has always wanted to accomplish. He says, 'When you want something, all the universe conspires in helping you to achieve it.'\n\nSantiago sells his flock and travels to Africa, where he is immediately robbed. He works for a crystal merchant for a year, learning about fate (Maktub—'It is written') and the fear of realizing one's dreams. \n\nHe joins a caravan crossing the Sahara, meeting an Englishman studying alchemy. At an oasis, he meets Fatima and falls in love, but learns he must continue his journey. He meets the actual Alchemist, who teaches him to listen to his heart because 'wherever your heart is, that is where you will find your treasure.'\n\nAt the pyramids, he digs for treasure but is beaten by refugees. One refugee mocks him, saying he once had a recurring dream of a treasure buried under a sycamore tree by a ruined church in Spain. Santiago smiles. He returns to Spain, to the exact church where he started his journey as a shepherd, and finds his treasure. The journey itself enriched him, but the treasure was home all along.",
      difficultWords: [
        { word: "Personal Legend", definition: "A term used heavily in the book representing what a person has always wanted to accomplish; their destiny.", connotation: "A spiritual, almost predetermined purpose in life.", example: "He gave up his comfortable job to pursue his Personal Legend." },
        { word: "Maktub", definition: "Arabic word meaning 'It is written'.", connotation: "Suggests that destiny is already preordained by God.", example: "Even when he lost his money, he whispered 'Maktub'." }
      ],
      authorInfo: {
        biography: "Paulo Coelho (born 1947) is a Brazilian lyricist and novelist. After severe bouts of institutionalization growing up, he walked the 500-plus mile Road of Santiago de Compostela in northwestern Spain, a turning point in his life.",
        historicalContext: "Originally published in Portuguese in 1988, it became an international phenomenon, translated into over 80 languages.",
        writingStyle: "Allegorical, simple, highly accessible spiritual prose resembling a folk tale.",
        majorWorks: ["The Alchemist", "Veronika Decides to Die", "The Archer"],
        influence: "One of the best-selling books in history, making Coelho a globally recognized spiritual author."
      },
      contentAnalysis: {
        summary: "The Alchemist is an allegory about listening to your heart and following your dreams. Santiago's physical journey to Egypt is a reflection of his spiritual journey. He learns the 'Soul of the World' connects all things.",
        themes: ["Destiny and Fate", "Fear as an Obstacle", "The Interconnectedness of All Things"],
        literaryDevices: [
          { device: "Allegory", example: "The entire story is an allegory for human spiritual awakening. The 'treasure' represents enlightenment or self-actualization." }
        ],
        criticalAnalysis: "While some critics label the book as simplistic self-help disguised as fiction, its massive global appeal lies in its universal, cross-cultural message of hope and personal empowerment.",
        relevance: "A fundamental text for young adults and professionals seeking meaning outside of standard societal paths."
      },
      faqs: [
        { question: "What is the secret of alchemy in the book?", answer: "The true secret is not just turning lead into gold, but the spiritual perfection of the self. The Alchemist tells Santiago that those who tried to just get gold failed because they forgot to evolve themselves alongside the metal." }
      ],
      quiz: [
        {
          question: "Where does Santiago eventually find his real physical treasure at the end of the book?",
          options: ["Under the Egyptian Pyramids", "In an oasis with Fatima", "Under a sycamore tree by a ruined church in Spain", "In the crystal merchant's shop"],
          correctAnswer: "Under a sycamore tree by a ruined church in Spain",
          explanation: "At the very end, he realizes the treasure was buried right where he started his journey."
        }
      ]
    }
  ]
};

// UNIT IV: LANGUAGE COMPETENCY
const unit4 = {
  name: "Unit IV: Language Competency",
  works: [
    {
      title: "Grammar & Usage: Homonyms, Tenses, and Error Correction",
      slug: "language-competency",
      category: "Unit IV: Language Competency",
      author: "Grammar Guide",
      fullText: "LANGUAGE COMPETENCY CONCEPTS\n\n1. Homonyms, Homophones, Homographs, and Portmanteau words\n- Homophones: Sound the same, spelt differently (e.g., bare/bear, to/too/two).\n- Homographs: Spelt the same, pronounced differently (e.g., lead /lɛd/ vs lead /liːd/).\n- Homonyms: Both homophones and homographs—spelt and sound the same but mean different things (e.g., a tree 'bark' vs a dog's 'bark').\n- Portmanteau: A blend of words in which parts of multiple words are combined into a new word (e.g., smog = smoke + fog, brunch = breakfast + lunch).\n\n2. Verbs and Tenses & Subject-Verb Agreement\n- Rule 1: A singular subject takes a singular verb (He runs). A plural subject takes a plural verb (They run).\n- Rule 2: Two singular subjects connected by 'or' or 'nor' require a singular verb. (Neither John nor Mary is here.)\n- Rule 3: Ignore words that come between the subject and the verb (The colors of the rainbow are beautiful). \n\n3. Common Error Correction\n- Incorrect: One of the student is missing.\n- Correct: One of the students is missing. (Rule: 'One of the' is followed by a plural noun but a singular verb).\n- Incorrect: She is married with a doctor.\n- Correct: She is married to a doctor.",
      difficultWords: [],
      authorInfo: {
        biography: "Based on 'Advanced English Grammar' by Martin Hewings and standard linguistic frameworks.",
        historicalContext: "Essential for standard professional English.",
        writingStyle: "Instructional.",
        majorWorks: [],
        influence: ""
      },
      contentAnalysis: {
        summary: "This unit covers essential structural English syntax. To achieve communicative competence, one must master subject-verb agreement, utilize correct portmanteaus, and consistently edit out common prepositional errors.",
        themes: ["Syntax", "Accuracy", "Vocabulary"],
        literaryDevices: [],
        criticalAnalysis: "Mastery of these rules marks the transition from conversational fluency to professional mastery.",
        relevance: "Critical for passing proficiency writing exams and conducting formal workplace communications."
      },
      faqs: [
        { question: "What is a 'Portmanteau'?", answer: "It is a word created by blending two words together, like 'Motel' (Motor + Hotel) or 'Podcast' (iPod + Broadcast)." }
      ],
      quiz: [
        {
          question: "Choose the correct sentence.",
          options: ["One of my friend live in London.", "One of my friends live in London.", "One of my friends lives in London.", "One of my friend lives in London."],
          correctAnswer: "One of my friends lives in London.",
          explanation: "The phrase 'One of the' must be followed by a plural noun ('friends') but since the actual subject is 'One', the verb must be singular ('lives')."
        }
      ]
    }
  ]
};

// UNIT V: ENGLISH IN THE WORKPLACE
const unit5 = {
  name: "Unit V: English in the Workplace",
  works: [
    {
      title: "Workplace Communication & Comprehension",
      slug: "workplace-communication",
      category: "Unit V: English in the Workplace",
      author: "Professional Guide",
      fullText: "WORKPLACE ENGLISH AND COMPREHENSION\n\n1. Skimming and Scanning (Reading for Information)\n- Skimming is reading rapidly to get a general overview of the material. (e.g., flipping through a newspaper to get the gist of the news).\n- Scanning is reading rapidly to find specific facts. (e.g., looking at a train schedule to find out what time your specific train leaves).\n\n2. Reading Charts, Tables, and Graphs\n- Visual data interpretation is critical. You must be able to identify the X and Y axes, read the legend, and summarize the trend (e.g., ' profits showed a steep decline in Q3 due to supply chain issues.').\n\n3. Note-Taking\n- Note-making vs. Note-taking: Taking notes is passively writing down exactly what is said. Making notes is an active process of synthesizing, organizing (like the Cornell method), and drawing connections during a lecture or reading.",
      difficultWords: [
        { word: "Synthesizing", definition: "Combining a number of things into a coherent whole.", connotation: "A high-level cognitive skill of bringing ideas together.", example: "The analyst synthesized the raw data into an actionable report." }
      ],
      authorInfo: {
        biography: "Based on standard business communication protocols.",
        historicalContext: "Adapted from 'Skimming and Scanning Techniques' by Barbara Sherman.",
        writingStyle: "Technical, direct.",
        majorWorks: [],
        influence: ""
      },
      contentAnalysis: {
        summary: "This unit prepares students for functional English—the ability to rapidly extract required information from dense formats like charts, lectures, and news, and accurately condense them into useable notes.",
        themes: ["Functional Literacy", "Data Interpretation", "Efficiency"],
        literaryDevices: [],
        criticalAnalysis: "Workplace English shifts the focus from literary interpretation to rapid accuracy and data synthesis.",
        relevance: "Absolute necessity for modern corporate and remote-work environments."
      },
      faqs: [
        { question: "What is the difference between skimming and scanning?", answer: "Skimming is for getting the main idea (reading headers, first sentences). Scanning is hunting for a specific keyword or number quickly." }
      ],
      quiz: [
        {
          question: "If you are looking at a flight departure board to find which gate goes to New York, are you skimming or scanning?",
          options: ["Skimming", "Scanning", "Synthesizing", "Note-taking"],
          correctAnswer: "Scanning",
          explanation: "You are looking for a highly specific piece of information (New York / Gate number), which involves scanning."
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
      slug: "contemporary-issues",
      category: "Unit VI: Contemporary Issues",
      author: "Contemporary Guide",
      fullText: "This section relies on dynamic content delivered via Expert lectures, online seminars, and webinars.\n\nModern issues such as AI integration in writing, global linguistic shifts, or remote-work communication nuances are actively discussed in real-time forums rather than static text.\n\nStudents are heavily encouraged to participate in live Q&A sessions to practice their real-time English proficiency and listening comprehension.",
      difficultWords: [],
      authorInfo: {
        biography: "",
        historicalContext: "",
        writingStyle: "",
        majorWorks: [],
        influence: ""
      },
      contentAnalysis: {
        summary: "A placeholder unit recognizing that modern language instruction must include live, contemporary, and interactive discussions.",
        themes: ["Active Listening", "Interactive Communication"],
        literaryDevices: [],
        criticalAnalysis: "Live webinars force language learners to bypass theoretical rules and rely on instinctual, practical language usage.",
        relevance: "Prepares students for Zoom calls, global meetings, and real-time debates."
      },
      faqs: [],
      quiz: []
    }
  ]
};

english2.categories.push(unit3, unit4, unit5, unit6);
fs.writeFileSync('english2.json', JSON.stringify(english2, null, 2));
console.log('Successfully wrote english2.json for all remaining Units.');
