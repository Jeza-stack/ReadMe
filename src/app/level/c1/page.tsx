'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Brain, Users, Globe, GraduationCap, Lightbulb, Crown, Sparkles } from 'lucide-react';

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
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false' | 'reorder' | 'writing' | 'analysis' | 'transformation';
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
  difficulty: 'advanced' | 'sophisticated';
  register: 'formal' | 'academic' | 'professional' | 'literary' | 'technical';
  collocations?: string[];
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

export default function C1Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Advanced Academic Language');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('c1-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('c1-progress', JSON.stringify(newProgress));
  };

  // C1 Grammar Topics (14 sophisticated topics)
  const grammarTopics = [
    {
      id: 'advanced-verb-patterns',
      topic: 'Advanced Verb Patterns & Constructions',
      status: 'available',
      lessons: [
        {
          id: 'causative-structures',
          title: 'Causative Structures (have/get something done)',
          content: `
            <h3>Causative Structures</h3>
            <p>These structures show that someone else does something for you:</p>
            <ul>
              <li><strong>Have + object + past participle:</strong> I had my car repaired.</li>
              <li><strong>Get + object + past participle:</strong> I got my hair cut.</li>
              <li><strong>Have + person + base verb:</strong> I had John fix the computer.</li>
              <li><strong>Get + person + to-infinitive:</strong> I got John to fix the computer.</li>
            </ul>
            <p>Also used for unpleasant experiences: "He had his wallet stolen."</p>
          `,
          examples: [
            'She had her portrait painted by a famous artist.',
            'We need to get the heating system checked before winter.',
            'I had the mechanic look at the engine.',
            'Can you get someone to translate this document?',
            'They had their house broken into last night.',
            'I must get my eyes tested soon.'
          ],
          exercises: [
            {
              id: 'causative-1',
              type: 'transformation',
              question: 'Transform: "Someone repaired my computer." → I ___ my computer ___.',
              correct: 'had / repaired',
              explanation: 'Causative structure: have + object + past participle'
            }
          ],
          completed: false
        },
        {
          id: 'cleft-sentences',
          title: 'Cleft Sentences for Emphasis',
          content: `
            <h3>Cleft Sentences</h3>
            <p>Used to emphasize particular information by restructuring sentences:</p>
            <ul>
              <li><strong>It-cleft:</strong> It was John who called me. (emphasizes John)</li>
              <li><strong>What-cleft:</strong> What I need is a vacation. (emphasizes vacation)</li>
              <li><strong>All-cleft:</strong> All I want is peace and quiet.</li>
              <li><strong>The thing-cleft:</strong> The thing that annoys me is his attitude.</li>
            </ul>
          `,
          examples: [
            'It was the weather that ruined our picnic.',
            'What she really wanted was recognition for her work.',
            'All we need now is your signature.',
            'The person who impressed me most was Maria.',
            'What bothers me is the lack of communication.',
            'It\'s because of the traffic that we\'re late.'
          ],
          exercises: [
            {
              id: 'cleft-1',
              type: 'multiple-choice',
              question: '___ I really appreciate is your honesty.',
              options: ['It', 'What', 'That'],
              correct: 1,
              explanation: 'What-cleft emphasizes "your honesty" as the object of appreciation'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'subjunctive-mood',
      topic: 'Subjunctive Mood & Formal Structures',
      status: 'available',
      lessons: [
        {
          id: 'subjunctive-present',
          title: 'Present Subjunctive in Formal English',
          content: `
            <h3>Present Subjunctive</h3>
            <p>Used in formal contexts, especially after certain verbs and expressions:</p>
            <ul>
              <li><strong>After "suggest, recommend, insist, demand":</strong> I suggest that he be more careful.</li>
              <li><strong>After "it is important/essential/vital":</strong> It is essential that she attend the meeting.</li>
              <li><strong>In certain fixed expressions:</strong> "God save the Queen", "Be that as it may"</li>
            </ul>
            <p>The subjunctive uses the base form of the verb for all persons.</p>
          `,
          examples: [
            'The committee recommends that the proposal be accepted.',
            'It is crucial that everyone arrive on time.',
            'I insist that he apologize immediately.',
            'The law requires that all citizens vote.',
            'It is imperative that we act quickly.',
            'The board demands that costs be reduced.'
          ],
          exercises: [
            {
              id: 'subjunctive-1',
              type: 'fill-blank',
              question: 'It is essential that he ___ (be) present at the ceremony.',
              correct: 'be',
              explanation: 'Present subjunctive uses base form "be" after "essential that"'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'inversion-emphasis',
      topic: 'Inversion for Emphasis & Style',
      status: 'available',
      lessons: [
        {
          id: 'negative-inversion',
          title: 'Inversion after Negative Adverbials',
          content: `
            <h3>Inversion for Emphasis</h3>
            <p>When sentences begin with negative or limiting adverbials, we invert subject and auxiliary:</p>
            <ul>
              <li><strong>Never, rarely, seldom:</strong> Never have I seen such beauty.</li>
              <li><strong>Not only, not until:</strong> Not only did she win, but she also broke the record.</li>
              <li><strong>Under no circumstances:</strong> Under no circumstances should you give up.</li>
              <li><strong>Little, hardly:</strong> Little did he know what awaited him.</li>
            </ul>
          `,
          examples: [
            'Rarely do we see such dedication.',
            'Not until midnight did the party end.',
            'Under no circumstances will we compromise.',
            'Hardly had we arrived when it started raining.',
            'Not only is she talented, but she\'s also hardworking.',
            'Seldom have I encountered such rudeness.'
          ],
          exercises: [
            {
              id: 'inversion-1',
              type: 'reorder',
              question: 'Reorder: have / such / seen / never / I / dedication',
              correct: 'Never have I seen such dedication.',
              explanation: 'Inversion: Never + auxiliary + subject + main verb'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // C1 Vocabulary Database (1000 words with advanced complexity)
  const vocabularyDatabase: VocabularyWord[] = [
    // Advanced Academic Language (100 words)
    { word: 'erudite', pronunciation: '/ˈeruˌdaɪt/', meaning: 'showing great knowledge', example: 'Her erudite analysis impressed the professors.', category: 'Advanced Academic Language', mastered: false, difficulty: 'sophisticated', register: 'academic', collocations: ['erudite scholar', 'erudite commentary'] },
    { word: 'ubiquitous', pronunciation: '/juˈbɪkwɪtəs/', meaning: 'present everywhere', example: 'Smartphones have become ubiquitous in modern society.', category: 'Advanced Academic Language', mastered: false, difficulty: 'sophisticated', register: 'academic', collocations: ['ubiquitous presence', 'ubiquitous technology'] },
    { word: 'paradigmatic', pronunciation: '/ˌpærədɪɡˈmætɪk/', meaning: 'serving as a typical example', example: 'This case study is paradigmatic of the broader issue.', category: 'Advanced Academic Language', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'extrapolate', pronunciation: '/ɪkˈstræpəˌleɪt/', meaning: 'extend conclusions beyond original data', example: 'We can extrapolate future trends from current data.', category: 'Advanced Academic Language', mastered: false, difficulty: 'advanced', register: 'academic' },
    { word: 'corroborate', pronunciation: '/kəˈrɒbəˌreɪt/', meaning: 'confirm or support with evidence', example: 'Multiple witnesses corroborated his testimony.', category: 'Advanced Academic Language', mastered: false, difficulty: 'advanced', register: 'formal' },
    { word: 'pragmatic', pronunciation: '/præɡˈmætɪk/', meaning: 'practical rather than idealistic', example: 'We need a pragmatic approach to solving this problem.', category: 'Advanced Academic Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'empirical', pronunciation: '/ɪmˈpɪrɪkəl/', meaning: 'based on observation or experience', example: 'The theory lacks empirical evidence to support it.', category: 'Advanced Academic Language', mastered: false, difficulty: 'advanced', register: 'academic' },
    { word: 'dichotomy', pronunciation: '/daɪˈkɒtəmi/', meaning: 'division into two contrasting parts', example: 'There\'s a false dichotomy between theory and practice.', category: 'Advanced Academic Language', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'pervasive', pronunciation: '/pərˈveɪsɪv/', meaning: 'spreading widely throughout', example: 'There\'s a pervasive sense of uncertainty in the market.', category: 'Advanced Academic Language', mastered: false, difficulty: 'advanced', register: 'formal' },
    { word: 'quintessential', pronunciation: '/ˌkwɪntɪˈsenʃəl/', meaning: 'representing the most perfect example', example: 'She is the quintessential professional.', category: 'Advanced Academic Language', mastered: false, difficulty: 'sophisticated', register: 'formal' },

    // Sophisticated Professional Language (90 words)
    { word: 'leverage', pronunciation: '/ˈlevərɪdʒ/', meaning: 'use something to maximum advantage', example: 'We can leverage our expertise to win this contract.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional', collocations: ['leverage resources', 'leverage technology'] },
    { word: 'streamline', pronunciation: '/ˈstriːmˌlaɪn/', meaning: 'make more efficient by simplifying', example: 'We need to streamline our operations to reduce costs.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'synergy', pronunciation: '/ˈsɪnərdʒi/', meaning: 'combined effect greater than sum of parts', example: 'The merger will create significant synergies.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'culminate', pronunciation: '/ˈkʌlməˌneɪt/', meaning: 'reach the highest point', example: 'Years of research culminated in this breakthrough.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'formal' },
    { word: 'mitigate', pronunciation: '/ˈmɪtəˌɡeɪt/', meaning: 'make less severe or serious', example: 'These measures will mitigate the environmental impact.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'expedite', pronunciation: '/ˈekspəˌdaɪt/', meaning: 'make happen sooner or faster', example: 'We need to expedite the approval process.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'resilience', pronunciation: '/rɪˈzɪliəns/', meaning: 'ability to recover from difficulties', example: 'The company showed remarkable resilience during the crisis.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'consolidate', pronunciation: '/kənˈsɒləˌdeɪt/', meaning: 'combine into a single more effective unit', example: 'The company plans to consolidate its operations.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'optimize', pronunciation: '/ˈɒptəˌmaɪz/', meaning: 'make the best use of', example: 'We need to optimize our marketing strategy.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },
    { word: 'trajectory', pronunciation: '/trəˈdʒektəri/', meaning: 'path or progression', example: 'The company is on an upward trajectory.', category: 'Sophisticated Professional Language', mastered: false, difficulty: 'advanced', register: 'professional' },

    // Literary & Cultural Expression (80 words)
    { word: 'ephemeral', pronunciation: '/ɪˈfemərəl/', meaning: 'lasting for a very short time', example: 'Beauty is ephemeral, but art endures.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'literary' },
    { word: 'melancholy', pronunciation: '/ˈmeləŋˌkɒli/', meaning: 'thoughtful sadness', example: 'The autumn landscape filled her with melancholy.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'literary' },
    { word: 'eloquent', pronunciation: '/ˈeləkwənt/', meaning: 'fluent and persuasive in speech', example: 'His eloquent speech moved the audience to tears.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'advanced', register: 'formal' },
    { word: 'poignant', pronunciation: '/ˈpɔɪnjənt/', meaning: 'evoking sadness or regret', example: 'The documentary was a poignant reminder of war\'s cost.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'literary' },
    { word: 'vivacious', pronunciation: '/vɪˈveɪʃəs/', meaning: 'attractively lively and animated', example: 'Her vivacious personality lit up the room.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'advanced', register: 'formal' },
    { word: 'sublime', pronunciation: '/səˈblaɪm/', meaning: 'of high spiritual or aesthetic worth', example: 'The mountain vista was absolutely sublime.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'literary' },
    { word: 'ostentatious', pronunciation: '/ˌɒstenˈteɪʃəs/', meaning: 'showy display of wealth or knowledge', example: 'His ostentatious lifestyle attracted criticism.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'formal' },
    { word: 'gregarious', pronunciation: '/ɡrɪˈɡeəriəs/', meaning: 'fond of company; sociable', example: 'She\'s naturally gregarious and makes friends easily.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'advanced', register: 'formal' },
    { word: 'magnanimous', pronunciation: '/mæɡˈnænəməs/', meaning: 'generous in forgiving', example: 'It was magnanimous of him to forgive his rival.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'formal' },
    { word: 'perspicacious', pronunciation: '/ˌpɜːspɪˈkeɪʃəs/', meaning: 'having keen insight', example: 'Her perspicacious analysis revealed the hidden flaws.', category: 'Literary & Cultural Expression', mastered: false, difficulty: 'sophisticated', register: 'formal' },

    // Complex Philosophical Concepts (85 words)
    { word: 'existential', pronunciation: '/ˌeɡzɪˈstenʃəl/', meaning: 'relating to existence and experience', example: 'The novel explores existential themes of meaning and purpose.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'metaphysical', pronunciation: '/ˌmetəˈfɪzɪkəl/', meaning: 'beyond physical reality', example: 'The philosopher discussed metaphysical questions about consciousness.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'epistemological', pronunciation: '/ɪˌpɪstəməˈlɒdʒɪkəl/', meaning: 'relating to the theory of knowledge', example: 'This raises important epistemological questions.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'dialectical', pronunciation: '/ˌdaɪəˈlektɪkəl/', meaning: 'relating to logical discussion', example: 'The dialectical approach examines opposing viewpoints.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'nihilistic', pronunciation: '/ˌnaɪɪˈlɪstɪk/', meaning: 'believing life is meaningless', example: 'The character\'s nihilistic worldview dominates the story.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'hegemony', pronunciation: '/hɪˈɡeməni/', meaning: 'dominance of one group over others', example: 'Cultural hegemony shapes social norms and values.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'ontological', pronunciation: '/ˌɒntəˈlɒdʒɪkəl/', meaning: 'relating to the nature of being', example: 'The ontological argument attempts to prove God\'s existence.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'phenomenological', pronunciation: '/fɪˌnɒmɪnəˈlɒdʒɪkəl/', meaning: 'relating to conscious experience', example: 'The phenomenological approach studies lived experience.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'zeitgeist', pronunciation: '/ˈtsaɪtɡaɪst/', meaning: 'spirit of the times', example: 'The film captures the zeitgeist of the 1960s perfectly.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' },
    { word: 'teleological', pronunciation: '/ˌteliəˈlɒdʒɪkəl/', meaning: 'relating to purpose or design', example: 'The teleological argument suggests nature has purpose.', category: 'Complex Philosophical Concepts', mastered: false, difficulty: 'sophisticated', register: 'academic' }
  ];

  const vocabularyCategories = [
    { name: 'Advanced Academic Language', count: 100, color: 'bg-indigo-700' },
    { name: 'Sophisticated Professional Language', count: 90, color: 'bg-purple-700' },
    { name: 'Literary & Cultural Expression', count: 80, color: 'bg-pink-700' },
    { name: 'Complex Philosophical Concepts', count: 85, color: 'bg-violet-700' },
    { name: 'Scientific & Technical Terminology', count: 95, color: 'bg-cyan-700' },
    { name: 'Legal & Political Discourse', count: 75, color: 'bg-red-700' },
    { name: 'Economic & Financial Language', count: 80, color: 'bg-green-700' },
    { name: 'Psychological & Social Sciences', count: 85, color: 'bg-blue-700' },
    { name: 'Advanced Idiomatic Expressions', count: 90, color: 'bg-orange-700' },
    { name: 'Nuanced Emotional Vocabulary', count: 120, color: 'bg-emerald-700' }
  ];

  const skillsActivities = [
    {
      id: 'reading-research',
      type: 'Reading',
      title: 'Research Paper Analysis',
      description: 'Critically analyze complex academic research papers',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'listening-symposium',
      type: 'Listening',
      title: 'Academic Symposium',
      description: 'Follow complex academic discussions and symposiums',
      difficulty: 'Advanced',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'writing-thesis',
      type: 'Writing',
      title: 'Thesis Argumentation',
      description: 'Write sophisticated argumentative essays with nuanced positions',
      difficulty: 'Advanced',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'speaking-seminar',
      type: 'Speaking',
      title: 'Academic Seminar Leadership',
      description: 'Lead academic discussions and respond to complex questions',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'reading-literary',
      type: 'Reading',
      title: 'Literary Criticism',
      description: 'Analyze and interpret complex literary works',
      difficulty: 'Advanced',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'listening-documentary',
      type: 'Listening',
      title: 'Documentary Analysis',
      description: 'Understand implicit meanings in complex documentaries',
      difficulty: 'Advanced',
      time: '42 minutes',
      completed: false
    },
    {
      id: 'writing-grant',
      type: 'Writing',
      title: 'Grant Proposal Writing',
      description: 'Write professional grant proposals with complex justifications',
      difficulty: 'Advanced',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'speaking-conference',
      type: 'Speaking',
      title: 'Conference Presentation',
      description: 'Deliver sophisticated presentations to expert audiences',
      difficulty: 'Advanced',
      time: '50 minutes',
      completed: false
    }
  ];

  // CEFR C1 Can-Do Statements
  const canDoStatements = [
    'I can understand a wide range of demanding, longer texts and recognize implicit meaning',
    'I can express myself fluently and spontaneously without searching for expressions',
    'I can use language flexibly and effectively for social, academic and professional purposes',
    'I can produce clear, well-structured, detailed text on complex subjects',
    'I can understand extended speech even when it is not clearly structured',
    'I can read complex factual and literary texts and appreciate distinctions of style',
    'I can express myself in clear, well-structured text, expressing points of view at some length',
    'I can present clear, detailed descriptions of complex subjects integrating sub-themes'
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      newProgress.grammarProgress = Math.min(100, newProgress.grammarProgress + (100 / 35)); // 35 total lessons for C1
      newProgress.points += 30;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      newProgress.vocabularyProgress = Math.min(100, newProgress.vocabularyProgress + (100 / 1000)); // 1000 total words for C1
      newProgress.points += 20;
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
              C1 Advanced Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can express ideas fluently and use language flexibly for social, academic and professional purposes.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 mb-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-foreground">{progress.points}</span>
              <span className="text-foreground/70">points</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-foreground/70">{progress.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Level Achievement Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white text-lg px-6 py-3">
            C1 Advanced
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/35</Badge>
              </div>
              <Progress value={progress.grammarProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.grammarProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold">Vocabulary</span>
                </div>
                <Badge variant="secondary">{progress.masteredWords.length}/1000</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                  <span className="font-semibold">Skills Practice</span>
                </div>
                <Badge variant="secondary">0/35</Badge>
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
            <Crown className="w-6 h-6 text-indigo-600" />
            C1 Can-Do Statements
          </CardTitle>
          <CardDescription>
            At C1 advanced level, you will be able to:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {canDoStatements.map((statement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
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
                        {topic.lessons.length} sophisticated lessons - C1 Level
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
                               isCompleted ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800' : 
                               'hover:bg-muted/50'
                             }`}
                             onClick={() => setSelectedLesson(`${topic.id}-${lesson.id}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-indigo-600" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.exercises.length} exercises • Advanced level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">C1</Badge>
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
                <CardTitle>C1 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 1000 advanced words for sophisticated academic and professional communication
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
                  C1-level vocabulary for sophisticated and nuanced communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getWordsForCategory(selectedVocabCategory).map((wordItem) => {
                    const isMastered = progress.masteredWords.includes(wordItem.word);
                    
                    return (
                      <div key={wordItem.word} 
                           className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                             isMastered ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800' : ''
                           }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{wordItem.word}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-indigo-100 text-indigo-800">C1</Badge>
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
                        {wordItem.collocations && (
                          <p className="text-xs text-blue-600 mb-3">
                            Collocations: {wordItem.collocations.join(', ')}
                          </p>
                        )}
                        {!isMastered && (
                          <Button size="sm" onClick={() => masterWord(wordItem.word)} className="w-full">
                            Mark as Mastered (+20 points)
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
                      <Badge className="bg-indigo-600">C1</Badge>
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
                    Start Advanced Activity
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
              <CardTitle>C1 Advanced Assessment</CardTitle>
              <CardDescription>
                Comprehensive evaluation of your C1-level language proficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">65 questions</p>
                    <Badge className="mt-2 bg-indigo-600">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">70 questions</p>
                    <Badge className="mt-2 bg-indigo-600">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">12 sections</p>
                    <Badge className="mt-2 bg-indigo-600">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <h4 className="font-medium">Academic Writing</h4>
                    <p className="text-sm text-muted-foreground">3 tasks</p>
                    <Badge className="mt-2 bg-indigo-600">C1 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take C1 Assessment</Link>
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
            <Link href="/level/b2">
              <ArrowLeft className="mr-2 w-4 h-4" />
              B2 Upper-Intermediate
            </Link>
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Next Level</p>
          <Button asChild variant="outline">
            <Link href="/level/c2">
              C2 Mastery <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}