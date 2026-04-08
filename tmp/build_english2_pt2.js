const fs = require('fs');
const english2 = JSON.parse(fs.readFileSync('english2.json', 'utf8'));

// UNIT II: PROSE
const unit2 = {
  name: "Unit II: Prose",
  works: [
    {
      title: "If You Are Wrong Admit It",
      slug: "if-you-are-wrong-admit-it",
      category: "Unit II: Prose",
      author: "Dale Carnegie",
      fullText: "[Excerpt from 'How to Win Friends and Influence People']\n\nIf we know we are going to be rebuked anyhow, isn't it far better to beat the other person to it and do it ourselves? Isn't it much easier to listen to self-criticism than to bear condemnation from alien lips?\n\nSay about yourself all the derogatory things you know the other person is thinking or wants to say or intends to say—and say them before that person has a chance to say them. The chances are a hundred to one that a generous, forgiving attitude will be taken and your mistakes will be minimized.\n\nWhen we are right, let's try to win people gently and tactfully to our way of thinking, and when we are wrong—and that will be surprisingly often, if we are honest with ourselves—let's admit our mistakes quickly and with enthusiasm. Not only will that technique produce astonishing results; but, believe it or not, it is a lot more fun, under the circumstances, than trying to defend oneself.\n\nPlease remember the old proverb: 'By fighting you never get enough, but by yielding you get more than you expected.'",
      difficultWords: [
        { word: "Rebuked", definition: "Express sharp disapproval or criticism of (someone) because of their behavior.", connotation: "A stern, formal scolding.", example: "She was rebuked for being late." },
        { word: "Condemnation", definition: "The expression of very strong disapproval; censure.", connotation: "A heavy, almost final judgment against someone.", example: "There was widespread condemnation of the attack." }
      ],
      authorInfo: {
        biography: "Dale Carnegie (1888–1955) was an American writer, lecturer, and developer of famous courses in self-improvement.",
        historicalContext: "Published in 1936, his book 'How to Win Friends and Influence People' became one of the best-selling books of all time.",
        writingStyle: "Direct, practical, anecdotal, and highly persuasive self-help instructional writing.",
        majorWorks: ["How to Win Friends and Influence People", "How to Stop Worrying and Start Living"],
        influence: "Pioneered the modern self-improvement and corporate soft-skills training industry."
      },
      contentAnalysis: {
        summary: "In this essay/chapter, Carnegie argues that admitting one's mistakes quickly and enthusiastically disarms critics. Instead of defending a wrong position, owning up to it usually results in the other person taking a generous, forgiving stance.",
        themes: ["Humility", "Conflict Resolution", "Psychology of Human Relations"],
        literaryDevices: [
          { device: "Rhetorical Questions", example: "'Isn't it much easier to listen to self-criticism than to bear condemnation from alien lips?' Used to engage the reader's common sense directly." }
        ],
        criticalAnalysis: "Carnegie flips standard human defensiveness on its head. He proves that vulnerability is a powerful tool for de-escalating anger, a principle deeply rooted in modern psychological conflict resolution.",
        relevance: "Highly relevant in modern professional and personal relationships for effective communication."
      },
      faqs: [
        { question: "Why is it better to criticize yourself before someone else does?", answer: "Because it removes the opponent's desire to fight. If you agree with their anger immediately, they are forced to shift from an adversarial stance to a defensive or purely forgiving one out of human nature." }
      ],
      quiz: [
        {
          question: "According to the passage, what happens if you say derogatory things about yourself before the other person can?",
          options: ["They will attack you harder", "They will usually take a forgiving attitude", "They will ignore you", "They will agree and pile on criticism"],
          correctAnswer: "They will usually take a forgiving attitude",
          explanation: "Carnegie argues that 'the chances are a hundred to one that a generous, forgiving attitude will be taken'."
        }
      ]
    },
    {
      title: "Kindly Adjust Please",
      slug: "kindly-adjust-please",
      category: "Unit I: Prose",
      author: "Shashi Tharoor",
      fullText: "[Excerpt from Tharoor's musings on Indian English]\n\n'Kindly adjust'—two simple words that capture the essence of the Indian experience. When someone squeezes into a crowded train compartment where there isn't an inch of space, they don’t say 'make way' or 'excuse me'. They say, 'Kindly adjust.' It is a plea, a demand, and a profound philosophical statement all at once.\n\nIndian English is a living, breathing creature. We have taken the Queen's language, seasoned it with our own spices, and claimed it entirely as our own. We do not 'postpone' meetings; we 'prepone' them. We are not 'visiting' our hometowns; we are going to our 'native place'. And if someone is not present, they are simply 'out of station'.\n\nTo the pedantic British ear, these expressions might sound like atrocious bastardizations of their mother tongue. But language is an evolving tool of communication, not a museum exhibit. 'Kindly adjust' encapsulates our cultural ethos of accommodation, of making do with limited resources, of finding shared space in a terrifyingly overcrowded subcontinent.",
      difficultWords: [
        { word: "Pedantic", definition: "Excessively concerned with minor details or rules.", connotation: "Suggests annoying, rigid strictness over petty grammatical rules.", example: "The professor was so pedantic that he deducted points for a missing comma." },
        { word: "Ethos", definition: "The characteristic spirit of a culture, era, or community as manifested in its beliefs and aspirations.", connotation: "Refers to the deep, defining soul of a people.", example: "A commitment to equality is part of the national ethos." }
      ],
      authorInfo: {
        biography: "Shashi Tharoor (born 1956) is an Indian politician, writer, and former international diplomat known for his immense vocabulary and articulate English.",
        historicalContext: "Writes extensively about post-colonial India, British imperialism, and the unique synthesis of Indian culture.",
        writingStyle: "Witty, eloquent, deeply vocabulary-rich, and satirical.",
        majorWorks: ["The Great Indian Novel", "Inglorious Empire", "An Era of Darkness"],
        influence: "A leading public intellectual who has brought Indian English and colonial history to global conversational forefronts."
      },
      contentAnalysis: {
        summary: "Tharoor humorously explores how Indians have uniquely modified the English language to fit their cultural context. He uses phrases like 'kindly adjust' or 'prepone' not as grammatical errors, but as brilliant cultural adaptations reflecting India's accommodating and chaotic spirit.",
        themes: ["Indian English", "Cultural Assimilation", "Linguistics", "Post-Colonial Identity"],
        literaryDevices: [
          { device: "Irony", example: "He writes in incredibly elevated, perfect standard English to defend and elevate what purists consider 'broken' English." },
          { device: "Anecdote", example: "Uses the crowded train scenario to visually explain a linguistic concept." }
        ],
        criticalAnalysis: "Tharoor argues against linguistic prescriptivism. By defending 'Indianisms,' he asserts that language ownership transferring from the colonizer to the colonized is a beautiful, necessary evolution.",
        relevance: "Validates the regional dialects of English worldwide, reminding students that English is a global, adaptable tool."
      },
      faqs: [
        { question: "What does 'kindly adjust' mean in an Indian context?", answer: "It is a polite but firm request for others to make physical or metaphorical space to accommodate someone, reflecting a survival mechanism in a densely populated country." }
      ],
      quiz: [
        {
          question: "Which of the following is an example of 'Indian English' given by Tharoor?",
          options: ["Postpone", "Schedule", "Prepone", "Delay"],
          correctAnswer: "Prepone",
          explanation: "Tharoor notes that Indians invented the logical opposite of 'postpone' by creating the highly efficient word 'prepone'."
        }
      ]
    },
    {
      title: "The Spoon-fed Age",
      slug: "the-spoon-fed-age",
      category: "Unit II: Prose",
      author: "William Ralph Inge",
      fullText: "[Summary and Excerpt based on W.R. Inge's core philosophy]\n\nAre we living in a spoon-fed age? Modern civilization has done everything to make life easy, but at what cost? We no longer walk; we take the bus. We no longer write; we telephone. We no longer read actively; we listen to the radio or watch pictures that do the imagining for us.\n\nWhen everything is prepared for us, the mind and the body begin to atrophy. The more our machines do for us, the less we are capable of doing for ourselves. We are being spoon-fed by entertainment, by transportation, and by politics. \n\nTrue education is the drawing out of the faculties of the mind, forcing it to wrestle with difficulties. If we accept the pre-packaged thoughts handed to us by mass media, we surrender our individuality. We have exchanged the harsh, vigorous independence of our ancestors for a comfortable, unthinking dependence.",
      difficultWords: [
        { word: "Atrophy", definition: "Gradually decline in effectiveness or vigor due to underuse or neglect.", connotation: "A disturbing physical or mental wasting away.", example: "Without exercise, his muscles began to atrophy." }
      ],
      authorInfo: {
        biography: "William Ralph Inge (1860–1954) was an English author and Anglican priest, serving as Dean of St Paul's Cathedral.",
        historicalContext: "Writing in the early-to-mid 20th century as mass communication (radio, cinema) and mechanized transport began dominating society.",
        writingStyle: "Pessimistic, cautionary, highly intellectual, and philosophical.",
        majorWorks: ["Outspoken Essays", "The Fall of the Idols"],
        influence: "Known as 'The Gloomy Dean' for his pessimistic outlook, he was a major early critic of modern mass-consumerism."
      },
      contentAnalysis: {
        summary: "Inge warns that modern conveniences—from transportation to mass entertainment—are making humanity lazy and dependent. By constantly being 'spoon-fed' easy lives and pre-packaged ideas, humans are losing their intellectual independence and physical vigor.",
        themes: ["Dangers of Technology", "Loss of Individuality", "Intellectual Laziness"],
        literaryDevices: [
          { device: "Metaphor", example: "The 'Spoon-fed' age compares modern adult society to helpless infants being fed baby food without having to chew." }
        ],
        criticalAnalysis: "A remarkably prescient essay that predicted the passive consumption habits that dominate the internet and social media age. Inge's critique questions whether technological progress equals human progress.",
        relevance: "Extremely relevant today when debating the effects of smartphones, AI, and social media on human attention spans and critical thinking."
      },
      faqs: [
        { question: "What does Inge mean by 'spoon-fed'?", answer: "He means that modern society delivers entertainment, news, and physical comfort so easily to people that they no longer have to exert any intellectual or physical effort." }
      ],
      quiz: [
        {
          question: "According to Inge, what happens to the human mind when it is 'spoon-fed'?",
          options: ["It becomes enlightened", "It begins to atrophy", "It becomes more active", "It achieves peace"],
          correctAnswer: "It begins to atrophy",
          explanation: "Inge argues that without struggle or effort, the mind and body begin to atrophy (waste away)."
        }
      ]
    }
  ]
};

english2.categories.push(unit2);
fs.writeFileSync('english2.json', JSON.stringify(english2, null, 2));
console.log('Successfully wrote english2.json for Unit II.');
