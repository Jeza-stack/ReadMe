const fs = require('fs');

try {
  const dataPath = 'src/data/readme-data.json';
  const currentData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const courseIndex = currentData.courses.findIndex(c => c.slug === 'english-4');
  if (courseIndex === -1) throw new Error("Could not find english-4");

  const unit5Index = currentData.courses[courseIndex].categories.findIndex(c => c.name === 'Unit V: English for Workplace');
  if (unit5Index === -1) throw new Error("Could not find Unit V in english-4");

  const unitWorks = currentData.courses[courseIndex].categories[unit5Index].works;

  // 1. Workplace English (CV, Resume, LinkedIn)
  const p1 = unitWorks.find(w => w.slug === 'workplace-english-adv');
  if (!p1) throw new Error("Could not find workplace-english-adv node");

  p1.difficultWords = [
    { word: "Curriculum Vitae (CV)", definition: "A brief account of a person's education, qualifications, and previous experience, typically sent with a job application.", connotation: "A highly academic, extremely comprehensive chronological document that can span several pages.", example: "The professor submitted his 10-page CV outlining every publication." },
    { word: "Resume", definition: "A brief document summarizing a person's education, work experience, and skills.", connotation: "A punchy, heavily tailored, one-to-two page document designed for immediate corporate impact.", example: "She tailored her resume specifically for the marketing role." },
    { word: "Chronological", definition: "Starting with the earliest and following the order in which they occurred.", connotation: "A rigid, expected timeline format in professional documentation.", example: "List your employment history in reverse chronological order." },
    { word: "Authentication", definition: "The process or action of proving or showing something to be true, genuine, or valid.", connotation: "A critical digital survival skill ensuring financial and data security.", example: "Setting up two-factor authentication on the portal is mandatory." },
    { word: "Digital Footprint", definition: "The information about a particular person that exists on the internet as a result of their online activity.", connotation: "A permanent, often inescapable public profile that employers rigorously search.", example: "He aggressively cleaned up his digital footprint before the interview." }
  ];
  p1.faqs = [
    { question: "What is the primary difference between a CV and a Resume?", answer: "A Curriculum Vitae (CV) is static, extremely long, and comprehensive, detailing every academic publication, award, and job ever held. A Resume is dynamic, typically strictly one page, and highly tailored to highlight only the skills relevant to the specific job being applied for." },
    { question: "Why is LinkedIn considered a 'Digital Profile' rather than just a digital resume?", answer: "LinkedIn operates as a living network. While it holds resume data, advanced competency requires utilizing it for active networking, publishing industry thought-leadership, and managing an ongoing public 'brand', distinguishing it from a static PDF." },
    { question: "What is the purpose of a Covering Letter if you already have a Resume?", answer: "The Resume provides the raw data (the 'What' and 'When'). The Covering Letter provides the narrative (the 'Why' and 'How'). It allows you to directly target the hiring manager, explain employment gaps, and weave your data into a compelling argument for why you fit the company culture." },
    { question: "What are the core technical writing skills needed for filling out complex online forms?", answer: "Accuracy, abbreviation mastery, and strict adherence to specific data syntaxes (e.g., DD/MM/YYYY vs. MM/DD/YYYY, recognizing mandatory asterisks, and utilizing proper alphanumeric casing for secure passwords)." }
  ];
  p1.quiz = [
    { question: "If you are applying for a highly academic research position at a university and need to list every paper you have ever published, which document should you use?", options: ["A Cover Letter", "A Resume", "A Curriculum Vitae (CV)", "A LinkedIn Post"], correctAnswer: "A Curriculum Vitae (CV)", explanation: "A CV is the standard academic document designed to be comprehensive and multi-page, holding all publications and deep history." },
    { question: "What is the recommended maximum length for a standard corporate Resume for an entry-level candidate?", options: ["One page", "Three pages", "Five pages", "Ten pages"], correctAnswer: "One page", explanation: "For standard entry to mid-level corporate roles, a punchy, highly tailored one-page resume is widely considered the maximum effective length." },
    { question: "When building a LinkedIn digital profile, what is often considered the most critical visually validating element alongside your experience?", options: ["A list of your hobbies", "A professional, clear headshot photo", "Your political views", "Links to your video games"], correctAnswer: "A professional, clear headshot photo", explanation: "A professional headshot massively increases profile engagement and establishes immediate legitimacy and trust in digital networks." },
    { question: "In modern online manual forms (like banking or reservations), what does a small red asterisk (*) next to a field indicate?", options: ["The field is optional", "The field is mathematically verified", "The field is mandatory and must be filled out", "The field contains an error"], correctAnswer: "The field is mandatory and must be filled out", explanation: "The universally accepted UI syntax for online forms is that a red asterisk signifies a required field." }
  ];
  p1.contentAnalysis.criticalAnalysis = "Unit V of English IV fundamentally shifts from theoretical English into high-stakes 'survival' English for the digital age. Writing an effective Resume or Covering Letter is less about vocabulary and entirely about narrative self-marketing and extreme brevity. Furthermore, teaching students the syntactical nature of digital forms (banking, train reservations, digital footprints) acknowledges that in the 21st century, the inability to navigate a digital interface or curate a secure online profile is functionally equivalent to illiteracy.";

  fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
  console.log("Successfully refined English IV Unit V.");
} catch (e) {
  console.error("Refinement failed: ", e);
}
