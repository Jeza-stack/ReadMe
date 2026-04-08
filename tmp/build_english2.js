const fs = require('fs');

const english2 = {
  name: "English II",
  slug: "english-2",
  description: "Elementary course covering Indian poetry, global prose, fiction (The Alchemist), language competencies, and contemporary workplace issues.",
  image: "https://placehold.co/600x400.png",
  dataAiHint: "international literature and workplace communication",
  categories: []
};

// UNIT I: POETRY
const unit1 = {
  name: "Unit I: Poetry",
  works: [
    {
      title: "Very Indian Poem in Indian English",
      slug: "very-indian-poem-in-indian-english",
      category: "Unit I: Poetry",
      author: "Nissim Ezekiel",
      fullText: "I am standing for peace and non-violence.\nWhy world is fighting fighting\nWhy all people of world\nAre not following Mahatma Gandhi,\nI am simply not understanding.\nAncient Indian Wisdom is 100% correct.\nI should say even 200% correct.\nBut modern generation is neglecting—\nToo much going for fashion and foreign thing.\n\nOther day I'm reading in newspaper\n(Every day I'm reading Times of India\nTo improve my English language)\nHow one goonda fellow\nThrow stone at Indirabehn.\nMust be student unrest fellow, I am thinking.\nFriends, Romans, countrymen, I am saying (to myself)\nLend me the ears.\nEverything is coming—\nRegeneration, Remuneration, Contraception.\nBe patiently, brothers and sisters.\n\nYou want one glass lassi?\nVery good for digestion.\nWith little salt lovely drink,\nBetter than wine;\nNot that I am ever tasting the wine.\nI'm the total teetotaller, completely total.\nBut I say\nWine is for the drunkards only.\n\nWhat you think of prospects of world peace?\nPakistan behaving like this,\nChina behaving like that,\nIt is making me very sad, I am telling you.\nReally, most harassing me.\nAll men are brothers, no?\nIn India also\nGujaratis, Maharashtrians, Hindiwallahs\nAll brothers—\nThough some are having funny habits.\nStill, you tolerate me,\nI tolerate you,\nOne day, Ram Rajya is surely coming.\n\nYou are going?\nBut you will visit again\nAny time, any day,\nI am not believing in ceremony.\nAlways I am enjoying your company.",
      difficultWords: [
        {
          word: "Teetotaller",
          definition: "A person who never drinks alcohol.",
          connotation: "Suggests strict moral or physical adherence to sobriety.",
          example: "He is a strict teetotaller and only drinks juice at parties."
        },
        {
          word: "Goonda",
          definition: "A hired thug or bully, originating from the Indian subcontinent.",
          connotation: "Carries a derogatory tone for an unruly troublemaker.",
          example: "The shopkeeper was threatened by a local goonda."
        }
      ],
      authorInfo: {
        biography: "Nissim Ezekiel (1924–2004) was a foundational figure in postcolonial Indian English poetry.",
        historicalContext: "Wrote extensively about modernization replacing ancient Indian traditions. His poetry frequently highlighted the idiosyncrasies of 'Indian English.'",
        writingStyle: "Characterized by satire, conversational rhythm, Indian vernacular structures, and irony.",
        majorWorks: ["A Time to Change", "The Exact Name", "Latter-Day Psalms"],
        influence: "Considered the father of modern Indian English poetry, influencing an entire generation of Indo-Anglian writers."
      },
      contentAnalysis: {
        summary: "The poem is a humorous, dramatic monologue by a middle-class Indian man expressing his views on peace, politics, modern generation, and everyday life in a characteristic Babu-English or distinct Indian English dialect. It satirizes the superficial, hypocritical, yet well-meaning attitudes of the typical post-independence Indian citizen.",
        themes: ["Cultural Hypocrisy", "Patriotism", "Indian English (Linguistics)", "Modern vs. Ancient Values"],
        literaryDevices: [
          { device: "Satire", example: "Mocks the speaker's simplistic understanding of complex geopolitical issues 'China behaving like that'." },
          { device: "Dramatic Monologue", example: "The entire poem represents a one-sided conversation with a silent listener ('You want one glass lassi?')." },
          { device: "Colloquialism", example: "Using literal translations of native syntax ('I am simply not understanding', 'goonda fellow')." }
        ],
        criticalAnalysis: "Ezekiel masterfully captures the cadence and linguistic quirks of Indian-English speakers, utilizing present-continuous tense indiscriminately ('I am standing', 'I am reading'). While deeply satirical, it evokes a warm endearment toward the speaker rather than outright malice.",
        relevance: "It highlights how language evolves regionally and demonstrates how postcolonial societies grapple with English usage while maintaining local cultural idiosyncrasies."
      },
      faqs: [
        { question: "Why does the poet use incorrect grammar like 'fighting fighting'?", answer: "Ezekiel deliberately uses ungrammatical, uniquely 'Indian English' phrases such as 'fighting fighting' to authentically replicate how many native Indians converse colloquially, serving as a linguistic satire." },
        { question: "What is the tone of the poem?", answer: "The tone is predominantly humorous, conversational, and subtly ironic." }
      ],
      quiz: [
        {
          question: "Which newspaper does the speaker mention reading every day to improve his English?",
          options: ["The Hindu", "Times of India", "Hindustan Times", "Indian Express"],
          correctAnswer: "Times of India",
          explanation: "The speaker explicitly states: 'Every day I'm reading Times of India / To improve my English language'."
        }
      ]
    },
    {
      title: "Still I Rise",
      slug: "still-i-rise",
      category: "Unit I: Poetry",
      author: "Maya Angelou",
      fullText: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I'll rise.\n\nDoes my sassiness upset you?\nWhy are you beset with gloom?\n'Cause I walk like I've got oil wells\nPumping in my living room.\n\nJust like moons and like suns,\nWith the certainty of tides,\nJust like hopes springing high,\nStill I'll rise.\n\nDid you want to see me broken?\nBowed head and lowered eyes?\nShoulders falling down like teardrops,\nWeakened by my soulful cries?\n\nDoes my haughtiness offend you?\nDon't you take it awful hard\n'Cause I laugh like I've got gold mines\nDiggin' in my own backyard.\n\nYou may shoot me with your words,\nYou may cut me with your eyes,\nYou may kill me with your hatefulness,\nBut still, like air, I'll rise.\n\nDoes my sexiness upset you?\nDoes it come as a surprise\nThat I dance like I've got diamonds\nAt the meeting of my thighs?\n\nOut of the huts of history's shame\nI rise\nUp from a past that's rooted in pain\nI rise\nI'm a black ocean, leaping and wide,\nWelling and swelling I bear in the tide.\n\nLeaving behind nights of terror and fear\nI rise\nInto a daybreak that's wondrously clear\nI rise\nBringing the gifts that my ancestors gave,\nI am the dream and the hope of the slave.\nI rise\nI rise\nI rise.",
      difficultWords: [
        { word: "Trod", definition: "Crush or flatten something with one's feet.", connotation: "Carries a violent, oppressive undertone.", example: "They trod over the fallen leaves." },
        { word: "Haughtiness", definition: "The appearance or quality of being arrogantly superior.", connotation: "Here, used ironically by the oppressor to describe her unyielding self-confidence.", example: "Her haughtiness offended the critics." },
        { word: "Beset", definition: "Troubled or threatened persistently.", connotation: "A feeling of being surrounded by depression or anxiety.", example: "He was beset by self-doubt." }
      ],
      authorInfo: {
        biography: "Maya Angelou (1928–2014) was a prolific American poet, autobiographer, and civil rights activist.",
        historicalContext: "Written during the 1970s, speaking heavily towards the post-civil rights movement era, African American identity, and female empowerment.",
        writingStyle: "Characterized by powerful rhythm, clear imagery, and an unwavering, triumphant voice.",
        majorWorks: ["I Know Why the Caged Bird Sings", "And Still I Rise", "On the Pulse of Morning"],
        influence: "Considered an essential voice for Black feminism and American resilience, her words have become global anthems for overcoming systemic oppression."
      },
      contentAnalysis: {
        summary: "The poem is an empowering anthem of resilience and defiance against racism, sexism, and oppression. The speaker acknowledges historical trauma and ongoing hatred, yet repeatedly declares her unshakeable determination to 'rise' above it all in triumph.",
        themes: ["Resilience and Triumph", "Racial Identity", "Feminism", "Defiance"],
        literaryDevices: [
          { device: "Simile", example: "'Cause I walk like I've got oil wells / Pumping in my living room." },
          { device: "Repetition", example: "The phrase 'I rise' is repeated continuously to physically elevate the tempo and empowerment of the poem." },
          { device: "Metaphor", example: "'I'm a black ocean, leaping and wide' represents the vast, untamable collective strength of her people." }
        ],
        criticalAnalysis: "Angelou contrasts images of heavy, historical oppression ('huts of history's shame', 'past rooted in pain') with bright, rising phenomena (dust, tides, suns, air) to suggest that her upward movement is as inevitable and natural as physics.",
        relevance: "An enduring symbol of empowerment that continues to be universally quoted in times of civil rights advocacy and personal struggle."
      },
      faqs: [
        { question: "Who is the speaker addressing as 'You'?", answer: "'You' represents the historical oppressors, slave-owners, racists, and anyone broadly who attempts to drag down and belittle the speaker or her people." }
      ],
      quiz: [
        {
          question: "Which natural element does Maya Angelou NOT compare her rising to?",
          options: ["Dust", "Air", "Tides", "Fire"],
          correctAnswer: "Fire",
          explanation: "She compares her rise to dust, air, and tides, but never fire."
        }
      ]
    },
    {
      title: "The Flower",
      slug: "the-flower",
      category: "Unit I: Poetry",
      author: "Alfred, Lord Tennyson",
      fullText: "Once in a golden hour\nI cast to earth a seed.\nUp there came a flower,\nThe people said, a weed.\n\nTo and fro they went\nThro' my garden-bower,\nAnd muttering discontent\nCursed me and my flower.\n\nThen it grew so tall\nIt wore a crown of light,\nBut thieves from o'er the wall\nStole the seed by night.\n\nSow'd it far and wide\nBy every town and tower,\nTill all the people cried,\n'Splendid is the flower.'\n\nRead my little fable:\nHe that runs may read.\nMost can raise the flowers now,\nFor all have got the seed.\n\nAnd some are pretty enough,\nAnd some are poor indeed;\nAnd now again the people\nCall it but a weed.",
      difficultWords: [
        { word: "Bower", definition: "A pleasant shady place under trees or climbing plants in a garden.", connotation: "Nostalgic, peaceful nature language typical of romantic or Victorian eras.", example: "She rested under the rose bower." },
        { word: "Fable", definition: "A short story, typically with animals or natural elements, conveying a moral.", connotation: "Indicates that the poem is highly allegorical.", example: "Aesop's fables remain popular today." }
      ],
      authorInfo: {
        biography: "Alfred, Lord Tennyson (1809–1892) was Poet Laureate of Great Britain and Ireland during much of Queen Victoria's reign.",
        historicalContext: "Written in 1864, the poem is often read as a reflection on his own literary career, critics, and the nature of fame in the Victorian literary world.",
        writingStyle: "Highly melodic, deeply contemplative, using simple natural allegories to reflect complex philosophical or personal observations.",
        majorWorks: ["In Memoriam A.H.H.", "The Charge of the Light Brigade", "Ulysses"],
        influence: "Remains one of the most popular British poets, pioneering emotional depth in Victorian poetry."
      },
      contentAnalysis: {
        summary: "The speaker plants a unique seed that sprouts into a flower, which the public initially rejects and labels a 'weed'. Once the flower grows brilliant ('crown of light'), thieves steal the seeds and plant them everywhere until society begins to love it. Once the flower becomes widely common and replicated, however, the public grows bored and demotes it back to the status of a weed.",
        themes: ["Originality vs. Imitation", "Fickleness of Public Opinion", "The Cost of Fame"],
        literaryDevices: [
          { device: "Allegory", example: "The 'flower' represents an original piece of art, poetry, or a new idea, while the 'thieves' represent imitators." },
          { device: "Irony", example: "The public hates the flower when it is original, loves it when it is stolen, and then hates it again because it is common." }
        ],
        criticalAnalysis: "Tennyson critiques how society often persecutes pioneers, only to later commodify their genius. Eventually, mass production or imitation dilutes the beauty of the original creation until it is taken for granted.",
        relevance: "Highly relevant in the internet age regarding memes, trends, or artistic styles that start as niche, become aggressively mainstream, and finally become 'uncool'."
      },
      faqs: [
        { question: "What does the flower symbolize?", answer: "The flower represents the poet's original work, style, or genius. The 'seed' is the template or the creative idea." },
        { question: "Why do the people call it a weed at the end?", answer: "Because the thieves stole the seeds and grew it everywhere. It lost its rarity and uniqueness, so the public grew tired of it." }
      ],
      quiz: [
        {
          question: "When the flower first sprouted, what did the people call it?",
          options: ["A miracle", "A blossom", "A weed", "A tree"],
          correctAnswer: "A weed",
          explanation: "The poem states: 'Up there came a flower, / The people said, a weed.'"
        }
      ]
    },
    {
      title: "On Killing a Tree",
      slug: "on-killing-a-tree",
      category: "Unit I: Poetry",
      author: "Gieve Patel",
      fullText: "It takes much time to kill a tree,\nNot a simple jab of the knife\nWill do it. It has grown\nSlowly consuming the earth,\nRising out of it, feeding\nUpon its crust, absorbing\nYears of sunlight, air, water,\nAnd out of its leprous hide\nSprouting leaves.\n\nSo hack and chop\nBut this alone won't do it.\nNot so much pain will do it.\nThe bleeding bark will heal\nAnd from close to the ground\nWill rise curled green twigs,\nMiniature boughs\nWhich if unchecked will expand again\nTo former size.\n\nNo,\nThe root is to be pulled out—\nOut of the anchoring earth;\nIt is to be roped, tied,\nAnd pulled out—snapped out\nOr pulled out entirely,\nOut from the earth-cave,\nAnd the strength of the tree exposed\nThe source, white and wet,\nThe most sensitive, hidden\nFor years inside the earth.\n\nThen the matter\nOf scorching and choking\nIn sun and air,\nBrowning, hardening,\nTwisting, withering,\nAnd then it is done.",
      difficultWords: [
        { word: "Leprous", definition: "Covered with scales or appearing diseased; relating to leprosy.", connotation: "Here, it gives the tree bark an ancient, textured, and slightly grotesque appearance.", example: "The tree's leprous hide concealed its vibrant life within." },
        { word: "Boughs", definition: "A main branch of a tree.", connotation: "Implies thick, sturdy strength.", example: "The heavy snow broke the apple tree's boughs." }
      ],
      authorInfo: {
        biography: "Gieve Patel (born 1940) is an Indian poet, playwright, painter, and practicing physician.",
        historicalContext: "Writes extensively on human violence, the environment, and the harsh realities of mortality (influenced heavily by his medical background).",
        writingStyle: "Free verse, using clinical, objective, and starkly unsentimental language to describe profound violence or suffering.",
        majorWorks: ["Poems (1966)", "How Do You Withstand, Body (1976)", "Mirrored, Mirroring (1991)"],
        influence: "A quiet, deeply respected voice in the Green movement and Indian post-colonial environmental literature."
      },
      contentAnalysis: {
        summary: "The poem provides a grim, step-by-step instruction manual on how to permanently destroy a tree. It emphasizes that superficial damage ('hacking and chopping') won't work because of the tree's powerful resilience. To kill it, one must uproot it completely and expose its sensitive roots to scorch and wither in the sun.",
        themes: ["Deforestation and Violence", "Resilience of Nature", "Man vs. Environment", "Mortality"],
        literaryDevices: [
          { device: "Imagery", example: "'bleeding bark', 'leprous hide', 'source, white and wet'. Patel uses medical and anatomical imagery to personify the tree." },
          { device: "Irony / Sarcasm", example: "The poem reads like an instructional guide to murder, exposing the grotesque casualness with which mankind destroys nature." },
          { device: "Enjambment", example: "The continuous flowing lines mimic the prolonged, slow, and arduous process of both the tree growing and the effort required to kill it." }
        ],
        criticalAnalysis: "Patel strips away the traditional romanticism associated with nature poetry. By describing the felling of a tree with surgical precision, he forces the reader to confront the act as a brutal, premeditated murder, underscoring nature's immense resilience.",
        relevance: "A harrowing environmentalist poem that remains fiercely relevant in discussions of global deforestation and climate change."
      },
      faqs: [
        { question: "Why does the poet describe the bark as 'leprous'?", answer: "The rough, discolored surface of the tree bark resembles leprosy. Using disease-related imagery personifies the tree as an aging living organ." }
      ],
      quiz: [
        {
          question: "According to the poet, what part of the tree holds its ultimate strength and must be exposed to kill it?",
          options: ["The boughs", "The roots", "The leaves", "The bark"],
          correctAnswer: "The roots",
          explanation: "The poem specifically points out: 'The root is to be pulled out... And the strength of the tree exposed'."
        }
      ]
    }
  ]
};

english2.categories.push(unit1);
fs.writeFileSync('english2.json', JSON.stringify(english2, null, 2));
console.log('Successfully wrote english2.json for Unit I.');
