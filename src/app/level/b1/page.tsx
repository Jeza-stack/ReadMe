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
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'true-false' | 'essay';
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

  // B1 Grammar Topics with Complex Lessons
  const grammarTopics = [
    {
      id: 'present-perfect',
      topic: 'Present Perfect Tense',
      status: 'available',
      lessons: [
        {
          id: 'present-perfect-structure',
          title: 'Present Perfect - Structure and Uses',
          content: `
            <h3>Present Perfect Tense</h3>
            <p>The Present Perfect connects the past with the present:</p>
            <p><strong>Structure:</strong> Subject + have/has + past participle</p>
            <ul>
              <li><strong>Finished actions with present relevance:</strong> I have lost my keys.</li>
              <li><strong>Life experiences:</strong> She has traveled to Japan.</li>
              <li><strong>Actions that started in the past and continue:</strong> They have lived here for 10 years.</li>
              <li><strong>Recent actions:</strong> He has just arrived.</li>
            </ul>
          `,
          examples: [
            'I have finished my homework.',
            'She has never been to Australia.',
            'We have known each other since childhood.',
            'Have you ever tried sushi?',
            'They have just left the building.',
            'He has worked here for five years.'
          ],
          exercises: [
            {
              id: 'pp-1',
              type: 'multiple-choice',
              question: 'I ___ in this city for ten years.',
              options: ['live', 'have lived', 'am living'],
              correct: 1,
              explanation: 'Present Perfect is used for actions that started in the past and continue to the present.'
            },
            {
              id: 'pp-2',
              type: 'fill-blank',
              question: '___ you ever ___ (visit) London?',
              correct: 'Have / visited',
              explanation: 'Use Present Perfect for life experiences with "ever".'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'conditional-sentences',
      topic: 'Conditional Sentences',
      status: 'available',
      lessons: [
        {
          id: 'first-conditional',
          title: 'First Conditional - Real Future Possibilities',
          content: `
            <h3>First Conditional</h3>
            <p>Used for real future possibilities and their likely results:</p>
            <p><strong>Structure:</strong> If + present simple, will + base verb</p>
            <ul>
              <li><strong>Real possibilities:</strong> If it rains, I will stay home.</li>
              <li><strong>Warnings:</strong> If you don't study, you will fail.</li>
              <li><strong>Promises:</strong> If you help me, I will help you.</li>
            </ul>
          `,
          examples: [
            'If I have time, I will call you.',
            'She will be angry if you are late.',
            'If we hurry, we will catch the train.',
            'You will feel better if you rest.',
            'If it snows, the roads will be dangerous.',
            'I will buy a car if I save enough money.'
          ],
          exercises: [
            {
              id: 'cond-1',
              type: 'fill-blank',
              question: 'If she ___ (study) hard, she ___ (pass) the exam.',
              correct: 'studies / will pass',
              explanation: 'First conditional: if + present simple, will + base verb.'
            }
          ],
          completed: false
        },
        {
          id: 'second-conditional',
          title: 'Second Conditional - Unreal Present Situations',
          content: `
            <h3>Second Conditional</h3>
            <p>Used for unreal or unlikely present/future situations:</p>
            <p><strong>Structure:</strong> If + past simple, would + base verb</p>
            <ul>
              <li><strong>Hypothetical situations:</strong> If I were rich, I would travel the world.</li>
              <li><strong>Unlikely events:</strong> If I won the lottery, I would quit my job.</li>
              <li><strong>Advice:</strong> If I were you, I would apologize.</li>
            </ul>
          `,
          examples: [
            'If I had more time, I would learn Spanish.',
            'She would be happier if she lived near the sea.',
            'If we were younger, we would climb that mountain.',
            'Would you help me if I asked you?',
            'If I were the president, I would change many things.',
            'They would visit us if they had a car.'
          ],
          exercises: [
            {
              id: 'cond-2',
              type: 'multiple-choice',
              question: 'If I ___ you, I would accept the job offer.',
              options: ['am', 'was', 'were'],
              correct: 2,
              explanation: 'Use "were" for all persons in second conditional.'
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
          id: 'passive-structure',
          title: 'Passive Voice - Structure and Usage',
          content: `
            <h3>Passive Voice</h3>
            <p>Used when the action is more important than who does it:</p>
            <p><strong>Structure:</strong> Subject + be + past participle (+ by + agent)</p>
            <ul>
              <li><strong>Focus on action:</strong> The house was built in 1900.</li>
              <li><strong>Unknown agent:</strong> My car was stolen last night.</li>
              <li><strong>Formal writing:</strong> The results were analyzed carefully.</li>
            </ul>
          `,
          examples: [
            'This book was written by Shakespeare.',
            'The meeting has been cancelled.',
            'English is spoken all over the world.',
            'The problem will be solved tomorrow.',
            'The data is being processed now.',
            'The work had been completed before noon.'
          ],
          exercises: [
            {
              id: 'passive-1',
              type: 'fill-blank',
              question: 'The letter ___ (send) yesterday.',
              correct: 'was sent',
              explanation: 'Past simple passive: was/were + past participle.'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // B1 Vocabulary Database (500 words - Intermediate level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Opinions & Experiences (50 words)
    { word: 'opinion', pronunciation: '/əˈpɪnjən/', meaning: 'a view or belief about something', example: 'In my opinion, this is the best solution.', category: 'Opinions & Experiences', mastered: false },
    { word: 'experience', pronunciation: '/ɪkˈspɪriəns/', meaning: 'knowledge gained through practice', example: 'I have experience working with children.', category: 'Opinions & Experiences', mastered: false },
    { word: 'believe', pronunciation: '/bɪˈliːv/', meaning: 'to think something is true', example: 'I believe in working hard for success.', category: 'Opinions & Experiences', mastered: false },
    { word: 'agree', pronunciation: '/əˈɡriː/', meaning: 'to have the same opinion', example: 'I agree with your point of view.', category: 'Opinions & Experiences', mastered: false },
    { word: 'disagree', pronunciation: '/ˌdɪsəˈɡriː/', meaning: 'to have a different opinion', example: 'I disagree with that decision.', category: 'Opinions & Experiences', mastered: false },
    { word: 'suggest', pronunciation: '/səˈdʒest/', meaning: 'to propose an idea', example: 'I suggest we meet tomorrow.', category: 'Opinions & Experiences', mastered: false },
    { word: 'recommend', pronunciation: '/ˌrekəˈmend/', meaning: 'to advise someone to do something', example: 'I recommend this restaurant.', category: 'Opinions & Experiences', mastered: false },
    { word: 'suppose', pronunciation: '/səˈpoʊz/', meaning: 'to think something is likely', example: 'I suppose you\'re right.', category: 'Opinions & Experiences', mastered: false },
    { word: 'assume', pronunciation: '/əˈsuːm/', meaning: 'to believe without proof', example: 'Don\'t assume you know what I think.', category: 'Opinions & Experiences', mastered: false },
    { word: 'consider', pronunciation: '/kənˈsɪdər/', meaning: 'to think carefully about', example: 'Please consider my proposal.', category: 'Opinions & Experiences', mastered: false },
    { word: 'realize', pronunciation: '/ˈriːəlaɪz/', meaning: 'to become aware of', example: 'I realize I made a mistake.', category: 'Opinions & Experiences', mastered: false },
    { word: 'recognize', pronunciation: '/ˈrekəɡnaɪz/', meaning: 'to identify someone or something', example: 'I recognize your voice.', category: 'Opinions & Experiences', mastered: false },
    { word: 'appreciate', pronunciation: '/əˈpriːʃieɪt/', meaning: 'to value or be grateful for', example: 'I appreciate your help.', category: 'Opinions & Experiences', mastered: false },
    { word: 'admire', pronunciation: '/ədˈmaɪər/', meaning: 'to respect and approve', example: 'I admire her courage.', category: 'Opinions & Experiences', mastered: false },
    { word: 'respect', pronunciation: '/rɪˈspekt/', meaning: 'to have a good opinion of', example: 'I respect his decision.', category: 'Opinions & Experiences', mastered: false },
    { word: 'criticize', pronunciation: '/ˈkrɪtɪsaɪz/', meaning: 'to express disapproval', example: 'Don\'t criticize without offering solutions.', category: 'Opinions & Experiences', mastered: false },
    { word: 'complain', pronunciation: '/kəmˈpleɪn/', meaning: 'to express dissatisfaction', example: 'She always complains about the weather.', category: 'Opinions & Experiences', mastered: false },
    { word: 'praise', pronunciation: '/preɪz/', meaning: 'to express approval', example: 'The teacher praised his work.', category: 'Opinions & Experiences', mastered: false },
    { word: 'judge', pronunciation: '/dʒʌdʒ/', meaning: 'to form an opinion about', example: 'Don\'t judge people by their appearance.', category: 'Opinions & Experiences', mastered: false },
    { word: 'compare', pronunciation: '/kəmˈper/', meaning: 'to examine similarities and differences', example: 'Compare these two options.', category: 'Opinions & Experiences', mastered: false },

    // Abstract Concepts (50 words)
    { word: 'freedom', pronunciation: '/ˈfriːdəm/', meaning: 'the state of being free', example: 'Freedom of speech is important.', category: 'Abstract Concepts', mastered: false },
    { word: 'justice', pronunciation: '/ˈdʒʌstɪs/', meaning: 'fairness in treatment', example: 'The court delivered justice.', category: 'Abstract Concepts', mastered: false },
    { word: 'equality', pronunciation: '/ɪˈkwɑːləti/', meaning: 'the state of being equal', example: 'Gender equality is essential.', category: 'Abstract Concepts', mastered: false },
    { word: 'responsibility', pronunciation: '/rɪˌspɑːnsəˈbɪləti/', meaning: 'a duty to deal with something', example: 'Parents have responsibility for their children.', category: 'Abstract Concepts', mastered: false },
    { word: 'opportunity', pronunciation: '/ˌɑːpərˈtuːnəti/', meaning: 'a chance to do something', example: 'This job is a great opportunity.', category: 'Abstract Concepts', mastered: false },
    { word: 'challenge', pronunciation: '/ˈtʃælɪndʒ/', meaning: 'a difficult task', example: 'Learning a language is a challenge.', category: 'Abstract Concepts', mastered: false },
    { word: 'success', pronunciation: '/səkˈses/', meaning: 'achieving a goal', example: 'Hard work leads to success.', category: 'Abstract Concepts', mastered: false },
    { word: 'failure', pronunciation: '/ˈfeɪljər/', meaning: 'lack of success', example: 'Failure is part of learning.', category: 'Abstract Concepts', mastered: false },
    { word: 'progress', pronunciation: '/ˈprɑːɡres/', meaning: 'forward movement', example: 'We\'re making good progress.', category: 'Abstract Concepts', mastered: false },
    { word: 'improvement', pronunciation: '/ɪmˈpruːvmənt/', meaning: 'the act of making better', example: 'There\'s room for improvement.', category: 'Abstract Concepts', mastered: false },
    { word: 'development', pronunciation: '/dɪˈveləpmənt/', meaning: 'the process of growing', example: 'Child development is complex.', category: 'Abstract Concepts', mastered: false },
    { word: 'achievement', pronunciation: '/əˈtʃiːvmənt/', meaning: 'something accomplished', example: 'Graduating was a great achievement.', category: 'Abstract Concepts', mastered: false },
    { word: 'potential', pronunciation: '/pəˈtenʃəl/', meaning: 'possible abilities', example: 'She has great potential.', category: 'Abstract Concepts', mastered: false },
    { word: 'creativity', pronunciation: '/ˌkriːeɪˈtɪvəti/', meaning: 'the ability to create', example: 'Art requires creativity.', category: 'Abstract Concepts', mastered: false },
    { word: 'imagination', pronunciation: '/ɪˌmædʒɪˈneɪʃən/', meaning: 'the ability to imagine', example: 'Children have wild imagination.', category: 'Abstract Concepts', mastered: false },
    { word: 'wisdom', pronunciation: '/ˈwɪzdəm/', meaning: 'deep understanding', example: 'Age brings wisdom.', category: 'Abstract Concepts', mastered: false },
    { word: 'knowledge', pronunciation: '/ˈnɑːlɪdʒ/', meaning: 'information and understanding', example: 'Knowledge is power.', category: 'Abstract Concepts', mastered: false },
    { word: 'understanding', pronunciation: '/ˌʌndərˈstændɪŋ/', meaning: 'comprehension', example: 'Thank you for your understanding.', category: 'Abstract Concepts', mastered: false },
    { word: 'confidence', pronunciation: '/ˈkɑːnfɪdəns/', meaning: 'belief in oneself', example: 'She speaks with confidence.', category: 'Abstract Concepts', mastered: false },
    { word: 'courage', pronunciation: '/ˈkɜːrɪdʒ/', meaning: 'bravery', example: 'It takes courage to change.', category: 'Abstract Concepts', mastered: false },

    // Professional Life (40 words)
    { word: 'career', pronunciation: '/kəˈrɪr/', meaning: 'a person\'s professional life', example: 'She has a successful career in medicine.', category: 'Professional Life', mastered: false },
    { word: 'profession', pronunciation: '/prəˈfeʃən/', meaning: 'a paid occupation', example: 'Teaching is a noble profession.', category: 'Professional Life', mastered: false },
    { word: 'occupation', pronunciation: '/ˌɑːkjuˈpeɪʃən/', meaning: 'a job or profession', example: 'What\'s your occupation?', category: 'Professional Life', mastered: false },
    { word: 'employment', pronunciation: '/ɪmˈplɔɪmənt/', meaning: 'the state of having a job', example: 'Employment rates are rising.', category: 'Professional Life', mastered: false },
    { word: 'unemployment', pronunciation: '/ˌʌnɪmˈplɔɪmənt/', meaning: 'the state of being without work', example: 'Unemployment is a serious problem.', category: 'Professional Life', mastered: false },
    { word: 'interview', pronunciation: '/ˈɪntərvjuː/', meaning: 'a meeting to assess suitability', example: 'I have a job interview tomorrow.', category: 'Professional Life', mastered: false },
    { word: 'application', pronunciation: '/ˌæplɪˈkeɪʃən/', meaning: 'a formal request', example: 'I sent my job application.', category: 'Professional Life', mastered: false },
    { word: 'resume', pronunciation: '/rɪˈzuːmeɪ/', meaning: 'a summary of qualifications', example: 'Update your resume regularly.', category: 'Professional Life', mastered: false },
    { word: 'qualification', pronunciation: '/ˌkwɑːlɪfɪˈkeɪʃən/', meaning: 'a skill or achievement', example: 'Do you have the right qualifications?', category: 'Professional Life', mastered: false },
    { word: 'experience', pronunciation: '/ɪkˈspɪriəns/', meaning: 'practical knowledge', example: 'This job requires five years\' experience.', category: 'Professional Life', mastered: false },
    { word: 'skill', pronunciation: '/skɪl/', meaning: 'the ability to do something well', example: 'Communication is an important skill.', category: 'Professional Life', mastered: false },
    { word: 'training', pronunciation: '/ˈtreɪnɪŋ/', meaning: 'teaching of skills', example: 'New employees need training.', category: 'Professional Life', mastered: false },
    { word: 'promotion', pronunciation: '/prəˈmoʊʃən/', meaning: 'advancement to a higher position', example: 'She got a promotion last month.', category: 'Professional Life', mastered: false },
    { word: 'salary', pronunciation: '/ˈsæləri/', meaning: 'fixed payment for work', example: 'The salary is negotiable.', category: 'Professional Life', mastered: false },
    { word: 'benefits', pronunciation: '/ˈbenɪfɪts/', meaning: 'additional advantages', example: 'The job comes with good benefits.', category: 'Professional Life', mastered: false },
    { word: 'colleague', pronunciation: '/ˈkɑːliːɡ/', meaning: 'a person you work with', example: 'My colleagues are very helpful.', category: 'Professional Life', mastered: false },
    { word: 'supervisor', pronunciation: '/ˈsuːpərvaɪzər/', meaning: 'a person who oversees work', example: 'Speak to your supervisor about this.', category: 'Professional Life', mastered: false },
    { word: 'deadline', pronunciation: '/ˈdedlaɪn/', meaning: 'the time by which something must be done', example: 'The deadline is next Friday.', category: 'Professional Life', mastered: false },
    { word: 'meeting', pronunciation: '/ˈmiːtɪŋ/', meaning: 'a gathering for discussion', example: 'We have a meeting at 3 PM.', category: 'Professional Life', mastered: false },
    { word: 'presentation', pronunciation: '/ˌpriːzenˈteɪʃən/', meaning: 'a formal talk about a topic', example: 'I\'m giving a presentation tomorrow.', category: 'Professional Life', mastered: false }
  ];

  const vocabularyCategories = [
    { name: 'Opinions & Experiences', count: 50, color: 'bg-blue-500' },
    { name: 'Abstract Concepts', count: 50, color: 'bg-purple-500' },
    { name: 'Professional Life', count: 40, color: 'bg-green-500' },
    { name: 'Social Issues', count: 45, color: 'bg-red-500' },
    { name: 'Technology & Media', count: 40, color: 'bg-indigo-500' },
    { name: 'Culture & Society', count: 45, color: 'bg-orange-500' },
    { name: 'Environment & Nature', count: 40, color: 'bg-emerald-500' },
    { name: 'Education & Learning', count: 35, color: 'bg-pink-500' },
    { name: 'Health & Lifestyle', count: 35, color: 'bg-cyan-500' },
    { name: 'Future Plans & Goals', count: 30, color: 'bg-amber-500' }
  ];

  const skillsActivities = [
    {
      id: 'reading-opinions',
      type: 'Reading',
      title: 'Opinion Articles',
      description: 'Read and analyze different viewpoints on current topics',
      difficulty: 'Intermediate',
      time: '25 minutes',
      completed: false
    },
    {
      id: 'listening-interviews',
      type: 'Listening',
      title: 'Job Interviews',
      description: 'Listen to professional interviews and discussions',
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
      id: 'speaking-debate',
      type: 'Speaking',
      title: 'Express Opinions in Debate',
      description: 'Practice arguing your point of view persuasively',
      difficulty: 'Intermediate',
      time: '25 minutes',
      completed: false
    },
    {
      id: 'reading-news',
      type: 'Reading',
      title: 'News Analysis',
      description: 'Read and interpret news articles critically',
      difficulty: 'Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'listening-presentations',
      type: 'Listening',
      title: 'Academic Presentations',
      description: 'Follow complex presentations and take notes',
      difficulty: 'Intermediate',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'writing-report',
      type: 'Writing',
      title: 'Factual Report',
      description: 'Write structured reports with data and conclusions',
      difficulty: 'Intermediate',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'speaking-presentation',
      type: 'Speaking',
      title: 'Give a Presentation',
      description: 'Present ideas clearly with supporting examples',
      difficulty: 'Intermediate',
      time: '30 minutes',
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
              Can deal with most situations and express thoughts on familiar topics.
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
          <Badge className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-lg px-6 py-3">
            B1 Intermediate
          </Badge>
        </div>

        {/* Can-Do Statements */}
        <Card className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-orange-600" />
              B1 Can-Do Statements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Express opinions and justify them with reasons',
                'Describe experiences, dreams, hopes and ambitions',
                'Handle most situations while traveling',
                'Write simple connected text on familiar topics',
                'Understand main points of clear standard input',
                'Deal with most situations that arise while traveling'
              ].map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-orange-900/20">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{statement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                        {topic.lessons.length} comprehensive lessons - B1 Intermediate
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
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800">B1</Badge>
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
                             isMastered ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' : ''
                           }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{wordItem.word}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">B1</Badge>
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
                      <Badge className="bg-orange-500">B1</Badge>
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
                    <Badge className="mt-2 bg-orange-500">B1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">50 questions</p>
                    <Badge className="mt-2 bg-orange-500">B1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">8 sections</p>
                    <Badge className="mt-2 bg-orange-500">B1 Level</Badge>
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