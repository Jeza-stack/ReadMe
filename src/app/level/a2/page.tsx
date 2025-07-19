'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft } from 'lucide-react';

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

export default function A2Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Travel & Transportation');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('a2-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('a2-progress', JSON.stringify(newProgress));
  };

  // A2 Grammar Topics with Detailed Lessons (More Complex than A1)
  const grammarTopics = [
    {
      id: 'past-simple',
      topic: 'Past Simple Tense',
      status: 'available',
      lessons: [
        {
          id: 'past-regular',
          title: 'Past Simple - Regular Verbs',
          content: `
            <h3>Past Simple with Regular Verbs</h3>
            <p>We add -ed to most verbs to make the past simple:</p>
            <ul>
              <li><strong>work → worked</strong></li>
              <li><strong>play → played</strong></li>
              <li><strong>study → studied</strong> (y → ied)</li>
              <li><strong>stop → stopped</strong> (double consonant)</li>
            </ul>
            <p>Use past simple for completed actions in the past.</p>
          `,
          examples: [
            'I worked yesterday.',
            'She played tennis last week.',
            'We studied English for two hours.',
            'They visited Paris last month.',
            'He finished his homework.',
            'You called me this morning.'
          ],
          exercises: [
            {
              id: 'past-reg-1',
              type: 'fill-blank',
              question: 'I ___ (work) in London last year.',
              correct: 'worked',
              explanation: 'Add -ed to regular verbs for past simple.'
            },
            {
              id: 'past-reg-2',
              type: 'multiple-choice',
              question: 'She ___ her friend yesterday.',
              options: ['visit', 'visited', 'visiting'],
              correct: 1,
              explanation: 'Past simple: visited (regular verb + ed)'
            }
          ],
          completed: false
        },
        {
          id: 'past-irregular',
          title: 'Past Simple - Irregular Verbs',
          content: `
            <h3>Past Simple with Irregular Verbs</h3>
            <p>Some verbs don't follow the -ed pattern. You need to memorize them:</p>
            <ul>
              <li><strong>go → went</strong></li>
              <li><strong>come → came</strong></li>
              <li><strong>see → saw</strong></li>
              <li><strong>eat → ate</strong></li>
              <li><strong>drink → drank</strong></li>
              <li><strong>buy → bought</strong></li>
            </ul>
          `,
          examples: [
            'I went to the store.',
            'She came home late.',
            'We saw a movie.',
            'He ate breakfast.',
            'They drank coffee.',
            'You bought a new car.'
          ],
          exercises: [
            {
              id: 'past-irreg-1',
              type: 'multiple-choice',
              question: 'I ___ to the park yesterday.',
              options: ['goed', 'went', 'go'],
              correct: 1,
              explanation: 'Go → went (irregular verb)'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'future-plans',
      topic: 'Future Plans (going to)',
      status: 'available',
      lessons: [
        {
          id: 'going-to-structure',
          title: 'Going to - Structure and Use',
          content: `
            <h3>Future with "Going to"</h3>
            <p>We use "going to" for future plans and intentions:</p>
            <p><strong>Structure:</strong> Subject + am/is/are + going to + base verb</p>
            <ul>
              <li><strong>I am going to study</strong></li>
              <li><strong>She is going to travel</strong></li>
              <li><strong>We are going to meet</strong></li>
            </ul>
          `,
          examples: [
            'I am going to visit my grandmother.',
            'She is going to study medicine.',
            'We are going to have a party.',
            'They are going to move house.',
            'He is going to learn Spanish.',
            'You are going to love this movie.'
          ],
          exercises: [
            {
              id: 'going-to-1',
              type: 'fill-blank',
              question: 'She ___ going to travel next month.',
              correct: 'is',
              explanation: 'Use "is" with she, he, it in going to structure.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'comparatives',
      topic: 'Comparative Adjectives',
      status: 'available',
      lessons: [
        {
          id: 'comparative-forms',
          title: 'Making Comparisons',
          content: `
            <h3>Comparative Adjectives</h3>
            <p>We use comparatives to compare two things:</p>
            <ul>
              <li><strong>Short adjectives:</strong> add -er (tall → taller)</li>
              <li><strong>Long adjectives:</strong> use more (beautiful → more beautiful)</li>
              <li><strong>Irregular:</strong> good → better, bad → worse</li>
            </ul>
            <p>Always use "than" after comparatives.</p>
          `,
          examples: [
            'New York is bigger than Boston.',
            'This book is more interesting than that one.',
            'Coffee is better than tea for me.',
            'Today is worse than yesterday.',
            'She is taller than her sister.',
            'This car is more expensive than that one.'
          ],
          exercises: [
            {
              id: 'comp-1',
              type: 'multiple-choice',
              question: 'This test is ___ than the last one.',
              options: ['more easy', 'easier', 'more easier'],
              correct: 1,
              explanation: 'Easy → easier (short adjective + er)'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // A2 Vocabulary Database (200 words, more advanced than A1)
  const vocabularyDatabase: VocabularyWord[] = [
    // Travel & Transportation (30 words)
    { word: 'airport', pronunciation: '/ˈerpɔːrt/', meaning: 'place where planes take off and land', example: 'I will meet you at the airport.', category: 'Travel & Transportation', mastered: false },
    { word: 'passport', pronunciation: '/ˈpæspɔːrt/', meaning: 'document for international travel', example: 'Don\'t forget your passport!', category: 'Travel & Transportation', mastered: false },
    { word: 'ticket', pronunciation: '/ˈtɪkɪt/', meaning: 'paper to board transport', example: 'I bought a train ticket.', category: 'Travel & Transportation', mastered: false },
    { word: 'luggage', pronunciation: '/ˈlʌɡɪdʒ/', meaning: 'bags and suitcases', example: 'My luggage is heavy.', category: 'Travel & Transportation', mastered: false },
    { word: 'hotel', pronunciation: '/hoʊˈtel/', meaning: 'place to stay when traveling', example: 'We stayed at a nice hotel.', category: 'Travel & Transportation', mastered: false },
    { word: 'reservation', pronunciation: '/ˌrezərˈveɪʃən/', meaning: 'booking in advance', example: 'I made a reservation for dinner.', category: 'Travel & Transportation', mastered: false },
    { word: 'platform', pronunciation: '/ˈplætfɔːrm/', meaning: 'train station boarding area', example: 'The train leaves from platform 3.', category: 'Travel & Transportation', mastered: false },
    { word: 'departure', pronunciation: '/dɪˈpɑːrtʃər/', meaning: 'leaving time', example: 'The departure time is 3 PM.', category: 'Travel & Transportation', mastered: false },
    { word: 'arrival', pronunciation: '/əˈraɪvəl/', meaning: 'coming time', example: 'The arrival time is 5 PM.', category: 'Travel & Transportation', mastered: false },
    { word: 'journey', pronunciation: '/ˈdʒɜːrni/', meaning: 'trip from one place to another', example: 'It was a long journey.', category: 'Travel & Transportation', mastered: false },
    { word: 'destination', pronunciation: '/ˌdestɪˈneɪʃən/', meaning: 'place you are going to', example: 'Paris is our destination.', category: 'Travel & Transportation', mastered: false },
    { word: 'taxi', pronunciation: '/ˈtæksi/', meaning: 'car for hire', example: 'I took a taxi to work.', category: 'Travel & Transportation', mastered: false },
    { word: 'subway', pronunciation: '/ˈsʌbweɪ/', meaning: 'underground train', example: 'The subway is fast.', category: 'Travel & Transportation', mastered: false },
    { word: 'bicycle', pronunciation: '/ˈbaɪsɪkəl/', meaning: 'two-wheeled vehicle', example: 'I ride my bicycle to work.', category: 'Travel & Transportation', mastered: false },
    { word: 'motorcycle', pronunciation: '/ˈmoʊtərsaɪkəl/', meaning: 'motorized two-wheeler', example: 'He has a red motorcycle.', category: 'Travel & Transportation', mastered: false },
    { word: 'highway', pronunciation: '/ˈhaɪweɪ/', meaning: 'main road', example: 'We drove on the highway.', category: 'Travel & Transportation', mastered: false },
    { word: 'bridge', pronunciation: '/brɪdʒ/', meaning: 'structure over water/road', example: 'The bridge is very old.', category: 'Travel & Transportation', mastered: false },
    { word: 'tunnel', pronunciation: '/ˈtʌnəl/', meaning: 'underground passage', example: 'We went through a tunnel.', category: 'Travel & Transportation', mastered: false },
    { word: 'traffic', pronunciation: '/ˈtræfɪk/', meaning: 'cars on the road', example: 'There\'s heavy traffic today.', category: 'Travel & Transportation', mastered: false },
    { word: 'parking', pronunciation: '/ˈpɑːrkɪŋ/', meaning: 'place to leave your car', example: 'Parking is expensive here.', category: 'Travel & Transportation', mastered: false },

    // Shopping & Money (25 words)
    { word: 'price', pronunciation: '/praɪs/', meaning: 'cost of something', example: 'What\'s the price of this shirt?', category: 'Shopping & Money', mastered: false },
    { word: 'discount', pronunciation: '/ˈdɪskaʊnt/', meaning: 'reduced price', example: 'There\'s a 20% discount today.', category: 'Shopping & Money', mastered: false },
    { word: 'receipt', pronunciation: '/rɪˈsiːt/', meaning: 'proof of purchase', example: 'Keep your receipt.', category: 'Shopping & Money', mastered: false },
    { word: 'cashier', pronunciation: '/kæˈʃɪr/', meaning: 'person who takes payment', example: 'The cashier was very friendly.', category: 'Shopping & Money', mastered: false },
    { word: 'credit card', pronunciation: '/ˈkredɪt kɑːrd/', meaning: 'plastic money card', example: 'I paid with my credit card.', category: 'Shopping & Money', mastered: false },
    { word: 'cash', pronunciation: '/kæʃ/', meaning: 'physical money', example: 'Do you have cash?', category: 'Shopping & Money', mastered: false },
    { word: 'change', pronunciation: '/tʃeɪndʒ/', meaning: 'money returned', example: 'Here\'s your change.', category: 'Shopping & Money', mastered: false },
    { word: 'wallet', pronunciation: '/ˈwɑːlɪt/', meaning: 'small bag for money', example: 'I lost my wallet!', category: 'Shopping & Money', mastered: false },
    { word: 'purse', pronunciation: '/pɜːrs/', meaning: 'woman\'s small bag', example: 'She put the keys in her purse.', category: 'Shopping & Money', mastered: false },
    { word: 'expensive', pronunciation: '/ɪkˈspensɪv/', meaning: 'costs a lot', example: 'This watch is very expensive.', category: 'Shopping & Money', mastered: false },
    { word: 'cheap', pronunciation: '/tʃiːp/', meaning: 'costs little', example: 'I found a cheap restaurant.', category: 'Shopping & Money', mastered: false },
    { word: 'bargain', pronunciation: '/ˈbɑːrɡɪn/', meaning: 'good deal', example: 'This shirt is a real bargain.', category: 'Shopping & Money', mastered: false },
    { word: 'department store', pronunciation: '/dɪˈpɑːrtmənt stɔːr/', meaning: 'large shop with many sections', example: 'I shop at the department store.', category: 'Shopping & Money', mastered: false },
    { word: 'mall', pronunciation: '/mɔːl/', meaning: 'shopping center', example: 'Let\'s go to the mall.', category: 'Shopping & Money', mastered: false },
    { word: 'size', pronunciation: '/saɪz/', meaning: 'how big something is', example: 'What size do you wear?', category: 'Shopping & Money', mastered: false },
    { word: 'fitting room', pronunciation: '/ˈfɪtɪŋ ruːm/', meaning: 'place to try on clothes', example: 'The fitting room is over there.', category: 'Shopping & Money', mastered: false },
    { word: 'sale', pronunciation: '/seɪl/', meaning: 'special low prices', example: 'There\'s a big sale this week.', category: 'Shopping & Money', mastered: false },
    { word: 'customer', pronunciation: '/ˈkʌstəmər/', meaning: 'person who buys', example: 'The customer is always right.', category: 'Shopping & Money', mastered: false },
    { word: 'shop assistant', pronunciation: '/ʃɑːp əˈsɪstənt/', meaning: 'person who helps in shop', example: 'The shop assistant was helpful.', category: 'Shopping & Money', mastered: false },
    { word: 'queue', pronunciation: '/kjuː/', meaning: 'line of waiting people', example: 'There\'s a long queue.', category: 'Shopping & Money', mastered: false },

    // Weather & Seasons (20 words)
    { word: 'weather', pronunciation: '/ˈweðər/', meaning: 'outdoor conditions', example: 'The weather is nice today.', category: 'Weather & Seasons', mastered: false },
    { word: 'temperature', pronunciation: '/ˈtemprətʃər/', meaning: 'how hot or cold', example: 'The temperature is 25 degrees.', category: 'Weather & Seasons', mastered: false },
    { word: 'sunny', pronunciation: '/ˈsʌni/', meaning: 'with bright sunshine', example: 'It\'s a sunny day.', category: 'Weather & Seasons', mastered: false },
    { word: 'cloudy', pronunciation: '/ˈklaʊdi/', meaning: 'with many clouds', example: 'It\'s cloudy but warm.', category: 'Weather & Seasons', mastered: false },
    { word: 'rainy', pronunciation: '/ˈreɪni/', meaning: 'with rain falling', example: 'It\'s a rainy morning.', category: 'Weather & Seasons', mastered: false },
    { word: 'snowy', pronunciation: '/ˈsnoʊi/', meaning: 'with snow falling', example: 'It\'s snowy outside.', category: 'Weather & Seasons', mastered: false },
    { word: 'windy', pronunciation: '/ˈwɪndi/', meaning: 'with strong wind', example: 'It\'s very windy today.', category: 'Weather & Seasons', mastered: false },
    { word: 'foggy', pronunciation: '/ˈfɔːɡi/', meaning: 'with thick fog', example: 'It\'s too foggy to drive.', category: 'Weather & Seasons', mastered: false },
    { word: 'storm', pronunciation: '/stɔːrm/', meaning: 'violent weather', example: 'There was a big storm last night.', category: 'Weather & Seasons', mastered: false },
    { word: 'rainbow', pronunciation: '/ˈreɪnboʊ/', meaning: 'colorful arc in sky', example: 'Look at that beautiful rainbow!', category: 'Weather & Seasons', mastered: false },
    { word: 'spring', pronunciation: '/sprɪŋ/', meaning: 'season after winter', example: 'Flowers bloom in spring.', category: 'Weather & Seasons', mastered: false },
    { word: 'summer', pronunciation: '/ˈsʌmər/', meaning: 'hottest season', example: 'I love swimming in summer.', category: 'Weather & Seasons', mastered: false },
    { word: 'autumn', pronunciation: '/ˈɔːtəm/', meaning: 'season before winter', example: 'Leaves fall in autumn.', category: 'Weather & Seasons', mastered: false },
    { word: 'winter', pronunciation: '/ˈwɪntər/', meaning: 'coldest season', example: 'It snows in winter.', category: 'Weather & Seasons', mastered: false },
    { word: 'umbrella', pronunciation: '/ʌmˈbrelə/', meaning: 'protection from rain', example: 'Take an umbrella!', category: 'Weather & Seasons', mastered: false },
    { word: 'coat', pronunciation: '/koʊt/', meaning: 'warm outer clothing', example: 'Wear a coat, it\'s cold.', category: 'Weather & Seasons', mastered: false },
    { word: 'scarf', pronunciation: '/skɑːrf/', meaning: 'cloth around neck', example: 'This scarf is warm.', category: 'Weather & Seasons', mastered: false },
    { word: 'gloves', pronunciation: '/ɡlʌvz/', meaning: 'hand coverings', example: 'I need winter gloves.', category: 'Weather & Seasons', mastered: false },
    { word: 'boots', pronunciation: '/buːts/', meaning: 'waterproof shoes', example: 'Wear boots in the snow.', category: 'Weather & Seasons', mastered: false },
    { word: 'forecast', pronunciation: '/ˈfɔːrkæst/', meaning: 'weather prediction', example: 'Check the weather forecast.', category: 'Weather & Seasons', mastered: false }
  ];

  const vocabularyCategories = [
    { name: 'Travel & Transportation', count: 30, color: 'bg-blue-500' },
    { name: 'Shopping & Money', count: 25, color: 'bg-green-500' },
    { name: 'Weather & Seasons', count: 20, color: 'bg-purple-500' },
    { name: 'Health & Body', count: 25, color: 'bg-red-500' },
    { name: 'Entertainment & Hobbies', count: 30, color: 'bg-orange-500' },
    { name: 'Education & Work', count: 25, color: 'bg-indigo-500' }
  ];

  const skillsActivities = [
    {
      id: 'reading-travel',
      type: 'Reading',
      title: 'Travel Brochures',
      description: 'Read travel information and plan a trip',
      difficulty: 'Elementary',
      time: '15 minutes',
      completed: false
    },
    {
      id: 'listening-shopping',
      type: 'Listening',
      title: 'Shopping Conversations',
      description: 'Listen to people buying things in shops',
      difficulty: 'Elementary',
      time: '12 minutes',
      completed: false
    },
    {
      id: 'writing-email',
      type: 'Writing',
      title: 'Write an Email to a Friend',
      description: 'Tell your friend about your weekend plans',
      difficulty: 'Elementary',
      time: '20 minutes',
      completed: false
    },
    {
      id: 'speaking-directions',
      type: 'Speaking',
      title: 'Asking for Directions',
      description: 'Practice asking for and giving directions',
      difficulty: 'Elementary',
      time: '15 minutes',
      completed: false
    },
    {
      id: 'reading-news',
      type: 'Reading',
      title: 'Simple News Articles',
      description: 'Read short news stories and answer questions',
      difficulty: 'Elementary',
      time: '18 minutes',
      completed: false
    },
    {
      id: 'listening-weather',
      type: 'Listening',
      title: 'Weather Reports',
      description: 'Listen to weather forecasts',
      difficulty: 'Elementary',
      time: '10 minutes',
      completed: false
    }
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      newProgress.grammarProgress = Math.min(100, newProgress.grammarProgress + (100 / 15)); // 15 total lessons for A2
      newProgress.points += 15;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      newProgress.vocabularyProgress = Math.min(100, newProgress.vocabularyProgress + (100 / 200)); // 200 total words for A2
      newProgress.points += 8;
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
              A2 Elementary Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can communicate in simple and routine tasks requiring direct exchange of information.
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
          <Badge className="bg-gradient-to-r from-green-400 to-green-600 text-white text-lg px-6 py-3">
            A2 Elementary
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
                <Badge variant="secondary">{progress.completedLessons.length}/15</Badge>
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
                <Badge variant="secondary">{progress.masteredWords.length}/200</Badge>
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
                <Badge variant="secondary">0/20</Badge>
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
                        {topic.lessons.length} interactive lessons - A2 Level
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
                               isCompleted ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' : 
                               'hover:bg-muted/50'
                             }`}
                             onClick={() => setSelectedLesson(`${topic.id}-${lesson.id}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.exercises.length} exercises • Elementary level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">A2</Badge>
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
                <CardTitle>A2 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 200 essential A2-level English words with more complex themes
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
                  A2-level vocabulary with practical examples and pronunciation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getWordsForCategory(selectedVocabCategory).map((wordItem) => {
                    const isMastered = progress.masteredWords.includes(wordItem.word);
                    
                    return (
                      <div key={wordItem.word} 
                           className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                             isMastered ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' : ''
                           }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{wordItem.word}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">A2</Badge>
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
                            Mark as Mastered (+8 points)
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
                      <Badge className="bg-green-500">A2</Badge>
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
                    Start Elementary Activity
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
              <CardTitle>A2 Elementary Assessment</CardTitle>
              <CardDescription>
                Test your A2-level knowledge with comprehensive assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">35 questions</p>
                    <Badge className="mt-2 bg-green-500">A2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">40 questions</p>
                    <Badge className="mt-2 bg-green-500">A2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">6 sections</p>
                    <Badge className="mt-2 bg-green-500">A2 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take A2 Assessment</Link>
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
            <Link href="/level/a1">
              <ArrowLeft className="mr-2 w-4 h-4" />
              A1 Beginner
            </Link>
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Next Level</p>
          <Button asChild variant="outline">
            <Link href="/level/b1">
              B1 Intermediate <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}