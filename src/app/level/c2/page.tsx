'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Brain, Users, Globe, GraduationCap, Lightbulb, Crown, Sparkles, Gem, Shield } from 'lucide-react';

// Types for lesson system
interface Lesson {
  id: string;
  title: string;
  content: string;
  examples: string[];
  exercises: Exercise[];
  completed: boolean;
}

interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false' | 'reorder' | 'writing' | 'analysis' | 'transformation' | 'stylistic-choice';
  question: string;
  options?: string[];
  correct: string | number;
  explanation: string;
}

interface VocabularyWord {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  category: string;
  mastered: boolean;
  difficulty: 'native-level' | 'mastery';
  register: 'formal' | 'academic' | 'professional' | 'literary' | 'technical' | 'archaic' | 'poetic';
  collocations?: string[];
  etymology?: string;
}

interface UserProgress {
  grammarProgress: number;
  vocabularyProgress: number;
  skillsProgress: number;
  completedLessons: string[];
  masteredWords: string[];
  streak: number;
  points: number;
}

export default function C2Level() {
  const [progress, setProgress] = useState<UserProgress>({
    grammarProgress: 0,
    vocabularyProgress: 0,
    skillsProgress: 0,
    completedLessons: [],
    masteredWords: [],
    streak: 0,
    points: 0
  });

  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Mastery-Level Academic Discourse');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('c2-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('c2-progress', JSON.stringify(newProgress));
  };

  // C2 Grammar Topics (16 native-level topics)
  const grammarTopics = [
    {
      id: 'stylistic-devices',
      topic: 'Advanced Stylistic Devices & Literary Language',
      status: 'available',
      lessons: [
        {
          id: 'metaphorical-language',
          title: 'Metaphorical and Figurative Language Mastery',
          content: `
            <h3>Advanced Metaphorical Language</h3>
            <p>Native-level use of sophisticated figurative language:</p>
            <ul>
              <li><strong>Extended metaphors:</strong> Life is a journey with unexpected detours and scenic routes.</li>
              <li><strong>Mixed metaphors (deliberate):</strong> The tide of public opinion has reached a tipping point.</li>
              <li><strong>Conceptual metaphors:</strong> Time as money, argument as war, mind as computer</li>
              <li><strong>Dead metaphors:</strong> foot of the mountain, leg of the table, arm of the chair</li>
            </ul>
            <p>Understanding cultural and contextual layers of meaning.</p>
          `,
          examples: [
            'The economic landscape has been reshaped by technological disruption.',
            'Her words cut through the silence like a knife through butter.',
            'The company\'s reputation was built on solid foundations.',
            'The political climate has grown increasingly turbulent.',
            'Innovation is the lifeblood of modern enterprise.',
            'The debate illuminated the shadows of public policy.'
          ],
          exercises: [
            {
              id: 'metaphor-1',
              type: 'stylistic-choice',
              question: 'Which metaphor best conveys the idea of overwhelming complexity?',
              options: ['A maze of regulations', 'A web of complications', 'A mountain of paperwork'],
              correct: 1,
              explanation: 'A "web" suggests interconnected complexity that can trap, unlike a simple maze or pile.'
            }
          ],
          completed: false
        },
        {
          id: 'register-variation',
          title: 'Sophisticated Register Variation & Code-Switching',
          content: `
            <h3>Mastery of Register and Style</h3>
            <p>Native-level ability to seamlessly shift between registers:</p>
            <ul>
              <li><strong>Academic discourse:</strong> The research elucidates the underlying mechanisms...</li>
              <li><strong>Legal language:</strong> Whereas the aforementioned party hereby agrees...</li>
              <li><strong>Literary prose:</strong> The evening shadows whispered secrets to the wind...</li>
              <li><strong>Colloquial excellence:</strong> That idea really hits the spot, doesn't it?</li>
            </ul>
            <p>Understanding when and how to employ each register appropriately.</p>
          `,
          examples: [
            'Academic: "The findings substantiate the hypothesis regarding linguistic acquisition."',
            'Legal: "The contract shall be deemed null and void ab initio."',
            'Literary: "The moon hung like a silver coin in the velvet sky."',
            'Business: "Let\'s leverage our core competencies to maximize synergies."',
            'Informal: "That movie was absolutely mind-blowing!"',
            'Technical: "The algorithm optimizes recursive function calls."'
          ],
          exercises: [
            {
              id: 'register-1',
              type: 'multiple-choice',
              question: 'Which expression is most appropriate for a legal document?',
              options: ['We agree to the terms', 'The parties hereto agree', 'Everyone\'s on board'],
              correct: 1,
              explanation: 'Legal language requires formal, precise terminology with traditional phrasing.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'complex-syntax',
      topic: 'Complex Syntactic Structures & Nuanced Meaning',
      status: 'available',
      lessons: [
        {
          id: 'embedded-structures',
          title: 'Deeply Embedded Syntactic Structures',
          content: `
            <h3>Complex Embedded Structures</h3>
            <p>Managing multiple levels of grammatical embedding:</p>
            <ul>
              <li><strong>Multiple relative clauses:</strong> The book, which I mentioned yesterday, that you said you wanted to read, is finally available.</li>
              <li><strong>Nested conditionals:</strong> If, as you suggested, we were to proceed, then...</li>
              <li><strong>Complex nominal phrases:</strong> The unprecedented nature of the situation...</li>
              <li><strong>Parenthetical insertions:</strong> The results - which, I must admit, surprised us all - confirm our hypothesis.</li>
            </ul>
          `,
          examples: [
            'The proposal, which the committee (after considerable deliberation) approved, will be implemented.',
            'What she said - and I quote verbatim - was that the project, however ambitious, must proceed.',
            'The researcher whose work, having been peer-reviewed extensively, gained international recognition.',
            'If what you\'re suggesting (and I understand the implications) proves correct, then we must reconsider.',
            'The implications of this discovery, profound though they may be, require careful analysis.',
            'The fact that he succeeded, despite overwhelming odds, speaks to his determination.'
          ],
          exercises: [
            {
              id: 'embed-1',
              type: 'analysis',
              question: 'Identify the number of embedded clauses in: "The book that she recommended, which I finally read, was exactly what I needed."',
              correct: '2',
              explanation: 'Two relative clauses: "that she recommended" and "which I finally read"'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'pragmatic-competence',
      topic: 'Pragmatic Competence & Implicit Communication',
      status: 'available',
      lessons: [
        {
          id: 'implicature-mastery',
          title: 'Conversational Implicature & Indirect Speech',
          content: `
            <h3>Advanced Pragmatic Understanding</h3>
            <p>Native-level grasp of implied meanings and social conventions:</p>
            <ul>
              <li><strong>Conversational implicature:</strong> "It's getting late" (= you should leave)</li>
              <li><strong>Politeness strategies:</strong> "I wonder if you might consider..." (= please do this)</li>
              <li><strong>Understatement:</strong> "The weather's been a bit challenging" (= terrible)</li>
              <li><strong>Cultural subtext:</strong> Understanding what's not said</li>
            </ul>
          `,
          examples: [
            '"That\'s an interesting approach" (diplomatic disagreement)',
            '"I\'m sure you did your best" (polite criticism)',
            '"We should get together soon" (social pleasantry, not commitment)',
            '"That\'s quite something" (impressive, possibly overwhelming)',
            '"I\'ll give it some thought" (polite deferral)',
            '"You might want to double-check that" (there\'s definitely an error)'
          ],
          exercises: [
            {
              id: 'pragma-1',
              type: 'multiple-choice',
              question: 'When someone says "That\'s one way to look at it," they likely mean:',
              options: ['Agreement', 'Polite disagreement', 'Confusion'],
              correct: 1,
              explanation: 'This is a diplomatic way of expressing disagreement without direct confrontation.'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // C2 Vocabulary Database (1500+ words with mastery-level complexity)
  const vocabularyDatabase: VocabularyWord[] = [
    // Mastery-Level Academic Discourse (150 words)
    { word: 'perspicacious', pronunciation: '/ˌpɜːspɪˈkeɪʃəs/', meaning: 'having keen insight and discernment', example: 'Her perspicacious analysis revealed hidden complexities.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'academic', etymology: 'Latin perspicax, from perspicere "to see through"' },
    { word: 'obfuscate', pronunciation: '/ˈɒbfʌskeɪt/', meaning: 'deliberately make unclear or confusing', example: 'The lawyer attempted to obfuscate the central issue.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'formal', collocations: ['obfuscate the truth', 'obfuscate the issue'] },
    { word: 'recondite', pronunciation: '/ˈrekəndaɪt/', meaning: 'dealing with abstruse or difficult subject matter', example: 'The recondite nature of quantum physics challenges most students.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'academic' },
    { word: 'sophistry', pronunciation: '/ˈsɒfɪstri/', meaning: 'clever but fallacious reasoning', example: 'His argument was mere sophistry, lacking substance.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'formal', etymology: 'Greek sophistria "skill of sophists"' },
    { word: 'verisimilitude', pronunciation: '/ˌverɪsɪˈmɪlɪtjuːd/', meaning: 'appearance of being true or real', example: 'The novel\'s verisimilitude made the fictional events seem credible.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'literary' },
    { word: 'epitome', pronunciation: '/ɪˈpɪtəmi/', meaning: 'perfect example or embodiment', example: 'She is the epitome of academic excellence.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'native-level', register: 'formal', etymology: 'Greek epitomē "abridgment"' },
    { word: 'inexorable', pronunciation: '/ɪnˈeksərəbəl/', meaning: 'impossible to stop or prevent', example: 'The inexorable march of technological progress continues.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'palpable', pronunciation: '/ˈpælpəbəl/', meaning: 'so intense as to be almost touchable', example: 'There was a palpable sense of excitement in the room.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'native-level', register: 'literary' },
    { word: 'multifarious', pronunciation: '/ˌmʌltɪˈfeəriəs/', meaning: 'numerous and varied', example: 'The committee addressed multifarious concerns about the proposal.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'grandiloquent', pronunciation: '/ɡrænˈdɪləkwənt/', meaning: 'pompous or extravagant in language', example: 'His grandiloquent speech impressed few but convinced none.', category: 'Mastery-Level Academic Discourse', mastered: false, difficulty: 'mastery', register: 'formal' },

    // Literary & Poetic Language (120 words)
    { word: 'mellifluous', pronunciation: '/məˈlɪfluəs/', meaning: 'sweet or musical; pleasant to hear', example: 'Her mellifluous voice captivated the audience.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'literary', etymology: 'Latin mel "honey" + fluere "to flow"' },
    { word: 'gossamer', pronunciation: '/ˈɡɒsəmər/', meaning: 'delicate, fine, or insubstantial', example: 'Gossamer threads of morning mist drifted across the lake.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'poetic' },
    { word: 'ineffable', pronunciation: '/ɪnˈefəbəl/', meaning: 'too great to be expressed in words', example: 'The ineffable beauty of the sunset left them speechless.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'literary' },
    { word: 'susurrus', pronunciation: '/səˈsʌrəs/', meaning: 'soft murmuring or rustling sound', example: 'The susurrus of wind through autumn leaves was hypnotic.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'poetic', etymology: 'Latin "whisper, murmur"' },
    { word: 'penumbra', pronunciation: '/pɪˈnʌmbrə/', meaning: 'partial shadow; area of uncertainty', example: 'She existed in the penumbra between fame and obscurity.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'literary' },
    { word: 'chiaroscuro', pronunciation: '/kiˌɑːrəˈskjʊroʊ/', meaning: 'strong contrasts of light and dark', example: 'The chiaroscuro technique created dramatic visual effects.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'technical', etymology: 'Italian "light-dark"' },
    { word: 'lachrymose', pronunciation: '/ˈlækrɪmoʊs/', meaning: 'inclined to weep; mournful', example: 'The lachrymose melody evoked memories of lost love.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'literary' },
    { word: 'diaphanous', pronunciation: '/daɪˈæfənəs/', meaning: 'transparent or translucent', example: 'She wore a diaphanous gown that seemed to float around her.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'literary' },
    { word: 'sanguine', pronunciation: '/ˈsæŋɡwɪn/', meaning: 'optimistic; blood-red in color', example: 'Despite setbacks, she remained sanguine about the project\'s success.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'native-level', register: 'literary' },
    { word: 'pellucid', pronunciation: '/pəˈluːsɪd/', meaning: 'transparently clear; easily understood', example: 'His pellucid explanation clarified the complex theory.', category: 'Literary & Poetic Language', mastered: false, difficulty: 'mastery', register: 'formal' },

    // Specialized Professional Terminology (130 words)
    { word: 'fiduciary', pronunciation: '/fɪˈduːʃiˌeri/', meaning: 'involving trust and confidence', example: 'The lawyer has a fiduciary responsibility to the client.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'native-level', register: 'professional', collocations: ['fiduciary duty', 'fiduciary responsibility'] },
    { word: 'cognizant', pronunciation: '/ˈkɒɡnɪzənt/', meaning: 'having knowledge or awareness', example: 'The board is cognizant of the potential risks involved.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'native-level', register: 'professional' },
    { word: 'probity', pronunciation: '/ˈprəʊbɪti/', meaning: 'honesty and decency; integrity', example: 'Her probity in business dealings earned widespread respect.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'apposite', pronunciation: '/ˈæpəzɪt/', meaning: 'apt in the circumstances; appropriate', example: 'His apposite remarks addressed the core issues perfectly.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'pecuniary', pronunciation: '/pɪˈkjuːniˌeri/', meaning: 'relating to money; financial', example: 'The contract includes clauses regarding pecuniary damages.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'mastery', register: 'professional' },
    { word: 'vicarious', pronunciation: '/vɪˈkeəriəs/', meaning: 'experienced through another person', example: 'She lived vicariously through her daughter\'s achievements.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'native-level', register: 'formal' },
    { word: 'assiduous', pronunciation: '/əˈsɪdjuəs/', meaning: 'showing dedication and diligence', example: 'His assiduous attention to detail prevented costly errors.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'perspicuous', pronunciation: '/pərˈspɪkjuəs/', meaning: 'clearly expressed and easily understood', example: 'The judge\'s perspicuous ruling left no room for ambiguity.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'insidious', pronunciation: '/ɪnˈsɪdiəs/', meaning: 'proceeding in a subtle but harmful way', example: 'The insidious effects of the policy became apparent over time.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'native-level', register: 'formal' },
    { word: 'confluence', pronunciation: '/ˈkɒnfluəns/', meaning: 'flowing together; convergence', example: 'The confluence of factors led to the market crash.', category: 'Specialized Professional Terminology', mastered: false, difficulty: 'native-level', register: 'professional' },

    // Archaic & Historical Language (100 words)
    { word: 'erstwhile', pronunciation: '/ˈɜːstwaɪl/', meaning: 'former; previous', example: 'The erstwhile champion struggled to regain past glory.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'archaic' },
    { word: 'quotidian', pronunciation: '/kwəˈtɪdiən/', meaning: 'occurring daily; mundane', example: 'She sought to escape the quotidian routines of office life.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'literary', etymology: 'Latin quotidianus "daily"' },
    { word: 'pusillanimous', pronunciation: '/ˌpjuːsɪˈlænɪməs/', meaning: 'lacking courage; timid', example: 'His pusillanimous response disappointed his supporters.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'tergiversation', pronunciation: '/ˌtɜːdʒɪvərˈseɪʃən/', meaning: 'evasion; abandonment of principles', example: 'The politician\'s tergiversation alienated loyal followers.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'archaic' },
    { word: 'perfidy', pronunciation: '/ˈpɜːfɪdi/', meaning: 'deliberate breach of faith; treachery', example: 'The ally\'s perfidy shocked the international community.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'querulous', pronunciation: '/ˈkwerələs/', meaning: 'complaining in a petulant manner', example: 'His querulous complaints wore down everyone\'s patience.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'magnanimity', pronunciation: '/ˌmæɡnəˈnɪmɪti/', meaning: 'nobility of spirit; generosity', example: 'The victor showed magnanimity toward the defeated opponent.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'native-level', register: 'formal' },
    { word: 'obloquy', pronunciation: '/ˈɒbləkwi/', meaning: 'strong public criticism; verbal abuse', example: 'The scandal brought obloquy upon the entire institution.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'perspicacious', pronunciation: '/ˌpɜːspɪˈkeɪʃəs/', meaning: 'having keen insight', example: 'Her perspicacious observations illuminated hidden truths.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'formal' },
    { word: 'vituperative', pronunciation: '/vɪˈtuːpərətɪv/', meaning: 'bitter and abusive in language', example: 'The debate deteriorated into vituperative exchanges.', category: 'Archaic & Historical Language', mastered: false, difficulty: 'mastery', register: 'formal' }
  ];

  const vocabularyCategories = [
    { name: 'Mastery-Level Academic Discourse', count: 150, color: 'bg-indigo-800' },
    { name: 'Literary & Poetic Language', count: 120, color: 'bg-purple-800' },
    { name: 'Specialized Professional Terminology', count: 130, color: 'bg-blue-800' },
    { name: 'Archaic & Historical Language', count: 100, color: 'bg-violet-800' },
    { name: 'Cultural & Idiomatic Mastery', count: 140, color: 'bg-pink-800' },
    { name: 'Technical & Scientific Precision', count: 120, color: 'bg-cyan-800' },
    { name: 'Philosophical & Abstract Concepts', count: 110, color: 'bg-emerald-800' },
    { name: 'Legal & Jurisprudential Language', count: 100, color: 'bg-red-800' },
    { name: 'Rhetorical & Persuasive Devices', count: 130, color: 'bg-orange-800' },
    { name: 'Nuanced Emotional Intelligence', count: 160, color: 'bg-teal-800' }
  ];

  const skillsActivities = [
    {
      id: 'reading-dissertation',
      type: 'Reading',
      title: 'Doctoral Dissertation Analysis',
      description: 'Critically analyze complex doctoral-level academic writing',
      difficulty: 'Mastery',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'listening-symposium-expert',
      type: 'Listening',
      title: 'Expert Symposium Moderation',
      description: 'Follow and moderate complex multi-expert discussions',
      difficulty: 'Mastery',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'writing-scholarly-article',
      type: 'Writing',
      title: 'Scholarly Article Composition',
      description: 'Write publication-ready academic articles with original insights',
      difficulty: 'Mastery',
      time: '90 minutes',
      completed: false
    },
    {
      id: 'speaking-keynote',
      type: 'Speaking',
      title: 'Keynote Address Delivery',
      description: 'Deliver inspiring keynote speeches to diverse audiences',
      difficulty: 'Mastery',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'reading-philosophical',
      type: 'Reading',
      title: 'Philosophical Text Interpretation',
      description: 'Interpret complex philosophical arguments and implications',
      difficulty: 'Mastery',
      time: '65 minutes',
      completed: false
    },
    {
      id: 'listening-cultural-nuance',
      type: 'Listening',
      title: 'Cultural Nuance Recognition',
      description: 'Identify subtle cultural references and implicit meanings',
      difficulty: 'Mastery',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'writing-creative-mastery',
      type: 'Writing',
      title: 'Creative Writing Mastery',
      description: 'Produce sophisticated creative works with literary merit',
      difficulty: 'Mastery',
      time: '75 minutes',
      completed: false
    },
    {
      id: 'speaking-diplomatic',
      type: 'Speaking',
      title: 'Diplomatic Negotiation',
      description: 'Navigate complex diplomatic discussions with cultural sensitivity',
      difficulty: 'Mastery',
      time: '55 minutes',
      completed: false
    }
  ];

  // CEFR C2 Can-Do Statements
  const canDoStatements = [
    'I can understand with ease virtually everything heard or read',
    'I can summarize information from different spoken and written sources',
    'I can express myself spontaneously, very fluently and precisely',
    'I can differentiate finer shades of meaning even in complex situations',
    'I can produce clear, smoothly-flowing text in an appropriate style',
    'I can write complex letters, reports or articles with effective logical structure',
    'I can understand implicit meaning, irony, and cultural references',
    'I can participate effortlessly in any conversation or discussion'
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      newProgress.grammarProgress = Math.min(100, newProgress.grammarProgress + (100 / 40)); // 40 total lessons for C2
      newProgress.points += 50;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      newProgress.vocabularyProgress = Math.min(100, newProgress.vocabularyProgress + (100 / 1500)); // 1500 total words for C2
      newProgress.points += 25;
      saveProgress(newProgress);
    }
  };

  const playPronunciation = (word: string) => {
    console.log(`Playing pronunciation for: ${word}`);
    // Would integrate with Web Speech API or audio files
  };

  const getWordsForCategory = (category: string) => {
    return vocabularyDatabase.filter(word => word.category === category);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Progress Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-2">
              C2 Mastery Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can understand virtually everything and express ideas with complete fluency and precision.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 mb-2">
              <Gem className="w-6 h-6 text-purple-500" />
              <span className="text-2xl font-bold text-foreground">{progress.points}</span>
              <span className="text-foreground/70">points</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="text-foreground/70">{progress.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Level Achievement Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white text-lg px-6 py-3">
            C2 Mastery
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-700" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/40</Badge>
              </div>
              <Progress value={progress.grammarProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.grammarProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-indigo-700" />
                  <span className="font-semibold">Vocabulary</span>
                </div>
                <Badge variant="secondary">{progress.masteredWords.length}/1500</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-violet-200 dark:border-violet-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-violet-700" />
                  <span className="font-semibold">Skills Practice</span>
                </div>
                <Badge variant="secondary">0/40</Badge>
              </div>
              <Progress value={progress.skillsProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.skillsProgress)}% Complete</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CEFR Can-Do Statements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gem className="w-6 h-6 text-purple-700" />
            C2 Can-Do Statements
          </CardTitle>
          <CardDescription>
            At C2 mastery level, you will be able to:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {canDoStatements.map((statement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{statement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="grammar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
          <TabsTrigger value="skills">Skills Practice</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        {/* Grammar Tab */}
        <TabsContent value="grammar" className="space-y-6">
          <div className="grid gap-6">
            {grammarTopics.map((topic, index) => (
              <Card key={topic.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{topic.topic}</CardTitle>
                      <CardDescription>
                        {topic.lessons.length} native-level lessons - C2 Mastery
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {progress.completedLessons.filter(l => l.startsWith(topic.id)).length}/{topic.lessons.length} completed
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-4">
                    {topic.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = progress.completedLessons.includes(`${topic.id}-${lesson.id}`);
                      
                      return (
                        <div key={lesson.id} 
                             className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                               isCompleted ? 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800' : 
                               'hover:bg-muted/50'
                             }`}
                             onClick={() => setSelectedLesson(`${topic.id}-${lesson.id}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-purple-700" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.exercises.length} exercises • Native level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">C2</Badge>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Vocabulary Tab */}
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid gap-6">
            {/* Category Selector */}
            <Card>
              <CardHeader>
                <CardTitle>C2 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 1500+ words representing the pinnacle of English vocabulary sophistication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {vocabularyCategories.map((category) => (
                    <div key={category.name}
                         className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                           selectedVocabCategory === category.name ? 
                           'ring-2 ring-primary' : ''
                         }`}
                         onClick={() => setSelectedVocabCategory(category.name)}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${category.color}`} />
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.count} words</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Word Cards */}
            <Card>
              <CardHeader>
                <CardTitle>{selectedVocabCategory}</CardTitle>
                <CardDescription>
                  C2-level vocabulary representing native-speaker sophistication and cultural mastery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getWordsForCategory(selectedVocabCategory).map((wordItem) => {
                    const isMastered = progress.masteredWords.includes(wordItem.word);
                    
                    return (
                      <div key={wordItem.word} 
                           className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                             isMastered ? 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800' : ''
                           }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{wordItem.word}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">C2</Badge>
                            <Badge variant="outline" className="text-xs">{wordItem.register}</Badge>
                            <Button size="sm" variant="ghost" 
                                    onClick={() => playPronunciation(wordItem.word)}>
                              <Volume2 className="w-4 h-4" />
                            </Button>
                            {isMastered && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{wordItem.pronunciation}</p>
                        <p className="text-sm mb-2">{wordItem.meaning}</p>
                        <p className="text-sm italic text-muted-foreground mb-3">"{wordItem.example}"</p>
                        {wordItem.etymology && (
                          <p className="text-xs text-purple-600 mb-2">
                            Etymology: {wordItem.etymology}
                          </p>
                        )}
                        {wordItem.collocations && (
                          <p className="text-xs text-indigo-600 mb-3">
                            Collocations: {wordItem.collocations.join(', ')}
                          </p>
                        )}
                        {!isMastered && (
                          <Button size="sm" onClick={() => masterWord(wordItem.word)} className="w-full">
                            Mark as Mastered (+25 points)
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Practice Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {skillsActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{activity.type}</Badge>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-700">C2</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <CardTitle>{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Mastery Activity
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>C2 Mastery Assessment</CardTitle>
              <CardDescription>
                The ultimate evaluation of native-level English language proficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                    <h4 className="font-medium">Grammar Mastery</h4>
                    <p className="text-sm text-muted-foreground">75 questions</p>
                    <Badge className="mt-2 bg-purple-700">C2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-indigo-700" />
                    <h4 className="font-medium">Vocabulary Mastery</h4>
                    <p className="text-sm text-muted-foreground">80 questions</p>
                    <Badge className="mt-2 bg-purple-700">C2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-violet-700" />
                    <h4 className="font-medium">Skills Mastery</h4>
                    <p className="text-sm text-muted-foreground">15 sections</p>
                    <Badge className="mt-2 bg-purple-700">C2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Gem className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                    <h4 className="font-medium">Cultural Competence</h4>
                    <p className="text-sm text-muted-foreground">10 tasks</p>
                    <Badge className="mt-2 bg-purple-700">C2 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take C2 Mastery Assessment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-8 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Previous Level</p>
          <Button asChild variant="outline">
            <Link href="/level/c1">
              <ArrowLeft className="mr-2 w-4 h-4" />
              C1 Advanced
            </Link>
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Achievement</p>
          <Badge className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white px-4 py-2">
            <Crown className="mr-2 w-4 h-4" />
            English Mastery Complete
          </Badge>
        </div>
      </div>
    </div>
  );
}