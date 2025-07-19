'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Brain, Crown, Sparkles } from 'lucide-react';

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
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false';
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

  useEffect(() => {
    const saved = localStorage.getItem('c1-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('c1-progress', JSON.stringify(newProgress));
  };

  // C1 Grammar Topics (14 topics - Advanced level)
  const grammarTopics = [
    {
      id: 'sophisticated-structures',
      topic: 'Sophisticated Grammar Structures',
      status: 'available',
      lessons: [
        {
          id: 'nominalization',
          title: 'Nominalization for Academic Writing',
          content: `
            <h3>Nominalization</h3>
            <p>Converting verbs and adjectives into nouns for formal, academic style:</p>
            <p><strong>Verb → Noun:</strong> decide → decision, analyze → analysis, develop → development</p>
            <p><strong>Adjective → Noun:</strong> important → importance, accurate → accuracy, efficient → efficiency</p>
            <ul>
              <li><strong>Before:</strong> The government decided to reduce taxes. This decision was controversial.</li>
              <li><strong>After:</strong> The government's decision to reduce taxes was controversial.</li>
            </ul>
            <p>Nominalization creates more concise, formal academic prose.</p>
          `,
          examples: [
            'The company\'s expansion into Asian markets has been successful.',
            'The investigation of climate change requires global cooperation.',
            'Her reluctance to compromise became evident during negotiations.',
            'The implementation of new policies will take several months.',
            'The significance of this discovery cannot be overstated.',
            'Economic fluctuations affect employment levels dramatically.'
          ],
          exercises: [
            {
              id: 'nom-1',
              type: 'fill-blank',
              question: 'The ___ (analyze) of the data revealed surprising trends.',
              correct: 'analysis',
              explanation: 'Convert the verb "analyze" to its noun form "analysis"'
            },
            {
              id: 'nom-2',
              type: 'multiple-choice',
              question: 'The ___ of this approach is questionable.',
              options: ['effective', 'effectiveness', 'effectively'],
              correct: 1,
              explanation: 'Use the noun form "effectiveness" in this context'
            }
          ],
          completed: false
        },
        {
          id: 'discourse-markers',
          title: 'Advanced Discourse Markers',
          content: `
            <h3>Sophisticated Discourse Markers</h3>
            <p>Advanced connectors that show complex relationships between ideas:</p>
            <p><strong>Contrast:</strong> nevertheless, nonetheless, notwithstanding, albeit</p>
            <p><strong>Addition:</strong> furthermore, moreover, likewise, similarly</p>
            <p><strong>Cause/Effect:</strong> consequently, thereby, hence, thus</p>
            <p><strong>Concession:</strong> granted that, even so, be that as it may</p>
            <ul>
              <li><strong>Notwithstanding</strong> the challenges, the project succeeded.</li>
              <li><strong>Consequently,</strong> sales figures improved significantly.</li>
            </ul>
          `,
          examples: [
            'The evidence is compelling; nevertheless, more research is needed.',
            'Furthermore, the implications extend beyond this single case.',
            'The weather was terrible; nonetheless, the event proceeded.',
            'He worked diligently; consequently, he achieved excellent results.',
            'Granted that the plan has merit, the costs remain prohibitive.',
            'The solution, albeit imperfect, addresses the main concerns.'
          ],
          exercises: [
            {
              id: 'disc-1',
              type: 'multiple-choice',
              question: 'The proposal has flaws; ___, it deserves consideration.',
              options: ['however', 'nevertheless', 'therefore'],
              correct: 1,
              explanation: '"Nevertheless" is more formal and sophisticated than "however"'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'advanced-verb-patterns',
      topic: 'Advanced Verb Patterns',
      status: 'available',
      lessons: [
        {
          id: 'complex-gerunds',
          title: 'Complex Gerund and Infinitive Patterns',
          content: `
            <h3>Sophisticated Gerund and Infinitive Constructions</h3>
            <p>Advanced patterns that show nuanced meaning and formal style:</p>
            <p><strong>Perfect gerunds:</strong> having + past participle</p>
            <p><strong>Passive gerunds:</strong> being + past participle</p>
            <p><strong>Perfect infinitives:</strong> to have + past participle</p>
            <ul>
              <li><strong>Having lived</strong> abroad, she understood different cultures.</li>
              <li><strong>Being criticized</strong> constantly affected his confidence.</li>
              <li>She claimed <strong>to have seen</strong> the incident.</li>
            </ul>
          `,
          examples: [
            'Having completed the research, we can now draw conclusions.',
            'Being invited to the conference was a great honor.',
            'He pretended to have understood the complex theory.',
            'Having been warned about the risks, they proceeded cautiously.',
            'She regretted not having taken the opportunity.',
            'Being overlooked for promotion was disappointing.'
          ],
          exercises: [
            {
              id: 'gerund-1',
              type: 'fill-blank',
              question: '___ (complete) his PhD, he started his own research.',
              correct: 'Having completed',
              explanation: 'Perfect gerund shows an action completed before another action'
            }
          ],
          completed: false
        },
        {
          id: 'subjunctive-advanced',
          title: 'Advanced Subjunctive Constructions',
          content: `
            <h3>Sophisticated Subjunctive Patterns</h3>
            <p>Complex subjunctive forms for formal and literary expression:</p>
            <p><strong>Formulaic expressions:</strong> Come what may, Be that as it may</p>
            <p><strong>Conditional subjunctive:</strong> If it were not for..., Were it not that...</p>
            <p><strong>Optative subjunctive:</strong> Long live the Queen!, God save us!</p>
            <ul>
              <li><strong>Come what may,</strong> we will persevere.</li>
              <li><strong>Were it not for</strong> your help, we would have failed.</li>
              <li><strong>Heaven forbid</strong> such a thing should happen.</li>
            </ul>
          `,
          examples: [
            'Were it not for modern medicine, many diseases would be fatal.',
            'Come what may, we will stand by our principles.',
            'Be that as it may, the decision has been made.',
            'Far be it from me to criticize your methods.',
            'Suffice it to say that the results were disappointing.',
            'So be it, if that is your final decision.'
          ],
          exercises: [
            {
              id: 'subj-adv-1',
              type: 'multiple-choice',
              question: '___ your support, this project would be impossible.',
              options: ['Without', 'Were it not for', 'If not'],
              correct: 1,
              explanation: '"Were it not for" is a sophisticated subjunctive construction'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'stylistic-inversion',
      topic: 'Stylistic Inversion',
      status: 'available',
      lessons: [
        {
          id: 'negative-inversion',
          title: 'Inversion with Negative Adverbials',
          content: `
            <h3>Emphatic Inversion with Negative Adverbials</h3>
            <p>Inversion for emphasis and formal style with negative expressions:</p>
            <p><strong>Never, rarely, seldom, hardly, scarcely, little, not only</strong></p>
            <p>When these begin a sentence, subject and auxiliary verb invert:</p>
            <ul>
              <li><strong>Never have I seen</strong> such dedication.</li>
              <li><strong>Rarely does she</strong> make mistakes.</li>
              <li><strong>Not only did he win</strong> the race, but he also broke the record.</li>
              <li><strong>Little did we know</strong> what awaited us.</li>
            </ul>
          `,
          examples: [
            'Seldom have I encountered such brilliance.',
            'Hardly had we arrived when the storm began.',
            'Not until midnight did the party end.',
            'Under no circumstances should you reveal this information.',
            'Only by working together can we solve this problem.',
            'So impressive was her speech that everyone applauded.'
          ],
          exercises: [
            {
              id: 'inv-1',
              type: 'fill-blank',
              question: 'Never ___ such a beautiful sunset.',
              correct: 'have I seen',
              explanation: 'Inversion: Never + auxiliary verb + subject + main verb'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // C1 Vocabulary Database (1000 words - Advanced level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Specialized Terminology (120 words)
    { word: 'paradigmatic', pronunciation: '/ˌpærədɪɡˈmætɪk/', meaning: 'serving as a typical example', example: 'Her research represents a paradigmatic shift in the field.', category: 'Specialized Terminology', mastered: false },
    { word: 'epistemological', pronunciation: '/ɪˌpɪstəməˈlɑːdʒɪkəl/', meaning: 'relating to the theory of knowledge', example: 'The study raises important epistemological questions.', category: 'Specialized Terminology', mastered: false },
    { word: 'hermeneutic', pronunciation: '/ˌhɜːrməˈnuːtɪk/', meaning: 'concerning interpretation', example: 'The hermeneutic approach revealed new meanings in the text.', category: 'Specialized Terminology', mastered: false },
    { word: 'quintessential', pronunciation: '/ˌkwɪntəˈsenʃəl/', meaning: 'representing the most perfect example', example: 'Shakespeare is the quintessential English playwright.', category: 'Specialized Terminology', mastered: false },
    { word: 'ubiquitous', pronunciation: '/juˈbɪkwətəs/', meaning: 'present everywhere', example: 'Smartphones have become ubiquitous in modern society.', category: 'Specialized Terminology', mastered: false },
    { word: 'hegemonic', pronunciation: '/ˌhedʒəˈmɑːnɪk/', meaning: 'having dominance or leadership', example: 'The hegemonic power influenced regional politics.', category: 'Specialized Terminology', mastered: false },
    { word: 'symbiotic', pronunciation: '/ˌsɪmbaɪˈɑːtɪk/', meaning: 'mutually beneficial relationship', example: 'There\'s a symbiotic relationship between the two organizations.', category: 'Specialized Terminology', mastered: false },
    { word: 'autonomous', pronunciation: '/ɔːˈtɑːnəməs/', meaning: 'having self-governance', example: 'The autonomous region has its own legislative powers.', category: 'Specialized Terminology', mastered: false },
    { word: 'dichotomous', pronunciation: '/daɪˈkɑːtəməs/', meaning: 'divided into two contrasting parts', example: 'The study revealed a dichotomous pattern in the data.', category: 'Specialized Terminology', mastered: false },
    { word: 'multifaceted', pronunciation: '/ˌmʌltiˈfæsətɪd/', meaning: 'having many different aspects', example: 'Climate change is a multifaceted global challenge.', category: 'Specialized Terminology', mastered: false },
    { word: 'empirical', pronunciation: '/ɪmˈpɪrɪkəl/', meaning: 'based on observation and experience', example: 'The theory lacks empirical support from research.', category: 'Specialized Terminology', mastered: false },
    { word: 'anthropocentric', pronunciation: '/ˌænθrəpoʊˈsentrɪk/', meaning: 'regarding humans as central', example: 'The anthropocentric worldview dominates Western philosophy.', category: 'Specialized Terminology', mastered: false },
    { word: 'dialectical', pronunciation: '/ˌdaɪəˈlektɪkəl/', meaning: 'relating to logical discussion', example: 'The philosophers engaged in dialectical reasoning.', category: 'Specialized Terminology', mastered: false },
    { word: 'phenomenological', pronunciation: '/fəˌnɑːmənoˈlɑːdʒɪkəl/', meaning: 'studying conscious experience', example: 'The phenomenological approach examines lived experience.', category: 'Specialized Terminology', mastered: false },
    { word: 'ontological', pronunciation: '/ˌɑːntəˈlɑːdʒɪkəl/', meaning: 'relating to the nature of being', example: 'The ontological argument for God\'s existence is debated.', category: 'Specialized Terminology', mastered: false },

    // Idiomatic Expressions (100 words)
    { word: 'watershed', pronunciation: '/ˈwɔːtərʃed/', meaning: 'turning point or dividing line', example: 'The election marked a watershed moment in politics.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'epitome', pronunciation: '/ɪˈpɪtəmi/', meaning: 'perfect example of something', example: 'She is the epitome of grace and elegance.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'catalyst', pronunciation: '/ˈkætəlɪst/', meaning: 'agent that provokes change', example: 'The scandal was a catalyst for reform.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'panacea', pronunciation: '/ˌpænəˈsiːə/', meaning: 'solution for all problems', example: 'Technology is not a panacea for educational challenges.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'anomaly', pronunciation: '/əˈnɑːməli/', meaning: 'something different from normal', example: 'The warm weather in winter was an anomaly.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'paradox', pronunciation: '/ˈpærədɑːks/', meaning: 'seemingly contradictory statement', example: 'It\'s a paradox that choice can sometimes paralyze.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'caveat', pronunciation: '/ˈkæviæt/', meaning: 'warning or qualification', example: 'The study shows promise, with the caveat that more research is needed.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'dichotomy', pronunciation: '/daɪˈkɑːtəmi/', meaning: 'division into two opposing parts', example: 'There\'s a false dichotomy between tradition and progress.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'trajectory', pronunciation: '/trəˈdʒektəri/', meaning: 'path or course of development', example: 'Her career trajectory has been consistently upward.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'rubric', pronunciation: '/ˈruːbrɪk/', meaning: 'set of criteria for assessment', example: 'The essay will be graded according to this rubric.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'impetus', pronunciation: '/ˈɪmpətəs/', meaning: 'driving force or motivation', example: 'The crisis provided the impetus for change.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'nexus', pronunciation: '/ˈneksəs/', meaning: 'connection or link', example: 'The nexus between poverty and crime requires examination.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'zeitgeist', pronunciation: '/ˈzaɪtɡaɪst/', meaning: 'spirit of the times', example: 'The novel captures the zeitgeist of the 1960s.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'juxtaposition', pronunciation: '/ˌdʒʌkstəpəˈzɪʃən/', meaning: 'placing things side by side', example: 'The juxtaposition of wealth and poverty was striking.', category: 'Idiomatic Expressions', mastered: false },
    { word: 'synthesis', pronunciation: '/ˈsɪnθəsɪs/', meaning: 'combination of ideas into a whole', example: 'Her book is a brilliant synthesis of competing theories.', category: 'Idiomatic Expressions', mastered: false },

    // Academic Language (150 words)
    { word: 'extrapolate', pronunciation: '/ɪkˈstræpəleɪt/', meaning: 'extend findings to make predictions', example: 'We can extrapolate from these results to predict future trends.', category: 'Academic Language', mastered: false },
    { word: 'substantiate', pronunciation: '/səbˈstænʃieɪt/', meaning: 'provide evidence to support', example: 'The claims must be substantiated with reliable data.', category: 'Academic Language', mastered: false },
    { word: 'corroborate', pronunciation: '/kəˈrɑːbəreɪt/', meaning: 'confirm with additional evidence', example: 'Independent studies corroborate these findings.', category: 'Academic Language', mastered: false },
    { word: 'juxtapose', pronunciation: '/ˈdʒʌkstəpoʊz/', meaning: 'place side by side for comparison', example: 'The author juxtaposes modern and traditional values.', category: 'Academic Language', mastered: false },
    { word: 'elucidate', pronunciation: '/ɪˈluːsɪdeɪt/', meaning: 'make clear by explaining', example: 'The professor elucidated the complex theory.', category: 'Academic Language', mastered: false },
    { word: 'proliferate', pronunciation: '/prəˈlɪfəreɪt/', meaning: 'increase rapidly in number', example: 'Social media platforms have proliferated in recent years.', category: 'Academic Language', mastered: false },
    { word: 'consolidate', pronunciation: '/kənˈsɑːlɪdeɪt/', meaning: 'strengthen by combining', example: 'The company consolidated its market position.', category: 'Academic Language', mastered: false },
    { word: 'perpetuate', pronunciation: '/pərˈpetʃueɪt/', meaning: 'make something continue indefinitely', example: 'These policies perpetuate social inequality.', category: 'Academic Language', mastered: false },
    { word: 'exacerbate', pronunciation: '/ɪɡˈzæsərbeɪt/', meaning: 'make a problem worse', example: 'The new regulations may exacerbate existing problems.', category: 'Academic Language', mastered: false },
    { word: 'mitigate', pronunciation: '/ˈmɪtɪɡeɪt/', meaning: 'make less severe', example: 'These measures should mitigate the environmental impact.', category: 'Academic Language', mastered: false },
    { word: 'reconcile', pronunciation: '/ˈrekənsaɪl/', meaning: 'make compatible or consistent', example: 'It\'s difficult to reconcile these conflicting accounts.', category: 'Academic Language', mastered: false },
    { word: 'scrutinize', pronunciation: '/ˈskruːtənaɪz/', meaning: 'examine closely and critically', example: 'Researchers scrutinized the experimental data.', category: 'Academic Language', mastered: false },
    { word: 'facilitate', pronunciation: '/fəˈsɪlɪteɪt/', meaning: 'make easier or help bring about', example: 'Technology can facilitate international collaboration.', category: 'Academic Language', mastered: false },
    { word: 'enumerate', pronunciation: '/ɪˈnuːməreɪt/', meaning: 'mention items one by one', example: 'The report enumerates several key recommendations.', category: 'Academic Language', mastered: false },
    { word: 'articulate', pronunciation: '/ɑːrˈtɪkjuleɪt/', meaning: 'express clearly and effectively', example: 'She articulated her position with precision.', category: 'Academic Language', mastered: false }
  ];

  const vocabularyCategories = [
    { name: 'Specialized Terminology', count: 120, color: 'bg-purple-700' },
    { name: 'Idiomatic Expressions', count: 100, color: 'bg-indigo-700' },
    { name: 'Academic Language', count: 150, color: 'bg-blue-700' },
    { name: 'Cultural References', count: 110, color: 'bg-green-700' },
    { name: 'Literary Devices', count: 90, color: 'bg-red-700' },
    { name: 'Philosophical Concepts', count: 130, color: 'bg-orange-700' },
    { name: 'Scientific Discourse', count: 140, color: 'bg-pink-700' },
    { name: 'Professional Registers', count: 160, color: 'bg-cyan-700' }
  ];

  const skillsActivities = [
    {
      id: 'reading-literature',
      type: 'Reading',
      title: 'Literary Analysis',
      description: 'Analyze complex literary works and interpret figurative language',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'listening-symposium',
      type: 'Listening',
      title: 'Academic Symposiums',
      description: 'Follow complex academic discussions and identify subtle arguments',
      difficulty: 'Advanced',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'writing-thesis',
      type: 'Writing',
      title: 'Thesis Arguments',
      description: 'Develop sophisticated arguments with nuanced evidence',
      difficulty: 'Advanced',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'speaking-conference',
      type: 'Speaking',
      title: 'Conference Presentations',
      description: 'Deliver academic presentations with complex visual data',
      difficulty: 'Advanced',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'reading-philosophy',
      type: 'Reading',
      title: 'Philosophical Texts',
      description: 'Interpret abstract philosophical arguments and concepts',
      difficulty: 'Advanced',
      time: '42 minutes',
      completed: false
    },
    {
      id: 'listening-documentary',
      type: 'Listening',
      title: 'Documentary Analysis',
      description: 'Analyze bias and perspective in complex documentaries',
      difficulty: 'Advanced',
      time: '38 minutes',
      completed: false
    },
    {
      id: 'writing-critique',
      type: 'Writing',
      title: 'Critical Reviews',
      description: 'Write sophisticated critiques of academic works',
      difficulty: 'Advanced',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'speaking-debate-advanced',
      type: 'Speaking',
      title: 'Formal Debates',
      description: 'Engage in structured academic debates with complex topics',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    }
  ];

  const canDoStatements = [
    'I can understand a wide range of demanding, longer texts and recognize implicit meaning',
    'I can express myself fluently and spontaneously without much obvious searching for expressions',
    'I can use language flexibly and effectively for social, academic and professional purposes',
    'I can produce clear, well-structured, detailed text on complex subjects',
    'I can present clear, detailed descriptions of complex subjects integrating sub-themes',
    'I can understand extended speech even when it is not clearly structured',
    'I can read complex factual and literary texts and appreciate distinctions of style',
    'I can express myself spontaneously at length with natural colloquial flow'
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
      newProgress.points += 15;
      saveProgress(newProgress);
    }
  };

  const playPronunciation = (word: string) => {
    console.log(`Playing pronunciation for: ${word}`);
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
              Can use language flexibly for social, academic and professional purposes.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 mb-2">
              <Crown className="w-6 h-6 text-yellow-600" />
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
          <Badge className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-lg px-6 py-3">
            C1 Advanced
          </Badge>
        </div>

        {/* Can-Do Statements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-700" />
              What You Can Do at C1 Level
            </CardTitle>
            <CardDescription>
              CEFR Can-Do Statements for Advanced learners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <CheckCircle className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{statement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-700" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/35</Badge>
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
                <Badge variant="secondary">{progress.masteredWords.length}/1000</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-green-700" />
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
                        {topic.lessons.length} sophisticated lessons - C1 Advanced
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
                                  {lesson.exercises.length} exercises • Advanced level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">C1</Badge>
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
            <Card>
              <CardHeader>
                <CardTitle>C1 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 1000 advanced words including specialized terminology, idiomatic expressions, and academic language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
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
                          <h4 className="font-medium text-sm">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">{category.count} words</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{selectedVocabCategory}</CardTitle>
                <CardDescription>
                  Advanced C1-level vocabulary for sophisticated academic and professional communication
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
                            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">C1</Badge>
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
                      <Badge className="bg-purple-700">C1</Badge>
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
                Comprehensive assessment to evaluate your C1-level mastery of sophisticated English
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-700" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">65 questions</p>
                    <Badge className="mt-2 bg-purple-700">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-indigo-700" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">70 questions</p>
                    <Badge className="mt-2 bg-purple-700">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-700" />
                    <h4 className="font-medium">Speaking Test</h4>
                    <p className="text-sm text-muted-foreground">Advanced tasks</p>
                    <Badge className="mt-2 bg-purple-700">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <PenTool className="w-8 h-8 mx-auto mb-2 text-red-700" />
                    <h4 className="font-medium">Writing Test</h4>
                    <p className="text-sm text-muted-foreground">Complex compositions</p>
                    <Badge className="mt-2 bg-purple-700">C1 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment/c1">Take C1 Assessment</Link>
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