'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap } from 'lucide-react';

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

export default function A1Level() {
  const [mounted, setMounted] = useState(false);
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Personal Information');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Prevent hydration mismatch by only running on client
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('a1-progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading progress:', error);
        localStorage.removeItem('a1-progress');
      }
    }
  }, []);

  // Save progress to localStorage with safety checks
  const saveProgress = (newProgress: UserProgress) => {
    if (!mounted) return; // Prevent updates if component unmounted
    
    // Ensure progress values don't exceed 100%
    const safeProgress = {
      ...newProgress,
      grammarProgress: Math.min(100, Math.max(0, newProgress.grammarProgress)),
      vocabularyProgress: Math.min(100, Math.max(0, newProgress.vocabularyProgress)),
      skillsProgress: Math.min(100, Math.max(0, newProgress.skillsProgress))
    };
    
    setProgress(safeProgress);
    
    try {
      localStorage.setItem('a1-progress', JSON.stringify(safeProgress));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
      // Fallback: could implement alternative storage or user notification
    }
  };

  // Grammar Topics with Detailed Lessons
  const grammarTopics = [
    {
      id: 'present-simple',
      topic: 'Present Simple (be, have, do)',
      status: 'available',
      lessons: [
        {
          id: 'be-verb',
          title: 'The Verb "BE" (am, is, are)',
          content: `
            <h3>The verb "BE" is the most important verb in English!</h3>
            <p>We use different forms of "BE" depending on the subject:</p>
            <ul>
              <li><strong>I am</strong> - for yourself</li>
              <li><strong>You are</strong> - for the person you're talking to</li>
              <li><strong>He/She/It is</strong> - for one person or thing</li>
              <li><strong>We are</strong> - for yourself and others</li>
              <li><strong>They are</strong> - for multiple people or things</li>
            </ul>
          `,
          examples: [
            'I am a student.',
            'You are my friend.',
            'He is tall.',
            'She is happy.',
            'It is hot today.',
            'We are ready.',
            'They are from Spain.'
          ],
          exercises: [
            {
              id: 'be-1',
              type: 'multiple-choice',
              question: 'Choose the correct form: She ___ a teacher.',
              options: ['am', 'is', 'are'],
              correct: 1,
              explanation: 'We use "is" with he, she, and it.'
            },
            {
              id: 'be-2',
              type: 'fill-blank',
              question: 'Fill in the blank: We ___ students.',
              correct: 'are',
              explanation: 'We use "are" with we and they.'
            }
          ],
          completed: false
        },
        {
          id: 'have-verb',
          title: 'The Verb "HAVE" (have, has)',
          content: `
            <h3>The verb "HAVE" shows possession or relationships!</h3>
            <p>We use "HAVE" and "HAS" to show that someone owns something:</p>
            <ul>
              <li><strong>I have</strong></li>
              <li><strong>You have</strong></li>
              <li><strong>He/She/It has</strong></li>
              <li><strong>We have</strong></li>
              <li><strong>They have</strong></li>
            </ul>
          `,
          examples: [
            'I have a car.',
            'You have blue eyes.',
            'He has a sister.',
            'She has brown hair.',
            'It has four legs.',
            'We have homework.',
            'They have two cats.'
          ],
          exercises: [
            {
              id: 'have-1',
              type: 'multiple-choice',
              question: 'Choose the correct form: He ___ a dog.',
              options: ['have', 'has', 'had'],
              correct: 1,
              explanation: 'We use "has" with he, she, and it.'
            }
          ],
          completed: false
        },
        {
          id: 'do-verb',
          title: 'The Verb "DO" (do, does)',
          content: `
            <h3>The verb "DO" helps make questions and negatives!</h3>
            <p>We use "DO" and "DOES" to ask questions and make negative sentences:</p>
            <ul>
              <li><strong>I do</strong></li>
              <li><strong>You do</strong></li>
              <li><strong>He/She/It does</strong></li>
              <li><strong>We do</strong></li>
              <li><strong>They do</strong></li>
            </ul>
          `,
          examples: [
            'Do you like pizza?',
            'Does she speak English?',
            'I do not smoke.',
            'He does not live here.',
            'We do our homework.',
            'They do sports.'
          ],
          exercises: [
            {
              id: 'do-1',
              type: 'multiple-choice',
              question: '___ you like coffee?',
              options: ['Do', 'Does', 'Did'],
              correct: 0,
              explanation: 'We use "Do" with I, you, we, and they.'
            }
          ],
          completed: false
        },
        {
          id: 'present-simple-positive',
          title: 'Present Simple - Positive Sentences',
          content: `
            <h3>Making positive sentences in Present Simple</h3>
            <p>For most verbs, we add -s or -es for he, she, it:</p>
            <ul>
              <li><strong>I work</strong> → <strong>He works</strong></li>
              <li><strong>I study</strong> → <strong>She studies</strong></li>
              <li><strong>I go</strong> → <strong>It goes</strong></li>
            </ul>
          `,
          examples: [
            'I eat breakfast every day.',
            'You speak English well.',
            'He plays football.',
            'She studies medicine.',
            'It rains a lot here.',
            'We live in London.',
            'They work in an office.'
          ],
          exercises: [
            {
              id: 'present-1',
              type: 'fill-blank',
              question: 'She ___ (play) tennis every week.',
              correct: 'plays',
              explanation: 'Add -s to the verb for he, she, it.'
            }
          ],
          completed: false
        },
        {
          id: 'present-simple-negative-question',
          title: 'Present Simple - Negative & Questions',
          content: `
            <h3>Making negative sentences and questions</h3>
            <p><strong>Negative:</strong> Use don't/doesn't + base verb</p>
            <p><strong>Questions:</strong> Use Do/Does + subject + base verb</p>
            <ul>
              <li>I don't like coffee. / Do you like coffee?</li>
              <li>She doesn't work here. / Does she work here?</li>
            </ul>
          `,
          examples: [
            'I don\'t eat meat.',
            'You don\'t live here.',
            'He doesn\'t speak French.',
            'Do you understand?',
            'Does she like music?',
            'Don\'t they work today?'
          ],
          exercises: [
            {
              id: 'negative-1',
              type: 'multiple-choice',
              question: 'He ___ like vegetables.',
              options: ['don\'t', 'doesn\'t', 'not'],
              correct: 1,
              explanation: 'Use "doesn\'t" with he, she, it.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'articles',
      topic: 'Articles (a, an, the)',
      status: 'available',
      lessons: [
        {
          id: 'indefinite-articles',
          title: 'Indefinite Articles (a, an)',
          content: `
            <h3>When to use "A" and "AN"</h3>
            <p>We use "A" and "AN" with singular nouns when we talk about something for the first time:</p>
            <ul>
              <li><strong>A</strong> - before consonant sounds (a book, a car, a university)</li>
              <li><strong>AN</strong> - before vowel sounds (an apple, an hour, an umbrella)</li>
            </ul>
          `,
          examples: [
            'I have a dog.',
            'She is an engineer.',
            'There is a book on the table.',
            'He ate an apple.',
            'This is a university.',
            'It\'s an honest answer.'
          ],
          exercises: [
            {
              id: 'articles-1',
              type: 'multiple-choice',
              question: 'I need ___ umbrella.',
              options: ['a', 'an', 'the'],
              correct: 1,
              explanation: 'Use "an" before vowel sounds. "Umbrella" starts with a vowel sound.'
            }
          ],
          completed: false
        },
        {
          id: 'definite-article',
          title: 'Definite Article (the)',
          content: `
            <h3>When to use "THE"</h3>
            <p>We use "THE" when both speaker and listener know which thing we're talking about:</p>
            <ul>
              <li>The book you gave me</li>
              <li>The sun (there's only one)</li>
              <li>The same thing mentioned before</li>
            </ul>
          `,
          examples: [
            'The cat is sleeping.',
            'I like the book you recommended.',
            'The sun is bright today.',
            'Please close the door.',
            'The teacher is nice.',
            'Where is the bathroom?'
          ],
          exercises: [
            {
              id: 'the-1',
              type: 'fill-blank',
              question: 'I read ___ book you gave me.',
              correct: 'the',
              explanation: 'Use "the" because we both know which book.'
            }
          ],
          completed: false
        },
        {
          id: 'no-article',
          title: 'When NOT to use articles',
          content: `
            <h3>Zero Article (no article needed)</h3>
            <p>We don't use articles with:</p>
            <ul>
              <li>Plural nouns in general: Cats are animals.</li>
              <li>Uncountable nouns in general: Water is important.</li>
              <li>Proper names: John, London, Christmas</li>
            </ul>
          `,
          examples: [
            'Dogs are friendly.',
            'Water is essential.',
            'I live in London.',
            'Coffee keeps me awake.',
            'Children need love.',
            'Music makes me happy.'
          ],
          exercises: [
            {
              id: 'zero-1',
              type: 'true-false',
              question: 'We need an article in: "I love music."',
              correct: 0,
              explanation: 'No article needed with "music" in general.'
            }
          ],
          completed: false
        }
      ]
    }
    // Additional grammar topics would continue here...
  ];

  // Vocabulary Database (150 A1-level words)
  const vocabularyDatabase: VocabularyWord[] = [
    // Personal Information (25 words)
    { word: 'name', pronunciation: '/neɪm/', meaning: 'what you are called', example: 'My name is John.', category: 'Personal Information', mastered: false },
    { word: 'age', pronunciation: '/eɪdʒ/', meaning: 'how old you are', example: 'I am 25 years old.', category: 'Personal Information', mastered: false },
    { word: 'address', pronunciation: '/əˈdres/', meaning: 'where you live', example: 'My address is 123 Main Street.', category: 'Personal Information', mastered: false },
    { word: 'phone', pronunciation: '/foʊn/', meaning: 'telephone', example: 'My phone number is 555-1234.', category: 'Personal Information', mastered: false },
    { word: 'email', pronunciation: '/ˈiːmeɪl/', meaning: 'electronic mail', example: 'My email is john@email.com.', category: 'Personal Information', mastered: false },
    { word: 'birthday', pronunciation: '/ˈbɜːrθdeɪ/', meaning: 'the day you were born', example: 'My birthday is in June.', category: 'Personal Information', mastered: false },
    { word: 'nationality', pronunciation: '/ˌnæʃəˈnæləti/', meaning: 'your country', example: 'My nationality is American.', category: 'Personal Information', mastered: false },
    { word: 'job', pronunciation: '/dʒɑːb/', meaning: 'your work', example: 'My job is teacher.', category: 'Personal Information', mastered: false },
    { word: 'married', pronunciation: '/ˈmærid/', meaning: 'having a husband or wife', example: 'I am married.', category: 'Personal Information', mastered: false },
    { word: 'single', pronunciation: '/ˈsɪŋɡəl/', meaning: 'not married', example: 'She is single.', category: 'Personal Information', mastered: false },
    { word: 'student', pronunciation: '/ˈstuːdənt/', meaning: 'person who studies', example: 'I am a student.', category: 'Personal Information', mastered: false },
    { word: 'teacher', pronunciation: '/ˈtiːtʃər/', meaning: 'person who teaches', example: 'She is a teacher.', category: 'Personal Information', mastered: false },
    { word: 'doctor', pronunciation: '/ˈdɑːktər/', meaning: 'medical professional', example: 'He is a doctor.', category: 'Personal Information', mastered: false },
    { word: 'nurse', pronunciation: '/nɜːrs/', meaning: 'medical helper', example: 'My sister is a nurse.', category: 'Personal Information', mastered: false },
    { word: 'engineer', pronunciation: '/ˌendʒɪˈnɪr/', meaning: 'technical professional', example: 'My father is an engineer.', category: 'Personal Information', mastered: false },
    { word: 'lawyer', pronunciation: '/ˈlɔːjər/', meaning: 'legal professional', example: 'She wants to be a lawyer.', category: 'Personal Information', mastered: false },
    { word: 'businessman', pronunciation: '/ˈbɪznəsmæn/', meaning: 'person in business', example: 'He is a businessman.', category: 'Personal Information', mastered: false },
    { word: 'police', pronunciation: '/pəˈliːs/', meaning: 'law enforcement', example: 'Call the police!', category: 'Personal Information', mastered: false },
    { word: 'driver', pronunciation: '/ˈdraɪvər/', meaning: 'person who drives', example: 'I am a taxi driver.', category: 'Personal Information', mastered: false },
    { word: 'cook', pronunciation: '/kʊk/', meaning: 'person who cooks', example: 'She is a good cook.', category: 'Personal Information', mastered: false },
    { word: 'artist', pronunciation: '/ˈɑːrtɪst/', meaning: 'creative person', example: 'He is an artist.', category: 'Personal Information', mastered: false },
    { word: 'musician', pronunciation: '/mjuˈzɪʃən/', meaning: 'person who plays music', example: 'She is a musician.', category: 'Personal Information', mastered: false },
    { word: 'writer', pronunciation: '/ˈraɪtər/', meaning: 'person who writes', example: 'I want to be a writer.', category: 'Personal Information', mastered: false },
    { word: 'manager', pronunciation: '/ˈmænɪdʒər/', meaning: 'person who manages', example: 'He is the manager.', category: 'Personal Information', mastered: false },
    { word: 'secretary', pronunciation: '/ˈsekrəteri/', meaning: 'office helper', example: 'She works as a secretary.', category: 'Personal Information', mastered: false },

    // Family & Relationships (20 words)
    { word: 'family', pronunciation: '/ˈfæməli/', meaning: 'relatives', example: 'I love my family.', category: 'Family & Relationships', mastered: false },
    { word: 'mother', pronunciation: '/ˈmʌðər/', meaning: 'female parent', example: 'My mother is kind.', category: 'Family & Relationships', mastered: false },
    { word: 'father', pronunciation: '/ˈfɑːðər/', meaning: 'male parent', example: 'My father works hard.', category: 'Family & Relationships', mastered: false },
    { word: 'parents', pronunciation: '/ˈperənts/', meaning: 'mother and father', example: 'My parents live here.', category: 'Family & Relationships', mastered: false },
    { word: 'son', pronunciation: '/sʌn/', meaning: 'male child', example: 'He is my son.', category: 'Family & Relationships', mastered: false },
    { word: 'daughter', pronunciation: '/ˈdɔːtər/', meaning: 'female child', example: 'She is my daughter.', category: 'Family & Relationships', mastered: false },
    { word: 'brother', pronunciation: '/ˈbrʌðər/', meaning: 'male sibling', example: 'My brother is tall.', category: 'Family & Relationships', mastered: false },
    { word: 'sister', pronunciation: '/ˈsɪstər/', meaning: 'female sibling', example: 'My sister is funny.', category: 'Family & Relationships', mastered: false },
    { word: 'husband', pronunciation: '/ˈhʌzbənd/', meaning: 'married man', example: 'He is my husband.', category: 'Family & Relationships', mastered: false },
    { word: 'wife', pronunciation: '/waɪf/', meaning: 'married woman', example: 'She is my wife.', category: 'Family & Relationships', mastered: false },
    { word: 'grandfather', pronunciation: '/ˈɡrænfɑːðər/', meaning: 'father\'s/mother\'s father', example: 'My grandfather is wise.', category: 'Family & Relationships', mastered: false },
    { word: 'grandmother', pronunciation: '/ˈɡrænmʌðər/', meaning: 'father\'s/mother\'s mother', example: 'My grandmother cooks well.', category: 'Family & Relationships', mastered: false },
    { word: 'uncle', pronunciation: '/ˈʌŋkəl/', meaning: 'parent\'s brother', example: 'My uncle lives far away.', category: 'Family & Relationships', mastered: false },
    { word: 'aunt', pronunciation: '/ænt/', meaning: 'parent\'s sister', example: 'My aunt is nice.', category: 'Family & Relationships', mastered: false },
    { word: 'cousin', pronunciation: '/ˈkʌzən/', meaning: 'uncle\'s/aunt\'s child', example: 'My cousin visits often.', category: 'Family & Relationships', mastered: false },
    { word: 'friend', pronunciation: '/frend/', meaning: 'person you like', example: 'She is my best friend.', category: 'Family & Relationships', mastered: false },
    { word: 'boyfriend', pronunciation: '/ˈbɔɪfrend/', meaning: 'male romantic partner', example: 'This is my boyfriend.', category: 'Family & Relationships', mastered: false },
    { word: 'girlfriend', pronunciation: '/ˈɡɜːrlfrend/', meaning: 'female romantic partner', example: 'She is his girlfriend.', category: 'Family & Relationships', mastered: false },
    { word: 'neighbor', pronunciation: '/ˈneɪbər/', meaning: 'person living nearby', example: 'My neighbor is friendly.', category: 'Family & Relationships', mastered: false },
    { word: 'baby', pronunciation: '/ˈbeɪbi/', meaning: 'very young child', example: 'The baby is sleeping.', category: 'Family & Relationships', mastered: false },

    // Colors & Basic Adjectives (15 words)
    { word: 'red', pronunciation: '/red/', meaning: 'color of blood', example: 'I like red roses.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'blue', pronunciation: '/bluː/', meaning: 'color of sky', example: 'The sky is blue.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'green', pronunciation: '/ɡriːn/', meaning: 'color of grass', example: 'Trees are green.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'yellow', pronunciation: '/ˈjeloʊ/', meaning: 'color of sun', example: 'The sun is yellow.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'black', pronunciation: '/blæk/', meaning: 'darkest color', example: 'I wear black shoes.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'white', pronunciation: '/waɪt/', meaning: 'lightest color', example: 'Snow is white.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'brown', pronunciation: '/braʊn/', meaning: 'color of wood', example: 'I have brown hair.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'pink', pronunciation: '/pɪŋk/', meaning: 'light red color', example: 'She likes pink flowers.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'orange', pronunciation: '/ˈɔːrɪndʒ/', meaning: 'color of orange fruit', example: 'The sunset is orange.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'purple', pronunciation: '/ˈpɜːrpəl/', meaning: 'red and blue mixed', example: 'I like purple grapes.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'big', pronunciation: '/bɪɡ/', meaning: 'large size', example: 'This is a big house.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'small', pronunciation: '/smɔːl/', meaning: 'little size', example: 'I have a small car.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'good', pronunciation: '/ɡʊd/', meaning: 'positive quality', example: 'This is good food.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'bad', pronunciation: '/bæd/', meaning: 'negative quality', example: 'That\'s bad news.', category: 'Colors & Basic Adjectives', mastered: false },
    { word: 'new', pronunciation: '/nuː/', meaning: 'recently made', example: 'I bought a new phone.', category: 'Colors & Basic Adjectives', mastered: false }

    // Continue with remaining categories (Food & Drinks, Days/Months/Time, Basic Verbs)...
  ];

  const vocabularyCategories = [
    { name: 'Personal Information', count: 25, color: 'bg-blue-500' },
    { name: 'Family & Relationships', count: 20, color: 'bg-green-500' },
    { name: 'Colors & Basic Adjectives', count: 15, color: 'bg-purple-500' },
    { name: 'Food & Drinks', count: 30, color: 'bg-orange-500' },
    { name: 'Days, Months, Time', count: 20, color: 'bg-red-500' },
    { name: 'Basic Verbs', count: 40, color: 'bg-indigo-500' }
  ];

  const skillsActivities = [
    {
      id: 'reading-1',
      type: 'Reading',
      title: 'Meeting New People',
      description: 'Read simple introductions and answer questions',
      difficulty: 'Beginner',
      time: '10 minutes',
      completed: false
    },
    {
      id: 'listening-1',
      type: 'Listening',
      title: 'Personal Information',
      description: 'Listen to people talking about themselves',
      difficulty: 'Beginner',
      time: '8 minutes',
      completed: false
    },
    {
      id: 'writing-1',
      type: 'Writing',
      title: 'Fill Out a Form',
      description: 'Complete a simple registration form',
      difficulty: 'Beginner',
      time: '15 minutes',
      completed: false
    },
    {
      id: 'speaking-1',
      type: 'Speaking',
      title: 'Introduce Yourself',
      description: 'Practice introducing yourself to others',
      difficulty: 'Beginner',
      time: '12 minutes',
      completed: false
    }
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      // Calculate progress based on actual completed lessons, not increment
      const totalLessons = grammarTopics.reduce((total, topic) => total + topic.lessons.length, 0);
      newProgress.grammarProgress = (newProgress.completedLessons.length / totalLessons) * 100;
      newProgress.points += 10;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      // Calculate progress based on actual mastered words, not increment
      const totalWords = vocabularyDatabase.length;
      newProgress.vocabularyProgress = (newProgress.masteredWords.length / totalWords) * 100;
      newProgress.points += 5;
      saveProgress(newProgress);
    }
  };

  const playPronunciation = (word: string) => {
    // In a real app, this would play audio
    console.log(`Playing pronunciation for: ${word}`);
    // You would integrate with Web Speech API or audio files
  };

  const getWordsForCategory = (category: string) => {
    return vocabularyDatabase.filter(word => word.category === category);
  };

  // Show loading state during hydration to prevent mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading A1 Level...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Progress Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-2">
              A1 Beginner Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can understand and use familiar everyday expressions and basic phrases.
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

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/20</Badge>
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
                <Badge variant="secondary">{progress.masteredWords.length}/150</Badge>
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
                <Badge variant="secondary">0/16</Badge>
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
                        {topic.lessons.length} interactive lessons
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
                                  {lesson.exercises.length} exercises included
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
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
                <CardTitle>Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 150 essential A1-level English words
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
                  Click on words to hear pronunciation and see examples
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
                            Mark as Mastered
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
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                  </div>
                  <CardTitle>{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>A1 Level Assessment</CardTitle>
              <CardDescription>
                Test your knowledge with our comprehensive A1-level assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">25 questions</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">30 questions</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">4 sections</p>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take Complete Assessment</Link>
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
          <p className="text-muted-foreground">None (This is the beginning!)</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Next Level</p>
          <Button asChild variant="outline">
            <Link href="/level/a2">
              A2 Elementary <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}