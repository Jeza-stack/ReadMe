const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-4');
  if (courseIndex === -1) throw new Error("Could not find english-4");

  const unit4Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit IV: Language Competency');
  if (unit4Index === -1) throw new Error("Could not find Unit IV: Language Competency");

  const unitWorks = currentData.courses[courseIndex].categories[unit4Index].works;

  // 1. Language Competency Advanced 
  const p1 = unitWorks.find(w => w.slug === 'language-competency-adv');
  if (!p1) throw new Error("Could not find Language Competency node for english 4");

  p1.difficultWords = [
    { word: "Refutation", definition: "The action of proving a statement or theory to be wrong or false.", connotation: "A highly aggressive, logic-driven dismantling of an opponent's core argument.", example: "Her rapid refutation of his central thesis won the debate." },
    { word: "Concede", definition: "To admit that something is true or valid after first denying or resisting it.", connotation: "Reflects intellectual maturity and conversational strategy.", example: "I concede that your data is accurate, however, your conclusion is flawed." },
    { word: "Rhetoric", definition: "The art of effective or persuasive speaking or writing.", connotation: "Often associated with political speeches or highly structured arguments.", example: "His powerful rhetoric moved the entire audience." },
    { word: "Rebuttal", definition: "A contradiction; a counterargument offered in response to a claim.", connotation: "A formalized, structured defense mechanism in debating.", example: "The defense attorney presented a fierce rebuttal." },
    { word: "Fallacy", definition: "A mistaken belief, especially one based on unsound argument.", connotation: "A fatal weakness in logic that completely invalidates an opponent's point.", example: "Assuming correlation implies causation is a common logical fallacy." }
  ];
  p1.faqs = [
    { question: "What is the primary difference between Arguing and Debating?", answer: "Arguing is typically driven by raw emotion and a desire to 'win' a personal conflict without rules. Debating is an advanced, highly structured intellectual exercise governed by logic, evidence, and strict rules of engagement, focused on finding objective truth." },
    { question: "Why is 'Concession' considered a powerful debate tool instead of a weakness?", answer: "Conceding a minor, objectively true point demonstrates intellectual honesty and rationality to the audience. It makes your subsequent counter-attacks far more credible because you are not arguing blindly." },
    { question: "What are the core pillars of effectively giving advice?", answer: "Effective advice is non-prescriptive. Instead of saying 'You MUST do this', advanced language competency suggests utilizing hypotheticals ('Have you considered...', 'If I were in that situation, I might...'). This removes defensiveness." },
    { question: "How does the syntax of an Interview differ from a standard Conversation?", answer: "An interview is inherently asymmetrical. One party holds the conversational power (asking questions), forcing the subject into defensive or highly curated explanations. Mastering interviews requires 'bridging'—answering the question briefly, then steering the topic to what you want to talk about." }
  ];
  p1.quiz = [
    { question: "In formal debating, what is the action of proving an opponent's specific point false called?", options: ["A Conclusion", "A Thesis", "A Refutation", "A Concession"], correctAnswer: "A Refutation", explanation: "Refutation is the specific, directed act of proving an opponent's argument entirely false using logic and evidence." },
    { question: "Which phrase is the most highly effective, non-aggressive way to make a suggestion in a workplace?", options: ["You need to fix this.", "Have you perhaps considered approaching it this way?", "Why did you do that?", "Do it differently."], correctAnswer: "Have you perhaps considered approaching it this way?", explanation: "Advanced competency relies on hypotheticals and soft questions to suggest changes without triggering an ego response." },
    { question: "What is a 'Logical Fallacy'?", options: ["A mathematical truth", "A flawless argument", "A structural error in reasoning that invalidates an argument", "A persuasive speech"], correctAnswer: "A structural error in reasoning that invalidates an argument", explanation: "A logical fallacy (like ad-hominem or a strawman argument) represents a fatal breakdown in the actual structural logic of a debate point." },
    { question: "When participating in a video conference interview, which non-verbal communicative marker is absolutely critical?", options: ["Crossing your arms tightly", "Looking directly into the camera lens, not the screen", "Whispering", "Leaning far back in the chair"], correctAnswer: "Looking directly into the camera lens, not the screen", explanation: "Digital interviews require hacking non-verbal communication. Looking into the lens simulates direct eye contact, whereas looking at the screen appears disconnected." }
  ];
  p1.contentAnalysis.criticalAnalysis = "Advanced Language Competency transitions the student from merely communicating to actively persuading. At the C1/C2 CEFR level, English is no longer just vocabulary and grammar; it is a weapon of rhetorical influence. Teaching advanced professionals how to structure rebuttals, execute logical refutations, and navigate the psychological asymmetry of digital interviews prepares them to dominate high-stakes environments, such as corporate boardrooms or international diplomatic relations.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English IV Unit IV (Language Competency).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
