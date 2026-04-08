const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  const unit1Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit I: Poetry');
  const unitWorks = currentData.courses[courseIndex].categories[unit1Index].works;

  // 3. THE FLOWER
  const p3 = unitWorks.find(w => w.slug === 'the-flower');
  p3.difficultWords = [
    { word: "Bower", definition: "A pleasant shady place under trees or climbing plants in a garden.", connotation: "Nostalgic, peaceful nature language typical of romantic or Victorian eras.", example: "She rested under the rose bower." },
    { word: "Fable", definition: "A short story, typically with animals or natural elements, conveying a moral.", connotation: "Indicates that the poem is highly allegorical.", example: "Aesop's fables remain popular today." },
    { word: "Muttering", definition: "Saying something in a low or barely audible voice, typically in dissatisfaction.", connotation: "A secret, cowardly form of complaint rather than direct confrontation.", example: "He walked away muttering curses." },
    { word: "Sow'd", definition: "Planted (seed) by scattering it on or in the earth.", connotation: "An archaic spelling of 'sowed', highlighting the timeless agricultural metaphor.", example: "The farmer sow'd the seeds in the spring." },
    { word: "Discontent", definition: "Lack of contentment; dissatisfaction with one's circumstances.", connotation: "A lingering, pervasive unhappiness.", example: "There was widespread discontent among the workers." }
  ];
  p3.faqs = [
    { question: "What does the flower symbolize?", answer: "The flower represents an original piece of art, a new poetic style, or a groundbreaking societal idea. The 'seed' is the raw creative inspiration needed to produce it." },
    { question: "Why do the people initially call the flower a 'weed' at the beginning?", answer: "Because original ideas often threaten the status quo. People rarely recognize true genius immediately and often mistake unconventional beauty as an ugly aberration (a weed) simply because it defies expectations." },
    { question: "Why do the people call it a weed again at the very end of the poem?", answer: "Once the 'thieves' stole the seeds and mass-produced the flower everywhere, it lost its rarity. Human nature often dictates that when a masterpiece becomes overly common or plagiarized, society gets utterly bored with it and dismissively labels it a 'weed' once more." },
    { question: "What does the line 'He that runs may read' mean?", answer: "It is an idiom meaning the moral of the fable is so glaringly obvious that even someone sprinting past it at full speed could clearly understand the message." }
  ];
  p3.quiz = [
    { question: "When the flower first sprouted, what did the people call it?", options: ["A miracle", "A blossom", "A weed", "A tree"], correctAnswer: "A weed", explanation: "The poem states: 'Up there came a flower, / The people said, a weed.'" },
    { question: "What did the flower eventually wear when it grew tall?", options: ["A crown of light", "A blanket of snow", "A coat of thorns", "A shadow of doubt"], correctAnswer: "A crown of light", explanation: "Tennyson writes: 'Then it grew so tall / It wore a crown of light'." },
    { question: "Who stole the seeds by night?", options: ["The government", "Birds and animals", "Thieves from o'er the wall", "The poet himself"], correctAnswer: "Thieves from o'er the wall", explanation: "The thieves represent plagiarists and imitators who steal originally brilliant ideas to capitalize on them." },
    { question: "What is the core theme of 'The Flower'?", options: ["Gardening techniques", "Originality vs. Mass production (Plagiarism)", "The beauty of nature", "The passage of time"], correctAnswer: "Originality vs. Mass production (Plagiarism)", explanation: "The entire poem is a grand allegory about how society rejects original creators, eventually steals their genius to turn a profit, and then incorrectly blames the creator once the market is oversaturated." }
  ];
  p3.contentAnalysis.criticalAnalysis = "Tennyson brilliantly critiques the fickleness of public consumption and the aggressive nature of literary critics. He exposes a cruel paradox faced by pioneers: society will persecute you for being original, then society will steal your original idea and commodify it, and finally, society will hate you for being 'common' once your idea is mass-reproduced. The allegory remains startlingly relevant in the era of internet trends and viral content.";

  // 4. ON KILLING A TREE
  const p4 = unitWorks.find(w => w.slug === 'on-killing-a-tree');
  p4.difficultWords = [
    { word: "Leprous", definition: "Covered with scales or appearing diseased; relating to leprosy.", connotation: "Here, it gives the tree bark an ancient, textured, and slightly grotesque appearance.", example: "The tree's leprous hide concealed its vibrant life within." },
    { word: "Boughs", definition: "A main branch of a tree.", connotation: "Implies thick, sturdy strength.", example: "The heavy snow broke the apple tree's boughs." },
    { word: "Anchoring", definition: "Securing firmly in position.", connotation: "Describes the roots acting as a stabilizing, profound foundation.", example: "The deep roots were anchoring the tree during the hurricane." },
    { word: "Withering", definition: "To become dry and shriveled.", connotation: "A slow, agonizing death of organic matter.", example: "The heat resulted in the withering of all the crops." },
    { word: "Scorching", definition: "Burning the surface of something with intense heat.", connotation: "A deliberate, violent thermal attack.", example: "The scorching summer sun baked the earth." }
  ];
  p4.faqs = [
    { question: "Why does the poet describe the bark as 'leprous'?", answer: "The rough, discolored, uneven surface of the tree bark physically resembles the skin disease leprosy. By utilizing a disease metaphor, Patel subtly personifies the tree, forcing the reader to view chopping the tree down as an act against an aging living organ." },
    { question: "Why won't a 'simple jab of the knife' kill the tree?", answer: "Because the tree has spent decades slowly consuming the earth, absorbing sunlight, and building immense internal resilience. A physical surface wound ('simple jab') will simply heal over time." },
    { question: "What does the 'root' represent in the poem?", answer: "The root physically represents the tree's life source, but metaphorically, it represents the deep cultural, traditional, or fundamental anchors of any living entity that must be completely eradicated if an oppressor truly wants to destroy it." },
    { question: "Why is the poem written in a procedural, clinical tone?", answer: "Patel writes exactly like a doctor giving instructions on an autopsy or a surgical extraction. This clinical detachment creates brilliant irony; it forces the brutal violence of deforestation to sound terrifyingly casual and premeditated." }
  ];
  p4.quiz = [
    { question: "According to the poet, what part of the tree holds its ultimate strength and must be exposed to kill it?", options: ["The boughs", "The roots", "The leaves", "The bark"], correctAnswer: "The roots", explanation: "The poem specifically points out: 'The root is to be pulled out... And the strength of the tree exposed'." },
    { question: "What happens if a tree is 'hacked and chopped' near the ground but the root is left intact?", options: ["It instantly dies", "Curled green twigs will rise and expand again", "The wood rots", "It bleeds to death"], correctAnswer: "Curled green twigs will rise and expand again", explanation: "Nature's resilience is incredible. Patel notes: 'The bleeding bark will heal / And from close to the ground / Will rise curled green twigs'." },
    { question: "Which adjectives does Patel use to describe the actual source (root) once it is pulled out?", options: ["Dry and hard", "White and wet", "Black and crumbling", "Green and leafy"], correctAnswer: "White and wet", explanation: "He describes the exposed root as 'The source, white and wet, / The most sensitive, hidden'." },
    { question: "What environmental and social issue is 'On Killing a Tree' most directly critiquing?", options: ["Overpopulation", "Deforestation and mankind's casual destruction of nature", "Water pollution", "Air purity"], correctAnswer: "Deforestation and mankind's casual destruction of nature", explanation: "The poem's horrifyingly exact instructions on how to definitively execute a tree serves as a biting satire against humanity's ruthless deforestation practices." }
  ];

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined Poem 3 and Poem 4 instructions.");
} catch (e) {
  console.error("Refinement failed: ", e);
}
