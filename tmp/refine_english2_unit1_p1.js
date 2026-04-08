const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  if (courseIndex === -1) throw new Error("Could not find english-2");

  const unit1Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit I: Poetry');
  if (unit1Index === -1) throw new Error("Could not find Unit I: Poetry");

  const unitWorks = currentData.courses[courseIndex].categories[unit1Index].works;

  // 1. VERY INDIAN POEM
  const p1 = unitWorks.find(w => w.slug === 'very-indian-poem-in-indian-english');
  p1.difficultWords = [
    { word: "Teetotaller", definition: "A person who never drinks alcohol.", connotation: "Suggests strict moral or physical adherence to sobriety.", example: "He is a strict teetotaller and only drinks juice at parties." },
    { word: "Goonda", definition: "A hired thug or bully, originating from the Indian subcontinent.", connotation: "Carries a derogatory tone for an unruly troublemaker.", example: "The shopkeeper was threatened by a local goonda." },
    { word: "Lassi", definition: "A popular traditional dahi (yogurt)-based drink that originated in the Indian subcontinent.", connotation: "Invokes a feeling of home, traditional hospitality, and simplicity.", example: "He offered his guest a cold glass of sweet lassi." },
    { word: "Regeneration", definition: "The action or process of regenerating or being regenerated, in particular the formation of new tissue.", connotation: "Used comically by the speaker out of context to sound intellectual.", example: "The city's urban regeneration project took a decade." },
    { word: "Ram Rajya", definition: "A term referencing the reign of Lord Ram in Hindu mythology, characterized by peace, prosperity, and truth.", connotation: "Utopian ideal of governance and societal harmony.", example: "Gandhi envisioned a post-independence India as a modern Ram Rajya." }
  ];
  p1.faqs = [
    { question: "Why does the poet use incorrect grammar like 'fighting fighting'?", answer: "Ezekiel deliberately uses ungrammatical, uniquely 'Indian English' phrases such as 'fighting fighting' (reduplication) to authentically replicate how many native Indians converse colloquially, serving as a linguistic satire." },
    { question: "What is the tone of the poem?", answer: "The tone is predominantly humorous, conversational, and subtly ironic, showcasing the contradictions of the modern Indian citizen." },
    { question: "Who is the speaker addressing?", answer: "The speaker is addressing a silent listener (dramatic monologue), likely a friend or an acquaintance, offering them lassi and sharing unsolicited opinions." },
    { question: "Why does the speaker use present continuous tense incorrectly?", answer: "The overuse of the present continuous tense (e.g., 'I am standing', 'I am understanding') is a major hallmark of Babu English. It highlights the speaker's attempt to sound highly educated while failing at basic grammar." }
  ];
  p1.quiz = [
    { question: "Which newspaper does the speaker mention reading every day to improve his English?", options: ["The Hindu", "Times of India", "Hindustan Times", "Indian Express"], correctAnswer: "Times of India", explanation: "The speaker explicitly states: 'Every day I'm reading Times of India / To improve my English language'." },
    { question: "What drink does the speaker offer to his companion?", options: ["Tea", "Coffee", "Wine", "Lassi"], correctAnswer: "Lassi", explanation: "He offers lassi, pointing out its digestive benefits and noting he is a 'total teetotaller'." },
    { question: "Which Shakespearean phrase does the speaker awkwardly quote?", options: ["To be or not to be", "Friends, Romans, countrymen", "All the world's a stage", "Et tu, Brute?"], correctAnswer: "Friends, Romans, countrymen", explanation: "He humorously quotes Mark Antony's famous speech from Julius Caesar ('Friends, Romans, countrymen, I am saying (to myself)... Lend me the ears.')." },
    { question: "Which rhetorical mode is this poem written in?", options: ["Sonnet", "Elegy", "Dramatic Monologue", "Haiku"], correctAnswer: "Dramatic Monologue", explanation: "A dramatic monologue is a poem in the form of a speech or narrative by an imagined person, in which the speaker inadvertently reveals aspects of their character while describing a particular situation or series of events." }
  ];
  p1.contentAnalysis.criticalAnalysis = "Ezekiel masterfully captures the cadence and linguistic quirks of Indian-English speakers, utilizing present-continuous tense indiscriminately ('I am standing', 'I am reading'). The satire is twofold: it mocks the speaker's simplistic understanding of terrifying geopolitical events ('China behaving like that') while simultaneously celebrating the speaker's warm, unfiltered hospitality. It is a loving critique of a society caught between ancient wisdom and a desperate desire for modern post-colonial relevancy.";

  // 2. STILL I RISE
  const p2 = unitWorks.find(w => w.slug === 'still-i-rise');
  p2.difficultWords = [
    { word: "Trod", definition: "Crush or flatten something with one's feet.", connotation: "Carries a violent, oppressive undertone.", example: "They trod over the fallen leaves." },
    { word: "Haughtiness", definition: "The appearance or quality of being arrogantly superior.", connotation: "Here, used ironically by the oppressor to describe her unyielding self-confidence.", example: "Her haughtiness offended the critics." },
    { word: "Beset", definition: "Troubled or threatened persistently.", connotation: "A feeling of being surrounded by depression or anxiety.", example: "He was beset by self-doubt." },
    { word: "Sassiness", definition: "Lively, bold, and full of spirit; cheeky.", connotation: "A celebratory term for unapologetic, charismatic defiance often associated with Black culture.", example: "Her sassiness made her the center of attention in every room." },
    { word: "Welling", definition: "To rise to the surface and spill or be about to spill.", connotation: "Evokes the image of an unstoppable, natural emotional or physical force.", example: "Tears were welling in her eyes." }
  ];
  p2.faqs = [
    { question: "Who is the speaker addressing as 'You'?", answer: "'You' represents the historical oppressors, racists, and anyone broadly who attempts to drag down and belittle the speaker or Black women in general." },
    { question: "What is the significance of the natural imagery (suns, moons, tides)?", answer: "Angelou compares her inevitable rise against systemic oppression to undeniable forces of nature (the sun rising, the tides turning), implying that surviving and thriving is an unchangeable law of the universe." },
    { question: "How does the poet treat wealth in this poem?", answer: "She metaphorically claims immense wealth (oil wells, gold mines, diamonds). This isn't literal monetary wealth, but a supreme, untouchable self-worth and spiritual richness that her oppressors cannot strip from her." },
    { question: "What is the pacing effect of repeating 'I rise' at the end?", answer: "The repeated incantation of 'I rise' acts like a rhythmic drumbeat, increasing the physical tempo and emotional intensity of the poem until it culminates in a soaring conclusion." }
  ];
  p2.quiz = [
    { question: "Which natural element does Maya Angelou NOT compare her rising to?", options: ["Dust", "Air", "Tides", "Fire"], correctAnswer: "Fire", explanation: "She compares her rise to dust, air, and tides, but never fire." },
    { question: "What physical location does the poem say the speaker is 'leaving behind'?", options: ["The ocean", "Nights of terror and fear", "The cotton fields", "The mountains"], correctAnswer: "Nights of terror and fear", explanation: "She explicitly writes: 'Leaving behind nights of terror and fear / I rise'." },
    { question: "What type of imagery is 'I'm a black ocean, leaping and wide'?", options: ["Simile", "Metaphor", "Personification", "Hyperbole"], correctAnswer: "Metaphor", explanation: "It is a direct metaphor, equating herself completely to the vast, untamable force of the ocean without using 'like' or 'as'." },
    { question: "Angelou writes she dances like she has diamonds where?", options: ["In her hair", "At the meeting of her thighs", "In her shoes", "On her fingers"], correctAnswer: "At the meeting of her thighs", explanation: "She proudly celebrates her sexuality and womanhood, declaring she dances wildly as if she has 'diamonds at the meeting of my thighs'." }
  ];

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined Poem 1 and Poem 2 instructions.");
} catch (e) {
  console.error("Refinement failed: ", e);
}
