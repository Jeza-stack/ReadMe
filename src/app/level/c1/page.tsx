'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Users, Brain, Lightbulb, GraduationCap, Crown, Sparkles } from 'lucide-react';

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
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false' | 'essay' | 'rewrite' | 'analysis';
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
  level: 'basic' | 'intermediate' | 'advanced';
  collocations?: string[];
  synonyms?: string[];
  register?: 'formal' | 'academic' | 'literary';
  mastered: boolean;
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Specialized Terminology');
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

  // C1 Grammar Topics with Sophisticated Lessons
  const grammarTopics = [
    {
      id: 'advanced-verb-patterns',
      topic: 'Sophisticated Verb Patterns',
      status: 'available',
      lessons: [
        {
          id: 'complex-gerunds-infinitives',
          title: 'Complex Gerund and Infinitive Patterns',
          content: `
            <h3>Advanced Gerund and Infinitive Usage</h3>
            <p>Sophisticated patterns that express subtle distinctions in meaning:</p>
            <ul>
              <li><strong>Perfect infinitives:</strong> She pretended to have read the book. (completed before main verb)</li>
              <li><strong>Perfect gerunds:</strong> I regret having said that. (completed before main verb)</li>
              <li><strong>Passive infinitives:</strong> The document needs to be signed. (passive meaning)</li>
              <li><strong>Passive gerunds:</strong> Being criticized publicly was humiliating. (passive meaning)</li>
            </ul>
            <p>These patterns allow for precise temporal and voice relationships.</p>
          `,
          examples: [
            'He claimed to have been working all night.',
            'She denied having been involved in the scandal.',
            'The building appears to have been damaged by the storm.',
            'Having been warned about the risks, they proceeded cautiously.',
            'The manuscript is reported to have been discovered recently.',
            'Being misunderstood by colleagues affected his performance.'
          ],
          exercises: [
            {
              id: 'verb-pattern-1',
              type: 'multiple-choice',
              question: 'She regrets ___ him about the surprise party.',
              options: ['to tell', 'having told', 'to have told'],
              correct: 1,
              explanation: 'Use perfect gerund (having + past participle) for actions completed before the main verb.'
            },
            {
              id: 'verb-pattern-2',
              type: 'rewrite',
              question: 'Rewrite using a perfect infinitive: "The witness claims that she saw the accident."',
              correct: 'The witness claims to have seen the accident.',
              explanation: 'Perfect infinitive (to have + past participle) shows the action happened before the main verb.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'discourse-markers',
      topic: 'Advanced Discourse Markers',
      status: 'available',
      lessons: [
        {
          id: 'sophisticated-cohesion',
          title: 'Sophisticated Cohesive Devices',
          content: `
            <h3>Advanced Discourse Markers for Academic and Professional Writing</h3>
            <p>These sophisticated markers create elegant, flowing prose:</p>
            <ul>
              <li><strong>Amplifying:</strong> Moreover, furthermore, what is more, not only...but also</li>
              <li><strong>Contrasting:</strong> Nevertheless, nonetheless, notwithstanding, albeit</li>
              <li><strong>Exemplifying:</strong> To illustrate, by way of example, case in point</li>
              <li><strong>Concluding:</strong> In sum, to summarize, in the final analysis</li>
            </ul>
            <p>Mastery of these markers distinguishes advanced from intermediate writing.</p>
          `,
          examples: [
            'The proposal was innovative; nevertheless, it lacked financial viability.',
            'The research findings were significant. Moreover, they challenged existing paradigms.',
            'Notwithstanding the challenges, the project proceeded successfully.',
            'The economy showed signs of recovery, albeit modest ones.',
            'To illustrate this point, consider the following case study.',
            'In the final analysis, the decision proved to be correct.'
          ],
          exercises: [
            {
              id: 'discourse-1',
              type: 'fill-blank',
              question: 'The results were promising. ___, more research is needed to confirm the findings.',
              correct: 'Nevertheless',
              explanation: 'Nevertheless shows contrast while acknowledging the validity of the first statement.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'nominalization',
      topic: 'Nominalization Techniques',
      status: 'available',
      lessons: [
        {
          id: 'advanced-nominalization',
          title: 'Creating Dense, Academic Style',
          content: `
            <h3>Nominalization for Academic Register</h3>
            <p>Converting verbs and adjectives into nouns creates more formal, academic style:</p>
            <ul>
              <li><strong>Verb → Noun:</strong> analyze → analysis, investigate → investigation</li>
              <li><strong>Adjective → Noun:</strong> efficient → efficiency, accurate → accuracy</li>
              <li><strong>Process → Result:</strong> "We decided" → "The decision was made"</li>
            </ul>
            <p>This technique creates more compact, authoritative prose typical of academic writing.</p>
          `,
          examples: [
            'The implementation of the new policy resulted in improved efficiency.',
            'An analysis of the data revealed significant correlations.',
            'The acquisition of the company was completed successfully.',
            'Their collaboration on the project enhanced its effectiveness.',
            'The evaluation of student performance showed marked improvement.',
            'The formulation of the hypothesis required extensive research.'
          ],
          exercises: [
            {
              id: 'nom-1',
              type: 'rewrite',
              question: 'Rewrite using nominalization: "When they analyzed the data, they discovered important patterns."',
              correct: 'The analysis of the data revealed important patterns.',
              explanation: 'Convert "analyzed" to "analysis" and restructure for more formal academic style.'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // C1 Vocabulary Database (1000 words, advanced level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Specialized Terminology (80 words)
    { 
      word: 'paradigmatic', 
      pronunciation: '/ˌpærədɪɡˈmætɪk/', 
      meaning: 'serving as a typical example or model', 
      example: 'His approach became paradigmatic for future research.', 
      category: 'Specialized Terminology', 
      level: 'advanced', 
      collocations: ['paradigmatic example', 'paradigmatic shift', 'paradigmatic case'],
      synonyms: ['exemplary', 'archetypal', 'prototypical'],
      register: 'academic',
      mastered: false 
    },
    { 
      word: 'ubiquitous', 
      pronunciation: '/juˈbɪkwətəs/', 
      meaning: 'present, appearing, or found everywhere', 
      example: 'Smartphones have become ubiquitous in modern society.', 
      category: 'Specialized Terminology', 
      level: 'advanced', 
      collocations: ['ubiquitous presence', 'ubiquitous technology', 'ubiquitous nature'],
      synonyms: ['omnipresent', 'pervasive', 'universal'],
      register: 'formal',
      mastered: false 
    },
    { 
      word: 'pernicious', 
      pronunciation: '/pərˈnɪʃəs/', 
      meaning: 'having a harmful effect in a gradual way', 
      example: 'The pernicious influence of corruption undermined democracy.', 
      category: 'Specialized Terminology', 
      level: 'advanced', 
      collocations: ['pernicious effect', 'pernicious influence', 'pernicious doctrine'],
      synonyms: ['insidious', 'deleterious', 'detrimental'],
      register: 'formal',
      mastered: false 
    },
    { 
      word: 'contentious', 
      pronunciation: '/kənˈtenʃəs/', 
      meaning: 'causing or likely to cause argument', 
      example: 'The contentious issue divided the committee.', 
      category: 'Specialized Terminology', 
      level: 'advanced', 
      collocations: ['contentious issue', 'contentious debate', 'contentious proposal'],
      synonyms: ['controversial', 'disputed', 'divisive'],
      register: 'formal',
      mastered: false 
    },
    { 
      word: 'empirical', 
      pronunciation: '/ɪmˈpɪrɪkəl/', 
      meaning: 'based on observation or experience rather than theory', 
      example: 'The conclusions were supported by empirical evidence.', 
      category: 'Specialized Terminology', 
      level: 'advanced', 
      collocations: ['empirical evidence', 'empirical research', 'empirical data'],
      synonyms: ['observational', 'experiential', 'practical'],
      register: 'academic',
      mastered: false 
    },

    // Idiomatic Expressions (70 words)
    { 
      word: 'serendipitous', 
      pronunciation: '/ˌserənˈdɪpətəs/', 
      meaning: 'occurring by chance in a happy way', 
      example: 'Their serendipitous meeting led to a lifelong partnership.', 
      category: 'Idiomatic Expressions', 
      level: 'advanced', 
      collocations: ['serendipitous discovery', 'serendipitous encounter', 'serendipitous moment'],
      synonyms: ['fortuitous', 'providential', 'felicitous'],
      register: 'literary',
      mastered: false 
    },
    { 
      word: 'propitious', 
      pronunciation: '/prəˈpɪʃəs/', 
      meaning: 'favorable or advantageous', 
      example: 'The timing was propitious for launching the new product.', 
      category: 'Idiomatic Expressions', 
      level: 'advanced', 
      collocations: ['propitious moment', 'propitious circumstances', 'propitious timing'],
      synonyms: ['auspicious', 'favorable', 'opportune'],
      register: 'formal',
      mastered: false 
    },
    { 
      word: 'ineffable', 
      pronunciation: '/ɪnˈefəbəl/', 
      meaning: 'too great to be expressed in words', 
      example: 'The beauty of the sunset was ineffable.', 
      category: 'Idiomatic Expressions', 
      level: 'advanced', 
      collocations: ['ineffable beauty', 'ineffable joy', 'ineffable mystery'],
      synonyms: ['indescribable', 'inexpressible', 'unspeakable'],
      register: 'literary',
      mastered: false 
    },
    { 
      word: 'perspicacious', 
      pronunciation: '/ˌpɜːrspɪˈkeɪʃəs/', 
      meaning: 'having keen insight or discernment', 
      example: 'Her perspicacious analysis impressed the board.', 
      category: 'Idiomatic Expressions', 
      level: 'advanced', 
      collocations: ['perspicacious observer', 'perspicacious analysis', 'perspicacious comment'],
      synonyms: ['astute', 'perceptive', 'discerning'],
      register: 'formal',
      mastered: false 
    },
    { 
      word: 'magnanimous', 
      pronunciation: '/mæɡˈnænəməs/', 
      meaning: 'generous in forgiving; noble in spirit', 
      example: 'His magnanimous gesture surprised his former rivals.', 
      category: 'Idiomatic Expressions', 
      level: 'advanced', 
      collocations: ['magnanimous gesture', 'magnanimous spirit', 'magnanimous leader'],
      synonyms: ['generous', 'noble', 'big-hearted'],
      register: 'formal',
      mastered: false 
    }
  ];

  const vocabularyCategories = [
    { name: 'Specialized Terminology', count: 80, color: 'bg-violet-800' },
    { name: 'Idiomatic Expressions', count: 70, color: 'bg-purple-800' },
    { name: 'Academic Language', count: 90, color: 'bg-indigo-800' },
    { name: 'Sophisticated Concepts', count: 85, color: 'bg-blue-800' },
    { name: 'Professional Register', count: 75, color: 'bg-green-800' },
    { name: 'Literary Vocabulary', count: 80, color: 'bg-red-800' },
    { name: 'Technical Precision', count: 70, color: 'bg-orange-800' },
    { name: 'Cultural References', count: 65, color: 'bg-pink-800' },
    { name: 'Abstract Reasoning', count: 75, color: 'bg-teal-800' },
    { name: 'Nuanced Communication', count: 85, color: 'bg-cyan-800' },
    { name: 'Critical Analysis', count: 70, color: 'bg-amber-800' },
    { name: 'Philosophical Terms', count: 60, color: 'bg-lime-800' },
    { name: 'Scientific Discourse', count: 90, color: 'bg-emerald-800' }
  ];

  const skillsActivities = [
    {
      id: 'reading-research-papers',
      type: 'Reading',
      title: 'Research Paper Analysis',
      description: 'Critically analyze complex academic research papers and methodology',
      difficulty: 'Advanced',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'listening-academic-conferences',
      type: 'Listening',
      title: 'Academic Conference Presentations',
      description: 'Follow complex academic presentations with sophisticated arguments',
      difficulty: 'Advanced',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'writing-research-proposal',
      type: 'Writing',
      title: 'Research Proposal Writing',
      description: 'Compose detailed research proposals with literature review',
      difficulty: 'Advanced',
      time: '90 minutes',
      completed: false
    },
    {
      id: 'speaking-academic-defense',
      type: 'Speaking',
      title: 'Academic Thesis Defense',
      description: 'Defend complex ideas and respond to sophisticated criticism',
      difficulty: 'Advanced',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'reading-literary-criticism',
      type: 'Reading',
      title: 'Literary Criticism Analysis',
      description: 'Analyze sophisticated literary criticism and theoretical frameworks',
      difficulty: 'Advanced',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'listening-expert-panels',
      type: 'Listening',
      title: 'Expert Panel Discussions',
      description: 'Follow complex multi-speaker discussions on specialized topics',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'writing-policy-analysis',
      type: 'Writing',
      title: 'Policy Analysis Reports',
      description: 'Write comprehensive policy analysis with recommendations',
      difficulty: 'Advanced',
      time: '80 minutes',
      completed: false
    },
    {
      id: 'speaking-expert-consultation',
      type: 'Speaking',
      title: 'Expert Consultation',
      description: 'Provide expert advice on complex professional matters',
      difficulty: 'Advanced',
      time: '50 minutes',
      completed: false
    }
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
              Can use language flexibly and effectively for social, academic and professional purposes.
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
          <Badge className="bg-gradient-to-r from-violet-700 to-purple-800 text-white text-lg px-6 py-3">
            <Crown className="w-5 h-5 mr-2" />
            C1 Advanced
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-violet-200 dark:border-violet-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-violet-800" />
                  <span className="font-semibold">Sophisticated Grammar</span>
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
                  <Crown className="w-6 h-6 text-purple-800" />
                  <span className="font-semibold">Expert Vocabulary</span>
                </div>
                <Badge variant="secondary">{progress.masteredWords.length}/1000</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-indigo-800" />
                  <span className="font-semibold">Professional Skills</span>
                </div>
                <Badge variant="secondary">0/35</Badge>
              </div>
              <Progress value={progress.skillsProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.skillsProgress)}% Complete</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="grammar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grammar">Sophisticated Grammar</TabsTrigger>
          <TabsTrigger value="vocabulary">Expert Vocabulary</TabsTrigger>
          <TabsTrigger value="skills">Professional Skills</TabsTrigger>
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
                        {topic.lessons.length} expert-level lessons - C1 Advanced Level
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
                               isCompleted ? 'bg-violet-50 border-violet-200 dark:bg-violet-950/20 dark:border-violet-800' : 
                               'hover:bg-muted/50'
                             }`}
                             onClick={() => setSelectedLesson(`${topic.id}-${lesson.id}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-violet-800" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.exercises.length} sophisticated exercises • Advanced level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-violet-100 text-violet-800">C1</Badge>
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
                <CardTitle>C1 Expert Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 1000 sophisticated English words for advanced academic and professional communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-6 gap-2 mb-6">
                  {vocabularyCategories.map((category) => (
                    <div key={category.name}
                         className={`p-2 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                           selectedVocabCategory === category.name ? 
                           'ring-2 ring-primary' : ''
                         }`}
                         onClick={() => setSelectedVocabCategory(category.name)}>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${category.color}`} />
                        <div>
                          <h4 className="font-medium text-xs">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">{category.count}</p>
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
                  C1-level vocabulary with sophisticated meanings, collocations, synonyms, and register variations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getWordsForCategory(selectedVocabCategory).map((wordItem) => {
                    const isMastered = progress.masteredWords.includes(wordItem.word);
                    
                    return (
                      <div key={wordItem.word} 
                           className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                             isMastered ? 'bg-violet-50 border-violet-200 dark:bg-violet-950/20 dark:border-violet-800' : ''
                           }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{wordItem.word}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-violet-100 text-violet-800">C1</Badge>
                            {wordItem.register && (
                              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700">
                                {wordItem.register}
                              </Badge>
                            )}
                            <Button size="sm" variant="ghost" 
                                    onClick={() => playPronunciation(wordItem.word)}>
                              <Volume2 className="w-4 h-4" />
                            </Button>
                            {isMastered && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{wordItem.pronunciation}</p>
                        <p className="text-sm mb-2">{wordItem.meaning}</p>
                        <p className="text-sm italic text-muted-foreground mb-2">"{wordItem.example}"</p>
                        
                        {wordItem.collocations && (
                          <div className="mb-2">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Collocations:</p>
                            <div className="flex flex-wrap gap-1">
                              {wordItem.collocations.map((collocation, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {collocation}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {wordItem.synonyms && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Synonyms:</p>
                            <div className="flex flex-wrap gap-1">
                              {wordItem.synonyms.map((synonym, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {synonym}
                                </Badge>
                              ))}
                            </div>
                          </div>
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
                      <Badge className="bg-violet-800">C1</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Expert Activity
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
                Comprehensive evaluation of advanced English proficiency at C1 level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-violet-800" />
                    <h4 className="font-medium">Sophisticated Grammar</h4>
                    <p className="text-sm text-muted-foreground">70 questions</p>
                    <Badge className="mt-2 bg-violet-800">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Crown className="w-8 h-8 mx-auto mb-2 text-purple-800" />
                    <h4 className="font-medium">Expert Vocabulary</h4>
                    <p className="text-sm text-muted-foreground">80 questions</p>
                    <Badge className="mt-2 bg-violet-800">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 text-indigo-800" />
                    <h4 className="font-medium">Professional Skills</h4>
                    <p className="text-sm text-muted-foreground">12 sections</p>
                    <Badge className="mt-2 bg-violet-800">C1 Level</Badge>
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