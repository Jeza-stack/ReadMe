const fs = require('fs');
const english4 = JSON.parse(fs.readFileSync('english4.json', 'utf8'));

// UNIT II: ONE ACT PLAYS
const unit2 = {
  name: "Unit II: One Act Plays",
  works: [
    {
      title: "The Zoo Story",
      slug: "the-zoo-story",
      category: "Unit II: One Act Plays",
      author: "Edward Albee",
      fullText: "[Core Summary and Passages of The Zoo Story]\n\nThe play explores themes of isolation, loneliness, miscommunication as anathematisation, social disparity and dehumanization in a commercial world.\n\nSetting: Central Park, New York City, on a Sunday afternoon.\n\nCharacters:\nPeter: A wealthy, middle-class publishing executive, reading a book on a bench.\nJerry: An isolated, restless, lower-class man who desperately wants to connect with another human being.\n\nJerry approaches Peter and forcefully starts a conversation, declaring, 'I've been to the zoo.' Despite Peter's discomfort, Jerry forces him to listen to his chaotic life story, detailing his horrific living conditions in a rooming house, his abusive landlady, and a disturbing story about how he tried to poison her dog to establish some kind of interaction.\n\nJerry says: 'Sometimes it's necessary to go a long distance out of the way in order to come back a short distance correctly.'\n\nAs the play climaxes, Jerry begins physically pushing Peter off his own bench, mocking his comfortable life. Jerry pulls out a knife and drops it, challenging Peter to a fight. When Peter holds the knife out in self-defense, Jerry willingly impales himself on it. \n\nDying, Jerry thanks Peter for finally interacting with him, wiping Peter's fingerprints off the handle so Peter won't be charged. Jerry's final act achieves the ultimate human connection he craved, albeit fatally.",
      difficultWords: [
        { word: "Anathematisation", definition: "The act of cursing or condemning someone to isolation.", connotation: "A deep, formal ostracization from society.", example: "The anathematisation of the poor was a central theme." },
        { word: "Impale", definition: "Pierce or transfix with a sharp instrument.", connotation: "A violent, deeply physical act of penetration.", example: "He was impaled on the jagged fence." }
      ],
      authorInfo: {
        biography: "Edward Albee (1928–2016) was an American playwright known for works that examine the dark underlying realities of modern life.",
        historicalContext: "Written in 1958, it is a quintessential piece of the 'Theatre of the Absurd' in America.",
        writingStyle: "Absurdist, psychologically aggressive, dialog-heavy, and darkly comedic.",
        majorWorks: ["Who's Afraid of Virginia Woolf?", "The Zoo Story", "A Delicate Balance"],
        influence: "Revolutionized American theater by introducing absurdist European traditions into relatable American settings."
      },
      contentAnalysis: {
        summary: "The Zoo Story is a bleak look at modern alienation. Jerry's desperation to connect with another human—even if it results in violence and death—highlights the invisible barriers of class and protocol that keep people isolated in crowded cities.",
        themes: ["Isolation and Loneliness", "Class Disparity", "The Absurdity of Modern Life"],
        literaryDevices: [
          { device: "Symbolism", example: "The 'bench' symbolizes Peter's comfortable, assigned territory in society, which Jerry invades." },
          { device: "Foreshadowing", example: "Jerry's story about trying to connect with the dog via violence foreshadows his violent connection with Peter." }
        ],
        criticalAnalysis: "Albee critiques the American Dream through Peter, whose complacency is violently disrupted by Jerry. Jerry views negative interaction (fighting) as vastly superior to no interaction (apathy).",
        relevance: "A foundational text in acting classes regarding tension, status, and objective."
      },
      faqs: [
        { question: "Why does Jerry kill himself?", answer: "Jerry orchestrates his own death because the physical and emotional trauma of the moment was the only way he could force Peter (and society) to truly notice and interact with him." }
      ],
      quiz: [
        {
          question: "Where does the entirety of The Zoo Story take place?",
          options: ["In a zoo", "In a publishing office", "On a bench in Central Park", "In Jerry's rooming house"],
          correctAnswer: "On a bench in Central Park",
          explanation: "The play is a one-act scenario occurring entirely on a single park bench in Central Park on a Sunday."
        }
      ]
    },
    {
      title: "The Proposal",
      slug: "the-proposal",
      category: "Unit II: One Act Plays",
      author: "Anton Chekhov",
      fullText: "[Core Summary and Passages of The Proposal]\n\nThe Proposal (also translated as A Marriage Proposal) is a fast-paced, one-act farce.\n\nCharacters:\nStepan Stepanovitch Chubukov: A landowner.\nNatalya Stepanovna: His 25-year-old daughter.\nIvan Vassilevitch Lomov: A suspicious, hypochondriac landowner.\n\nLomov visits his neighbor Chubukov, dressed formally, to ask for Natalya's hand in marriage. Chubukov is thrilled and leaves them alone. Lomov tries to propose, but he is extremely nervous and begins complaining about his palpitations and trembling lips.\n\nTo break the ice, Lomov mentions his property touching theirs, specifically referring to 'my Oxen Meadows'. Natalya immediately interrupts, claiming the Oxen Meadows belong to her family. The romantic proposal instantly devolves into a vicious, screaming argument over a useless piece of land.\n\nChubukov enters, takes his daughter's side, and kicks Lomov out of the house. \n\nAfter Lomov leaves, Chubukov mentions that Lomov came to propose. Natalya becomes hysterical and demands Lomov be brought back. \n\nLomov returns, exhausted and having heart palpitations. Natalya tries to steer the conversation back to romance, but they bring up hunting dogs. They immediately start a second screaming match over whose dog is superior (Guess vs. Squeezer). Lomov faints from exhaustion. Natalya thinks he is dead. When he wakes up, Chubukov shoves them together, tells them to kiss, and immediately yells for Champagne.",
      difficultWords: [
        { word: "Farce", definition: "A comic dramatic work using buffoonery and horseplay and typically including crude characterization and ludicrously improbable situations.", connotation: "Exaggerated, fast-paced physical comedy.", example: "The argument over the dog turned the serious meeting into a farce." },
        { word: "Palpitations", definition: "A noticeably rapid, strong, or irregular heartbeat due to agitation, exertion, or illness.", connotation: "Associated with intense anxiety or hypochondria.", example: "His fear of public speaking gave him severe palpitations." }
      ],
      authorInfo: {
        biography: "Anton Chekhov (1860–1904) was a Russian playwright and short-story writer who is considered to be among the greatest writers of short fiction in history.",
        historicalContext: "Written in 1888-1889, it satirizes the land-owning Russian elite to whom marriage was a business transaction rather than a romantic union.",
        writingStyle: "Satirical, fast-paced, deeply character-driven.",
        majorWorks: ["The Seagull", "Uncle Vanya", "The Cherry Orchard"],
        influence: "A pioneer of early modernism in theater, proving that lack of complex plot can be solved with intense character psychology."
      },
      contentAnalysis: {
        summary: "The play is a hilarious critique of upper-class courtship. It shows how the greed, pride, and pettiness of the landowners constantly override their desire for romance or a successful marital transaction.",
        themes: ["Marriage as a Business", "Pride and Real Estate", "Hypochondria and Hysteria"],
        literaryDevices: [
          { device: "Irony", example: "Lomov comes to declare his eternal love, but spends the entire play viciously insulting the woman he wants to marry." },
          { device: "Farce", example: "The rapid escalation from formal politeness to screaming over trivial things (a meadow, a dog) is classic farcical escalation." }
        ],
        criticalAnalysis: "Chekhov uses Lomov's physical ailments (palpitations, twitching) as physical manifestations of his emotional instability. The ultimate marriage happens not out of love, but out of sheer exhaustion.",
        relevance: "A brilliant study in dialogue pacing and character ego that remains a staple in world theater."
      },
      faqs: [
        { question: "Why do Lomov and Natalya argue the first time?", answer: "They argue over the legal ownership of a largely useless piece of land called the Oxen Meadows." }
      ],
      quiz: [
        {
          question: "What physical problem does Lomov constantly complain about during his proposal?",
          options: ["A broken leg", "Heart palpitations", "Blindness", "Deafness"],
          correctAnswer: "Heart palpitations",
          explanation: "Lomov's extreme hypochondria manifests primarily as heart palpitations and twitching whenever he gets nervous or angry."
        }
      ]
    }
  ]
};

// UNIT III: INTERVIEWS
const unit3 = {
  name: "Unit III: Interviews",
  works: [
    {
      title: "Selected Interviews (Mandela, Sharma, Messi)",
      slug: "selected-interviews",
      category: "Unit III: Interviews",
      author: "Various",
      fullText: "1. Nelson Mandela with Larry King (CNN, May 2000)\nLarry King interviewed Nelson Mandela, focusing on forgiveness and moving forward post-apartheid. \nLarry King: 'Are you bitter? Twenty-seven years!'\nNelson Mandela: 'If I was bitter, Larry, I would still be in prison. When I walked out of the gate, I knew that if I continued to hate them, I was still in prison.'\nConcept: The interview showcases ultimate grace. Mandela refutes hostility with profound moral clarity.\n\n2. Rakesh Sharma with Indira Gandhi (April 1984)\nRakesh Sharma, the first Indian citizen to travel to space, was connected to Prime Minister Indira Gandhi via an audio-visual link while aboard the Soviet T-11.\nIndira Gandhi: 'Upar se Bharat kaisa dikhta hai?' (How does India look from up there?)\nRakesh Sharma: 'Sare Jahan Se Achha.' (Better than the entire world.)\nConcept: A historic broadcast interview highlighting national pride, concise communication under pressure, and iconic cultural rhetoric.\n\n3. Lionel Messi with Sid Lowe (World Soccer Print Interview)\nA rare print interview examining Messi's introverted brilliance.\nSid Lowe asks deeply tactical and personal questions. Unlike broadcast interviews, Print interviews allow for editing, elaboration, and physical description.\nMessi notes: 'I prefer to win titles with the team ahead of individual awards...'\nConcept: Translating physical action into textual insights. Shows how sports journalism constructs narrative from quiet subjects.",
      difficultWords: [],
      authorInfo: { biography: "Various journalistic sources.", historicalContext: "Covers crucial political, historical, and sporting moments of the 20th and 21st centuries.", writingStyle: "Direct address Q&A format.", majorWorks: [], influence: "" },
      contentAnalysis: {
        summary: "This unit focuses on three different mediums of interviewing: global broadcast journalism (Larry King), state-sponsored historic transmission (Sharma), and deep-dive print sports journalism (Sid Lowe).",
        themes: ["Journalistic Formats", "Grace under pressure", "Public persona"],
        literaryDevices: [],
        criticalAnalysis: "Interviews are performative texts. They require understanding the dynamic between the interviewer's objective (to extract a headline) and the interviewee's objective (to manage their narrative).",
        relevance: "Teaches students how to analyze spoken English, handle rapid questions, and understand media framing."
      },
      faqs: [
        { question: "Why is Mandela's quote about prison so famous?", answer: "It perfectly encapsulates his philosophy of reconciliation over revenge; he recognized that psychological freedom was more important than physical freedom." }
      ],
      quiz: [
        {
          question: "When Indira Gandhi asked Rakesh Sharma how India looked from space, how did he reply?",
          options: ["It looks very small", "Sare Jahan Se Achha", "Beautiful and green", "I cannot see it through the clouds"],
          correctAnswer: "Sare Jahan Se Achha",
          explanation: "He used the famous Urdu phrase 'Sare Jahan Se Achha' meaning 'Better than the entire world'."
        }
      ]
    }
  ]
};

english4.categories.push(unit2, unit3);
fs.writeFileSync('english4.json', JSON.stringify(english4, null, 2));
console.log('Successfully wrote english4.json for Unit II and III.');
