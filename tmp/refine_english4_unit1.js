const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-4');
  if (courseIndex === -1) throw new Error("Could not find english-4");

  const unit1Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit I: Life Writing');
  if (unit1Index === -1) throw new Error("Could not find Unit I: Life Writing");

  const unitWorks = currentData.courses[courseIndex].categories[unit1Index].works;

  // 1. I AM MALALA
  const p1 = unitWorks.find(w => w.slug === 'i-am-malala');
  p1.difficultWords = [
    { word: "Commiserated", definition: "Express or feel sympathy or pity; sympathize.", connotation: "Carries a tone of shared sadness or mourning, deeply ironic that it's used for a birth.", example: "She went over to commiserate with him on his loss." },
    { word: "Auspicious", definition: "Conducive to success; favorable.", connotation: "A lucky, blessed, or promising sign from nature.", example: "It was not the most auspicious moment to hold an election." },
    { word: "Patriarchal", definition: "Relating to or characteristic of a system of society or government controlled by men.", connotation: "Highly restrictive and culturally oppressive toward women.", example: "She rebelled against the patriarchal traditions of her village." },
    { word: "Defiance", definition: "Open resistance; bold disobedience.", connotation: "Courageous and unbreakable, especially in the face of brutal oppression.", example: "Her refusal to stay silent was an act of absolute defiance." },
    { word: "Activist", definition: "A person who campaigns for some kind of social change.", connotation: "Suggests energetic, dangerous, and highly visible political work.", example: "Her father was an early activist for female education." }
  ];
  p1.faqs = [
    { question: "Why didn't people congratulate her father upon Malala's birth?", answer: "In deeply traditional Pashtun culture at the time, the birth of a female child was viewed as a disappointment and an economic burden, as sons were expected to go out and earn money for the family." },
    { question: "Who was Malalai of Maiwand?", answer: "She is a legendary Afghan folk hero who rallied local fighters against the British troops in 1880, essentially acting as the Afghan equivalent of Joan of Arc." },
    { question: "What is the significance of Ziauddin (the father) celebrating Malala's birth?", answer: "His celebration was a radical departure from cultural norms. By throwing money into her cradle and openly showing pride, he established from day one that he believed her to be equal to any son." },
    { question: "How does the opening of 'I am Malala' set the thematic tone for the entire book?", answer: "By beginning her memoir with the cultural sorrow applied to female birth, Malala immediately hooks the reader into understanding the immense societal friction and systemic misogyny she had to overcome just to exist." }
  ];
  p1.quiz = [
    { question: "Who is Malala named after?", options: ["Her grandmother", "An Afghan heroine who died rallying troops", "A famous Pakistani poet", "A local political leader"], correctAnswer: "An Afghan heroine who died rallying troops", explanation: "Her father named her after Malalai of Maiwand, famous for rallying Afghan troops against the British before being killed." },
    { question: "According to the excerpt, how do people uniquely celebrate the birth of a son in her village?", options: ["By planting a tree", "By firing rifles into the air", "By marching in the streets", "By ringing bells"], correctAnswer: "By firing rifles into the air", explanation: "The text says: 'I was a girl in a land where rifles are fired in celebration of a son'." },
    { question: "What was the occupation of Malala's father, Ziauddin?", options: ["A shepherd", "A soldier", "A teacher and activist", "A doctor"], correctAnswer: "A teacher and activist", explanation: "She notes: 'Yet, my father, Ziauddin Yousafzai, a teacher and an activist, looked at my newborn face...'" },
    { question: "When Malala was born, what astrological/natural event occurred?", options: ["An eclipse", "The last star blinked out at dawn", "A massive thunder storm", "A meteor hit"], correctAnswer: "The last star blinked out at dawn", explanation: "She states: 'I arrived at dawn as the last star blinked out. We Pashtuns see this as an auspicious sign.'" }
  ];
  p1.contentAnalysis.criticalAnalysis = "By juxtaposing the birth of a baby girl—an event treated with mourning—with the namesake of a legendary warrior, Yousafzai masterfully subverts expectations from page one. Her father’s unconditional support serves as the narrative catalyst, challenging deeply entrenched patriarchal structures. The memoir utilizes a sharp, emotionally candid voice, contrasting stark political oppression with intimate, personal family resilience. This 'Life Writing' successfully bridges the gap between individual biography and sociopolitical manifesto.";

  // 2. MY INVENTIONS
  const p2 = unitWorks.find(w => w.slug === 'my-inventions');
  p2.difficultWords = [
    { word: "Introspection", definition: "The examination or observation of one's own mental and emotional processes.", connotation: "Refers to extremely deep, isolating self-analysis.", example: "Quiet introspection can be extremely valuable." },
    { word: "Incessant", definition: "Continuing without pause or interruption (usually regarding something unpleasant).", connotation: "Suggests a relentless, overwhelming continuity that drives a person mad.", example: "The incessant beat of the music kept him awake." },
    { word: "Physiology", definition: "The branch of biology that deals with the normal functions of living organisms and their parts.", connotation: "Suggests a clinical, scientific look at one's own body.", example: "He studied the unique physiology of the ear." },
    { word: "Anguish", definition: "Severe mental or physical pain or suffering.", connotation: "Deep, tortuous internal agony.", example: "The nervous breakdown caused him profound anguish." },
    { word: "Disciplinarian", definition: "A person who believes in or practices firm discipline.", connotation: "Often associated with strict, unyielding parental figures.", example: "His father was a strict disciplinarian." }
  ];
  p2.faqs = [
    { question: "What did Tesla mean when he said 'I was more successful in the former than in the latter' about watches?", answer: "He meant he was very good at dismantling (taking apart) watches, but terrible at re-assembling (putting back together) the watches. This highlights an inquisitive but destructive childhood curiosity." },
    { question: "How did Tesla's father shape his cognitive development?", answer: "His father was a strict disciplinarian who forced Tesla to perform grueling mental exercises daily—such as guessing thoughts, spotting defects in expressions, repeating long sentences, and doing complex mental math—which supercharged his memory and reasoning." },
    { question: "What physical symptoms did Tesla experience during his nervous breakdown?", answer: "He experienced extreme hyperacusis (sensitivity to sound), where he could hear a watch ticking three rooms away, and a fly landing on a table sounded like a dull thud in his ear. His pulse would also race wildly." },
    { question: "Why did Tesla ultimately consider his childhood suffering a 'blessing in disguise'?", answer: "Because the intense, agonizing mental exertion and isolation forced him into deep introspection, inadvertently training his powers of observation and focus to levels that allowed him to visualize complex electrical inventions flawlessly in his mind." }
  ];
  p2.quiz = [
    { question: "How did Tesla describe his father's parenting style regarding his mental development?", options: ["He was totally absent", "He was a strict disciplinarian forcing mental exercises", "He encouraged physical sports instead of academics", "He told Tesla to never overthink"], correctAnswer: "He was a strict disciplinarian forcing mental exercises", explanation: "Tesla explicitly states his father was a strict disciplinarian who forced him to do mental calculations and memory repetition." },
    { question: "During his nervous breakdown, what seemingly small noise sounded like a 'dull thud' in his ear?", options: ["A drop of water", "A ticking watch", "A fly alighting on a table", "A bird chirping"], correctAnswer: "A fly alighting on a table", explanation: "His hyper-sensitivity was so severe that 'A fly alighting on a table in the room would cause a dull thud in my ear'." },
    { question: "Tesla claims his continuous mental exertion allowed him to naturally do what to his associates?", options: ["Read their thoughts", "Cure their illnesses", "Persuade them to give him money", "Hypnotize them"], correctAnswer: "Read their thoughts", explanation: "He states that it 'trained my powers of observation to such a degree that I could often read the thoughts of my associates'." },
    { question: "What genre of literature does this text belong to?", options: ["Science Fiction", "Autobiographical / Life Writing", "Lyric Poetry", "One-Act Play"], correctAnswer: "Autobiographical / Life Writing", explanation: "Because it recounts Tesla's own life written by himself, it firmly belongs to Autobiography or Life Writing." }
  ];
  p2.contentAnalysis.criticalAnalysis = "Tesla's writing presents the quintessential blueprint of the 'tortured genius'. Rather than romanticizing innovation, he approaches his own autobiography with clinical, scientific detachment—treating his own brain and nervous breakdowns as experimental phenomena. The physiological descriptions of his sensory processing disorder (hyperacusis) suggest a profound psychological burden accompanying his intellect. This excerpt is vital to Life Writing because it demonstrates how a creator can observe his own suffering as a necessary dataset for future achievement.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English IV Unit I (Life Writing).");
} catch (e) {
  console.error("Refinement failed: ", e);
}
