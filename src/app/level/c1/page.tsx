'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Crown, Sparkles, Gem } from 'lucide-react';

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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Academic Excellence');
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

  // C1 Grammar Topics with Expert Lessons (Advanced Level)
  const grammarTopics = [
    {
      id: 'complex-conditionals',
      topic: 'Complex Conditional Structures',
      status: 'available',
      lessons: [
        {
          id: 'inverted-conditionals',
          title: 'Inverted Conditionals',
          content: `
            <h3>Inverted Conditional Structures</h3>
            <p>Advanced conditional forms using inversion for more formal, literary expression:</p>
            <p><strong>Were + subject + to-infinitive</strong> (formal first conditional)</p>
            <p><strong>Had + subject + past participle</strong> (formal third conditional)</p>
            <p><strong>Should + subject + base verb</strong> (formal first conditional)</p>
            <ul>
              <li><strong>Were she to accept the offer, we would proceed immediately.</strong></li>
              <li><strong>Had I known earlier, I would have acted differently.</strong></li>
              <li><strong>Should you require assistance, please contact us.</strong></li>
            </ul>
            <p>These structures are common in formal writing, legal documents, and academic texts.</p>
          `,
          examples: [
            'Were the weather to improve, we could hold the event outdoors.',
            'Had the government acted sooner, the crisis could have been averted.',
            'Should circumstances change, we will review our position.',
            'Were I in your position, I would seek professional advice.',
            'Had she been more careful, the accident would not have occurred.',
            'Should the need arise, additional resources will be allocated.'
          ],
          exercises: [
            {
              id: 'inv-cond-1',
              type: 'multiple-choice',
              question: '___ the proposal to be accepted, implementation would begin immediately.',
              options: ['Were', 'Should', 'Had'],
              correct: 0,
              explanation: 'Use "Were" for inverted second conditional structures.'
            },
            {
              id: 'inv-cond-2',
              type: 'fill-blank',
              question: '___ you require further information, please do not hesitate to contact us.',
              correct: 'Should',
              explanation: 'Use "Should" for polite, formal conditional requests.'
            }
          ],
          completed: false
        },
        {
          id: 'subjunctive-mood',
          title: 'Subjunctive Mood',
          content: `
            <h3>The Subjunctive Mood in English</h3>
            <p>The subjunctive expresses hypothetical, wishful, or contrary-to-fact situations:</p>
            <p><strong>Present Subjunctive:</strong> Base form of verb (no -s for third person)</p>
            <p><strong>Past Subjunctive:</strong> Were for all persons with "be"</p>
            <ul>
              <li><strong>I suggest that he study more.</strong> (not "studies")</li>
              <li><strong>It's essential that she be present.</strong> (not "is")</li>
              <li><strong>If I were you, I would reconsider.</strong> (not "was")</li>
            </ul>
            <p>Common with verbs: suggest, recommend, demand, insist, require</p>
          `,
          examples: [
            'The committee recommends that the proposal be reviewed.',
            'It is crucial that everyone arrive on time.',
            'I wish I were more confident in public speaking.',
            'The law requires that all citizens pay taxes.',
            'If this were true, we would need to act immediately.',
            'The judge ordered that the defendant appear in court.'
          ],
          exercises: [
            {
              id: 'subj-1',
              type: 'multiple-choice',
              question: 'It is essential that she ___ the meeting.',
              options: ['attends', 'attend', 'attended'],
              correct: 1,
              explanation: 'Use base form "attend" in subjunctive after "essential that".'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'advanced-discourse',
      topic: 'Advanced Discourse Markers',
      status: 'available',
      lessons: [
        {
          id: 'sophisticated-linking',
          title: 'Sophisticated Linking Devices',
          content: `
            <h3>Advanced Discourse Markers</h3>
            <p>Sophisticated connectors for academic and professional writing:</p>
            <p><strong>Concession:</strong> Notwithstanding, albeit, granted that</p>
            <p><strong>Addition:</strong> Furthermore, moreover, in addition to which</p>
            <p><strong>Contrast:</strong> Nevertheless, nonetheless, conversely</p>
            <p><strong>Cause/Effect:</strong> Consequently, thus, hence, thereby</p>
            <ul>
              <li><strong>Notwithstanding the difficulties, we persevered.</strong></li>
              <li><strong>The results were promising, albeit preliminary.</strong></li>
              <li><strong>Consequently, we must reconsider our approach.</strong></li>
            </ul>
          `,
          examples: [
            'Notwithstanding their objections, the project proceeded.',
            'The evidence was compelling, albeit circumstantial.',
            'Moreover, the financial implications are significant.',
            'Conversely, this approach offers greater flexibility.',
            'Hence, we must explore alternative solutions.',
            'The policy, while well-intentioned, proved inadequate.'
          ],
          exercises: [
            {
              id: 'discourse-1',
              type: 'multiple-choice',
              question: 'The plan was ambitious; ___, it proved successful.',
              options: ['nevertheless', 'therefore', 'furthermore'],
              correct: 0,
              explanation: '"Nevertheless" shows contrast between ambitious (challenging) and successful.'
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
          title: 'Advanced Nominalization',
          content: `
            <h3>Sophisticated Nominalization</h3>
            <p>Converting verbs and adjectives to nouns for formal, academic style:</p>
            <p><strong>Verb → Noun:</strong> analyze → analysis, conclude → conclusion</p>
            <p><strong>Adjective → Noun:</strong> significant → significance, complex → complexity</p>
            <p><strong>Benefits:</strong> More concise, formal register, objective tone</p>
            <ul>
              <li><strong>Instead of:</strong> The government decided to implement new policies.</li>
              <li><strong>Write:</strong> The government's decision to implement new policies...</li>
              <li><strong>Instead of:</strong> The fact that prices are increasing is concerning.</li>
              <li><strong>Write:</strong> The increase in prices is concerning.</li>
            </ul>
          `,
          examples: [
            'The implementation of new technology improved efficiency.',
            'Her contribution to the research was invaluable.',
            'The deterioration of the situation was unexpected.',
            'The establishment of clear guidelines is essential.',
            'Their commitment to excellence is evident.',
            'The implications of these findings are significant.'
          ],
          exercises: [
            {
              id: 'nom-1',
              type: 'fill-blank',
              question: 'The ___ (develop) of new technologies has revolutionized communication.',
              correct: 'development',
              explanation: 'Convert "develop" to "development" for formal nominalization.'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // C1 Vocabulary Database (1000 words - Advanced Level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Academic Excellence (100 words)
    { word: 'paradigm', pronunciation: '/ˈpærədaɪm/', meaning: 'conceptual framework or model', example: 'The new research challenged the existing paradigm.', category: 'Academic Excellence', mastered: false },
    { word: 'synthesis', pronunciation: '/ˈsɪnθəsɪs/', meaning: 'combination of elements to form a whole', example: 'Her thesis was a synthesis of multiple theories.', category: 'Academic Excellence', mastered: false },
    { word: 'empirical', pronunciation: '/ɪmˈpɪrɪkəl/', meaning: 'based on observation and experiment', example: 'The conclusions were supported by empirical evidence.', category: 'Academic Excellence', mastered: false },
    { word: 'ubiquitous', pronunciation: '/juˈbɪkwɪtəs/', meaning: 'present everywhere', example: 'Smartphones have become ubiquitous in modern society.', category: 'Academic Excellence', mastered: false },
    { word: 'meticulous', pronunciation: '/məˈtɪkjələs/', meaning: 'extremely careful about details', example: 'Her meticulous research uncovered new insights.', category: 'Academic Excellence', mastered: false },
    { word: 'cogent', pronunciation: '/ˈkoʊdʒənt/', meaning: 'clear, logical, and convincing', example: 'She presented a cogent argument for reform.', category: 'Academic Excellence', mastered: false },
    { word: 'rigorous', pronunciation: '/ˈrɪɡərəs/', meaning: 'extremely thorough and careful', example: 'The study employed rigorous methodology.', category: 'Academic Excellence', mastered: false },
    { word: 'unprecedented', pronunciation: '/ʌnˈpresɪdentɪd/', meaning: 'never done before', example: 'The pandemic created unprecedented challenges.', category: 'Academic Excellence', mastered: false },
    { word: 'convoluted', pronunciation: '/ˈkɑːnvəluːtɪd/', meaning: 'extremely complex and difficult to follow', example: 'The legal document was unnecessarily convoluted.', category: 'Academic Excellence', mastered: false },
    { word: 'exemplary', pronunciation: '/ɪɡˈzempləri/', meaning: 'serving as a model of excellence', example: 'Her performance was exemplary throughout the project.', category: 'Academic Excellence', mastered: false },
    { word: 'paramount', pronunciation: '/ˈpærəmaʊnt/', meaning: 'of the highest importance', example: 'Student safety is of paramount importance.', category: 'Academic Excellence', mastered: false },
    { word: 'substantiate', pronunciation: '/səbˈstænʃieɪt/', meaning: 'provide evidence to support', example: 'The data substantiates our hypothesis.', category: 'Academic Excellence', mastered: false },
    { word: 'corroborate', pronunciation: '/kəˈrɑːbəreɪt/', meaning: 'confirm or give support to', example: 'Multiple sources corroborate this account.', category: 'Academic Excellence', mastered: false },
    { word: 'elucidate', pronunciation: '/ɪˈluːsɪdeɪt/', meaning: 'make clear by explaining', example: 'The professor elucidated the complex theory.', category: 'Academic Excellence', mastered: false },
    { word: 'proliferate', pronunciation: '/prəˈlɪfəreɪt/', meaning: 'increase rapidly in number', example: 'Digital platforms continue to proliferate.', category: 'Academic Excellence', mastered: false },
    { word: 'aggregate', pronunciation: '/ˈæɡrɪɡət/', meaning: 'total or combined amount', example: 'The aggregate data shows a clear trend.', category: 'Academic Excellence', mastered: false },
    { word: 'prerequisite', pronunciation: '/priˈrekwəzɪt/', meaning: 'required beforehand', example: 'Experience is a prerequisite for this position.', category: 'Academic Excellence', mastered: false },
    { word: 'quintessential', pronunciation: '/ˌkwɪntɪˈsenʃəl/', meaning: 'representing the perfect example', example: 'She is the quintessential professional.', category: 'Academic Excellence', mastered: false },
    { word: 'comprehensive', pronunciation: '/ˌkɑːmprɪˈhensɪv/', meaning: 'complete and including everything', example: 'The report provides comprehensive coverage.', category: 'Academic Excellence', mastered: false },
    { word: 'discernible', pronunciation: '/dɪˈsɜːrnəbəl/', meaning: 'able to be perceived or recognized', example: 'There was a discernible improvement in quality.', category: 'Academic Excellence', mastered: false },

    // Sophisticated Expressions (90 words)
    { word: 'nuanced', pronunciation: '/ˈnuːɑːnst/', meaning: 'characterized by subtle differences', example: 'Her analysis was nuanced and insightful.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'eloquent', pronunciation: '/ˈeləkwənt/', meaning: 'fluent and persuasive', example: 'His eloquent speech moved the audience.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'articulate', pronunciation: '/ɑːrˈtɪkjələt/', meaning: 'having good speaking ability', example: 'She is remarkably articulate for her age.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'perspicacious', pronunciation: '/ˌpɜːrspɪˈkeɪʃəs/', meaning: 'having keen insight', example: 'His perspicacious observations impressed everyone.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'sagacious', pronunciation: '/səˈɡeɪʃəs/', meaning: 'having good judgment', example: 'The sagacious leader made wise decisions.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'astute', pronunciation: '/əˈstuːt/', meaning: 'shrewd and perceptive', example: 'She made an astute business investment.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'shrewd', pronunciation: '/ʃruːd/', meaning: 'having sharp judgment', example: 'His shrewd negotiation skills saved money.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'judicious', pronunciation: '/dʒuˈdɪʃəs/', meaning: 'showing good judgment', example: 'The judicious use of resources was crucial.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'prudent', pronunciation: '/ˈpruːdənt/', meaning: 'acting with care and thought', example: 'It would be prudent to save more money.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'circumspect', pronunciation: '/ˈsɜːrkəmspekt/', meaning: 'cautious and careful', example: 'The CEO was circumspect about the merger.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'reticent', pronunciation: '/ˈretɪsənt/', meaning: 'reluctant to speak', example: 'He was reticent about his personal life.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'taciturn', pronunciation: '/ˈtæsɪtɜːrn/', meaning: 'reserved in speech', example: 'The taciturn professor rarely spoke in meetings.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'gregarious', pronunciation: '/ɡrɪˈɡeriəs/', meaning: 'sociable and outgoing', example: 'Her gregarious nature made her popular.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'affable', pronunciation: '/ˈæfəbəl/', meaning: 'friendly and easy to talk to', example: 'The affable host made everyone feel welcome.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'congenial', pronunciation: '/kənˈdʒiːniəl/', meaning: 'pleasant and friendly', example: 'The work environment was congenial and productive.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'amenable', pronunciation: '/əˈmiːnəbəl/', meaning: 'willing to agree or accept', example: 'She was amenable to changing the schedule.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'intractable', pronunciation: '/ɪnˈtræktəbəl/', meaning: 'hard to control or deal with', example: 'The problem proved to be intractable.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'obstinate', pronunciation: '/ˈɑːbstɪnət/', meaning: 'stubbornly refusing to change', example: 'His obstinate refusal to compromise was problematic.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'recalcitrant', pronunciation: '/rɪˈkælsɪtrənt/', meaning: 'stubbornly defiant', example: 'The recalcitrant employee ignored all warnings.', category: 'Sophisticated Expressions', mastered: false },
    { word: 'malleable', pronunciation: '/ˈmæliəbəl/', meaning: 'easily influenced or shaped', example: 'Young minds are often more malleable.', category: 'Sophisticated Expressions', mastered: false },

    // Philosophical & Abstract (85 words)
    { word: 'existential', pronunciation: '/ˌeɡzɪˈstenʃəl/', meaning: 'relating to existence and experience', example: 'The novel explores existential themes of meaning.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'metaphysical', pronunciation: '/ˌmetəˈfɪzɪkəl/', meaning: 'beyond physical reality', example: 'The poem contains metaphysical concepts.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'epistemological', pronunciation: '/ɪˌpɪstəməˈlɑːdʒɪkəl/', meaning: 'relating to the theory of knowledge', example: 'The debate had epistemological implications.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'ontological', pronunciation: '/ˌɑːntəˈlɑːdʒɪkəl/', meaning: 'relating to the nature of being', example: 'These are fundamental ontological questions.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'phenomenological', pronunciation: '/fəˌnɑːmənəˈlɑːdʒɪkəl/', meaning: 'relating to conscious experience', example: 'The study took a phenomenological approach.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'dialectical', pronunciation: '/ˌdaɪəˈlektɪkəl/', meaning: 'relating to logical discussion', example: 'The dialectical method explores contradictions.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'transcendental', pronunciation: '/ˌtrænsenˈdentəl/', meaning: 'beyond ordinary experience', example: 'Meditation can provide transcendental experiences.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'utilitarian', pronunciation: '/juˌtɪləˈteriən/', meaning: 'focused on usefulness and results', example: 'The decision was made on utilitarian grounds.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'pragmatic', pronunciation: '/præɡˈmætɪk/', meaning: 'practical rather than idealistic', example: 'We need a pragmatic approach to this problem.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'hegemonic', pronunciation: '/ˌheɡəˈmɑːnɪk/', meaning: 'having dominance or control', example: 'The hegemonic culture influenced smaller groups.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'paradigmatic', pronunciation: '/ˌpærədɪɡˈmætɪk/', meaning: 'serving as a typical example', example: 'This case is paradigmatic of the broader issue.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'quintessence', pronunciation: '/kwɪnˈtesəns/', meaning: 'perfect embodiment of something', example: 'She represents the quintessence of professionalism.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'antithesis', pronunciation: '/ænˈtɪθəsɪs/', meaning: 'direct opposite', example: 'His behavior was the antithesis of professional.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'dichotomy', pronunciation: '/daɪˈkɑːtəmi/', meaning: 'division into two contrasting parts', example: 'There\'s a false dichotomy between art and science.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'paradox', pronunciation: '/ˈpærədɑːks/', meaning: 'seemingly contradictory statement', example: 'The situation presents an interesting paradox.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'juxtaposition', pronunciation: '/ˌdʒʌkstəpəˈzɪʃən/', meaning: 'placing things side by side for contrast', example: 'The juxtaposition of old and new was striking.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'symbiosis', pronunciation: '/ˌsɪmbaɪˈoʊsɪs/', meaning: 'mutually beneficial relationship', example: 'There\'s a symbiosis between technology and education.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'catalyst', pronunciation: '/ˈkætəlɪst/', meaning: 'agent that causes change', example: 'The crisis became a catalyst for reform.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'equilibrium', pronunciation: '/ˌiːkwɪˈlɪbriəm/', meaning: 'state of balance', example: 'The system maintains a delicate equilibrium.', category: 'Philosophical & Abstract', mastered: false },
    { word: 'trajectory', pronunciation: '/trəˈdʒektəri/', meaning: 'path or course of development', example: 'The company\'s trajectory has been impressive.', category: 'Philosophical & Abstract', mastered: false }

    // Additional categories would continue here for C1 level...
  ];

  const vocabularyCategories = [
    { name: 'Academic Excellence', count: 100, color: 'bg-amber-600' },
    { name: 'Sophisticated Expressions', count: 90, color: 'bg-rose-600' },
    { name: 'Philosophical & Abstract', count: 85, color: 'bg-violet-600' },
    { name: 'Professional Mastery', count: 95, color: 'bg-emerald-600' },
    { name: 'Scientific & Technical', count: 110, color: 'bg-blue-600' },
    { name: 'Literary & Artistic', count: 80, color: 'bg-pink-600' },
    { name: 'Cultural & Historical', count: 75, color: 'bg-orange-600' },
    { name: 'Legal & Formal', count: 90, color: 'bg-slate-600' },
    { name: 'Psychological & Social', count: 85, color: 'bg-teal-600' },
    { name: 'Economic & Political', count: 90, color: 'bg-indigo-600' }
  ];

  const skillsActivities = [
    {
      id: 'reading-research',
      type: 'Reading',
      title: 'Advanced Research Analysis',
      description: 'Critically analyze complex research papers and extract nuanced arguments',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'listening-symposium',
      type: 'Listening',
      title: 'Academic Symposium',
      description: 'Follow sophisticated academic discussions with multiple speakers',
      difficulty: 'Advanced',
      time: '40 minutes',
      completed: false
    },
    {
      id: 'writing-thesis',
      type: 'Writing',
      title: 'Academic Thesis',
      description: 'Write sophisticated academic arguments with extensive research',
      difficulty: 'Advanced',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'speaking-keynote',
      type: 'Speaking',
      title: 'Keynote Address',
      description: 'Deliver professional keynote presentations to expert audiences',
      difficulty: 'Advanced',
      time: '45 minutes',
      completed: false
    },
    {
      id: 'reading-philosophy',
      type: 'Reading',
      title: 'Philosophical Texts',
      description: 'Analyze complex philosophical arguments and theories',
      difficulty: 'Advanced',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'listening-symposium',
      type: 'Listening',
      title: 'Expert Panel Discussion',
      description: 'Follow nuanced discussions between field experts',
      difficulty: 'Advanced',
      time: '35 minutes',
      completed: false
    },
    {
      id: 'writing-critique',
      type: 'Writing',
      title: 'Literary Critique',
      description: 'Write sophisticated literary and cultural criticism',
      difficulty: 'Advanced',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'speaking-seminar',
      type: 'Speaking',
      title: 'Academic Seminar',
      description: 'Lead sophisticated academic discussions and seminars',
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
              Can express ideas fluently and spontaneously. Can use language flexibly and effectively for social, academic and professional purposes.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 mb-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-foreground">{progress.points}</span>
              <span className="text-foreground/70">points</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-foreground/70">{progress.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Level Achievement Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-amber-500 to-amber-700 text-white text-lg px-6 py-3">
            <Crown className="w-4 h-4 mr-2" />
            C1 Advanced
          </Badge>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                  <span className="font-semibold">Grammar</span>
                </div>
                <Badge variant="secondary">{progress.completedLessons.length}/35</Badge>
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
                <Badge variant="secondary">{progress.masteredWords.length}/1000</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-rose-200 dark:border-rose-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-rose-500" />
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
                        {topic.lessons.length} expert lessons - C1 Level
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
                                  {lesson.exercises.length} exercises • Advanced level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800">C1</Badge>
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
                  Master 1000 sophisticated C1-level English words for expert communication
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
                  C1-level vocabulary for expert expression and professional excellence
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
                            <Badge variant="outline" className="text-xs">C1</Badge>
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
                      <Badge className="bg-amber-500">C1</Badge>
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
                Test your C1-level knowledge with comprehensive advanced assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">65 questions</p>
                    <Badge className="mt-2 bg-amber-500">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">75 questions</p>
                    <Badge className="mt-2 bg-amber-500">C1 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-rose-500" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">12 sections</p>
                    <Badge className="mt-2 bg-amber-500">C1 Level</Badge>
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