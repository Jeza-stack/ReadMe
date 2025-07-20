'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Users, Brain, Globe, Briefcase } from 'lucide-react';

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

export default function B2Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Academic & Professional');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Prevent hydration mismatch by only running on client
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('b2-progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading progress:', error);
        localStorage.removeItem('b2-progress');
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('b2-progress', JSON.stringify(newProgress));
  };

  // B2 Grammar Topics with Advanced Lessons (Upper-Intermediate Level)
  const grammarTopics = [
    {
      id: 'advanced-conditionals',
      topic: 'Advanced Conditional Sentences',
      status: 'available',
      lessons: [
        {
          id: 'third-conditional',
          title: 'Third Conditional - Past Hypotheticals',
          content: `
            <h3>Third Conditional (Unreal Past Situations)</h3>
            <p>We use third conditional to talk about imaginary past situations and their consequences:</p>
            <p><strong>Structure:</strong> If + past perfect, would have + past participle</p>
            <ul>
              <li><strong>If I had studied harder, I would have passed the exam.</strong></li>
              <li><strong>If she had left earlier, she wouldn't have missed the train.</strong></li>
              <li><strong>What would you have done if you had been in my situation?</strong></li>
            </ul>
            <p>Used for regrets, criticism, and imagining different past outcomes.</p>
          `,
          examples: [
            'If I had known about the meeting, I would have attended.',
            'She would have been happier if she had chosen a different career.',
            'If we had booked earlier, we could have gotten cheaper tickets.',
            'He wouldn\'t have made that mistake if he had been more careful.',
            'If they had invested wisely, they would have been wealthy now.',
            'What would have happened if you had said yes?'
          ],
          exercises: [
            {
              id: 'third-cond-1',
              type: 'fill-blank',
              question: 'If I ___ (know) about the party, I ___ (come).',
              correct: 'had known would have come',
              explanation: 'Third conditional: If + past perfect, would have + past participle'
            },
            {
              id: 'third-cond-2',
              type: 'multiple-choice',
              question: 'She ___ the job if she ___ more experience.',
              options: ['would have gotten/had had', 'would get/had', 'got/would have'],
              correct: 0,
              explanation: 'Third conditional for unreal past situations'
            }
          ],
          completed: false
        },
        {
          id: 'mixed-conditionals',
          title: 'Mixed Conditionals',
          content: `
            <h3>Mixed Conditionals</h3>
            <p>We mix different conditional types when the time in the if-clause is different from the main clause:</p>
            <p><strong>Past condition → Present result:</strong> If + past perfect, would + base verb</p>
            <p><strong>Present condition → Past result:</strong> If + past simple, would have + past participle</p>
            <ul>
              <li><strong>If I had studied medicine, I would be a doctor now.</strong> (past → present)</li>
              <li><strong>If I were more organized, I wouldn't have forgotten the meeting.</strong> (present → past)</li>
            </ul>
          `,
          examples: [
            'If I had learned to drive, I would have my own car now.',
            'If she were more confident, she would have applied for the promotion.',
            'If we had moved to the countryside, we would be living a quieter life.',
            'If he weren\'t so stubborn, he would have listened to our advice.',
            'If I had taken that job offer, I would be working abroad now.',
            'If you were more patient, you wouldn\'t have argued with him yesterday.'
          ],
          exercises: [
            {
              id: 'mixed-cond-1',
              type: 'multiple-choice',
              question: 'If I ___ French at school, I ___ in Paris now.',
              options: ['had learned/would be working', 'learned/would work', 'would learn/worked'],
              correct: 0,
              explanation: 'Mixed conditional: past condition affecting present result'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'passive-advanced',
      topic: 'Advanced Passive Voice',
      status: 'available',
      lessons: [
        {
          id: 'passive-complex',
          title: 'Complex Passive Structures',
          content: `
            <h3>Advanced Passive Constructions</h3>
            <p>Advanced passive forms include perfect tenses, modals, and continuous forms:</p>
            <ul>
              <li><strong>Present Perfect Passive:</strong> The work has been completed.</li>
              <li><strong>Modal Passive:</strong> The problem should be solved immediately.</li>
              <li><strong>Continuous Passive:</strong> The house is being renovated.</li>
              <li><strong>Future Perfect Passive:</strong> The project will have been finished by tomorrow.</li>
            </ul>
            <p>These forms are common in formal and academic writing.</p>
          `,
          examples: [
            'The report has been submitted to the committee.',
            'The meeting should be postponed until next week.',
            'The building is being demolished next month.',
            'This issue must be addressed immediately.',
            'The research will have been completed by December.',
            'The problem could have been avoided with better planning.'
          ],
          exercises: [
            {
              id: 'passive-complex-1',
              type: 'multiple-choice',
              question: 'The new software ___ by our IT department.',
              options: ['is being developed', 'has developed', 'was developing'],
              correct: 0,
              explanation: 'Present continuous passive for ongoing actions'
            }
          ],
          completed: false
        },
        {
          id: 'passive-reporting',
          title: 'Passive Reporting Verbs',
          content: `
            <h3>Passive Reporting Verbs</h3>
            <p>We use passive reporting structures to distance ourselves from information or show uncertainty:</p>
            <p><strong>It + passive + that:</strong> It is believed that he left the country.</p>
            <p><strong>Subject + passive + to-infinitive:</strong> He is believed to have left the country.</p>
            <ul>
              <li>Common verbs: say, think, believe, know, expect, report, consider, understand</li>
            </ul>
          `,
          examples: [
            'It is said that the company will expand globally.',
            'The CEO is expected to announce the merger tomorrow.',
            'It has been reported that sales increased by 20%.',
            'The new policy is thought to be effective.',
            'It is believed that the meeting was productive.',
            'The scientist is considered to be an expert in the field.'
          ],
          exercises: [
            {
              id: 'passive-report-1',
              type: 'fill-blank',
              question: 'It ___ (believe) that the economy will improve.',
              correct: 'is believed',
              explanation: 'Use "is believed" for present passive reporting'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'modal-verbs-advanced',
      topic: 'Advanced Modal Verbs',
      status: 'available',
      lessons: [
        {
          id: 'modals-speculation',
          title: 'Modals for Speculation and Deduction',
          content: `
            <h3>Modals for Making Deductions</h3>
            <p>We use modals to express different degrees of certainty about present and past situations:</p>
            <p><strong>Present speculation:</strong></p>
            <ul>
              <li><strong>must:</strong> strong certainty (90%) - He must be tired (I'm almost certain)</li>
              <li><strong>might/may/could:</strong> possibility (50%) - She might be at home</li>
              <li><strong>can't:</strong> impossibility (0%) - He can't be serious</li>
            </ul>
            <p><strong>Past speculation:</strong> modal + have + past participle</p>
          `,
          examples: [
            'She must be working late - her office light is still on.',
            'They might have missed the train.',
            'He can\'t be telling the truth - his story doesn\'t make sense.',
            'You may have left your keys at home.',
            'The package should have arrived by now.',
            'She could have been stuck in traffic.'
          ],
          exercises: [
            {
              id: 'modal-spec-1',
              type: 'multiple-choice',
              question: 'Look at all those empty bottles! They ___ a great party.',
              options: ['must have had', 'might had', 'should had'],
              correct: 0,
              explanation: 'Use "must have had" for strong deduction about the past'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // B2 Vocabulary Database (750 words - Upper-Intermediate Level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Academic & Professional (80 words)
    { word: 'analyze', pronunciation: '/ˈænəlaɪz/', meaning: 'to examine something in detail', example: 'We need to analyze the market trends carefully.', category: 'Academic & Professional', mastered: false },
    { word: 'evaluate', pronunciation: '/ɪˈvæljueɪt/', meaning: 'to assess the value or quality of something', example: 'The committee will evaluate all proposals.', category: 'Academic & Professional', mastered: false },
    { word: 'methodology', pronunciation: '/ˌmeθəˈdɑːlədʒi/', meaning: 'systematic approach to research', example: 'The research methodology was rigorous and comprehensive.', category: 'Academic & Professional', mastered: false },
    { word: 'hypothesis', pronunciation: '/haɪˈpɑːθəsɪs/', meaning: 'proposed explanation for testing', example: 'The scientist formed a hypothesis about climate change.', category: 'Academic & Professional', mastered: false },
    { word: 'comprehensive', pronunciation: '/ˌkɑːmprɪˈhensɪv/', meaning: 'complete and including everything', example: 'She provided a comprehensive report on the findings.', category: 'Academic & Professional', mastered: false },
    { word: 'substantial', pronunciation: '/səbˈstænʃəl/', meaning: 'large in size, value, or importance', example: 'There was a substantial increase in profits.', category: 'Academic & Professional', mastered: false },
    { word: 'implement', pronunciation: '/ˈɪmplɪment/', meaning: 'to put a plan into action', example: 'The company will implement new policies next month.', category: 'Academic & Professional', mastered: false },
    { word: 'demonstrate', pronunciation: '/ˈdemənstreɪt/', meaning: 'to show clearly', example: 'The data demonstrates a clear correlation.', category: 'Academic & Professional', mastered: false },
    { word: 'significant', pronunciation: '/sɪɡˈnɪfɪkənt/', meaning: 'important or notable', example: 'The research shows significant improvements.', category: 'Academic & Professional', mastered: false },
    { word: 'consecutive', pronunciation: '/kənˈsekjətɪv/', meaning: 'following each other without interruption', example: 'The team won five consecutive matches.', category: 'Academic & Professional', mastered: false },
    { word: 'preliminary', pronunciation: '/prɪˈlɪməˌneri/', meaning: 'initial or preparatory', example: 'These are just preliminary results.', category: 'Academic & Professional', mastered: false },
    { word: 'sophisticated', pronunciation: '/səˈfɪstɪkeɪtɪd/', meaning: 'complex and advanced', example: 'The company uses sophisticated technology.', category: 'Academic & Professional', mastered: false },
    { word: 'elaborate', pronunciation: '/ɪˈlæbərət/', meaning: 'detailed and complex', example: 'She presented an elaborate marketing strategy.', category: 'Academic & Professional', mastered: false },
    { word: 'controversy', pronunciation: '/ˈkɑːntrəvɜːrsi/', meaning: 'public disagreement', example: 'The new policy caused considerable controversy.', category: 'Academic & Professional', mastered: false },
    { word: 'crucial', pronunciation: '/ˈkruːʃəl/', meaning: 'extremely important', example: 'Timing is crucial for this project\'s success.', category: 'Academic & Professional', mastered: false },
    { word: 'inevitable', pronunciation: '/ɪnˈevɪtəbəl/', meaning: 'certain to happen', example: 'Change in the industry was inevitable.', category: 'Academic & Professional', mastered: false },
    { word: 'fundamental', pronunciation: '/ˌfʌndəˈmentəl/', meaning: 'basic and essential', example: 'Trust is fundamental to any relationship.', category: 'Academic & Professional', mastered: false },
    { word: 'theoretical', pronunciation: '/ˌθiːəˈretɪkəl/', meaning: 'based on theory rather than practice', example: 'The course covers both theoretical and practical aspects.', category: 'Academic & Professional', mastered: false },
    { word: 'explicit', pronunciation: '/ɪkˈsplɪsɪt/', meaning: 'clearly stated', example: 'The instructions were explicit and easy to follow.', category: 'Academic & Professional', mastered: false },
    { word: 'implicit', pronunciation: '/ɪmˈplɪsɪt/', meaning: 'implied but not directly stated', example: 'There was an implicit understanding between them.', category: 'Academic & Professional', mastered: false },

    // Complex Emotions & Psychology (60 words)
    { word: 'ambiguous', pronunciation: '/æmˈbɪɡjuəs/', meaning: 'having more than one meaning', example: 'His response was deliberately ambiguous.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'skeptical', pronunciation: '/ˈskeptɪkəl/', meaning: 'doubtful about something', example: 'I\'m skeptical about his claims.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'vulnerable', pronunciation: '/ˈvʌlnərəbəl/', meaning: 'easily hurt or attacked', example: 'Children are vulnerable to online predators.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'resilient', pronunciation: '/rɪˈzɪliənt/', meaning: 'able to recover quickly', example: 'She proved to be remarkably resilient.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'contemplative', pronunciation: '/kənˈtemplətɪv/', meaning: 'thoughtful and reflective', example: 'He was in a contemplative mood.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'empathetic', pronunciation: '/ˌempəˈθetɪk/', meaning: 'understanding others\' feelings', example: 'She is very empathetic towards her patients.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'nostalgic', pronunciation: '/nəˈstældʒɪk/', meaning: 'longing for the past', example: 'The old photos made her feel nostalgic.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'apprehensive', pronunciation: '/ˌæprɪˈhensɪv/', meaning: 'anxious about the future', example: 'I\'m apprehensive about the exam results.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'optimistic', pronunciation: '/ˌɑːptɪˈmɪstɪk/', meaning: 'hopeful about the future', example: 'Despite setbacks, she remains optimistic.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'pessimistic', pronunciation: '/ˌpesɪˈmɪstɪk/', meaning: 'expecting bad things to happen', example: 'He has a pessimistic view of the economy.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'perceptive', pronunciation: '/pərˈseptɪv/', meaning: 'having good insight', example: 'Her perceptive comments impressed everyone.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'intuitive', pronunciation: '/ɪnˈtuːɪtɪv/', meaning: 'understanding without reasoning', example: 'She has an intuitive understanding of people.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'assertive', pronunciation: '/əˈsɜːrtɪv/', meaning: 'confident and direct', example: 'You need to be more assertive in meetings.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'submissive', pronunciation: '/səbˈmɪsɪv/', meaning: 'ready to obey others', example: 'His submissive attitude concerned his friends.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'spontaneous', pronunciation: '/spɑːnˈteɪniəs/', meaning: 'done without planning', example: 'We decided to take a spontaneous trip.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'methodical', pronunciation: '/məˈθɑːdɪkəl/', meaning: 'systematic and organized', example: 'He approached the problem in a methodical way.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'meticulous', pronunciation: '/məˈtɪkjələs/', meaning: 'very careful about details', example: 'She is meticulous in her research.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'impulsive', pronunciation: '/ɪmˈpʌlsɪv/', meaning: 'acting without thinking', example: 'His impulsive decision led to problems.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'rational', pronunciation: '/ˈræʃənəl/', meaning: 'based on reason', example: 'We need to make a rational decision.', category: 'Complex Emotions & Psychology', mastered: false },
    { word: 'irrational', pronunciation: '/ɪˈræʃənəl/', meaning: 'not based on reason', example: 'His fear of flying is completely irrational.', category: 'Complex Emotions & Psychology', mastered: false },

    // Advanced Communication (55 words)
    { word: 'articulate', pronunciation: '/ɑːrˈtɪkjələt/', meaning: 'expressing ideas clearly', example: 'She is very articulate in presentations.', category: 'Advanced Communication', mastered: false },
    { word: 'eloquent', pronunciation: '/ˈeləkwənt/', meaning: 'fluent and persuasive speaking', example: 'His eloquent speech moved the audience.', category: 'Advanced Communication', mastered: false },
    { word: 'coherent', pronunciation: '/koʊˈhɪrənt/', meaning: 'logical and consistent', example: 'Please present a coherent argument.', category: 'Advanced Communication', mastered: false },
    { word: 'concise', pronunciation: '/kənˈsaɪs/', meaning: 'brief and clear', example: 'Keep your summary concise and to the point.', category: 'Advanced Communication', mastered: false },
    { word: 'verbose', pronunciation: '/vərˈboʊs/', meaning: 'using too many words', example: 'His writing style is unnecessarily verbose.', category: 'Advanced Communication', mastered: false },
    { word: 'ambiguous', pronunciation: '/æmˈbɪɡjuəs/', meaning: 'unclear or having multiple meanings', example: 'The contract terms are ambiguous.', category: 'Advanced Communication', mastered: false },
    { word: 'persuasive', pronunciation: '/pərˈsweɪsɪv/', meaning: 'able to convince others', example: 'She made a persuasive case for change.', category: 'Advanced Communication', mastered: false },
    { word: 'diplomatic', pronunciation: '/ˌdɪpləˈmætɪk/', meaning: 'tactful in dealing with people', example: 'He handled the situation diplomatically.', category: 'Advanced Communication', mastered: false },
    { word: 'tactful', pronunciation: '/ˈtæktfəl/', meaning: 'careful not to offend', example: 'She gave tactful feedback on his work.', category: 'Advanced Communication', mastered: false },
    { word: 'blunt', pronunciation: '/blʌnt/', meaning: 'direct and honest', example: 'His blunt criticism hurt her feelings.', category: 'Advanced Communication', mastered: false },
    { word: 'subtle', pronunciation: '/ˈsʌtəl/', meaning: 'not obvious or direct', example: 'There was a subtle hint of sarcasm in his voice.', category: 'Advanced Communication', mastered: false },
    { word: 'explicit', pronunciation: '/ɪkˈsplɪsɪt/', meaning: 'clearly and directly stated', example: 'The rules are explicit about this matter.', category: 'Advanced Communication', mastered: false },
    { word: 'implicit', pronunciation: '/ɪmˈplɪsɪt/', meaning: 'implied without being stated', example: 'There was an implicit threat in his words.', category: 'Advanced Communication', mastered: false },
    { word: 'provocative', pronunciation: '/prəˈvɑːkətɪv/', meaning: 'intended to provoke reaction', example: 'She asked a provocative question.', category: 'Advanced Communication', mastered: false },
    { word: 'rhetorical', pronunciation: '/rɪˈtɔːrɪkəl/', meaning: 'asked for effect, not an answer', example: 'That was obviously a rhetorical question.', category: 'Advanced Communication', mastered: false },
    { word: 'constructive', pronunciation: '/kənˈstrʌktɪv/', meaning: 'helpful and positive', example: 'Please provide constructive feedback.', category: 'Advanced Communication', mastered: false },
    { word: 'destructive', pronunciation: '/dɪˈstrʌktɪv/', meaning: 'causing damage or harm', example: 'His criticism was purely destructive.', category: 'Advanced Communication', mastered: false },
    { word: 'objective', pronunciation: '/əbˈdʒektɪv/', meaning: 'not influenced by personal opinions', example: 'Try to give an objective assessment.', category: 'Advanced Communication', mastered: false },
    { word: 'subjective', pronunciation: '/səbˈdʒektɪv/', meaning: 'based on personal opinions', example: 'Art appreciation is highly subjective.', category: 'Advanced Communication', mastered: false },
    { word: 'comprehensive', pronunciation: '/ˌkɑːmprɪˈhensɪv/', meaning: 'complete and thorough', example: 'We need a comprehensive review of the policy.', category: 'Advanced Communication', mastered: false }

    // Additional categories would continue here for B2 level...
  ];

  const vocabularyCategories = [
    { name: 'Academic & Professional', count: 80, color: 'bg-blue-600' },
    { name: 'Complex Emotions & Psychology', count: 60, color: 'bg-purple-600' },
    { name: 'Advanced Communication', count: 55, color: 'bg-green-600' },
    { name: 'Business & Economics', count: 70, color: 'bg-red-600' },
    { name: 'Science & Technology', count: 65, color: 'bg-indigo-600' },
    { name: 'Social Issues & Politics', count: 60, color: 'bg-orange-600' },
    { name: 'Arts & Culture', count: 50, color: 'bg-pink-600' },
    { name: 'Philosophy & Ethics', count: 45, color: 'bg-teal-600' },
    { name: 'Media & Journalism', count: 55, color: 'bg-yellow-600' },
    { name: 'Global Issues', count: 50, color: 'bg-cyan-600' }
  ];

  const skillsActivities = [
    {
      id: 'reading-academic',
      type: 'Reading',
      title: 'Academic Research Papers',
      description: 'Analyze complex academic texts and extract key arguments',
      difficulty: 'Upper-Intermediate',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'listening-lectures',
      type: 'Listening',
      title: 'University Lectures',
      description: 'Follow complex lectures and take detailed notes',
      difficulty: 'Upper-Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'writing-report',
      type: 'Writing',
      title: 'Analytical Report',
      description: 'Write detailed reports with analysis and recommendations',
      difficulty: 'Upper-Intermediate',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'speaking-conference',
      type: 'Speaking',
      title: 'Conference Presentation',
      description: 'Deliver professional presentations with Q&A sessions',
      difficulty: 'Upper-Intermediate',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'reading-literature',
      type: 'Reading',
      title: 'Contemporary Literature',
      description: 'Analyze themes and literary devices in modern texts',
      difficulty: 'Upper-Intermediate',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'listening-documentaries',
      type: 'Listening',
      title: 'Documentary Analysis',
      description: 'Understand complex documentaries on social issues',
      difficulty: 'Upper-Intermediate',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'writing-persuasive',
      type: 'Writing',
      title: 'Persuasive Essays',
      description: 'Write compelling arguments on controversial topics',
      difficulty: 'Upper-Intermediate',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'speaking-negotiation',
      type: 'Speaking',
      title: 'Business Negotiations',
      description: 'Practice complex negotiations and diplomatic discussions',
      difficulty: 'Upper-Intermediate',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'reading-journalism',
      type: 'Reading',
      title: 'Investigative Journalism',
      description: 'Analyze bias and credibility in news reporting',
      difficulty: 'Upper-Intermediate',
      time: '30 minutes',
      completed: false
    },
    {
      id: 'listening-interviews',
      type: 'Listening',
      title: 'Expert Interviews',
      description: 'Follow complex discussions between specialists',
      difficulty: 'Upper-Intermediate',
      time: '35 minutes',
      completed: false
    }
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
      newProgress.points += 12;
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
              B2 Upper-Intermediate Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can interact with fluency and spontaneity. Can produce detailed text on a wide range of subjects.
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
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-lg px-6 py-3">
            B2 Upper-Intermediate
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-500" />
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
                  <Target className="w-6 h-6 text-green-500" />
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
                  <MessageSquare className="w-6 h-6 text-orange-500" />
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
                                  {lesson.exercises.length} exercises • Upper-intermediate level
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
                  Master 750 sophisticated B2-level English words for advanced communication
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
                  B2-level vocabulary for sophisticated expression and academic communication
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
                            <Badge variant="outline" className="text-xs">B2</Badge>
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
                            Mark as Mastered (+12 points)
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
                      <Badge className="bg-purple-500">B2</Badge>
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
                Test your B2-level knowledge with comprehensive upper-intermediate assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">55 questions</p>
                    <Badge className="mt-2 bg-purple-500">B2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">60 questions</p>
                    <Badge className="mt-2 bg-purple-500">B2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">10 sections</p>
                    <Badge className="mt-2 bg-purple-500">B2 Level</Badge>
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