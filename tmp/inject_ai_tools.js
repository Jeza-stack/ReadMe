const fs = require('fs');
const dataPath = 'src/data/readme-data.json';
const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const course = {
  name: "Latest AI Tools & Apps",
  slug: "ai-tools",
  description: "Discover and master cutting-edge AI applications—from text and image generators to coding copilots and research assistants—transforming every industry as of April 2026.",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  dataAiHint: "artificial intelligence tools and applications",
  categories: [
    {
      name: "Generative AI Platforms",
      works: [
        {
          title: "Text Generation: ChatGPT, Gemini, Claude & DeepSeek",
          slug: "text-generation-platforms",
          category: "Generative AI Platforms",
          author: "Tech Faculty",
          fullText: "TEXT GENERATION AI PLATFORMS — Updated April 2026\n\nThe large language model (LLM) landscape has exploded. Here are the dominant platforms every student and professional must know:\n\n1. ChatGPT (OpenAI) — GPT-4o & o3\nStrengths: Versatile, massive plugin ecosystem, excellent at creative writing, coding, and conversational tasks.\nBest for: General-purpose queries, brainstorming, content drafting.\nLimitations: Can hallucinate facts; requires verification.\n\n2. Google Gemini (formerly Bard) — Gemini 2.5 Pro\nStrengths: Deep integration with Google Workspace (Docs, Sheets, Gmail), real-time web search, multimodal (text + image + video).\nBest for: Research, data analysis, summarization of YouTube videos.\nLimitations: Occasionally verbose; less creative than GPT for fiction.\n\n3. Anthropic Claude — Claude Opus 4\nStrengths: Exceptionally long context window (200K+ tokens), superior at analyzing entire textbooks or legal documents, strongest safety alignment.\nBest for: Academic research, document analysis, nuanced reasoning.\nLimitations: No native web browsing.\n\n4. DeepSeek — DeepSeek-V3\nStrengths: Open-source, extremely cost-effective, competitive coding performance.\nBest for: Developers, cost-conscious teams, API-based integrations.\nLimitations: Smaller ecosystem than commercial competitors.\n\nCOMPARISON MATRIX:\n| Feature       | ChatGPT | Gemini | Claude | DeepSeek |\n|--------------|---------|--------|--------|----------|\n| Web Search   | Yes     | Yes    | No     | No       |\n| Code          | Strong  | Strong | Strong | Strongest|\n| Long Docs    | Good    | Good   | Best   | Good     |\n| Image Gen    | DALL-E  | Imagen | No     | No       |\n| Cost          | Paid    | Free+  | Paid   | Free/Open|",
          difficultWords: [
            { word: "LLM", definition: "Large Language Model — an AI trained on massive text datasets to generate human-like text.", connotation: "The foundational technology behind all modern AI chatbots.", example: "GPT-4o is one of the most powerful LLMs available today." },
            { word: "Hallucination", definition: "When an AI generates confident but factually incorrect information.", connotation: "A critical flaw requiring human fact-checking.", example: "The AI hallucinated a fake citation that did not exist in any journal." },
            { word: "Multimodal", definition: "Capable of processing and generating multiple types of data (text, images, audio, video).", connotation: "The next evolution of AI beyond text-only chatbots.", example: "Gemini's multimodal capabilities allow it to analyze images and videos." },
            { word: "Open-Source", definition: "Software with source code that anyone can inspect, modify, and enhance.", connotation: "Transparent, community-driven, and typically free.", example: "DeepSeek released its model weights as open-source for developers." },
            { word: "Context Window", definition: "The maximum amount of text an AI can process in a single conversation.", connotation: "Determines whether the AI can handle a full book or just a paragraph.", example: "Claude's 200K token context window allows it to analyze entire textbooks." }
          ],
          authorInfo: { biography: "Compiled from official documentation of OpenAI, Google DeepMind, Anthropic, and DeepSeek as of April 2026.", historicalContext: "The LLM revolution began with GPT-3 in 2020 and accelerated exponentially.", writingStyle: "Comparative, technical.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "A comprehensive, up-to-date comparison of the four dominant text-generation AI platforms, analyzing their strengths, limitations, and ideal use cases for students and professionals.", themes: ["AI Literacy", "Tool Selection", "Critical Evaluation of Technology"], literaryDevices: [], criticalAnalysis: "The crucial skill is not simply using AI, but selecting the RIGHT AI for the RIGHT task. Using ChatGPT for long-document analysis is suboptimal when Claude excels at it. Using Claude for real-time web research is impossible when Gemini handles it natively. AI literacy in 2026 means understanding the comparative advantage of each platform.", relevance: "Essential knowledge for every student, researcher, and professional navigating the AI-augmented workplace." },
          faqs: [
            { question: "Which AI is best for analyzing a 100-page PDF?", answer: "Claude (Anthropic) has the largest context window and excels at long-document analysis." },
            { question: "What is an AI 'hallucination'?", answer: "When the AI generates factually incorrect information with high confidence. Always verify critical facts independently." },
            { question: "Is DeepSeek safe to use?", answer: "DeepSeek is open-source, meaning its code is publicly inspectable. However, always evaluate data privacy policies before inputting sensitive information into any AI." },
            { question: "Can Gemini search the internet in real-time?", answer: "Yes. Gemini has native Google Search integration and can provide real-time, cited web results." }
          ],
          quiz: [
            { question: "Which AI platform has the largest context window for analyzing entire textbooks?", options: ["ChatGPT", "Gemini", "Claude", "DeepSeek"], correctAnswer: "Claude", explanation: "Claude's 200K+ token context window is the largest among mainstream commercial LLMs." },
            { question: "What does it mean when an AI 'hallucinates'?", options: ["It generates images", "It creates confident but factually wrong information", "It shuts down unexpectedly", "It translates languages"], correctAnswer: "It creates confident but factually wrong information", explanation: "Hallucination is the term for AI generating plausible-sounding but incorrect facts." },
            { question: "Which platform is open-source and offers free model weights?", options: ["ChatGPT", "Claude", "Gemini", "DeepSeek"], correctAnswer: "DeepSeek", explanation: "DeepSeek publicly releases its model weights for developers to modify and deploy." },
            { question: "Which Google AI product integrates directly with Docs, Sheets, and Gmail?", options: ["ChatGPT", "Gemini", "Claude", "Copilot"], correctAnswer: "Gemini", explanation: "Gemini is deeply integrated across the entire Google Workspace ecosystem." }
          ]
        },
        {
          title: "AI Image & Video Generation: Midjourney, DALL-E, Sora & Flux",
          slug: "ai-image-video-generation",
          category: "Generative AI Platforms",
          author: "Tech Faculty",
          fullText: "AI IMAGE & VIDEO GENERATION — April 2026\n\nVisual AI has transformed creative industries. These tools can generate photorealistic images and cinematic videos from text prompts.\n\n1. Midjourney (v7)\nAccess: Discord-based + web app\nStrengths: Stunning artistic quality, photorealistic rendering, strong style control.\nBest For: Concept art, marketing visuals, editorial illustrations.\nPrompt Tip: Be specific about lighting, camera angle, and artistic style.\n\n2. DALL-E 3 (OpenAI, integrated into ChatGPT)\nAccess: ChatGPT Plus subscription\nStrengths: Excellent text rendering in images, seamless conversational prompting.\nBest For: Diagrams with text, social media graphics, quick visual prototypes.\n\n3. Sora (OpenAI)\nAccess: ChatGPT Pro / API\nStrengths: Generates cinematic-quality video clips (up to 60 seconds) from text prompts.\nBest For: Short films, product demos, educational animations.\nLimitation: Still struggles with complex physics and consistent human hands.\n\n4. Flux (Black Forest Labs)\nAccess: Open-source / API\nStrengths: Extremely fast generation, strong photorealism, excellent for batch processing.\nBest For: E-commerce product shots, rapid prototyping, open-source workflows.\n\nETHICAL CONSIDERATIONS:\n- Always disclose AI-generated content\n- Never use AI to create deepfakes or misleading imagery\n- Respect copyright: AI-generated images may inadvertently replicate copyrighted styles\n- Many academic institutions prohibit AI-generated images in submissions without disclosure",
          difficultWords: [
            { word: "Photorealistic", definition: "Resembling a photograph in detail and accuracy.", connotation: "So lifelike it becomes indistinguishable from a real photograph.", example: "Midjourney v7 produces photorealistic portraits that fool most viewers." },
            { word: "Deepfake", definition: "AI-generated synthetic media where a person's likeness is replaced with someone else's.", connotation: "Extremely dangerous when used for misinformation or fraud.", example: "The deepfake video of the politician went viral before being debunked." },
            { word: "Prompt Engineering", definition: "The skill of crafting precise text instructions to get optimal outputs from AI systems.", connotation: "An emerging professional skill set.", example: "Good prompt engineering dramatically improves the quality of AI-generated images." },
            { word: "Rendering", definition: "The process of generating a photorealistic or stylized image from a model.", connotation: "The computational conversion of abstract instructions into visual output.", example: "The final rendering of the architectural design took 30 seconds with AI." }
          ],
          authorInfo: { biography: "Compiled from Midjourney documentation, OpenAI Sora technical reports, and Black Forest Labs.", historicalContext: "AI image generation became mainstream with DALL-E 2 in 2022.", writingStyle: "Comparative, practical.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "A practical guide to the four leading AI image and video generation platforms, covering their strengths, ideal use cases, and critical ethical considerations.", themes: ["Visual AI Literacy", "Ethical AI Use", "Creative Technology"], literaryDevices: [], criticalAnalysis: "The democratization of visual content creation is both empowering and dangerous. Students must understand that the same tools generating stunning concept art can also manufacture deepfakes. Ethical AI literacy requires teaching responsible disclosure alongside creative technique.", relevance: "Critical for marketing, design, education, and media professionals in 2026." },
          faqs: [
            { question: "Which AI tool is best for generating videos from text?", answer: "Sora by OpenAI can generate cinematic-quality video clips up to 60 seconds from text prompts." },
            { question: "Is it ethical to use AI-generated images in academic submissions?", answer: "Most institutions require explicit disclosure. Always check your university's AI policy before submitting AI-created visuals." },
            { question: "What is prompt engineering?", answer: "The skill of writing precise, detailed instructions so the AI produces the exact result you want. Better prompts = dramatically better outputs." }
          ],
          quiz: [
            { question: "Which AI platform generates cinematic video clips from text descriptions?", options: ["Midjourney", "DALL-E", "Sora", "Flux"], correctAnswer: "Sora", explanation: "Sora by OpenAI is the leading text-to-video generation platform." },
            { question: "What is a 'deepfake'?", options: ["A high-quality photograph", "An AI-generated synthetic video replacing someone's likeness", "A type of social media filter", "A coding framework"], correctAnswer: "An AI-generated synthetic video replacing someone's likeness", explanation: "Deepfakes use AI to convincingly swap faces or voices, posing serious ethical risks." },
            { question: "Which image generation platform is open-source and known for extremely fast batch processing?", options: ["Midjourney", "DALL-E", "Sora", "Flux"], correctAnswer: "Flux", explanation: "Flux by Black Forest Labs is open-source and optimized for rapid batch generation." },
            { question: "Which DALL-E feature makes it superior for diagrams?", options: ["Speed", "Excellent text rendering in images", "Video generation", "Discord integration"], correctAnswer: "Excellent text rendering in images", explanation: "DALL-E 3 uniquely excels at accurately rendering readable text within generated images." }
          ]
        }
      ]
    },
    {
      name: "Productivity & Coding AI",
      works: [
        {
          title: "AI Productivity Suite: Notion AI, Copilot & Perplexity",
          slug: "ai-productivity-suite",
          category: "Productivity & Coding AI",
          author: "Tech Faculty",
          fullText: "AI PRODUCTIVITY TOOLS — April 2026\n\nBeyond chatbots, AI is now embedded directly into the tools professionals use daily.\n\n1. Notion AI\nWhat: AI writing and organization assistant built into the Notion workspace.\nCapabilities: Summarize meeting notes, brainstorm ideas, auto-fill databases, translate content, generate action items from messy notes.\nBest For: Project management, team collaboration, personal knowledge bases.\n\n2. Microsoft Copilot (integrated into Microsoft 365)\nWhat: AI assistant embedded across Word, Excel, PowerPoint, Outlook, and Teams.\nCapabilities: Draft emails in Outlook, generate PowerPoint presentations from Word documents, create complex Excel formulas from natural language, summarize Teams meetings.\nBest For: Corporate professionals, enterprise workflows, Office-heavy environments.\n\n3. GitHub Copilot (for Developers)\nWhat: AI pair-programmer that suggests code in real-time inside VS Code.\nCapabilities: Auto-complete functions, explain legacy code, generate unit tests, translate between programming languages.\nBest For: Software developers, computer science students, DevOps engineers.\n\n4. Perplexity AI\nWhat: An AI-powered research engine that provides cited, sourced answers.\nCapabilities: Real-time web search with inline citations, follow-up questions, academic paper discovery.\nBest For: Research, fact-checking, replacing traditional Google searches for complex queries.\n\n5. Gamma AI\nWhat: AI presentation builder.\nCapabilities: Generates beautiful slide decks from a single text prompt, auto-formats charts and images.\nBest For: Students creating presentations, startup pitch decks, corporate reports.",
          difficultWords: [
            { word: "Copilot", definition: "An AI assistant designed to work alongside humans in existing software tools.", connotation: "Implies a collaborative partnership, not replacement.", example: "GitHub Copilot suggested the entire function based on my comment." },
            { word: "Natural Language Processing", definition: "The AI's ability to understand and generate human language.", connotation: "The bridge between human communication and machine computation.", example: "Excel now uses natural language processing to create formulas from plain English." },
            { word: "Legacy Code", definition: "Old source code that is still in use but may be outdated or poorly documented.", connotation: "Often a nightmare for new developers to understand.", example: "Copilot helped explain the legacy code written 10 years ago." }
          ],
          authorInfo: { biography: "Based on official product documentation from Notion, Microsoft, GitHub, Perplexity, and Gamma.", historicalContext: "Productivity AI integration accelerated from 2023 onwards.", writingStyle: "Practical, tool-comparison format.", majorWorks: [], influence: "" },
          contentAnalysis: { summary: "A curated directory of the most impactful AI productivity tools embedded in daily professional workflows—from note-taking and email drafting to coding and slide creation.", themes: ["Workflow Optimization", "AI Integration", "Professional Productivity"], literaryDevices: [], criticalAnalysis: "The shift from standalone AI chatbots to embedded AI assistants represents the most significant workplace transformation since the spreadsheet. Students who graduate without understanding how Copilot generates Excel formulas or how Perplexity replaces Google for research queries will be at a severe competitive disadvantage.", relevance: "Immediately applicable for every student, professional, and enterprise worker in 2026." },
          faqs: [
            { question: "What makes Perplexity different from ChatGPT?", answer: "Perplexity provides inline citations and sources for every answer, making it superior for research and fact-checking. ChatGPT is better for creative and conversational tasks." },
            { question: "Can GitHub Copilot write entire programs?", answer: "It excels at suggesting functions and auto-completing code, but complex architecture still requires human judgment. Think of it as a highly skilled junior developer on your shoulder." },
            { question: "Is Gamma AI free?", answer: "Gamma offers a free tier with limited credits. Premium plans unlock unlimited presentations and advanced features." }
          ],
          quiz: [
            { question: "Which AI tool is specifically designed to generate PowerPoint presentations from Word documents?", options: ["Notion AI", "Perplexity", "Microsoft Copilot", "Gamma AI"], correctAnswer: "Microsoft Copilot", explanation: "Copilot's deep Microsoft 365 integration allows it to convert Word docs directly into PowerPoint decks." },
            { question: "Which AI platform provides inline citations for every answer, making it ideal for research?", options: ["ChatGPT", "Perplexity", "Notion AI", "GitHub Copilot"], correctAnswer: "Perplexity", explanation: "Perplexity uniquely provides sourced, cited answers with links to original sources." },
            { question: "What type of professional primarily benefits from GitHub Copilot?", options: ["Graphic designers", "Software developers", "Accountants", "Journalists"], correctAnswer: "Software developers", explanation: "GitHub Copilot is an AI pair-programmer designed for coding inside development environments." },
            { question: "Which tool auto-generates beautiful slide decks from a single text prompt?", options: ["Notion AI", "Gamma AI", "Perplexity", "Excel Copilot"], correctAnswer: "Gamma AI", explanation: "Gamma AI specializes in generating fully formatted presentations from text." }
          ]
        }
      ]
    }
  ]
};

const idx = d.courses.findIndex(c => c.slug === 'ai-tools');
if (idx !== -1) { d.courses[idx] = course; } else { d.courses.push(course); }
fs.writeFileSync(dataPath, JSON.stringify(d, null, 2));
console.log("Injected AI Tools & Apps course successfully.");
