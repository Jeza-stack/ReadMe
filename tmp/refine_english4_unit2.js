const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-4');
  if (courseIndex === -1) throw new Error("Could not find english-4");

  const unit2Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit II: One Act Plays');
  if (unit2Index === -1) throw new Error("Could not find Unit II: One Act Plays");

  const unitWorks = currentData.courses[courseIndex].categories[unit2Index].works;

  // 1. ZOO STORY
  const p1 = unitWorks.find(w => w.slug === 'the-zoo-story');
  p1.difficultWords = [
    { word: "Alienation", definition: "The state or experience of being isolated from a group or an activity to which one should belong.", connotation: "A profound, modern psychological isolation despite living in crowded urban spaces.", example: "The play perfectly captures the alienation of city life." },
    { word: "Absurdism", definition: "A philosophy based on the belief that the universe is irrational and meaningless.", connotation: "Often associated with dark, tragicomic literature where communication breaks down completely.", example: "Albee's early works heavily rely on theatrical absurdism." },
    { word: "Complacency", definition: "A feeling of smug or uncritical satisfaction with oneself or one's achievements.", connotation: "A dangerous, willful ignorance of deeper societal or personal rot.", example: "Peter's upper-middle-class complacency is shattered by Jerry." },
    { word: "Impalement", definition: "The act of piercing or being pierced with a sharp instrument.", connotation: "Evokes incredibly brutal, sacrificial violence.", example: "The climax of the story involves a shocking impalement." },
    { word: "Bourgeois", definition: "Of or characteristic of the middle class, typically with reference to its perceived materialistic values or conventional attitudes.", connotation: "Used critically to describe someone who is boring, materialistic, and disconnected from raw reality.", example: "Peter's bourgeois lifestyle prevents him from understanding true despair." }
  ];
  p1.faqs = [
    { question: "What is the primary physical setting of 'The Zoo Story'?", answer: "The entire play takes place on a single park bench in Central Park, New York City on a Sunday afternoon." },
    { question: "What do the two characters, Peter and Jerry, represent?", answer: "Peter represents the affluent, complacent, neatly-ordered bourgeois society. Jerry represents the chaotic, isolated, and socially alienated underclass desperate for human connection." },
    { question: "Why does Jerry tell 'The Story of Jerry and the Dog'?", answer: "The long monologue about attempting to poison his landlady's dog is deeply symbolic. Jerry was trying to establish a connection (even a violent one) with an animal, mirroring his urgent, desperate need to connect with Peter on the bench." },
    { question: "Why does Jerry provoke Peter into killing him?", answer: "Jerry realizes that society is so disconnected that the only way to force Peter out of his complacency and forge a permanent, inescapable human connection is through a shared act of extreme violence." }
  ];
  p1.quiz = [
    { question: "What profession does Peter have in 'The Zoo Story'?", options: ["A publishing executive", "A real estate agent", "A taxi driver", "A zookeeper"], correctAnswer: "A publishing executive", explanation: "Peter is a wealthy, comfortable publishing executive reading quietly on a bench." },
    { question: "Which location does Jerry repeatedly mention that he just walked from?", options: ["The Brooklyn Bridge", "Central Park Zoo", "Times Square", "The Statue of Liberty"], correctAnswer: "Central Park Zoo", explanation: "The play is named after his bizarre insistence: 'I've been to the zoo. I said, I've been to the zoo!'" },
    { question: "Which of the following objects does Jerry throw at Peter's feet to initiate the violent climax?", options: ["A gun", "A book", "A knife", "A leash"], correctAnswer: "A knife", explanation: "Jerry throws a knife at Peter's feet, taunting him to defend his bench." },
    { question: "What theatrical / literary movement is 'The Zoo Story' heavily associated with?", options: ["Romanticism", "Theatre of the Absurd", "Elizabethan Drama", "Neoclassicism"], correctAnswer: "Theatre of the Absurd", explanation: "Albee brought the Theatre of the Absurd (highlighting the breakdown of human communication and isolation) to the American stage." }
  ];
  p1.contentAnalysis.criticalAnalysis = "The Zoo Story is a terrifying masterpiece of Absurdist Theatre. Albee surgically dissects the modern American Dream by trapping two completely opposed socio-economic classes on a single bench. The breakdown of language and the escalation of bizarre hostility serve as a critique against human alienation. The shocking ending insists that in a society stripped of genuine empathy, violence remains the only universal language capable of destroying bourgeois complacency.";

  // 2. THE PROPOSAL
  const p2 = unitWorks.find(w => w.slug === 'the-proposal');
  p2.difficultWords = [
    { word: "Farce", definition: "A comic dramatic work using buffoonery and horseplay and typically including crude characterization and ludicrously improbable situations.", connotation: "Used for high-energy, over-the-top comedy.", example: "The argument over the meadows turned the marriage proposal into a hilarious farce." },
    { word: "Hypochondriac", definition: "A person who is abnormally anxious about their health.", connotation: "Nervous, constantly complaining of imaginary or exaggerated ailments.", example: "Lomov is a severe hypochondriac who claims he is dying during every argument." },
    { word: "Pettiness", definition: "Undue concern with trivial matters.", connotation: "Reflects childish behavior over absolute nonsense.", example: "Their pettiness over the dog's overshot jaw ruined the romantic mood." },
    { word: "Palpitations", definition: "A noticeably rapid, strong, or irregular heartbeat due to agitation, exertion, or illness.", connotation: "A physical manifestation of severe anxiety or panic.", example: "He collapsed onto the sofa, suffering from severe heart palpitations." },
    { word: "Satire", definition: "The use of humor, irony, exaggeration, or ridicule to expose and criticize people's stupidity or vices.", connotation: "A sharp critique disguised as comedy.", example: "Chekhov uses satire to mock the marriage practices of the Russian elite." }
  ];
  p2.faqs = [
    { question: "What is Lomov's actual goal when he arrives at Chubukov's house?", answer: "Lomov arrives wearing formal evening dress to propose marriage to Chubukov's daughter, Natalya." },
    { question: "What is the first trivial thing Lomov and Natalya aggressively argue about?", answer: "They begin screaming at each other over the ownership of a small piece of land called 'Oxen Meadows', completely forgetting about the marriage proposal." },
    { question: "Once the land dispute is temporarily settled, what do they immediately start arguing about next?", answer: "They begin a vicious argument over whose hunting dog is superior: Lomov's dog (Guess) or Natalya's dog (Squeezer)." },
    { question: "What does this play say about marriage in 19th-century Russia?", answer: "Chekhov is satirizing the concept of marriage among the landed gentry. The play suggests these marriages were cold economic alliances entirely driven by property and pride, completely devoid of actual romance or love." }
  ];
  p2.quiz = [
    { question: "What physical ailment does Ivan Lomov constantly complain about during the play?", options: ["A broken leg", "Blindness", "Heart palpitations and nervous twitching", "Deafness"], correctAnswer: "Heart palpitations and nervous twitching", explanation: "Lomov is a severe hypochondriac; whenever he gets upset, he screams about palpitations, twitching eyebrows, and numbness." },
    { question: "What is the name of the disputed land that ruins the romantic proposal?", options: ["Oxen Meadows", "The Birch Woods", "The Cherry Orchard", "The Volga Bend"], correctAnswer: "Oxen Meadows", explanation: "The primary argument starts over ownership of 'Oxen Meadows', which both families claim to have owned for generations." },
    { question: "When Chubukov realizes Lomov is there to propose, how does he initially react?", options: ["He throws him out", "He is overjoyed and kisses him", "He demands a dowry", "He calls the police"], correctAnswer: "He is overjoyed and kisses him", explanation: "Chubukov is thrilled because it means an excellent economic match for his daughter, though this joy quickly devolves into screaming matches." },
    { question: "In the final moment of the play, what are Lomov and Natalya doing as Chubukov calls for champagne?", options: ["Kissing passionately", "Leaving the house", "Continuing to argue about the dogs", "Singing together"], correctAnswer: "Continuing to argue about the dogs", explanation: "Even after the proposal is forced through and champagne is poured, they violently resume arguing over whether Guess is better than Squeezer." }
  ];
  p2.contentAnalysis.criticalAnalysis = "Chekhov's 'The Proposal' is a blistering farce that relentlessly mocks the institution of marriage among the Russian petty-bourgeoisie. By having the characters abandon a monumental life event (a marriage proposal) to scream about useless land and ugly hunting dogs, Chekhov exposes their absolute moral bankruptcy. Love does not exist here—only ego, economics, and pride. It requires expert comedic timing, operating as a rapid-fire physical comedy that thinly veils a sharp sociological critique.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English IV Unit II (One Act Plays).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
