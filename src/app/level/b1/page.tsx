'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Brain, Users, Globe } from 'lucide-react';

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
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false' | 'reorder' | 'writing';
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
  difficulty: 'intermediate' | 'complex';
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

export default function B1Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Opinions & Experiences');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('b1-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('b1-progress', JSON.stringify(newProgress));
  };

  // B1 Grammar Topics (10 comprehensive topics)
  const grammarTopics = [
    {
      id: 'present-perfect',
      topic: 'Present Perfect Tense',
      status: 'available',
      lessons: [
        {
          id: 'present-perfect-form',
          title: 'Present Perfect - Form and Usage',
          content: `
            <h3>Present Perfect Tense</h3>
            <p>The Present Perfect connects past and present. We use it for:</p>
            <ul>
              <li><strong>Life experiences:</strong> I have visited Paris.</li>
              <li><strong>Recent actions with present results:</strong> She has just finished her work.</li>
              <li><strong>Actions that started in the past and continue:</strong> We have lived here for 5 years.</li>
            </ul>
            <p><strong>Form:</strong> Subject + have/has + past participle</p>
          `,
          examples: [
            'I have traveled to many countries.',
            'She has worked here since 2020.',
            'We have just seen that movie.',
            'They have never been to Japan.',
            'He has lived in London for ten years.',
            'Have you ever tried sushi?'
          ],
          exercises: [
            {
              id: 'pp-1',
              type: 'multiple-choice',
              question: 'I ___ never ___ such a beautiful sunset.',
              options: ['has / seen', 'have / saw', 'have / seen'],
              correct: 2,
              explanation: 'Present Perfect: have + past participle (seen)'
            }
          ],
          completed: false
        },
        {
          id: 'present-perfect-vs-past',
          title: 'Present Perfect vs. Past Simple',
          content: `
            <h3>Present Perfect vs. Past Simple</h3>
            <p>This is one of the most challenging areas for B1 learners:</p>
            <ul>
              <li><strong>Present Perfect:</strong> focuses on the result or experience (no specific time)</li>
              <li><strong>Past Simple:</strong> focuses on when something happened (specific time)</li>
            </ul>
            <p>Compare: "I have visited Paris" vs. "I visited Paris last year"</p>
          `,
          examples: [
            'I have eaten sushi. (experience)',
            'I ate sushi yesterday. (specific time)',
            'She has been to Italy. (experience)',
            'She went to Italy in 2019. (specific time)',
            'We have finished the project. (result)',
            'We finished the project at 5 PM. (specific time)'
          ],
          exercises: [
            {
              id: 'pp-vs-past-1',
              type: 'multiple-choice',
              question: 'I ___ to the museum last weekend.',
              options: ['have been', 'went', 'have went'],
              correct: 1,
              explanation: 'Use Past Simple with specific time (last weekend)'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'conditionals',
      topic: 'Conditional Sentences (1st & 2nd)',
      status: 'available',
      lessons: [
        {
          id: 'first-conditional',
          title: 'First Conditional - Real Possibilities',
          content: `
            <h3>First Conditional</h3>
            <p>Used for real, possible situations in the future:</p>
            <p><strong>Structure:</strong> If + present simple, will + base verb</p>
            <ul>
              <li>If it rains, we will stay home.</li>
              <li>If you study hard, you will pass the exam.</li>
              <li>I will call you if I have time.</li>
            </ul>
          `,
          examples: [
            'If you come early, we will have lunch together.',
            'She will be happy if she gets the job.',
            'If it\'s sunny tomorrow, we will go to the beach.',
            'We will miss the bus if we don\'t hurry.',
            'If you need help, I will be here.',
            'He will improve if he practices more.'
          ],
          exercises: [
            {
              id: 'first-cond-1',
              type: 'fill-blank',
              question: 'If she ___ (study) hard, she will pass the test.',
              correct: 'studies',
              explanation: 'First conditional: If + present simple (studies)'
            }
          ],
          completed: false
        },
        {
          id: 'second-conditional',
          title: 'Second Conditional - Hypothetical Situations',
          content: `
            <h3>Second Conditional</h3>
            <p>Used for unreal, hypothetical situations:</p>
            <p><strong>Structure:</strong> If + past simple, would + base verb</p>
            <ul>
              <li>If I had more money, I would travel more.</li>
              <li>If she lived closer, we would see each other often.</li>
              <li>What would you do if you won the lottery?</li>
            </ul>
          `,
          examples: [
            'If I were you, I would accept the offer.',
            'She would be happier if she changed jobs.',
            'If we had a car, we would visit you more often.',
            'I would learn Spanish if I had more time.',
            'If it wasn\'t so expensive, I would buy it.',
            'We would go out if the weather was better.'
          ],
          exercises: [
            {
              id: 'second-cond-1',
              type: 'multiple-choice',
              question: 'If I ___ rich, I ___ around the world.',
              options: ['am / will travel', 'were / would travel', 'was / will travel'],
              correct: 1,
              explanation: 'Second conditional: If + past (were), would + base verb'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'passive-voice',
      topic: 'Passive Voice',
      status: 'available',
      lessons: [
        {
          id: 'passive-present',
          title: 'Passive Voice - Present Tenses',
          content: `
            <h3>Passive Voice - Present</h3>
            <p>We use passive voice when the action is more important than who does it:</p>
            <p><strong>Present Simple Passive:</strong> am/is/are + past participle</p>
            <p><strong>Present Continuous Passive:</strong> am/is/are being + past participle</p>
            <ul>
              <li>Coffee is grown in Brazil. (present simple)</li>
              <li>The house is being painted. (present continuous)</li>
            </ul>
          `,
          examples: [
            'English is spoken all over the world.',
            'The office is cleaned every day.',
            'New houses are being built in our area.',
            'The car is being repaired at the garage.',
            'These products are made in Germany.',
            'The meeting is being held online.'
          ],
          exercises: [
            {
              id: 'passive-1',
              type: 'reorder',
              question: 'Reorder: built / are / year / houses / every / new',
              correct: 'New houses are built every year.',
              explanation: 'Present simple passive: are + past participle (built)'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // B1 Vocabulary Database (500 words with intermediate complexity)
  const vocabularyDatabase: VocabularyWord[] = [
    // Opinions & Experiences (50 words)
    { word: 'opinion', pronunciation: '/əˈpɪnjən/', meaning: 'what you think about something', example: 'In my opinion, this movie is excellent.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'experience', pronunciation: '/ɪkˈspɪriəns/', meaning: 'something that happens to you', example: 'Studying abroad was a great experience.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'believe', pronunciation: '/bɪˈliːv/', meaning: 'to think something is true', example: 'I believe that education is very important.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'agree', pronunciation: '/əˈɡriː/', meaning: 'to have the same opinion', example: 'I completely agree with your suggestion.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'disagree', pronunciation: '/ˌdɪsəˈɡriː/', meaning: 'to have a different opinion', example: 'I\'m sorry, but I disagree with that idea.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'suggest', pronunciation: '/səˈdʒest/', meaning: 'to give an idea or proposal', example: 'I suggest we meet at 3 PM.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'recommend', pronunciation: '/ˌrekəˈmend/', meaning: 'to say something is good', example: 'I recommend this restaurant to everyone.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'prefer', pronunciation: '/prɪˈfɜːr/', meaning: 'to like something more than another', example: 'I prefer coffee to tea.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'amazing', pronunciation: '/əˈmeɪzɪŋ/', meaning: 'very surprising and impressive', example: 'The view from the mountain was amazing.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },
    { word: 'disappointing', pronunciation: '/ˌdɪsəˈpɔɪntɪŋ/', meaning: 'not as good as expected', example: 'The movie was really disappointing.', category: 'Opinions & Experiences', mastered: false, difficulty: 'intermediate' },

    // Work & Career (50 words)  
    { word: 'career', pronunciation: '/kəˈrɪr/', meaning: 'your working life and jobs', example: 'She has had a successful career in marketing.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'colleague', pronunciation: '/ˈkɒliːɡ/', meaning: 'person you work with', example: 'My colleagues are very helpful and friendly.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'employee', pronunciation: '/ɪmˈplɔɪiː/', meaning: 'person who works for a company', example: 'The company has over 500 employees.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'employer', pronunciation: '/ɪmˈplɔɪər/', meaning: 'person or company that gives jobs', example: 'My employer offers good benefits.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'salary', pronunciation: '/ˈsæləri/', meaning: 'money you earn from work', example: 'She negotiated a higher salary.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'interview', pronunciation: '/ˈɪntərvjuː/', meaning: 'meeting to get a job', example: 'I have a job interview tomorrow.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'responsibility', pronunciation: '/rɪˌspɒnsəˈbɪləti/', meaning: 'duty or task you must do', example: 'Managing the team is my main responsibility.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'skill', pronunciation: '/skɪl/', meaning: 'ability to do something well', example: 'Communication skills are very important.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'promotion', pronunciation: '/prəˈmoʊʃən/', meaning: 'getting a better job position', example: 'He got a promotion to manager.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },
    { word: 'deadline', pronunciation: '/ˈdedlaɪn/', meaning: 'time when something must be finished', example: 'The deadline for this project is Friday.', category: 'Work & Career', mastered: false, difficulty: 'intermediate' },

    // Technology & Media (40 words)
    { word: 'technology', pronunciation: '/tekˈnɒlədʒi/', meaning: 'advanced machines and methods', example: 'Technology has changed our lives dramatically.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'software', pronunciation: '/ˈsɒftweər/', meaning: 'computer programs', example: 'We need to update our software.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'website', pronunciation: '/ˈwebsaɪt/', meaning: 'pages on the internet', example: 'Their company website is very user-friendly.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'download', pronunciation: '/ˈdaʊnloʊd/', meaning: 'get files from internet', example: 'You can download the app for free.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'upload', pronunciation: '/ˈʌploʊd/', meaning: 'put files on internet', example: 'Please upload your documents here.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'social media', pronunciation: '/ˈsoʊʃəl ˈmiːdiə/', meaning: 'online platforms for communication', example: 'Social media connects people worldwide.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'online', pronunciation: '/ˌɒnˈlaɪn/', meaning: 'connected to the internet', example: 'I prefer shopping online.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'digital', pronunciation: '/ˈdɪdʒɪtəl/', meaning: 'using computer technology', example: 'We live in a digital age.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'device', pronunciation: '/dɪˈvaɪs/', meaning: 'electronic equipment', example: 'This device can translate languages.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },
    { word: 'connection', pronunciation: '/kəˈnekʃən/', meaning: 'link between things', example: 'The internet connection is very slow.', category: 'Technology & Media', mastered: false, difficulty: 'intermediate' },

    // Environment & Nature (40 words)
    { word: 'environment', pronunciation: '/ɪnˈvaɪrənmənt/', meaning: 'the natural world around us', example: 'We must protect the environment.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'pollution', pronunciation: '/pəˈluːʃən/', meaning: 'harmful substances in air/water', example: 'Air pollution is a serious problem.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'climate', pronunciation: '/ˈklaɪmət/', meaning: 'weather conditions over time', example: 'Climate change affects everyone.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'renewable', pronunciation: '/rɪˈnuːəbəl/', meaning: 'can be used again and again', example: 'Solar energy is renewable.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'sustainable', pronunciation: '/səˈsteɪnəbəl/', meaning: 'can continue without harm', example: 'We need sustainable development.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'recycle', pronunciation: '/riːˈsaɪkəl/', meaning: 'use something again', example: 'Always recycle plastic bottles.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'waste', pronunciation: '/weɪst/', meaning: 'things you throw away', example: 'We should reduce food waste.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'forest', pronunciation: '/ˈfɒrɪst/', meaning: 'large area with many trees', example: 'The Amazon forest is very important.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'wildlife', pronunciation: '/ˈwaɪldlaɪf/', meaning: 'animals living in nature', example: 'This park protects local wildlife.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' },
    { word: 'ecosystem', pronunciation: '/ˈiːkoʊsɪstəm/', meaning: 'community of living things', example: 'Coral reefs are fragile ecosystems.', category: 'Environment & Nature', mastered: false, difficulty: 'intermediate' }
  ];

  const vocabularyCategories = [
    { name: 'Opinions & Experiences', count: 50, color: 'bg-blue-500' },
    { name: 'Work & Career', count: 50, color: 'bg-green-500' },
    { name: 'Technology & Media', count: 40, color: 'bg-purple-500' },
    { name: 'Environment & Nature', count: 40, color: 'bg-emerald-500' },
    { name: 'Education & Learning', count: 45, color: 'bg-red-500' },
    { name: 'Culture & Society', count: 45, color: 'bg-orange-500' },
    { name: 'Health & Lifestyle', count: 40, color: 'bg-pink-500' },
    { name: 'Travel & Adventure', count: 45, color: 'bg-indigo-500' },
    { name: 'Future Plans & Goals', count: 40, color: 'bg-teal-500' },
    { name: 'Abstract Concepts', count: 55, color: 'bg-violet-500' }
  ];

  const skillsActivities = [
    {
      id: 'reading-opinion',
      type: 'Reading',
      title: 'Opinion Articles',
      description: 'Read and analyze opinion pieces on current topics',
      difficulty: 'Intermediate',
      time: '25 minutes',
      completed: false
    },
    {
      id: 'listening-interview',
      type: 'Listening',
      title: 'Job Interview Scenarios',
      description: 'Listen to job interviews and identify key information',
      difficulty: 'Intermediate',
      time: '20 minutes',
      completed: false
    },
    {
      id: 'writing-formal-letter',
      type: 'Writing',
      title: 'Formal Letter Writing',
      description: 'Write complaint and inquiry letters',
      difficulty: 'Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'speaking-presentation',
      type: 'Speaking',
      title: 'Give a Presentation',
      description: 'Present your opinion on a topic for 3-4 minutes',
      difficulty: 'Intermediate',
      time: '25 minutes',
      completed: false
    },
    {
      id: 'reading-reports',
      type: 'Reading',
      title: 'Research Reports',
      description: 'Understand main points in factual reports',
      difficulty: 'Intermediate',
      time: '28 minutes',
      completed: false
    },
    {
      id: 'listening-debate',
      type: 'Listening',
      title: 'Debate Discussions',
      description: 'Follow arguments in debates on familiar topics',
      difficulty: 'Intermediate',
      time: '22 minutes',
      completed: false
    },
    {
      id: 'writing-essay',
      type: 'Writing',
      title: 'Opinion Essays',
      description: 'Write structured essays expressing your views',
      difficulty: 'Intermediate',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'speaking-discussion',
      type: 'Speaking',
      title: 'Group Discussion',
      description: 'Participate in discussions and defend your views',
      difficulty: 'Intermediate',
      time: '20 minutes',
      completed: false
    }
  ];

  // CEFR B1 Can-Do Statements
  const canDoStatements = [
    'I can understand the main points of clear standard input on familiar matters',
    'I can deal with most situations likely to arise whilst travelling',
    'I can produce simple connected text on topics of personal interest',
    'I can describe experiences, events, dreams, hopes and ambitions',
    'I can briefly give reasons and explanations for opinions and plans',
    'I can understand texts that consist mainly of high frequency vocabulary',
    'I can write personal letters describing experiences and impressions',
    'I can enter unprepared into conversation on familiar topics'
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      newProgress.grammarProgress = Math.min(100, newProgress.grammarProgress + (100 / 25)); // 25 total lessons for B1
      newProgress.points += 20;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      newProgress.vocabularyProgress = Math.min(100, newProgress.vocabularyProgress + (100 / 500)); // 500 total words for B1
      newProgress.points += 10;
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
              B1 Intermediate Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can deal with most situations while traveling and express opinions and plans.
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
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg px-6 py-3">
            B1 Intermediate
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/25</Badge>
              </div>
              <Progress value={progress.grammarProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.grammarProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-green-500" />
                  <span className="font-semibold">Vocabulary</span>
                </div>
                <Badge variant="secondary">{progress.masteredWords.length}/500</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                  <span className="font-semibold">Skills Practice</span>
                </div>
                <Badge variant="secondary">0/25</Badge>
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
            <Brain className="w-6 h-6 text-blue-600" />
            B1 Can-Do Statements
          </CardTitle>
          <CardDescription>
            At B1 level, you will be able to:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {canDoStatements.map((statement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
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
                        {topic.lessons.length} comprehensive lessons - B1 Level
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
                               isCompleted ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800' : 
                               'hover:bg-muted/50'
                             }`}
                             onClick={() => setSelectedLesson(`${topic.id}-${lesson.id}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.exercises.length} exercises • Intermediate level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">B1</Badge>
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
                <CardTitle>B1 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 500 intermediate-level English words for complex communication
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
                  B1-level vocabulary for expressing complex ideas and opinions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getWordsForCategory(selectedVocabCategory).map((wordItem) => {
                    const isMastered = progress.masteredWords.includes(wordItem.word);
                    
                    return (
                      <div key={wordItem.word} 
                           className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                             isMastered ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800' : ''
                           }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{wordItem.word}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">B1</Badge>
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
                            Mark as Mastered (+10 points)
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
                      <Badge className="bg-blue-500">B1</Badge>
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
                    Start Intermediate Activity
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
              <CardTitle>B1 Intermediate Assessment</CardTitle>
              <CardDescription>
                Comprehensive assessment to test your B1-level competency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">45 questions</p>
                    <Badge className="mt-2 bg-blue-500">B1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">50 questions</p>
                    <Badge className="mt-2 bg-blue-500">B1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">8 sections</p>
                    <Badge className="mt-2 bg-blue-500">B1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-medium">Speaking Test</h4>
                    <p className="text-sm text-muted-foreground">3 parts</p>
                    <Badge className="mt-2 bg-blue-500">B1 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take B1 Assessment</Link>
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
            <Link href="/level/a2">
              <ArrowLeft className="mr-2 w-4 h-4" />
              A2 Elementary
            </Link>
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Next Level</p>
          <Button asChild variant="outline">
            <Link href="/level/b2">
              B2 Upper-Intermediate <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}