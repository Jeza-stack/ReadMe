'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Users, Brain, Globe } from 'lucide-react';

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

export default function B1Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Opinions & Experiences');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Prevent hydration mismatch by only running on client
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('b1-progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading progress:', error);
        localStorage.removeItem('b1-progress');
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('b1-progress', JSON.stringify(newProgress));
  };

  // B1 Grammar Topics with Detailed Lessons (Intermediate Level)
  const grammarTopics = [
    {
      id: 'present-perfect',
      topic: 'Present Perfect Tense',
      status: 'available',
      lessons: [
        {
          id: 'present-perfect-experience',
          title: 'Present Perfect for Life Experiences',
          content: `
            <h3>Present Perfect for Life Experiences</h3>
            <p>We use Present Perfect to talk about experiences in our life without saying exactly when:</p>
            <p><strong>Structure:</strong> Subject + have/has + past participle</p>
            <ul>
              <li><strong>I have visited Paris.</strong> (sometime in my life)</li>
              <li><strong>She has never eaten sushi.</strong> (never in her life)</li>
              <li><strong>Have you ever been to Japan?</strong> (at any time in your life)</li>
            </ul>
            <p>Common time expressions: ever, never, already, yet, just, before</p>
          `,
          examples: [
            'I have traveled to five countries.',
            'She has never seen snow.',
            'Have you ever met a celebrity?',
            'We have already finished our homework.',
            'They haven\'t arrived yet.',
            'He has just called me.'
          ],
          exercises: [
            {
              id: 'pp-exp-1',
              type: 'multiple-choice',
              question: 'I ___ never ___ such a beautiful sunset.',
              options: ['have/seen', 'had/saw', 'has/seen'],
              correct: 0,
              explanation: 'Use "have" with I and past participle "seen" for experiences.'
            },
            {
              id: 'pp-exp-2',
              type: 'fill-blank',
              question: '___ you ever ___ (be) to Australia?',
              correct: 'Have been',
              explanation: 'Use "Have you ever been" for life experience questions.'
            }
          ],
          completed: false
        },
        {
          id: 'present-perfect-recent',
          title: 'Present Perfect for Recent Actions',
          content: `
            <h3>Present Perfect for Recent Actions with Results</h3>
            <p>We use Present Perfect for recent actions that have results now:</p>
            <ul>
              <li><strong>I have lost my keys.</strong> (I don't have them now)</li>
              <li><strong>She has broken her leg.</strong> (Her leg is broken now)</li>
              <li><strong>We have finished the project.</strong> (The project is complete now)</li>
            </ul>
            <p>Often used with: just, already, recently, lately</p>
          `,
          examples: [
            'I have just finished my work.',
            'She has recently moved to London.',
            'They have already left the party.',
            'He has broken his phone.',
            'We have completed the task.',
            'The rain has stopped.'
          ],
          exercises: [
            {
              id: 'pp-recent-1',
              type: 'fill-blank',
              question: 'I have ___ (finish) my assignment.',
              correct: 'finished',
              explanation: 'Use past participle "finished" with present perfect.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'conditional-sentences',
      topic: 'First & Second Conditional',
      status: 'available',
      lessons: [
        {
          id: 'first-conditional',
          title: 'First Conditional - Real Future Possibilities',
          content: `
            <h3>First Conditional (Real Future Situations)</h3>
            <p>We use first conditional for real possibilities in the future:</p>
            <p><strong>Structure:</strong> If + present simple, will + base verb</p>
            <ul>
              <li><strong>If it rains, I will stay home.</strong></li>
              <li><strong>If you study hard, you will pass the exam.</strong></li>
              <li><strong>I will call you if I have time.</strong></li>
            </ul>
            <p>Can also use: might, may, could instead of will</p>
          `,
          examples: [
            'If I have enough money, I will buy a car.',
            'She will be happy if you visit her.',
            'If we leave now, we might catch the train.',
            'You will get wet if you don\'t take an umbrella.',
            'If they invite us, we will go to the party.',
            'I will help you if you need assistance.'
          ],
          exercises: [
            {
              id: 'first-cond-1',
              type: 'multiple-choice',
              question: 'If it ___ sunny tomorrow, we ___ go to the beach.',
              options: ['is/will', 'will be/go', 'is/go'],
              correct: 0,
              explanation: 'First conditional: If + present simple, will + base verb'
            }
          ],
          completed: false
        },
        {
          id: 'second-conditional',
          title: 'Second Conditional - Unreal Present Situations',
          content: `
            <h3>Second Conditional (Unreal Present Situations)</h3>
            <p>We use second conditional for imaginary or unlikely situations:</p>
            <p><strong>Structure:</strong> If + past simple, would + base verb</p>
            <ul>
              <li><strong>If I were rich, I would travel the world.</strong></li>
              <li><strong>If she studied more, she would get better grades.</strong></li>
              <li><strong>What would you do if you won the lottery?</strong></li>
            </ul>
            <p>Note: Use "were" (not "was") with I/he/she/it in second conditional</p>
          `,
          examples: [
            'If I were you, I would apologize.',
            'She would be happier if she had more friends.',
            'If we lived in Paris, we would speak French.',
            'I would learn Spanish if I had more time.',
            'If he were taller, he could play basketball.',
            'Would you move abroad if you could?'
          ],
          exercises: [
            {
              id: 'second-cond-1',
              type: 'fill-blank',
              question: 'If I ___ (be) rich, I ___ (buy) a yacht.',
              correct: 'were would buy',
              explanation: 'Second conditional: If + past simple (were), would + base verb'
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
          title: 'Passive Voice - Present and Past',
          content: `
            <h3>Passive Voice Formation</h3>
            <p>We use passive voice when the action is more important than who does it:</p>
            <p><strong>Structure:</strong> Object + be + past participle (+ by agent)</p>
            <ul>
              <li><strong>Active:</strong> Shakespeare wrote Hamlet.</li>
              <li><strong>Passive:</strong> Hamlet was written by Shakespeare.</li>
            </ul>
            <p>Present: am/is/are + past participle</p>
            <p>Past: was/were + past participle</p>
          `,
          examples: [
            'English is spoken all over the world.',
            'The letter was delivered yesterday.',
            'This house is being built by my father.',
            'The meeting was cancelled due to rain.',
            'Coffee is grown in Colombia.',
            'The book was published in 2020.'
          ],
          exercises: [
            {
              id: 'passive-1',
              type: 'multiple-choice',
              question: 'The Mona Lisa ___ by Leonardo da Vinci.',
              options: ['was painted', 'is painted', 'painted'],
              correct: 0,
              explanation: 'Past passive: was/were + past participle'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // B1 Vocabulary Database (500 words - Intermediate Level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Opinions & Experiences (50 words)
    { word: 'opinion', pronunciation: '/əˈpɪnjən/', meaning: 'what you think about something', example: 'In my opinion, this movie is excellent.', category: 'Opinions & Experiences', mastered: false },
    { word: 'experience', pronunciation: '/ɪkˈspɪriəns/', meaning: 'something that happens to you', example: 'Learning English was a great experience.', category: 'Opinions & Experiences', mastered: false },
    { word: 'believe', pronunciation: '/bɪˈliːv/', meaning: 'to think something is true', example: 'I believe education is very important.', category: 'Opinions & Experiences', mastered: false },
    { word: 'agree', pronunciation: '/əˈɡriː/', meaning: 'to have the same opinion', example: 'I agree with your suggestion.', category: 'Opinions & Experiences', mastered: false },
    { word: 'disagree', pronunciation: '/ˌdɪsəˈɡriː/', meaning: 'to have a different opinion', example: 'I disagree with that statement.', category: 'Opinions & Experiences', mastered: false },
    { word: 'suggest', pronunciation: '/səˈdʒest/', meaning: 'to propose an idea', example: 'I suggest we meet at 3 PM.', category: 'Opinions & Experiences', mastered: false },
    { word: 'recommend', pronunciation: '/ˌrekəˈmend/', meaning: 'to advise someone to do something', example: 'I recommend this restaurant.', category: 'Opinions & Experiences', mastered: false },
    { word: 'advice', pronunciation: '/ədˈvaɪs/', meaning: 'suggestions about what to do', example: 'Can you give me some advice?', category: 'Opinions & Experiences', mastered: false },
    { word: 'decision', pronunciation: '/dɪˈsɪʒən/', meaning: 'a choice you make', example: 'It was a difficult decision.', category: 'Opinions & Experiences', mastered: false },
    { word: 'choice', pronunciation: '/tʃɔɪs/', meaning: 'an option to choose from', example: 'You have many choices.', category: 'Opinions & Experiences', mastered: false },
    { word: 'prefer', pronunciation: '/prɪˈfər/', meaning: 'to like something better', example: 'I prefer tea to coffee.', category: 'Opinions & Experiences', mastered: false },
    { word: 'advantage', pronunciation: '/ədˈvæntɪdʒ/', meaning: 'something good about a situation', example: 'The main advantage is the low cost.', category: 'Opinions & Experiences', mastered: false },
    { word: 'disadvantage', pronunciation: '/ˌdɪsədˈvæntɪdʒ/', meaning: 'something bad about a situation', example: 'The disadvantage is the long commute.', category: 'Opinions & Experiences', mastered: false },
    { word: 'benefit', pronunciation: '/ˈbenɪfɪt/', meaning: 'something good you get', example: 'Exercise has many health benefits.', category: 'Opinions & Experiences', mastered: false },
    { word: 'improve', pronunciation: '/ɪmˈpruːv/', meaning: 'to make or become better', example: 'I want to improve my English.', category: 'Opinions & Experiences', mastered: false },
    { word: 'develop', pronunciation: '/dɪˈveləp/', meaning: 'to grow or create', example: 'Children develop language skills quickly.', category: 'Opinions & Experiences', mastered: false },
    { word: 'achieve', pronunciation: '/əˈtʃiːv/', meaning: 'to succeed in doing something', example: 'She achieved her goal of running a marathon.', category: 'Opinions & Experiences', mastered: false },
    { word: 'succeed', pronunciation: '/səkˈsiːd/', meaning: 'to do well', example: 'I hope you succeed in your new job.', category: 'Opinions & Experiences', mastered: false },
    { word: 'fail', pronunciation: '/feɪl/', meaning: 'to not succeed', example: 'Don\'t worry if you fail the first time.', category: 'Opinions & Experiences', mastered: false },
    { word: 'challenge', pronunciation: '/ˈtʃælɪndʒ/', meaning: 'something difficult to do', example: 'Learning a new language is a challenge.', category: 'Opinions & Experiences', mastered: false },

    // Work & Professional Life (50 words)
    { word: 'career', pronunciation: '/kəˈrɪr/', meaning: 'your professional life', example: 'She has had a successful career in medicine.', category: 'Work & Professional Life', mastered: false },
    { word: 'colleague', pronunciation: '/ˈkɑːliːɡ/', meaning: 'person you work with', example: 'My colleagues are very friendly.', category: 'Work & Professional Life', mastered: false },
    { word: 'boss', pronunciation: '/bɔːs/', meaning: 'person who manages you at work', example: 'My boss gave me a promotion.', category: 'Work & Professional Life', mastered: false },
    { word: 'employee', pronunciation: '/ɪmˈplɔɪiː/', meaning: 'person who works for a company', example: 'The company has 200 employees.', category: 'Work & Professional Life', mastered: false },
    { word: 'employer', pronunciation: '/ɪmˈplɔɪər/', meaning: 'company or person who gives jobs', example: 'Google is a popular employer.', category: 'Work & Professional Life', mastered: false },
    { word: 'interview', pronunciation: '/ˈɪntərvjuː/', meaning: 'meeting for a job', example: 'I have a job interview tomorrow.', category: 'Work & Professional Life', mastered: false },
    { word: 'salary', pronunciation: '/ˈsæləri/', meaning: 'money you earn from work', example: 'The salary is very competitive.', category: 'Work & Professional Life', mastered: false },
    { word: 'promotion', pronunciation: '/prəˈmoʊʃən/', meaning: 'better job position', example: 'He got a promotion to manager.', category: 'Work & Professional Life', mastered: false },
    { word: 'deadline', pronunciation: '/ˈdedlaɪn/', meaning: 'time when work must be finished', example: 'The deadline for the project is Friday.', category: 'Work & Professional Life', mastered: false },
    { word: 'meeting', pronunciation: '/ˈmiːtɪŋ/', meaning: 'gathering of people to discuss', example: 'We have a team meeting at 2 PM.', category: 'Work & Professional Life', mastered: false },
    { word: 'presentation', pronunciation: '/ˌprezənˈteɪʃən/', meaning: 'formal talk to a group', example: 'I need to prepare a presentation.', category: 'Work & Professional Life', mastered: false },
    { word: 'conference', pronunciation: '/ˈkɑːnfərəns/', meaning: 'large professional meeting', example: 'She attended a medical conference.', category: 'Work & Professional Life', mastered: false },
    { word: 'training', pronunciation: '/ˈtreɪnɪŋ/', meaning: 'learning new work skills', example: 'All new employees receive training.', category: 'Work & Professional Life', mastered: false },
    { word: 'skill', pronunciation: '/skɪl/', meaning: 'ability to do something well', example: 'Communication skills are important.', category: 'Work & Professional Life', mastered: false },
    { word: 'qualification', pronunciation: '/ˌkwɑːlɪfɪˈkeɪʃən/', meaning: 'official proof of ability', example: 'Do you have the right qualifications?', category: 'Work & Professional Life', mastered: false },
    { word: 'responsibility', pronunciation: '/rɪˌspɑːnsəˈbɪləti/', meaning: 'duty or job you must do', example: 'Managing the team is my responsibility.', category: 'Work & Professional Life', mastered: false },
    { word: 'opportunity', pronunciation: '/ˌɑːpərˈtuːnəti/', meaning: 'chance to do something', example: 'This job offers great opportunities.', category: 'Work & Professional Life', mastered: false },
    { word: 'contract', pronunciation: '/ˈkɑːntrækt/', meaning: 'legal work agreement', example: 'I signed a two-year contract.', category: 'Work & Professional Life', mastered: false },
    { word: 'retire', pronunciation: '/rɪˈtaɪər/', meaning: 'to stop working due to age', example: 'He plans to retire at 65.', category: 'Work & Professional Life', mastered: false },
    { word: 'unemployed', pronunciation: '/ˌʌnɪmˈplɔɪd/', meaning: 'without a job', example: 'He has been unemployed for six months.', category: 'Work & Professional Life', mastered: false },

    // Education & Learning (40 words)
    { word: 'university', pronunciation: '/ˌjuːnɪˈvərsəti/', meaning: 'higher education institution', example: 'She studies at Harvard University.', category: 'Education & Learning', mastered: false },
    { word: 'degree', pronunciation: '/dɪˈɡriː/', meaning: 'university qualification', example: 'I have a degree in engineering.', category: 'Education & Learning', mastered: false },
    { word: 'graduate', pronunciation: '/ˈɡrædʒuət/', meaning: 'person who completed studies', example: 'She is a recent graduate.', category: 'Education & Learning', mastered: false },
    { word: 'course', pronunciation: '/kɔːrs/', meaning: 'series of lessons', example: 'I\'m taking a photography course.', category: 'Education & Learning', mastered: false },
    { word: 'subject', pronunciation: '/ˈsʌbdʒɪkt/', meaning: 'topic of study', example: 'Math is my favorite subject.', category: 'Education & Learning', mastered: false },
    { word: 'professor', pronunciation: '/prəˈfesər/', meaning: 'university teacher', example: 'Professor Smith teaches history.', category: 'Education & Learning', mastered: false },
    { word: 'lecture', pronunciation: '/ˈlektʃər/', meaning: 'formal talk to students', example: 'The lecture starts at 9 AM.', category: 'Education & Learning', mastered: false },
    { word: 'assignment', pronunciation: '/əˈsaɪnmənt/', meaning: 'work given to students', example: 'I need to finish my assignment.', category: 'Education & Learning', mastered: false },
    { word: 'research', pronunciation: '/rɪˈsərtʃ/', meaning: 'detailed study of a topic', example: 'She does research on climate change.', category: 'Education & Learning', mastered: false },
    { word: 'knowledge', pronunciation: '/ˈnɑːlɪdʒ/', meaning: 'information and understanding', example: 'Knowledge is power.', category: 'Education & Learning', mastered: false },
    { word: 'library', pronunciation: '/ˈlaɪbreri/', meaning: 'place with books for reading', example: 'I study in the library every day.', category: 'Education & Learning', mastered: false },
    { word: 'scholarship', pronunciation: '/ˈskɑːlərʃɪp/', meaning: 'money for education', example: 'She won a scholarship to study abroad.', category: 'Education & Learning', mastered: false },
    { word: 'exam', pronunciation: '/ɪɡˈzæm/', meaning: 'test of knowledge', example: 'I have an exam next week.', category: 'Education & Learning', mastered: false },
    { word: 'certificate', pronunciation: '/sərˈtɪfɪkət/', meaning: 'official document proving completion', example: 'I received a certificate in first aid.', category: 'Education & Learning', mastered: false },
    { word: 'graduate', pronunciation: '/ˈɡrædʒueɪt/', meaning: 'to complete studies successfully', example: 'I will graduate next year.', category: 'Education & Learning', mastered: false },
    { word: 'semester', pronunciation: '/səˈmestər/', meaning: 'half of an academic year', example: 'This semester I\'m taking five courses.', category: 'Education & Learning', mastered: false },
    { word: 'tuition', pronunciation: '/tuˈɪʃən/', meaning: 'money paid for education', example: 'University tuition is expensive.', category: 'Education & Learning', mastered: false },
    { word: 'campus', pronunciation: '/ˈkæmpəs/', meaning: 'university grounds', example: 'The campus has beautiful gardens.', category: 'Education & Learning', mastered: false },
    { word: 'dormitory', pronunciation: '/ˈdɔːrmətɔːri/', meaning: 'student residence building', example: 'I live in a dormitory on campus.', category: 'Education & Learning', mastered: false },
    { word: 'curriculum', pronunciation: '/kəˈrɪkjələm/', meaning: 'subjects taught in school', example: 'The curriculum includes science and math.', category: 'Education & Learning', mastered: false }

    // Additional categories would continue here for B1 level...
  ];

  const vocabularyCategories = [
    { name: 'Opinions & Experiences', count: 50, color: 'bg-blue-500' },
    { name: 'Work & Professional Life', count: 50, color: 'bg-green-500' },
    { name: 'Education & Learning', count: 40, color: 'bg-purple-500' },
    { name: 'Travel & Culture', count: 60, color: 'bg-red-500' },
    { name: 'Health & Lifestyle', count: 45, color: 'bg-orange-500' },
    { name: 'Technology & Media', count: 55, color: 'bg-indigo-500' },
    { name: 'Environment & Society', count: 50, color: 'bg-teal-500' },
    { name: 'Abstract Concepts', count: 40, color: 'bg-pink-500' },
    { name: 'Plans & Future', count: 35, color: 'bg-yellow-500' },
    { name: 'Relationships & Communication', count: 75, color: 'bg-cyan-500' }
  ];

  const skillsActivities = [
    {
      id: 'reading-opinions',
      type: 'Reading',
      title: 'Opinion Articles',
      description: 'Read articles expressing different viewpoints and analyze arguments',
      difficulty: 'Intermediate',
      time: '25 minutes',
      completed: false
    },
    {
      id: 'listening-interviews',
      type: 'Listening',
      title: 'Job Interviews',
      description: 'Listen to professional interviews and answer comprehension questions',
      difficulty: 'Intermediate',
      time: '20 minutes',
      completed: false
    },
    {
      id: 'writing-formal-email',
      type: 'Writing',
      title: 'Formal Business Email',
      description: 'Write professional emails for work situations',
      difficulty: 'Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'speaking-presentation',
      type: 'Speaking',
      title: 'Give a Presentation',
      description: 'Present your opinion on a topic with supporting arguments',
      difficulty: 'Intermediate',
      time: '25 minutes',
      completed: false
    },
    {
      id: 'reading-news',
      type: 'Reading',
      title: 'International News',
      description: 'Read news articles and discuss current events',
      difficulty: 'Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'listening-podcasts',
      type: 'Listening',
      title: 'Educational Podcasts',
      description: 'Listen to podcasts on various topics and take notes',
      difficulty: 'Intermediate',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'writing-essay',
      type: 'Writing',
      title: 'Opinion Essay',
      description: 'Write a structured essay expressing your viewpoint',
      difficulty: 'Intermediate',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'speaking-debate',
      type: 'Speaking',
      title: 'Debate Practice',
      description: 'Participate in structured debates on current issues',
      difficulty: 'Intermediate',
      time: '40 minutes',
      completed: false
    }
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
            <p className="text-lg text-muted-foreground">Loading B1 Level...</p>
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
              B1 Intermediate Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can deal with most situations likely to arise whilst travelling. Can describe experiences, events, dreams, hopes & ambitions.
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
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg px-6 py-3">
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
                        {topic.lessons.length} intermediate lessons - B1 Level
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
                  Master 500 essential B1-level English words for intermediate communication
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
                  B1-level vocabulary for expressing opinions, experiences and abstract concepts
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
                            <Badge variant="outline" className="text-xs">B1</Badge>
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
                Test your B1-level knowledge with comprehensive intermediate assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
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