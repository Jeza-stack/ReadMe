const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  if (courseIndex === -1) throw new Error("Could not find english-2");

  const unit4Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit IV: Language Competency');
  if (unit4Index === -1) throw new Error("Could not find Unit IV: Language Competency");

  const unitWorks = currentData.courses[courseIndex].categories[unit4Index].works;

  // 1. Language Competency (Grammar & Usage)
  const p1 = unitWorks.find(w => w.slug === 'language-competency');
  p1.difficultWords = [
    { word: "Homophone", definition: "Each of two or more words having the same pronunciation but different meanings, origins, or spelling.", connotation: "A phonetic trap for writers communicating via text.", example: "Understanding the difference between 'their', 'there', and 'they're' is crucial." },
    { word: "Homograph", definition: "Each of two or more words spelled the same but not necessarily pronounced the same and having different meanings and origins.", connotation: "A visual trap that requires surrounding sentence context to decode.", example: "Please record the record." },
    { word: "Portmanteau", definition: "A word blending the sounds and combining the meanings of two others.", connotation: "Reflects the highly efficient, evolving, and modular nature of modern English.", example: "Smog (smoke + fog) is a classic portmanteau." },
    { word: "Syntax", definition: "The arrangement of words and phrases to create well-formed sentences in a language.", connotation: "The architectural invisible framework holding communication together.", example: "His poor syntax made the email impossible to understand." },
    { word: "Agreement", definition: "The correspondence of a verb with its subject in person and number.", connotation: "A rigid rule demonstrating grammatical harmony and precision.", example: "Subject-verb agreement is the foundation of formal writing." }
  ];
  p1.faqs = [
    { question: "What is the primary difference between a homophone and a homograph?", answer: "A homophone sounds exactly the same but is incredibly different in spelling and meaning (like bare vs. bear). A homograph looks exactly the same in spelling, but has a wildly different meaning and sometimes a different pronunciation (like lead (metal) vs. lead (guide))." },
    { question: "Why do Portmanteau words exist?", answer: "Portmanteau words exist because language evolves efficiently to describe new cultural phenomena without requiring entirely new vocabulary. Instead of saying 'a broadcast on an iPod', the culture simply combined them into 'Podcast'." },
    { question: "What is the golden rule of Subject-Verb Agreement?", answer: "The central rule is that a singular subject must take a singular verb (The dog runs), and a plural subject must take a plural verb (The dogs run). Everything else layered between the subject and verb must be ignored by the writer." },
    { question: "Why is the sentence 'One of my friend live in London' completely incorrect?", answer: "The phrase 'One of my...' insists on a plural noun because you must have multiple items to select 'one' from (so 'friends'). However, the actual subject of the sentence is the singular 'One', meaning the verb must be singular ('lives'). Thus: 'One of my friends lives in London.'" }
  ];
  p1.quiz = [
    { question: "Which of the following is a classic example of a Portmanteau?", options: ["Unbelievable", "Brunch", "Therefore", "Prehistoric"], correctAnswer: "Brunch", explanation: "Brunch is a perfect blend of the words 'Breakfast' and 'Lunch'." },
    { question: "Which of the following pairs represent Homophones?", options: ["Read / Read", "Bark / Bark", "There / Their", "Lead / Lead"], correctAnswer: "There / Their", explanation: "They sound completely identical but have vastly different spellings and meanings." },
    { question: "Identify the sentence with CORRECT subject-verb agreement:", options: ["The group of students are waiting outside.", "Neither John nor Mary are here.", "The colors of the rainbow is beautiful.", "One of the students is missing."], correctAnswer: "One of the students is missing.", explanation: "'One' is a singular subject, so 'is' is the correct singular verb, despite the plural noun 'students' appearing right next to it." },
    { question: "Identify the sentence devoid of prepositional errors:", options: ["She is married with a doctor.", "He prefers coffee than tea.", "She is married to a doctor.", "They discussed about the problem."], correctAnswer: "She is married to a doctor.", explanation: "In English, the correct preposition for marriage is 'married to', not 'married with'." }
  ];
  p1.contentAnalysis.criticalAnalysis = "Unlike literary prose, Language Competency demands an entirely different cognitive processing style. It removes the subjectivity of interpretation and replaces it with mathematical rigidity. The mastery of syntax (subject-verb agreement) and lexical nuance (homographs, portmanteaus) does not just correct bad writing—it eliminates ambiguity. In practical workplace scenarios, a misplaced preposition or a shattered verb agreement can completely alter the legal or operational directive of an email communication. Thus, studying structural grammar is studying the architecture of clarity.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English II Unit IV (Language).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
