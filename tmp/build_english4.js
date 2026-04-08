const fs = require('fs');

const english4 = {
  name: "English IV",
  slug: "english-4",
  description: "Upper-intermediate course focused on high-level professional interactions, autobiographical literature, one-act plays, and nuanced expression in academic settings.",
  image: "https://placehold.co/600x400.png",
  dataAiHint: "business meeting and theater",
  categories: []
};

// UNIT I: LIFE WRITING
const unit1 = {
  name: "Unit I: Life Writing",
  works: [
    {
      title: "I am Malala (Chapter 1 Excerpt)",
      slug: "i-am-malala",
      category: "Unit I: Life Writing",
      author: "Malala Yousafzai",
      fullText: "[Chapter 1 Excerpt: A Daughter is Born]\n\nWhen I was born, people in our village commiserated with my mother and nobody congratulated my father. I arrived at dawn as the last star blinked out. We Pashtuns see this as an auspicious sign. My father didn't have any money for the hospital or for a midwife, so a neighbor helped at my birth.\n\nI was a girl in a land where rifles are fired in celebration of a son, while daughters are hidden away behind a curtain, their role in life simply to prepare food and give birth to children.\n\nFor most Pashtuns, it's a gloomy day when a daughter is born. My father’s cousin, Jehan Sher Khan Yousafzai, was one of the few who came to celebrate my birth and even gave a handsome gift of money. Yet, my father, Ziauddin Yousafzai, a teacher and an activist, looked at my newborn face and famously declared, “I know there is something different about this child.” He named me after Malalai of Maiwand, the greatest heroine of Afghanistan.\n\nMalalai was the daughter of a shepherd... when the Afghan fighters were losing to the British troops in 1880, she marched onto the battlefield with a flag and shouted: 'Young love! If you do not fall in the battle of Maiwand, by God someone is saving you as a symbol of shame.'\n\nHer words inspired the men to fight harder, and they drove the British back. But Malalai herself was killed. My father always told me the story of Malalai to remind me that we all have a voice, and a responsibility to use it.",
      difficultWords: [
        {
          word: "Commiserated",
          definition: "Express or feel sympathy or pity; sympathize.",
          connotation: "Carries a tone of shared sadness or mourning, deeply ironic that it's used for a birth.",
          example: "She went over to commiserate with him on his loss."
        },
        {
          word: "Auspicious",
          definition: "Conducive to success; favorable.",
          connotation: "A lucky, blessed, or promising sign from nature.",
          example: "It was not the most auspicious moment to hold an election."
        }
      ],
      authorInfo: {
        biography: "Malala Yousafzai (born 1997) is a Pakistani education activist and the youngest Nobel Prize laureate in history. She survived an assassination attempt by the Taliban strictly because of her advocacy for girls' education.",
        historicalContext: "The autobiography is set in the Swat Valley in Pakistan during the early 21st-century rise of the Taliban regime.",
        writingStyle: "Direct, personal, conversational, and highly emotive autobiographical prose.",
        majorWorks: ["I Am Malala: The Girl Who Stood Up for Education and Was Shot by the Taliban"],
        influence: "A global icon for female education, basic human rights, and peaceful defiance."
      },
      contentAnalysis: {
        summary: "This excerpt introduces Malala's origin story, highlighting the extreme patriarchal norms of her Pashtun culture where daughters are mourned rather than celebrated. Her father's deliberate choice to name her after a famous Afghan warrior, Malalai of Maiwand, foreshadows her destiny as a brave voice for female empowerment.",
        themes: ["Patriarchy and Gender Inequality", "Identity and Naming", "Courage and Voice"],
        literaryDevices: [
          { device: "Foreshadowing", example: "Naming her after a teenage girl who was shot while rallying warriors deeply foreshadows Malala’s own future." },
          { device: "Contrast", example: "The stark contrast between the traditional weeping over her birth and her father's immediate pride." }
        ],
        criticalAnalysis: "By beginning her memoir with the cultural sorrow regarding female birth, Malala immediately hooks the reader into understanding the immense societal friction she had to overcome.",
        relevance: "A profound text for understanding global women's rights and cross-cultural memoirs."
      },
      faqs: [
        { question: "Why didn't people congratulate her father?", answer: "Because in deeply traditional Pashtun culture of that era, the birth of a female child was viewed as a disappointment and an economic burden, as opposed to the celebration of a male heir." }
      ],
      quiz: [
        {
          question: "Who is Malala named after?",
          options: ["Her grandmother", "An Afghan heroine who died rallying troops", "A famous Pakistani poet", "A local political leader"],
          correctAnswer: "An Afghan heroine who died rallying troops",
          explanation: "Her father named her after Malalai of Maiwand, famous for rallying Afghan troops against the British before being killed."
        }
      ]
    },
    {
      title: "My Inventions (Chapter 2 Excerpt)",
      slug: "my-inventions",
      category: "Unit I: Life Writing",
      author: "Nikola Tesla",
      fullText: "[Chapter 2 Excerpt: My First Efforts In Invention]\n\nI shall dwell briefly on these extraordinary experiences, on account of their possible interest to students of psychology and physiology and also because this period of agony was of the greatest consequence on my mental development and subsequent labors.\n\nBut it is indispensable to relate first the circumstances and conditions which preceded them. From childhood I was compelled to concentrate attention upon myself. This caused me much suffering, but to my present view, it was a blessing in disguise for it has taught me to appreciate the inestimable value of introspection in the preservation of life, as well as a means of achievement.\n\nThe continuous mental exertion... undoubtedly trained my powers of observation to such a degree that I could often read the thoughts of my associates. The pressure of work and incessant thinking told upon me, and I suffered a nervous breakdown.\n\nIt is difficult to convey the anguish I suffered. My pulse would vary from a few to two hundred and sixty beats. I could hear the ticking of a watch with three rooms between me and the time-piece. A fly alighting on a table in the room would cause a dull thud in my ear.\n\nWhen I was a boy of seven or eight I loved to dismantle and re-assemble watches, though I was more successful in the former than in the latter operation... During this period my father was a strict disciplinarian. My exercises were to guess one another's thoughts, to discover the defects of some form or expression, to repeat long sentences and to perform mental calculations. These daily lessons were intended to strengthen memory and reason.",
      difficultWords: [
        { word: "Introspection", definition: "The examination or observation of one's own mental and emotional processes.", connotation: "Refers to deep self-analysis.", example: "Quiet introspection can be extremely valuable." },
        { word: "Incessant", definition: "Continuing without pause or interruption (usually regarding something unpleasant).", connotation: "Suggests a relentless, overwhelming continuity.", example: "The incessant beat of the music kept him awake." }
      ],
      authorInfo: {
        biography: "Nikola Tesla (1856–1943) was a Serbian-American inventor, electrical engineer, and futurist best known for designing the modern alternating current (AC) electricity supply system.",
        historicalContext: "Written in 1919 for the Electrical Experimenter magazine, providing insight into the mind of a misunderstood genius during the industrial revolution.",
        writingStyle: "Highly clinical, introspective, dense, and emotionally detached yet revealing.",
        majorWorks: ["My Inventions (Autobiography)"],
        influence: "Considered the blueprint for eccentric genius, paving the way for modern electrical grids and wireless communication."
      },
      contentAnalysis: {
        summary: "Tesla discusses how his childhood environment—characterized by immense focus, strict mental exercises prescribed by his father, and periods of excruciating sensory overload—shaped his inventive mind. He claims his intense introspection and mental fatigue actually heightened his sensitivity to the world.",
        themes: ["Genius and Madness", "The Burden of Intellect", "Sensory Perception"],
        literaryDevices: [
          { device: "Hyperbole", example: "'A fly alighting on a table in the room would cause a dull thud in my ear.' Used to express his severe hypersensitivity." }
        ],
        criticalAnalysis: "Tesla's writing reflects the classic trope of the 'tortured genius'. His detailed physiological descriptions of his nervous breakdowns suggest he experienced what modern psychology might classify as hyperacusis or a sensory processing disorder.",
        relevance: "A fascinating look at the psychological toll of profound intelligence."
      },
      faqs: [
        { question: "What did Tesla mean when he said 'I was more successful in the former than in the latter' about watches?", answer: "He meant he was very good at taking watches apart (the former) but terrible at putting them back together (the latter)." }
      ],
      quiz: [
        {
          question: "How did Tesla describe his father's parenting style regarding his mental development?",
          options: ["He was absent", "He was a strict disciplinarian forcing mental exercises", "He encouraged physical sports instead of academics", "He told Tesla to avoid thinking too hard"],
          correctAnswer: "He was a strict disciplinarian forcing mental exercises",
          explanation: "Tesla explicitly states his father was a strict disciplinarian who forced him to do mental calculations and memory repetition."
        }
      ]
    }
  ]
};

english4.categories.push(unit1);
fs.writeFileSync('english4.json', JSON.stringify(english4, null, 2));
console.log('Successfully wrote english4.json for Unit I.');
