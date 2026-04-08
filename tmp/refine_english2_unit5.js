const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  if (courseIndex === -1) throw new Error("Could not find english-2");

  const unit5Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit V: English in the Workplace');
  if (unit5Index === -1) throw new Error("Could not find Unit V");

  const unitWorks = currentData.courses[courseIndex].categories[unit5Index].works;

  // 1. Workplace Communication 
  const p1 = unitWorks.find(w => w.slug === 'workplace-communication');
  if (!p1) throw new Error("Could not find Workplace node for english 2");

  p1.difficultWords = [
    { word: "Synthesizing", definition: "Combining a number of things into a coherent whole.", connotation: "A high-level cognitive skill of bringing disparate data points together.", example: "The analyst synthesized the raw data into an actionable report." },
    { word: "Skimming", definition: "Reading or glancing through quickly to note only the important points.", connotation: "A necessary survival skill for high-volume email workflows.", example: "By skimming the executive summary, she understood the project's goal instantly." },
    { word: "Scanning", definition: "Looking quickly but thoroughly over a text in order to locate specific information.", connotation: "Laser-focused extraction of single data points.", example: "He was scanning the spreadsheet specifically for Q4 losses." },
    { word: "Gist", definition: "The substance or essence of a speech or text.", connotation: "The absolute minimum viable information needed to respond.", example: "I didn't read the whole book, but I got the gist of the plot." },
    { word: "Graphic Literacy", definition: "The ability to look at visual data (charts, graphs, diagrams) and extract meaning.", connotation: "A fundamental corporate skill bridging mathematics and English.", example: "Her graphic literacy allowed her to spot the downward sales trend immediately." }
  ];
  p1.faqs = [
    { question: "What is the exact functional difference between Skimming and Scanning?", answer: "Skimming is used to get the general 'gist' or main idea of a large document (e.g., reading the first sentence of every paragraph). Scanning is used when you already know exactly what you are looking for, hunting for a specific keyword or number (e.g., finding a gate number on a flight board)." },
    { question: "Why is note-TAKING considered passive while note-MAKING is active?", answer: "Note-taking is mechanically transcribing exactly what someone is saying, word for word. Note-making requires active listening: the student digests the information and writes down their own synthesized interpretation and structural connections." },
    { question: "How does Graphic Literacy apply to English competency?", answer: "Modern workplace English heavily relies on interpreting data visually. If you cannot look at a Y-axis and an X-axis and subsequently write a localized, accurate sentence summarizing the trend, your English competency is incomplete." },
    { question: "What is the Cornell Method of note-making?", answer: "It is a highly structured system where the page is divided into a narrow left column (for main keywords/cues) and a wide right column (for actual notes), with a summary box at the bottom. It forces active synthesis." }
  ];
  p1.quiz = [
    { question: "If you are looking at a crowded train departure board to find which platform goes to London, which reading technique are you using?", options: ["Skimming", "Scanning", "Synthesizing", "Note-taking"], correctAnswer: "Scanning", explanation: "You are looking for a highly specific, localized piece of information ( London / Platform number ), which is the definition of scanning." },
    { question: "If you rapidly read the title, headings, and concluding paragraph of a 50-page report before a meeting to understand the overall topic, what are you doing?", options: ["Deep Reading", "Scanning", "Skimming", "Editing"], correctAnswer: "Skimming", explanation: "By hitting the major structural markers to get the 'gist' without reading every word, you are skimming." },
    { question: "Which of the following describes 'Note-Making' rather than primitive 'Note-Taking'?", options: ["Typing exactly what the lecturer says word-for-word", "Recording the audio on your phone", "Organizing the core ideas into your own custom flowchart", "Photographing the whiteboard"], correctAnswer: "Organizing the core ideas into your own custom flowchart", explanation: "Note-making is an active process. Drawing a flowchart means you have synthesized the raw audio and converted it into a new structure." },
    { question: "In a standard line graph representing corporate profits over a year, what does the horizontal X-axis typically represent?", options: ["Total Revenue", "Time (Months)", "Employee count", "The company goal"], correctAnswer: "Time (Months)", explanation: "Standard graphic literacy dictates that the independent variable (typically Time) rests on the horizontal X-axis, while the dependent variable (Profits) rests on the Y-axis." }
  ];
  p1.contentAnalysis.criticalAnalysis = "Unit V acts as the bridge between academic theoretical English and hyper-functional corporate English. In academia, reading speed is secondary to deep philosophical comprehension. In the workplace, high-volume reading (skimming) and extremely rapid data extraction (scanning) are prerequisites for survival. By teaching graphic literacy and active note-making, the curriculum successfully detaches English from heavy literature and re-attaches it to utility, efficiency, and real-world economics.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English II Unit V.");
} catch (e) {
  console.error("Refinement failed: ", e);
}
