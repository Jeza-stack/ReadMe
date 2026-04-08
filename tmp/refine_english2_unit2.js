const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  if (courseIndex === -1) throw new Error("Could not find english-2");

  const unit2Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit II: Prose');
  if (unit2Index === -1) throw new Error("Could not find Unit II: Prose");

  const unitWorks = currentData.courses[courseIndex].categories[unit2Index].works;

  // 1. Dale Carnegie
  const p1 = unitWorks.find(w => w.slug === 'if-you-are-wrong-admit-it');
  p1.difficultWords = [
    { word: "Rebuked", definition: "Express sharp disapproval or criticism of (someone) because of their behavior.", connotation: "A stern, formal scolding or reprimand.", example: "She was rebuked for being late." },
    { word: "Condemnation", definition: "The expression of very strong disapproval; censure.", connotation: "A heavy, almost final judgment against someone.", example: "There was widespread condemnation of the attack." },
    { word: "Tactfully", definition: "With skill and sensitivity in dealing with others or with difficult issues.", connotation: "Implies diplomacy, grace, and an avoidance of causing offense.", example: "She tactfully suggested that he reconsider his plan." },
    { word: "Derogatory", definition: "Showing a critical or disrespectful attitude.", connotation: "Actively insulting or looking down upon someone.", example: "He refused to tolerate derogatory comments." },
    { word: "Yielding", definition: "Giving way under pressure; complying with the requests or demands of others.", connotation: "Here, used positively as a strategic psychological concession.", example: "By yielding early, you paradoxically gain the upper hand." }
  ];
  p1.faqs = [
    { question: "Why does Carnegie suggest criticizing yourself before the other person can?", answer: "Because it removes the opponent's desire to fight. If you agree with their anger immediately, they are forced to shift from an adversarial stance to a defensive or forgiving one due to human psychological nature." },
    { question: "What is the psychological effect of admitting you are wrong 'with enthusiasm'?", answer: "It disarms the critic completely. It takes the wind out of their sails, as the expected resistance or argument is suddenly absent, leaving the critic feeling foolish if they continue to attack." },
    { question: "What is the core proverb shared at the end of the text?", answer: "Carnegie shares the proverb: 'By fighting you never get enough, but by yielding you get more than you expected.'" },
    { question: "How does this advice apply to leadership?", answer: "A leader who admits their faults quickly builds massive trust and credibility. It shows vulnerability and eliminates a toxic culture of defensiveness." }
  ];
  p1.quiz = [
    { question: "According to the passage, what happens if you say derogatory things about yourself before the other person can?", options: ["They will attack you harder", "They will usually take a forgiving attitude", "They will ignore you", "They will agree and pile on criticism"], correctAnswer: "They will usually take a forgiving attitude", explanation: "Carnegie notes that 'the chances are a hundred to one that a generous, forgiving attitude will be taken'." },
    { question: "How does Carnegie describe the experience of admitting a mistake quickly rather than defending oneself?", options: ["It is humiliating", "It is financially rewarding", "It is a lot more fun", "It is a sign of weakness"], correctAnswer: "It is a lot more fun", explanation: "He surprisingly notes: 'believe it or not, it is a lot more fun, under the circumstances, than trying to defend oneself'." },
    { question: "According to the author, what should we do when we are absolutely right?", options: ["Force others to see our brilliance", "Win people gently and tactfully to our way of thinking", "Keep quiet to avoid bragging", "Let the results speak for themselves"], correctAnswer: "Win people gently and tactfully to our way of thinking", explanation: "He states that 'when we are right, let's try to win people gently and tactfully'." },
    { question: "What is the ultimate benefit of 'yielding' according to the passage's concluding proverb?", options: ["You lose the battle but win the war", "You preserve your energy", "You get more than you expected", "You avoid physical confrontation"], correctAnswer: "You get more than you expected", explanation: "The proverb states: 'but by yielding you get more than you expected'." }
  ];
  p1.contentAnalysis.criticalAnalysis = "Dale Carnegie brilliantly reverse-engineers human ego. The essay acts as a manual on how to weaponize humility. By actively encouraging vulnerability, he outlines a tactical approach to defusing hostility. From a literary standpoint, the writing is heavily persuasive, relying on rhetorical questions, direct second-person addresses ('you'), and appeals to common-sense proverbs to validate modern psychological theory. It is a foundational text in self-improvement literature.";

  // 2. Shashi Tharoor
  const p2 = unitWorks.find(w => w.slug === 'kindly-adjust-please');
  p2.difficultWords = [
    { word: "Pedantic", definition: "Excessively concerned with minor details or rules.", connotation: "Suggests annoying, rigid strictness over petty grammatical rules.", example: "The professor was so pedantic that he deducted points for a missing comma." },
    { word: "Ethos", definition: "The characteristic spirit of a culture, era, or community as manifested in its beliefs and aspirations.", connotation: "Refers to the deep, defining soul of a people.", example: "A commitment to equality is part of the national ethos." },
    { word: "Accommodate", definition: "To fit in with the wishes or needs of; to provide with space.", connotation: "Reflects generosity, patience, and spatial compromise.", example: "The train was crowded, but everyone shifted to accommodate the new passengers." },
    { word: "Bastardization", definition: "The changing of something in a way that lowers its quality or value.", connotation: "A highly aggressive linguistic term used by purists to insult evolving dialects.", example: "The critic called the movie a complete bastardization of the original novel." },
    { word: "Prepone", definition: "To bring something forward to an earlier date or time.", connotation: "A brilliant, uniquely Indian linguistic invention operating as the logical opposite of 'postpone'.", example: "The meeting was preponed from Friday to Wednesday." }
  ];
  p2.faqs = [
    { question: "What does 'kindly adjust' mean in an Indian context?", answer: "It is a polite but firm cultural request for others to make physical or metaphorical space to accommodate someone, reflecting a powerful survival mechanism in a densely populated, chaotic country." },
    { question: "Why does Tharoor praise words like 'prepone' or 'out of station'?", answer: "Because they show that Indian English is a living, breathing, adaptive entity. Indians have taken a colonial language and efficiently molded its syntax to serve their specific environmental and cultural needs." },
    { question: "What is the author's argument against British linguistic purists?", answer: "Tharoor argues that language is an evolving tool of communication, not a static museum exhibit. Strict adherence to Queen's English ignores the reality of post-colonial assimilation." },
    { question: "What tone does Tharoor use throughout the essay?", answer: "He uses a witty, highly articulate, yet deeply affectionate tone. He writes in masterfully complex English to celebrate what others might sneeringly call 'broken' English." }
  ];
  p2.quiz = [
    { question: "Which unique Indian English word does Tharoor use as the brilliant opposite of 'postpone'?", options: ["Bring forward", "Pre-schedule", "Prepone", "Advance"], correctAnswer: "Prepone", explanation: "Tharoor champions 'prepone' as a massive Indian linguistic achievement of efficiency." },
    { question: "How does the phrase 'Kindly adjust' usually manifest in the essay's example?", options: ["In a boardroom meeting", "Squeezing into a terribly crowded train compartment", "Asking for a cheaper price at a market", "Tuning a radio"], correctAnswer: "Squeezing into a terribly crowded train compartment", explanation: "He famously uses the imagery of someone jamming themselves into a train where there is not an inch of space left." },
    { question: "To whom does Tharoor suggest these expressions sound like 'atrocious bastardizations'?", options: ["To the pedantic British ear", "To American tourists", "To rural Indians", "To modern teenagers"], correctAnswer: "To the pedantic British ear", explanation: "He explicitly calls out 'the pedantic British ear' as the group that finds these evolutions horrifying." },
    { question: "According to the author, what is language?", options: ["A mathematical formula", "A museum exhibit to be preserved", "An evolving tool of communication", "A symbol of oppression"], correctAnswer: "An evolving tool of communication", explanation: "He writes definitively: 'But language is an evolving tool of communication, not a museum exhibit.'" }
  ];
  p2.contentAnalysis.criticalAnalysis = "Tharoor is a linguistic master who uses the very weapon of standard English to aggressively defend regional dialects. This essay is a brilliant piece of post-colonial literature; it validates 'Indian English' not as an error of translation, but as an act of massive cultural reclamation. He captures the essence of India—an ethos of extreme crowds, chaotic beauty, and eternal compromise ('adjusting'). The prose is satirical, proudly defiant, and incredibly warm.";

  // 3. W.R. Inge
  const p3 = unitWorks.find(w => w.slug === 'the-spoon-fed-age');
  p3.difficultWords = [
    { word: "Atrophy", definition: "Gradually decline in effectiveness or vigor due to underuse or neglect.", connotation: "A disturbing physical or mental wasting away.", example: "Without exercise, his muscles began to atrophy." },
    { word: "Faculties", definition: "Inherent mental or physical powers.", connotation: "The core cognitive machinery of the human mind.", example: "Despite his age, he retained all of his faculties." },
    { word: "Synthesis", definition: "The combination of ideas to form a theory or system.", connotation: "Requires active mental exertion, contrasting with passive consumption.", example: "The essay represents a brilliant synthesis of history and philosophy." },
    { word: "Prescient", definition: "Having or showing knowledge of events before they take place.", connotation: "Visionary or prophetic.", example: "His essay written in the 1930s was incredibly prescient regarding the internet." },
    { word: "Passivity", definition: "Acceptance of what happens, without active response or resistance.", connotation: "A dangerous, lazy surrender of will.", example: "Her passivity in the face of tyranny was terrifying." }
  ];
  p3.faqs = [
    { question: "What does Inge mean by a 'spoon-fed' age?", answer: "He is using the metaphor of a helpless baby. Modern society delivers entertainment, news, and physical comfort so easily to people that they no longer have to exert any muscular or intellectual effort to chew through problems." },
    { question: "How does technology contribute to intellectual decay according to Inge?", answer: "By outsourcing our imagination to movies or the radio (and subsequently the internet), we lose the ability to create our own imagery and think critically, leading to a mass mental atrophy." },
    { question: "What is Inge's definition of 'true education'?", answer: "He believes true education is actively wrestling with difficulties and 'drawing out' the faculties of the mind, rather than passively memorizing pre-packaged thoughts." },
    { question: "What historical exchange does Inge lament?", answer: "He laments the modern exchange of harsh, vigorous, and fierce independence inherited from our ancestors for a state of comfortable, unthinking dependence on machines." }
  ];
  p3.quiz = [
    { question: "According to Inge, what happens to the human mind when it is perpetually 'spoon-fed'?", options: ["It reaches enlightenment", "It achieves total peace", "It begins to atrophy", "It evolves faster"], correctAnswer: "It begins to atrophy", explanation: "He states that when everything is prepared for us, the mind and body begin to atrophy (waste away)." },
    { question: "Which of these is an example Inge uses to describe modern laziness?", options: ["Writing instead of typing", "Taking the bus instead of walking", "Eating raw food instead of cooked food", "Swimming instead of sailing"], correctAnswer: "Taking the bus instead of walking", explanation: "He specifically complains: 'We no longer walk; we take the bus.'" },
    { question: "What happens when people constantly accept 'pre-packaged thoughts' handed to them?", options: ["They surrender their individuality", "They win political debates", "They become highly educated", "They avoid stress"], correctAnswer: "They surrender their individuality", explanation: "Inge warns that blindly consuming mass media forces individuals to 'surrender our individuality'." },
    { question: "What was W.R. Inge's profession, which often influenced his pessimistic tone?", options: ["An aerospace engineer", "Dean of St Paul's Cathedral (an Anglican Priest)", "A professional athlete", "A Wall Street banker"], correctAnswer: "Dean of St Paul's Cathedral (an Anglican Priest)", explanation: "He was a powerful English author and Anglican priest, famously dubbed 'The Gloomy Dean' due to his grim outlook on modern consumption." }
  ];
  p3.contentAnalysis.criticalAnalysis = "Inge's essay is a terrifying piece of prophetic literature. Long before the advent of smartphones and AI algorithms, Inge recognized the catastrophic danger of outsourcing cognitive effort. The 'Spoon-fed' metaphor brilliantly critiques the infantilization of modern adults. His prose forces modern educators to ask whether making learning 'easier' through technology is actually destroying the mental resilience necessary for true human progress.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English II Unit II (Prose).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
