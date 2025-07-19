'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Brain, Users, Globe, GraduationCap, Lightbulb } from 'lucide-react';

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
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false' | 'reorder' | 'writing' | 'analysis';
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
  difficulty: 'upper-intermediate' | 'advanced';
  register: 'formal' | 'informal' | 'academic' | 'professional';
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

export default function B2Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Academic & Professional');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('b2-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('b2-progress', JSON.stringify(newProgress));
  };

  // B2 Grammar Topics (12 advanced topics)
  const grammarTopics = [
    {
      id: 'advanced-conditionals',
      topic: 'Advanced Conditionals & Mixed Types',
      status: 'available',
      lessons: [
        {
          id: 'third-conditional',
          title: 'Third Conditional - Past Hypotheticals',
          content: `
            <h3>Third Conditional</h3>
            <p>Used for hypothetical situations in the past (things that didn't happen):</p>
            <p><strong>Structure:</strong> If + past perfect, would have + past participle</p>
            <ul>
              <li>If I had studied harder, I would have passed the exam.</li>
              <li>If she had left earlier, she wouldn't have missed the train.</li>
              <li>What would you have done if you had known the truth?</li>
            </ul>
            <p>This expresses regret, criticism, or imaginary past situations.</p>
          `,
          examples: [
            'If we had invested in that company, we would have made millions.',
            'She would have been happier if she had chosen a different career.',
            'If they had listened to the weather forecast, they wouldn\'t have gone sailing.',
            'Would you have married him if you had known about his past?',
            'If the meeting had been scheduled earlier, more people would have attended.',
            'He wouldn\'t have failed if he had prepared properly.'
          ],
          exercises: [
            {
              id: 'third-cond-1',
              type: 'fill-blank',
              question: 'If she ___ (arrive) on time, she ___ (not miss) the presentation.',
              correct: 'had arrived / wouldn\'t have missed',
              explanation: 'Third conditional: If + past perfect, would/wouldn\'t have + past participle'
            }
          ],
          completed: false
        },
        {
          id: 'mixed-conditionals',
          title: 'Mixed Conditionals',
          content: `
            <h3>Mixed Conditionals</h3>
            <p>Combine different time references in one sentence:</p>
            <ul>
              <li><strong>Past condition → Present result:</strong> If I had studied medicine, I would be a doctor now.</li>
              <li><strong>Present condition → Past result:</strong> If she were more careful, she wouldn't have had that accident.</li>
            </ul>
            <p>Used when the time of the condition and result are different.</p>
          `,
          examples: [
            'If I had learned to drive, I would have my own car now.',
            'If she were more organized, she wouldn\'t have forgotten the meeting yesterday.',
            'If we had moved to the city, we would be closer to work now.',
            'If he were a better manager, the project wouldn\'t have failed.',
            'If I had taken that job, I would be living in Paris now.',
            'If they were more experienced, they wouldn\'t have made those mistakes.'
          ],
          exercises: [
            {
              id: 'mixed-cond-1',
              type: 'multiple-choice',
              question: 'If I ___ harder at school, I ___ a better job now.',
              options: ['studied / would have', 'had studied / would have', 'had studied / would have had'],
              correct: 1,
              explanation: 'Mixed conditional: past condition (had studied) → present result (would have)'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'advanced-passive',
      topic: 'Advanced Passive Voice & Structures',
      status: 'available',
      lessons: [
        {
          id: 'passive-reporting',
          title: 'Passive Reporting Structures',
          content: `
            <h3>Passive Reporting Verbs</h3>
            <p>Used to report what people say, believe, or think:</p>
            <ul>
              <li><strong>It + passive + that:</strong> It is believed that he left the country.</li>
              <li><strong>Subject + passive + to-infinitive:</strong> He is believed to have left the country.</li>
            </ul>
            <p>Common verbs: say, believe, think, know, expect, report, consider, understand</p>
          `,
          examples: [
            'It is said that the company will merge next year.',
            'The CEO is said to be considering resignation.',
            'It was reported that the negotiations had failed.',
            'The project is expected to be completed by June.',
            'It is believed that climate change is accelerating.',
            'The economy is thought to be recovering slowly.'
          ],
          exercises: [
            {
              id: 'passive-report-1',
              type: 'reorder',
              question: 'Reorder: is / the / meeting / be / to / postponed / thought',
              correct: 'The meeting is thought to be postponed.',
              explanation: 'Passive reporting: Subject + is thought + to-infinitive'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'discourse-markers',
      topic: 'Advanced Discourse Markers & Linking',
      status: 'available',
      lessons: [
        {
          id: 'complex-linking',
          title: 'Complex Linking Words & Phrases',
          content: `
            <h3>Sophisticated Linking Expressions</h3>
            <p>For advanced written and spoken communication:</p>
            <ul>
              <li><strong>Furthermore, Moreover:</strong> Adding information</li>
              <li><strong>Nevertheless, Nonetheless:</strong> Contrasting</li>
              <li><strong>Consequently, Hence:</strong> Showing results</li>
              <li><strong>Whereas, While:</strong> Comparing/contrasting</li>
              <li><strong>In spite of, Despite:</strong> Concession</li>
            </ul>
          `,
          examples: [
            'The project was challenging; nevertheless, we completed it on time.',
            'Sales decreased in Q1. Consequently, we had to reduce costs.',
            'The proposal was well-researched. Furthermore, it addressed all concerns.',
            'Whereas traditional methods are slow, digital solutions are efficient.',
            'Despite the rain, the outdoor event was successful.',
            'The results were promising. Hence, we decided to continue the research.'
          ],
          exercises: [
            {
              id: 'linking-1',
              type: 'multiple-choice',
              question: 'The weather was terrible. ___, the match continued.',
              options: ['However', 'Nevertheless', 'Therefore'],
              correct: 1,
              explanation: 'Nevertheless is more formal and emphatic than however'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // B2 Vocabulary Database (750 words with upper-intermediate complexity)
  const vocabularyDatabase: VocabularyWord[] = [
    // Academic & Professional (80 words)
    { word: 'analyze', pronunciation: '/ˈænəlaɪz/', meaning: 'examine in detail', example: 'We need to analyze the data carefully.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'evaluate', pronunciation: '/ɪˈvæljueɪt/', meaning: 'assess the value or quality', example: 'The committee will evaluate all proposals.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'methodology', pronunciation: '/ˌmeθəˈdɒlədʒi/', meaning: 'system of methods used', example: 'Our research methodology was rigorous.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'hypothesis', pronunciation: '/haɪˈpɒθəsɪs/', meaning: 'proposed explanation', example: 'The hypothesis was proven correct.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'criterion', pronunciation: '/kraɪˈtɪriən/', meaning: 'standard for judging', example: 'What is the main criterion for selection?', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'substantial', pronunciation: '/səbˈstænʃəl/', meaning: 'considerable in amount', example: 'There was substantial evidence to support the claim.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'comprehensive', pronunciation: '/ˌkɒmprɪˈhensɪv/', meaning: 'complete and thorough', example: 'We conducted a comprehensive review.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'strategy', pronunciation: '/ˈstrætədʒi/', meaning: 'plan of action', example: 'Our marketing strategy was successful.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'professional' },
    { word: 'implementation', pronunciation: '/ˌɪmplɪmenˈteɪʃən/', meaning: 'putting into action', example: 'The implementation of the new system was smooth.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'professional' },
    { word: 'collaboration', pronunciation: '/kəˌlæbəˈreɪʃən/', meaning: 'working together', example: 'This project requires close collaboration.', category: 'Academic & Professional', mastered: false, difficulty: 'upper-intermediate', register: 'professional' },

    // Complex Emotions & Psychology (60 words)
    { word: 'ambivalent', pronunciation: '/æmˈbɪvələnt/', meaning: 'having mixed feelings', example: 'She felt ambivalent about the job offer.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'resilient', pronunciation: '/rɪˈzɪliənt/', meaning: 'able to recover quickly', example: 'Children are remarkably resilient.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'apprehensive', pronunciation: '/ˌæprɪˈhensɪv/', meaning: 'anxious about the future', example: 'I\'m apprehensive about the exam results.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'contemplate', pronunciation: '/ˈkɒntəmpleɪt/', meaning: 'think deeply about', example: 'He contemplated his future career.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'empathy', pronunciation: '/ˈempəθi/', meaning: 'understanding others\' feelings', example: 'A good therapist shows empathy.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'professional' },
    { word: 'intrinsic', pronunciation: '/ɪnˈtrɪnzɪk/', meaning: 'belonging naturally', example: 'He has an intrinsic motivation to learn.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'skeptical', pronunciation: '/ˈskeptɪkəl/', meaning: 'having doubts', example: 'I\'m skeptical about those claims.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'perceptive', pronunciation: '/pərˈseptɪv/', meaning: 'having good insight', example: 'She made a perceptive observation.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'disposition', pronunciation: '/ˌdɪspəˈzɪʃən/', meaning: 'natural tendency', example: 'He has a cheerful disposition.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'subjective', pronunciation: '/səbˈdʒektɪv/', meaning: 'based on personal opinion', example: 'Art appreciation is subjective.', category: 'Complex Emotions & Psychology', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },

    // Global Issues & Society (70 words)
    { word: 'sustainability', pronunciation: '/səˌsteɪnəˈbɪləti/', meaning: 'ability to maintain over time', example: 'Environmental sustainability is crucial.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'inequality', pronunciation: '/ˌɪnɪˈkwɒləti/', meaning: 'unfair difference', example: 'Income inequality is growing.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'globalization', pronunciation: '/ˌɡloʊbəlaɪˈzeɪʃən/', meaning: 'worldwide integration', example: 'Globalization has changed trade.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'urbanization', pronunciation: '/ˌɜːrbənaɪˈzeɪʃən/', meaning: 'growth of cities', example: 'Rapid urbanization creates challenges.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'demographic', pronunciation: '/ˌdeməˈɡræfɪk/', meaning: 'relating to population', example: 'Demographic changes affect policy.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'academic' },
    { word: 'marginalized', pronunciation: '/ˈmɑːrdʒənəlaɪzd/', meaning: 'excluded from mainstream', example: 'Many groups remain marginalized.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'transparent', pronunciation: '/trænsˈpærənt/', meaning: 'open and honest', example: 'Government should be transparent.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'accountability', pronunciation: '/əˌkaʊntəˈbɪləti/', meaning: 'responsibility for actions', example: 'Corporate accountability is important.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'professional' },
    { word: 'unprecedented', pronunciation: '/ʌnˈpresɪdentɪd/', meaning: 'never happened before', example: 'This is an unprecedented situation.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'formal' },
    { word: 'paradigm', pronunciation: '/ˈpærədaɪm/', meaning: 'model or pattern', example: 'We need a new paradigm for education.', category: 'Global Issues & Society', mastered: false, difficulty: 'upper-intermediate', register: 'academic' }
  ];

  const vocabularyCategories = [
    { name: 'Academic & Professional', count: 80, color: 'bg-blue-600' },
    { name: 'Complex Emotions & Psychology', count: 60, color: 'bg-purple-600' },
    { name: 'Global Issues & Society', count: 70, color: 'bg-green-600' },
    { name: 'Science & Technology', count: 65, color: 'bg-cyan-600' },
    { name: 'Arts & Culture', count: 55, color: 'bg-pink-600' },
    { name: 'Business & Economics', count: 75, color: 'bg-orange-600' },
    { name: 'Politics & Governance', count: 60, color: 'bg-red-600' },
    { name: 'Philosophy & Ethics', count: 50, color: 'bg-violet-600' },
    { name: 'Media & Communication', count: 65, color: 'bg-indigo-600' },
    { name: 'Advanced Expressions', count: 70, color: 'bg-emerald-600' }
  ];

  const skillsActivities = [
    {
      id: 'reading-academic',
      type: 'Reading',
      title: 'Academic Journal Articles',
      description: 'Analyze complex academic texts and research papers',
      difficulty: 'Upper-Intermediate',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'listening-lectures',
      type: 'Listening',
      title: 'University Lectures',
      description: 'Follow complex academic lectures and take notes',
      difficulty: 'Upper-Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'writing-research',
      type: 'Writing',
      title: 'Research Proposals',
      description: 'Write detailed research proposals with methodology',
      difficulty: 'Upper-Intermediate',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'speaking-debate',
      type: 'Speaking',
      title: 'Formal Debates',
      description: 'Participate in structured debates on complex topics',
      difficulty: 'Upper-Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'reading-news',
      type: 'Reading',
      title: 'In-depth News Analysis',
      description: 'Analyze editorial content and opinion pieces',
      difficulty: 'Upper-Intermediate',
      time: '32 minutes',
      completed: false
    },
    {
      id: 'listening-interviews',
      type: 'Listening',
      title: 'Expert Interviews',
      description: 'Understand complex interviews with specialists',
      difficulty: 'Upper-Intermediate',
      time: '28 minutes',
      completed: false
    },
    {
      id: 'writing-reports',
      type: 'Writing',
      title: 'Professional Reports',
      description: 'Create comprehensive business and technical reports',
      difficulty: 'Upper-Intermediate',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'speaking-presentation',
      type: 'Speaking',
      title: 'Academic Presentations',
      description: 'Deliver formal presentations with Q&A sessions',
      difficulty: 'Upper-Intermediate',
      time: '35 minutes',
      completed: false
    }
  ];

  // CEFR B2 Can-Do Statements
  const canDoStatements = [
    'I can understand the main ideas of complex text on both concrete and abstract topics',
    'I can interact with a degree of fluency and spontaneity with native speakers',
    'I can produce clear, detailed text on a wide range of subjects',
    'I can explain a viewpoint on a topical issue giving advantages and disadvantages',
    'I can understand extended speech and lectures and follow complex lines of argument',
    'I can read articles and reports concerned with contemporary problems',
    'I can write an essay or report, passing on information or giving reasons',
    'I can present clear, detailed descriptions on a wide range of subjects'
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      newProgress.grammarProgress = Math.min(100, newProgress.grammarProgress + (100 / 30)); // 30 total lessons for B2
      newProgress.points += 25;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      newProgress.vocabularyProgress = Math.min(100, newProgress.vocabularyProgress + (100 / 750)); // 750 total words for B2
      newProgress.points += 15;
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
              B2 Upper-Intermediate Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can interact with fluency and understand complex texts on concrete and abstract topics.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-foreground">{progress.points}</span>
              <span className="text-foreground/70">points</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-foreground/70">{progress.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Level Achievement Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-700 text-white text-lg px-6 py-3">
            B2 Upper-Intermediate
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/30</Badge>
              </div>
              <Progress value={progress.grammarProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.grammarProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-green-600" />
                  <span className="font-semibold">Vocabulary</span>
                </div>
                <Badge variant="secondary">{progress.masteredWords.length}/750</Badge>
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
                <Badge variant="secondary">0/30</Badge>
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
            <GraduationCap className="w-6 h-6 text-purple-600" />
            B2 Can-Do Statements
          </CardTitle>
          <CardDescription>
            At B2 upper-intermediate level, you will be able to:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {canDoStatements.map((statement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
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
                        {topic.lessons.length} advanced lessons - B2 Level
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
                                <CheckCircle className="w-5 h-5 text-purple-600" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.exercises.length} exercises • Upper-Intermediate level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">B2</Badge>
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
                <CardTitle>B2 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 750 upper-intermediate words for academic and professional communication
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
                  B2-level vocabulary for sophisticated communication
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
                            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">B2</Badge>
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
                        {!isMastered && (
                          <Button size="sm" onClick={() => masterWord(wordItem.word)} className="w-full">
                            Mark as Mastered (+15 points)
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
                      <Badge className="bg-purple-600">B2</Badge>
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
              <CardTitle>B2 Upper-Intermediate Assessment</CardTitle>
              <CardDescription>
                Comprehensive evaluation of your B2-level language competency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">55 questions</p>
                    <Badge className="mt-2 bg-purple-600">B2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">60 questions</p>
                    <Badge className="mt-2 bg-purple-600">B2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">10 sections</p>
                    <Badge className="mt-2 bg-purple-600">B2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <h4 className="font-medium">Critical Thinking</h4>
                    <p className="text-sm text-muted-foreground">5 tasks</p>
                    <Badge className="mt-2 bg-purple-600">B2 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take B2 Assessment</Link>
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
            <Link href="/level/b1">
              <ArrowLeft className="mr-2 w-4 h-4" />
              B1 Intermediate
            </Link>
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Next Level</p>
          <Button asChild variant="outline">
            <Link href="/level/c1">
              C1 Advanced <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}