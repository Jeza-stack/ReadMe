const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  if (courseIndex === -1) throw new Error("Could not find english-2");

  const unit3Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit III: Fiction');
  if (unit3Index === -1) throw new Error("Could not find Unit III: Fiction");

  const unitWorks = currentData.courses[courseIndex].categories[unit3Index].works;

  // 1. THE ALCHEMIST
  const p1 = unitWorks.find(w => w.slug === 'the-alchemist');
  p1.difficultWords = [
    { word: "Personal Legend", definition: "A term used heavily in the book representing what a person has always wanted to accomplish; their ultimate destiny.", connotation: "A deep spiritual calling or preordained life purpose.", example: "He gave up his comfortable job to pursue his Personal Legend." },
    { word: "Maktub", definition: "Arabic word meaning 'It is written'.", connotation: "Implies that destines and events are already preordained and orchestrated by divine will.", example: "Even when he lost his money, he whispered 'Maktub'." },
    { word: "Omen", definition: "An event highly regarded as a portent of good or evil.", connotation: "A supernatural or mystical sign guiding human choices.", example: "The appearance of the scarab beetle was taken as a powerful omen." },
    { word: "Alchemy", definition: "The medieval forerunner of chemistry, based on the supposed transformation of matter (like lead into gold).", connotation: "Represents ultimate spiritual or intellectual transformation, transcending physical wealth.", example: "The true alchemy was turning his fear into courage." },
    { word: "Elixir", definition: "A magical or medicinal potion, specifically one believed to cure all ills or grant eternal life.", connotation: "A mystical, deeply sought-after panacea.", example: "The ancient texts spoke of an elixir of life hidden in the desert." }
  ];
  p1.faqs = [
    { question: "What is the core philosophical concept introduced by Melchizedek?", answer: "He introduces the concept of the 'Personal Legend' and famously states: 'When you want something, all the universe conspires in helping you to achieve it.'" },
    { question: "Why does Santiago stop to work for a crystal merchant?", answer: "He is robbed of all his money shortly after arriving in Africa. He works for the merchant to earn enough to continue his journey, but during this time he learns the difference between taking a risk for one's dream versus living in safe fear like the merchant." },
    { question: "What is the true secret of alchemy in the context of the novel?", answer: "The true secret is not just mechanically turning lead into gold, but the spiritual elevation of the self. The Alchemist explains that men who sought only physical gold failed because they refused to evolve themselves alongside the metal." },
    { question: "Where is the treasure actually hidden, and what does this signify?", answer: "The physical treasure was buried back in Spain, right under the tree where Santiago started. However, without taking the grueling, life-changing journey to the Egyptian pyramids, he never would have gained the spiritual wisdom (the true treasure) necessary to find the gold." }
  ];
  p1.quiz = [
    { question: "According to the King of Salem, what is the world's greatest lie?", options: ["That gold is the only true wealth", "That fate controls our lives and we lose free will", "That love lasts forever", "That travel is dangerous"], correctAnswer: "That fate controls our lives and we lose free will", explanation: "He states the greatest lie is that at a certain point, we lose control of what's happening to us and our lives become controlled by fate." },
    { question: "What does the Arabic word 'Maktub' mean, as repeated by the crystal merchant?", options: ["It is written", "Gold and silver", "The journey", "To be careful"], correctAnswer: "It is written", explanation: "'Maktub' means 'It is written', implying that God or the universe has already laid out the path to follow." },
    { question: "Where does Santiago eventually find his real physical treasure at the end of the book?", options: ["Under the Egyptian Pyramids", "In an oasis with Fatima", "Under a sycamore tree by a ruined church in Spain", "In the crystal merchant's shop"], correctAnswer: "Under a sycamore tree by a ruined church in Spain", explanation: "At the very end, he realizes the treasure was buried right where he started his journey as a shepherd." },
    { question: "What spiritual concept binds everything—stones, animals, humans, and the wind—together in the novel?", options: ["The Philosopher's Stone", "The Soul of the World", "The Elixir of Life", "The King's Magic"], correctAnswer: "The Soul of the World", explanation: "The 'Soul of the World' is the spiritual force that connects all things, communicating through omens." }
  ];
  p1.contentAnalysis.criticalAnalysis = "The Alchemist operates as a powerful, modern-day fable or parable. Coelho rejects narrative complexity in favor of allegorical simplicity, using Santiago's physical progression across the Sahara as a direct map of his internal, spiritual evolution. The psychological brilliance of the book lies in its treatment of fear: failing to achieve a dream is presented as far less tragic than the decision to never try. It bridges literature, Eastern philosophy, and self-help, maintaining its status as a foundational text for personal actualization.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English II Unit III (Fiction).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
