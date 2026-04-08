const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-4');
  if (courseIndex === -1) throw new Error("Could not find english-4");

  const unit3Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit III: Interviews');
  if (unit3Index === -1) throw new Error("Could not find Unit III: Interviews");

  const unitWorks = currentData.courses[courseIndex].categories[unit3Index].works;

  // 1. Nelson Mandela with Larry King
  const p1 = unitWorks.find(w => w.slug === 'nelson-mandela-interview-larry-king');
  p1.difficultWords = [
    { word: "Apartheid", definition: "A policy or system of segregation or discrimination on grounds of race.", connotation: "A horrific, institutionalized system of brutal racial oppression native to South Africa.", example: "He spent 27 years in prison fighting against apartheid." },
    { word: "Reconciliation", definition: "The restoration of friendly relations or the action of making one view or belief compatible with another.", connotation: "Deep, nearly impossible forgiveness required to prevent a nation from collapsing into civil war.", example: "Mandela's primary goal upon release was national reconciliation." },
    { word: "Oppressor", definition: "A person or group that oppresses people.", connotation: "A tyrant who actively strips freedom from others through violence or legislation.", example: "Mandela noted that the oppressor is locked behind the bars of prejudice." },
    { word: "Magnanimity", definition: "The fact or condition of being magnanimous; generosity.", connotation: "A supreme, almost divine level of forgiveness towards one's enemies.", example: "His magnanimity shocked the politicians who imprisoned him." },
    { word: "Resilience", definition: "The capacity to recover quickly from difficulties; toughness.", connotation: "Unbreakable spiritual and physical endurance over decades.", example: "The resilience of the human spirit was evident in his interview." }
  ];
  p1.faqs = [
    { question: "What is the primary conversational tone of the interview?", answer: "Despite King pressing on the horrific trauma of 27 years in prison, Mandela's tone remains remarkably calm, deeply philosophical, and entirely devoid of bitterness." },
    { question: "Why does Mandela say the oppressor also needs to be liberated?", answer: "Mandela argues a profound psychological point: a man who takes away another man's freedom is a prisoner of hatred and prejudice. Therefore, both the oppressed and the oppressor must be fully liberated to achieve true peace." },
    { question: "How does Larry King approach the interview?", answer: "King acts as a blunt, emotional surrogate for the audience. He asks direct, layman questions about anger and revenge, which allows Mandela's transcendent answers to shine even brighter." },
    { question: "What is the sociopolitical purpose of this interview?", answer: "It served to humanize a man who had been a mythic, invisible figure to the West for decades, establishing him immediately as a global icon of peace rather than a radical militant." }
  ];
  p1.quiz = [
    { question: "How many years did Nelson Mandela spend in prison before his release?", options: ["10 years", "15 years", "27 years", "35 years"], correctAnswer: "27 years", explanation: "He famously spent 27 years incarcerated on Robben Island and other prisons." },
    { question: "In the context of the interview, what shocking emotion does Mandela claim he does NOT feel toward his jailers?", options: ["Bitterness and revenge", "Forgiveness", "Pity", "Understanding"], correctAnswer: "Bitterness and revenge", explanation: "He shocked the world by explaining that holding onto bitterness would mean he was still in prison mentally." },
    { question: "According to Mandela's philosophy discussed, who is 'locked behind the bars of prejudice and narrow-mindedness'?", options: ["The oppressed", "The oppressor", "The media", "The politicians"], correctAnswer: "The oppressor", explanation: "He states: 'A man who takes away another man's freedom is a prisoner of hatred, he is locked behind the bars of prejudice and narrow-mindedness.'" },
    { question: "What system of government was Mandela fighting against in South Africa?", options: ["Communism", "Apartheid", "Feudalism", "Monarchy"], correctAnswer: "Apartheid", explanation: "Apartheid was the brutal system of institutionalized racial segregation in South Africa." }
  ];
  p1.contentAnalysis.criticalAnalysis = "This interview is a masterclass in rhetorical restraint and moral elevation. From a linguistic perspective, Mandela weaponizes calmness. While King's questioning is designed to solicit emotional friction and soundbites about past trauma, Mandela continuously redirects the dialogue toward future-oriented 'reconciliation'. His sentence structures are deliberate, slow, and profoundly philosophical. The interview operates as historical literature, demonstrating how spoken-word diplomacy prevented a civil war in South Africa.";

  // 2. Rakesh Sharma with Indira Gandhi
  const p2 = unitWorks.find(w => w.slug === 'rakesh-sharma-indira-gandhi');
  p2.difficultWords = [
    { word: "Cosmonaut", definition: "A Russian astronaut.", connotation: "Reflects the Cold War era Soviet-Indian partnership in space exploration.", example: "Rakesh Sharma traveled to space with Soviet cosmonauts." },
    { word: "Microgravity", definition: "The condition in which people or objects appear to be weightless.", connotation: "A highly technical, terrifying, and fascinating physical environment.", example: "They conducted several experiments in microgravity." },
    { word: "Patriotism", definition: "The quality of being patriotic; devotion to and vigorous support for one's country.", connotation: "Deep, emotional national pride.", example: "His answer about India's beauty struck a chord of massive patriotism." },
    { word: "Telecast", definition: "A television broadcast.", connotation: "Signifies a massive, nation-wide technological event uniting millions of viewers.", example: "The entire country tuned in for the live telecast from space." },
    { word: "Poignant", definition: "Evoking a keen sense of sadness or regret, or deeply moving.", connotation: "An emotionally resonant and beautiful moment.", example: "His poetic description of the Earth was incredibly poignant." }
  ];
  p2.faqs = [
    { question: "What is the historical context of this interview?", answer: "In 1984, Squadron Leader Rakesh Sharma became the first Indian citizen to enter space, aboard the Soviet rocket Soyuz T-11. Prime Minister Indira Gandhi conducted a live television interview with him from mission control." },
    { question: "What famous quote did Rakesh Sharma use when asked how India looked from space?", answer: "He quoted the poet Iqbal, saying 'Sare Jahan Se Achha' (Better than the entire world). It instantly became one of the most famous quotes in modern Indian history." },
    { question: "How does the tone of this interview differ from a standard journalistic interview?", answer: "It is not probing or critical; rather, it is a highly choreographed, emotionally resonant exchange designed to unify the nation and project scientific triumph during the Cold War." },
    { question: "What was the significance of speaking Hindi during a Soviet joint mission?", answer: "Broadcasting patriotic Hindi poetry live from a Soviet space station asserted India's independent cultural identity and technological arrival on the global stage." }
  ];
  p2.quiz = [
    { question: "Who was the Prime Minister of India conducting the interview with Rakesh Sharma?", options: ["Jawaharlal Nehru", "Morarji Desai", "Indira Gandhi", "Rajiv Gandhi"], correctAnswer: "Indira Gandhi", explanation: "Prime Minister Indira Gandhi conducted the historic telecast from Earth." },
    { question: "When asked 'How does India look from space?', what famous Hindi phrase did Sharma use?", options: ["Jai Hind", "Sare Jahan Se Achha", "Vande Mataram", "Mera Bharat Mahan"], correctAnswer: "Sare Jahan Se Achha", explanation: "He famously replied 'Sare Jahan Se Achha' (Better than the entire world)." },
    { question: "Which country partnered with India to send Rakesh Sharma into space?", options: ["United States", "France", "Soviet Union (USSR)", "China"], correctAnswer: "Soviet Union (USSR)", explanation: "He flew aboard the Soviet Soyuz T-11 mission." },
    { question: "What was Rakesh Sharma's primary profession before going to space?", options: ["A civilian scientist", "An Indian Air Force pilot", "An engineer", "A politician"], correctAnswer: "An Indian Air Force pilot", explanation: "He was a highly skilled squadron leader and test pilot in the Indian Air Force." }
  ];
  p2.contentAnalysis.criticalAnalysis = "This interview serves as a magnificent example of 'Statecraft and Theatrics'. The exchange transcends a simple technical check-in; it is a meticulously crafted moment of national myth-making. By seamlessly transitioning from the hyper-technical language of orbital mechanics into the emotional, cultural poetry of 'Sare Jahan Se Achha', Sharma provides a masterclass in public relations and patriotism. It highlights how spoken communication in high-stakes environments can instantaneously unify a billion people.";

  // 3. Lionel Messi with Sid Lowe
  const p3 = unitWorks.find(w => w.slug === 'lionel-messi-sid-lowe');
  p3.difficultWords = [
    { word: "Prodigy", definition: "A person, especially a young one, endowed with exceptional qualities or abilities.", connotation: "Reflects an almost alien, pre-ordained level of genius.", example: "Messi was recognized as a football prodigy by age eight." },
    { word: "Unassuming", definition: "Not pretentious or arrogant; modest.", connotation: "Deeply contrasting against the massive fame and wealth of the subject.", example: "Despite his global fame, he remained quiet and unassuming." },
    { word: "Tactical", definition: "Relating to or constituting actions carefully planned to gain a specific military or sporting end.", connotation: "High-level, chess-like cerebral gameplay.", example: "The interview discussed the tactical evolution of Barcelona under Guardiola." },
    { word: "Intuitive", definition: "Using or based on what one feels to be true even without conscious reasoning; instinctive.", connotation: "A natural brilliance that cannot be taught in a classroom.", example: "His understanding of space on the pitch is completely intuitive." },
    { word: "Crescendo", definition: "A gradual increase in loudness or intensity.", connotation: "A slow build-up leading to an explosive sporting moment.", example: "The crowd's roar reached a crescendo as he touched the ball." }
  ];
  p3.faqs = [
    { question: "Why is Sid Lowe's print interview with Messi considered a masterclass in sports journalism?", answer: "Lowe actively avoids standard, boring sports cliches (e.g., 'We played hard'). Instead, he probes into Messi's tactical understanding, his childhood in Rosario, and the psychological weight of being a global icon." },
    { question: "How does Messi's conversational style contrast with his physical playstyle?", answer: "On the pitch, Messi is explosive, unpredictable, and loud in his movements. During the interview, he is incredibly introverted, soft-spoken, and brief, highlighting a fascinating duality in his personality." },
    { question: "What themes does Lowe extract from Messi regarding teamwork?", answer: "Lowe pulls out the reality that despite Messi's profound individual genius, Messi's core philosophy is rigorously collective. He attributes his success entirely to the spatial architecture and passing rhythm of his Barcelona teammates." },
    { question: "What is the difference between a broadcast interview (Mandela) and a print interview (Lowe/Messi)?", answer: "Broadcast relies heavily on voice tone, body language, and immediate tension. Print interviews like Lowe's allow the journalist to expertly frame the subject using descriptive prose, weaving the dialogue into a broader narrative." }
  ];
  p3.quiz = [
    { question: "Who is the journalist conducting the print interview with Lionel Messi?", options: ["Larry King", "Piers Morgan", "Sid Lowe", "Fabrizio Romano"], correctAnswer: "Sid Lowe", explanation: "Sid Lowe, a highly respected football journalist covering Spanish football, conducted the interview." },
    { question: "How is Messi's personality typically described during press interviews?", options: ["Loud and arrogant", "Quiet, modest, and unassuming", "Angry and defensive", "Highly political"], correctAnswer: "Quiet, modest, and unassuming", explanation: "Despite being arguably the greatest player ever, he is notoriously introverted and unassuming in interviews." },
    { question: "According to the interview context, which team structure does Messi credit heavily for his success?", options: ["The individual drills", "The collective architecture and teammates of Barcelona", "The managers alone", "His diet"], correctAnswer: "The collective architecture and teammates of Barcelona", explanation: "He relentlessly credits his teammates (like Xavi and Iniesta) and the collective passing rhythm of the team." },
    { question: "What makes a print interview differ from a live television interview?", options: ["It is usually shorter", "The journalist can weave descriptive prose and narrative around the quotes", "It must be translated legally", "It does not allow direct quotes"], correctAnswer: "The journalist can weave descriptive prose and narrative around the quotes", explanation: "Print journalism allows the writer to shape a narrative, describe the room, and control the pacing of the conversation." }
  ];
  p3.contentAnalysis.criticalAnalysis = "Sid Lowe’s profile of Lionel Messi operates as top-tier literary sports journalism. The challenge of interviewing Messi is that he is notoriously laconic and introverted. Lowe expertly bridges this gap by framing Messi’s brief, modest quotes within sweeping, almost poetic descriptions of tactical football and the sensory overload of the Camp Nou stadium. The text teaches students how a brilliant interviewer doesn't just record answers, but orchestrates an entire narrative around a quiet subject, synthesizing raw genius into readable prose.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English IV Unit III (Interviews).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
