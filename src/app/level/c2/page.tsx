'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Play, Volume2, Star, Trophy, Award, Zap, ArrowLeft, Crown, Sparkles, Gem, Diamond } from 'lucide-react';

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

export default function C2Level() {
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
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('Native Fluency');
  const [showExercise, setShowExercise] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('c2-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('c2-progress', JSON.stringify(newProgress));
  };

  // C2 Grammar Topics with Native-Level Lessons (Mastery Level)
  const grammarTopics = [
    {
      id: 'register-variation',
      topic: 'Register and Style Variation',
      status: 'available',
      lessons: [
        {
          id: 'formal-academic-register',
          title: 'Formal Academic Register',
          content: `
            <h3>Mastering Formal Academic Register</h3>
            <p>Native-level command of the most formal registers in English:</p>
            <p><strong>Lexical Features:</strong> Latinate vocabulary, technical terminology, abstract nouns</p>
            <p><strong>Syntactic Features:</strong> Complex noun phrases, passive constructions, nominalization</p>
            <p><strong>Discourse Features:</strong> Hedging, impersonal style, logical progression</p>
            <ul>
              <li><strong>The aforementioned paradigmatic shift necessitates a fundamental reassessment of established methodological frameworks.</strong></li>
              <li><strong>It is incumbent upon researchers to substantiate their hypotheses with empirical evidence.</strong></li>
              <li><strong>The exigencies of contemporary academia demand unprecedented levels of interdisciplinary collaboration.</strong></li>
            </ul>
            <p>This register is essential for doctoral-level writing and prestigious academic publications.</p>
          `,
          examples: [
            'The bifurcation of theoretical perspectives has engendered considerable epistemological discord.',
            'Contemporary scholarship evinces a proclivity for methodological pluralism.',
            'The aforementioned paradigmatic shift necessitates a comprehensive reevaluation.',
            'Such perspicacious observations merit sustained scholarly investigation.',
            'The concomitant implications of these findings remain largely unexamined.',
            'This lacuna in the extant literature constitutes a significant epistemological deficiency.'
          ],
          exercises: [
            {
              id: 'formal-reg-1',
              type: 'multiple-choice',
              question: 'Which phrase best exemplifies formal academic register?',
              options: ['The study shows that...', 'The data evinces a correlation indicating...', 'We found out that...'],
              correct: 1,
              explanation: '"Evinces" and complex noun phrases characterize formal academic register.'
            },
            {
              id: 'formal-reg-2',
              type: 'fill-blank',
              question: 'The ___ implications of this paradigmatic shift remain largely ___ in contemporary discourse.',
              correct: 'concomitant unexplored',
              explanation: 'Use sophisticated vocabulary like "concomitant" and "unexplored" for formal register.'
            }
          ],
          completed: false
        },
        {
          id: 'literary-stylistic',
          title: 'Literary and Stylistic Devices',
          content: `
            <h3>Advanced Literary and Stylistic Mastery</h3>
            <p>Native-level command of sophisticated stylistic techniques:</p>
            <p><strong>Rhetorical Devices:</strong> Chiasmus, synecdoche, metonymy, oxymoron</p>
            <p><strong>Syntactic Variations:</strong> Anastrophe, hyperbaton, tmesis</p>
            <p><strong>Semantic Techniques:</strong> Irony, paradox, ambiguity, polysemy</p>
            <ul>
              <li><strong>Chiasmus:</strong> "Ask not what your country can do for you—ask what you can do for your country."</li>
              <li><strong>Synecdoche:</strong> "All hands on deck" (hands = people)</li>
              <li><strong>Tmesis:</strong> "A whole nother level" (insertion within a word)</li>
            </ul>
            <p>These devices create nuanced meaning and aesthetic effect in sophisticated discourse.</p>
          `,
          examples: [
            'The deafening silence spoke volumes about their unspoken agreement.',
            'In death, he found the life that had long eluded him.',
            'The Crown announced new policies (Crown = monarchy/government).',
            'Her words were daggers, cutting through his carefully constructed facade.',
            'Time, that most relentless of adversaries, had finally claimed victory.',
            'The bitter sweetness of their parting lingered like morning mist.'
          ],
          exercises: [
            {
              id: 'literary-1',
              type: 'multiple-choice',
              question: 'Which sentence contains an example of synecdoche?',
              options: ['The pen is mightier than the sword', 'All hands on deck', 'Time flies'],
              correct: 1,
              explanation: '"Hands" represents whole people, making this synecdoche.'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'subtle-meaning',
      topic: 'Subtle Meaning Distinctions',
      status: 'available',
      lessons: [
        {
          id: 'modal-nuances',
          title: 'Subtle Modal Distinctions',
          content: `
            <h3>Nuanced Modal Verb Usage</h3>
            <p>Native-level mastery of subtle modal distinctions:</p>
            <p><strong>Epistemic vs. Deontic:</strong> Different meanings in different contexts</p>
            <p><strong>Pragmatic Implications:</strong> Social and interpersonal effects</p>
            <p><strong>Collocational Restrictions:</strong> Natural combinations and restrictions</p>
            <ul>
              <li><strong>"You might want to reconsider."</strong> (gentle suggestion, more polite than "You should")</li>
              <li><strong>"I dare say he's mistaken."</strong> (polite disagreement with confidence)</li>
              <li><strong>"One would imagine..."</strong> (formal speculation with distance)</li>
            </ul>
            <p>These distinctions convey subtle social meanings and register appropriateness.</p>
          `,
          examples: [
            'I dare say his interpretation lacks nuance.',
            'One might venture to suggest an alternative approach.',
            'You could conceivably argue for a different perspective.',
            'It would behoove us to consider all ramifications.',
            'Perchance we might explore this avenue further.',
            'One would be inclined to question such assertions.'
          ],
          exercises: [
            {
              id: 'modal-nuance-1',
              type: 'multiple-choice',
              question: 'Which is the most diplomatically polite?',
              options: ['You should change this', 'You might want to consider revising this', 'Change this'],
              correct: 1,
              explanation: '"Might want to consider" is more diplomatic than direct "should".'
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 'idiomatic-mastery',
      topic: 'Idiomatic and Colloquial Mastery',
      status: 'available',
      lessons: [
        {
          id: 'sophisticated-idioms',
          title: 'Sophisticated Idiomatic Expressions',
          content: `
            <h3>Advanced Idiomatic Fluency</h3>
            <p>Native-level command of sophisticated and rare idiomatic expressions:</p>
            <p><strong>Literary Idioms:</strong> From classical literature and high culture</p>
            <p><strong>Professional Idioms:</strong> Specific to academic and business contexts</p>
            <p><strong>Cultural References:</strong> Deeply embedded cultural knowledge</p>
            <ul>
              <li><strong>"To gild the lily"</strong> - to unnecessarily embellish something already beautiful</li>
              <li><strong>"A Pyrrhic victory"</strong> - a victory that comes at too great a cost</li>
              <li><strong>"To cross the Rubicon"</strong> - to pass a point of no return</li>
              <li><strong>"Between Scylla and Charybdis"</strong> - facing two equally dangerous options</li>
            </ul>
            <p>These expressions demonstrate deep cultural literacy and sophisticated language use.</p>
          `,
          examples: [
            'His attempt to gild the lily with unnecessary flourishes detracted from the elegance.',
            'The company\'s expansion proved a Pyrrhic victory, bankrupting them in the process.',
            'By submitting the controversial article, she had crossed the Rubicon.',
            'The negotiator found himself between Scylla and Charybdis.',
            'Her proclivity for tempering justice with mercy endeared her to colleagues.',
            'The proposal proved to be a mare\'s nest of complications and contradictions.'
          ],
          exercises: [
            {
              id: 'sophist-idiom-1',
              type: 'multiple-choice',
              question: 'Which idiom means "to pass a point of no return"?',
              options: ['Cross the Rubicon', 'Gild the lily', 'Pyrrhic victory'],
              correct: 0,
              explanation: '"Cross the Rubicon" refers to making an irreversible decision, from Caesar\'s historic river crossing.'
            }
          ],
          completed: false
        }
      ]
    }
  ];

  // C2 Vocabulary Database (1500+ words - Native Mastery Level)
  const vocabularyDatabase: VocabularyWord[] = [
    // Native Fluency (150 words)
    { word: 'perspicacious', pronunciation: '/ˌpɜːrspɪˈkeɪʃəs/', meaning: 'having acute mental perception and understanding', example: 'Her perspicacious analysis revealed hidden patterns in the data.', category: 'Native Fluency', mastered: false },
    { word: 'sagacious', pronunciation: '/səˈɡeɪʃəs/', meaning: 'having good judgment; wise', example: 'The sagacious elder provided invaluable counsel to the community.', category: 'Native Fluency', mastered: false },
    { word: 'prescient', pronunciation: '/ˈpresiənt/', meaning: 'having foresight; prophetic', example: 'His prescient warnings about the financial crisis went unheeded.', category: 'Native Fluency', mastered: false },
    { word: 'erudite', pronunciation: '/ˈerəˌdaɪt/', meaning: 'having great learning; scholarly', example: 'The professor\'s erudite lecture captivated the audience.', category: 'Native Fluency', mastered: false },
    { word: 'perspicuous', pronunciation: '/pərˈspɪkjuəs/', meaning: 'clearly expressed and easily understood', example: 'Her perspicuous explanation clarified the complex concept.', category: 'Native Fluency', mastered: false },
    { word: 'recondite', pronunciation: '/ˈrekənˌdaɪt/', meaning: 'difficult to understand; abstruse', example: 'The philosopher\'s recondite theories challenged even expert scholars.', category: 'Native Fluency', mastered: false },
    { word: 'abstruse', pronunciation: '/æbˈstrus/', meaning: 'difficult to understand; obscure', example: 'The mathematical proof was too abstruse for undergraduate students.', category: 'Native Fluency', mastered: false },
    { word: 'ineffable', pronunciation: '/ɪnˈefəbəl/', meaning: 'too great to be expressed in words', example: 'The ineffable beauty of the sunset left them speechless.', category: 'Native Fluency', mastered: false },
    { word: 'indefatigable', pronunciation: '/ˌɪndɪˈfætɪɡəbəl/', meaning: 'showing sustained enthusiastic action; tireless', example: 'Her indefatigable efforts finally yielded breakthrough results.', category: 'Native Fluency', mastered: false },
    { word: 'inscrutable', pronunciation: '/ɪnˈskrutəbəl/', meaning: 'impossible to understand or interpret', example: 'His inscrutable expression revealed nothing of his thoughts.', category: 'Native Fluency', mastered: false },
    { word: 'imperturbable', pronunciation: '/ˌɪmpərˈtɜːrbəbəl/', meaning: 'unable to be upset or excited; calm', example: 'She remained imperturbable despite the chaos around her.', category: 'Native Fluency', mastered: false },
    { word: 'indomitable', pronunciation: '/ɪnˈdɑːmɪtəbəl/', meaning: 'impossible to subdue; unconquerable', example: 'Her indomitable spirit inspired others to persevere.', category: 'Native Fluency', mastered: false },
    { word: 'intrepid', pronunciation: '/ɪnˈtrepɪd/', meaning: 'fearless; adventurous', example: 'The intrepid explorer ventured into uncharted territories.', category: 'Native Fluency', mastered: false },
    { word: 'magnanimous', pronunciation: '/mæɡˈnænəməs/', meaning: 'generous in forgiving; noble', example: 'His magnanimous gesture toward his former rival surprised everyone.', category: 'Native Fluency', mastered: false },
    { word: 'munificent', pronunciation: '/mjuˈnɪfəsənt/', meaning: 'extremely generous; lavish', example: 'The philanthropist\'s munificent donation transformed the university.', category: 'Native Fluency', mastered: false },
    { word: 'parsimonious', pronunciation: '/ˌpɑːrsəˈmoʊniəs/', meaning: 'extremely frugal; stingy', example: 'His parsimonious nature prevented him from enjoying life\'s pleasures.', category: 'Native Fluency', mastered: false },
    { word: 'penurious', pronunciation: '/pəˈnʊriəs/', meaning: 'extremely poor; stingy', example: 'Despite his wealth, he lived a penurious existence.', category: 'Native Fluency', mastered: false },
    { word: 'supercilious', pronunciation: '/ˌsuːpərˈsɪliəs/', meaning: 'condescendingly superior; arrogant', example: 'Her supercilious attitude alienated potential allies.', category: 'Native Fluency', mastered: false },
    { word: 'pusillanimous', pronunciation: '/ˌpjuːsəˈlænəməs/', meaning: 'showing lack of courage; cowardly', example: 'His pusillanimous response disappointed those who trusted him.', category: 'Native Fluency', mastered: false },
    { word: 'pugnacious', pronunciation: '/pʌɡˈneɪʃəs/', meaning: 'eager to fight; aggressive', example: 'The politician\'s pugnacious rhetoric escalated tensions.', category: 'Native Fluency', mastered: false },

    // Sophisticated Discourse (140 words)
    { word: 'obfuscate', pronunciation: '/ˈɑːbfəskeɪt/', meaning: 'to deliberately make unclear or confusing', example: 'The lawyer attempted to obfuscate the central issue.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'prevaricate', pronunciation: '/prɪˈværɪkeɪt/', meaning: 'to speak evasively; to avoid telling the truth', example: 'When questioned directly, he began to prevaricate.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'equivocate', pronunciation: '/ɪˈkwɪvəkeɪt/', meaning: 'to use ambiguous language to avoid committing', example: 'The spokesperson equivocated when asked about future layoffs.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'dissemble', pronunciation: '/dɪˈsembəl/', meaning: 'to conceal true feelings or beliefs', example: 'She learned to dissemble her disappointment with grace.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'dissimulate', pronunciation: '/dɪˈsɪmjəleɪt/', meaning: 'to hide or disguise one\'s thoughts or feelings', example: 'Diplomats often dissimulate their true positions.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'exigent', pronunciation: '/ˈeksədʒənt/', meaning: 'pressing; urgent; demanding', example: 'The exigent circumstances required immediate action.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'exiguous', pronunciation: '/ɪɡˈzɪɡjuəs/', meaning: 'very small in size or amount; scanty', example: 'Their exiguous budget allowed for no luxuries.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'propitious', pronunciation: '/prəˈpɪʃəs/', meaning: 'favorable; advantageous', example: 'The propitious timing of the announcement boosted stock prices.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'auspicious', pronunciation: '/ɔːˈspɪʃəs/', meaning: 'promising success; favorable', example: 'The project began under auspicious circumstances.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'inauspicious', pronunciation: '/ˌɪnɔːˈspɪʃəs/', meaning: 'not conducive to success; unpromising', example: 'The merger began under inauspicious circumstances.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'fortuitous', pronunciation: '/fɔːrˈtuɪtəs/', meaning: 'happening by chance; accidental', example: 'Their fortuitous meeting led to a lifelong friendship.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'serendipitous', pronunciation: '/ˌserəndɪˈpɪtəs/', meaning: 'occurring by happy chance', example: 'The serendipitous discovery revolutionized the field.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'vicissitude', pronunciation: '/vɪˈsɪsɪˌtud/', meaning: 'natural change or variation; ups and downs', example: 'Life\'s vicissitudes had taught her resilience.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'vacillate', pronunciation: '/ˈvæsəleɪt/', meaning: 'to waver between different opinions or actions', example: 'He continued to vacillate between the two options.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'vitiate', pronunciation: '/ˈvɪʃieɪt/', meaning: 'to spoil or impair the quality of', example: 'The scandal vitiated his previously sterling reputation.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'vindicate', pronunciation: '/ˈvɪndɪkeɪt/', meaning: 'to clear of blame or suspicion', example: 'New evidence vindicated her controversial hypothesis.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'vituperate', pronunciation: '/vaɪˈtupəreɪt/', meaning: 'to criticize harshly; to abuse verbally', example: 'The critic vituperated the author\'s latest work.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'calumniate', pronunciation: '/kəˈlʌmnieɪt/', meaning: 'to make false and defamatory statements', example: 'Opposition forces attempted to calumniate the candidate.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'excoriate', pronunciation: '/ɪkˈskɔːrieɪt/', meaning: 'to criticize severely', example: 'The review excoriated the film\'s shallow plot.', category: 'Sophisticated Discourse', mastered: false },
    { word: 'castigate', pronunciation: '/ˈkæstɪɡeɪt/', meaning: 'to reprimand severely', example: 'The board castigated the CEO for poor decisions.', category: 'Sophisticated Discourse', mastered: false },

    // Literary Excellence (130 words)
    { word: 'pellucid', pronunciation: '/pəˈlusɪd/', meaning: 'transparently clear; easily understood', example: 'Her pellucid prose made complex ideas accessible.', category: 'Literary Excellence', mastered: false },
    { word: 'limpid', pronunciation: '/ˈlɪmpɪd/', meaning: 'clear, transparent, and still', example: 'The limpid waters reflected the azure sky.', category: 'Literary Excellence', mastered: false },
    { word: 'mellifluous', pronunciation: '/məˈlɪfluəs/', meaning: 'sweet-sounding; musical', example: 'The soprano\'s mellifluous voice enchanted the audience.', category: 'Literary Excellence', mastered: false },
    { word: 'euphonious', pronunciation: '/juˈfoʊniəs/', meaning: 'pleasing to the ear; harmonious', example: 'The poet chose euphonious words for their sonic beauty.', category: 'Literary Excellence', mastered: false },
    { word: 'cacophonous', pronunciation: '/kəˈkɑːfənəs/', meaning: 'harsh-sounding; discordant', example: 'The cacophonous traffic drowned out conversation.', category: 'Literary Excellence', mastered: false },
    { word: 'sonorous', pronunciation: '/ˈsɑːnərəs/', meaning: 'deep and resonant in sound', example: 'His sonorous voice commanded attention in the cathedral.', category: 'Literary Excellence', mastered: false },
    { word: 'stentorian', pronunciation: '/stenˈtɔːriən/', meaning: 'extremely loud', example: 'The coach\'s stentorian voice could be heard across the field.', category: 'Literary Excellence', mastered: false },
    { word: 'dulcet', pronunciation: '/ˈdʌlsɪt/', meaning: 'sweet and soothing', example: 'The dulcet tones of the harp filled the evening air.', category: 'Literary Excellence', mastered: false },
    { word: 'susurrous', pronunciation: '/səˈsɜːrəs/', meaning: 'full of whispering sounds', example: 'The susurrous leaves created a peaceful ambiance.', category: 'Literary Excellence', mastered: false },
    { word: 'sibilant', pronunciation: '/ˈsɪbələnt/', meaning: 'making a hissing sound', example: 'The sibilant whispers carried across the library.', category: 'Literary Excellence', mastered: false },
    { word: 'scintillating', pronunciation: '/ˈsɪntəleɪtɪŋ/', meaning: 'brilliantly clever; sparkling', example: 'Her scintillating wit made her the life of every party.', category: 'Literary Excellence', mastered: false },
    { word: 'coruscating', pronunciation: '/ˈkɔːrəskeɪtɪŋ/', meaning: 'sparkling; brilliant', example: 'The diamonds\' coruscating beauty mesmerized onlookers.', category: 'Literary Excellence', mastered: false },
    { word: 'iridescent', pronunciation: '/ˌɪrɪˈdesənt/', meaning: 'showing luminous colors that change', example: 'The iridescent feathers shimmered in the sunlight.', category: 'Literary Excellence', mastered: false },
    { word: 'opalescent', pronunciation: '/ˌoʊpəˈlesənt/', meaning: 'showing changing colors like an opal', example: 'The opalescent surface of the soap bubble fascinated children.', category: 'Literary Excellence', mastered: false },
    { word: 'nacreous', pronunciation: '/ˈneɪkriəs/', meaning: 'having a lustrous quality like mother-of-pearl', example: 'The nacreous interior of the shell gleamed softly.', category: 'Literary Excellence', mastered: false },
    { word: 'gossamer', pronunciation: '/ˈɡɑːsəmər/', meaning: 'extremely light and delicate', example: 'Gossamer threads of spider silk caught the morning dew.', category: 'Literary Excellence', mastered: false },
    { word: 'diaphanous', pronunciation: '/daɪˈæfənəs/', meaning: 'light and translucent', example: 'She wore a diaphanous gown that seemed to float.', category: 'Literary Excellence', mastered: false },
    { word: 'ethereal', pronunciation: '/ɪˈθɪriəl/', meaning: 'extremely delicate; heavenly', example: 'The dancer\'s ethereal performance moved the audience to tears.', category: 'Literary Excellence', mastered: false },
    { word: 'evanescent', pronunciation: '/ˌevəˈnesənt/', meaning: 'quickly fading or disappearing', example: 'The evanescent beauty of cherry blossoms inspired poets.', category: 'Literary Excellence', mastered: false },
    { word: 'ephemeral', pronunciation: '/ɪˈfemərəl/', meaning: 'lasting for a very short time', example: 'The ephemeral nature of fame became apparent to the actor.', category: 'Literary Excellence', mastered: false }

    // Additional categories would continue here for C2 level...
  ];

  const vocabularyCategories = [
    { name: 'Native Fluency', count: 150, color: 'bg-emerald-700' },
    { name: 'Sophisticated Discourse', count: 140, color: 'bg-violet-700' },
    { name: 'Literary Excellence', count: 130, color: 'bg-rose-700' },
    { name: 'Cultural Mastery', count: 120, color: 'bg-amber-700' },
    { name: 'Professional Expertise', count: 135, color: 'bg-blue-700' },
    { name: 'Philosophical Depth', count: 110, color: 'bg-purple-700' },
    { name: 'Academic Mastery', count: 125, color: 'bg-indigo-700' },
    { name: 'Artistic Expression', count: 100, color: 'bg-pink-700' },
    { name: 'Historical References', count: 115, color: 'bg-orange-700' },
    { name: 'Scientific Precision', count: 145, color: 'bg-teal-700' }
  ];

  const skillsActivities = [
    {
      id: 'reading-criticism',
      type: 'Reading',
      title: 'Literary Criticism',
      description: 'Analyze sophisticated literary criticism and theoretical frameworks',
      difficulty: 'Native',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'listening-symposium',
      type: 'Listening',
      title: 'Expert Symposium',
      description: 'Follow complex multi-speaker academic symposiums with nuanced debates',
      difficulty: 'Native',
      time: '55 minutes',
      completed: false
    },
    {
      id: 'writing-dissertation',
      type: 'Writing',
      title: 'Dissertation Chapter',
      description: 'Write publication-quality academic prose with sophisticated argumentation',
      difficulty: 'Native',
      time: '90 minutes',
      completed: false
    },
    {
      id: 'speaking-colloquium',
      type: 'Speaking',
      title: 'Academic Colloquium',
      description: 'Lead sophisticated academic discussions with expert peers',
      difficulty: 'Native',
      time: '60 minutes',
      completed: false
    },
    {
      id: 'reading-philosophy',
      type: 'Reading',
      title: 'Philosophical Treatises',
      description: 'Engage with the most challenging philosophical and theoretical texts',
      difficulty: 'Native',
      time: '75 minutes',
      completed: false
    },
    {
      id: 'listening-lecture',
      type: 'Listening',
      title: 'Specialized Lectures',
      description: 'Understand highly technical lectures in specialized fields',
      difficulty: 'Native',
      time: '50 minutes',
      completed: false
    },
    {
      id: 'writing-monograph',
      type: 'Writing',
      title: 'Academic Monograph',
      description: 'Produce scholarly writing at publication standard',
      difficulty: 'Native',
      time: '80 minutes',
      completed: false
    },
    {
      id: 'speaking-keynote',
      type: 'Speaking',
      title: 'Keynote Address',
      description: 'Deliver authoritative presentations to expert audiences',
      difficulty: 'Native',
      time: '55 minutes',
      completed: false
    }
  ];

  // Functions for interactivity
  const completeLesson = (topicId: string, lessonId: string) => {
    const newProgress = { ...progress };
    const lessonKey = `${topicId}-${lessonId}`;
    
    if (!newProgress.completedLessons.includes(lessonKey)) {
      newProgress.completedLessons.push(lessonKey);
      newProgress.grammarProgress = Math.min(100, newProgress.grammarProgress + (100 / 40)); // 40 total lessons for C2
      newProgress.points += 35;
      saveProgress(newProgress);
    }
  };

  const masterWord = (word: string) => {
    const newProgress = { ...progress };
    
    if (!newProgress.masteredWords.includes(word)) {
      newProgress.masteredWords.push(word);
      newProgress.vocabularyProgress = Math.min(100, newProgress.vocabularyProgress + (100 / 1500)); // 1500 total words for C2
      newProgress.points += 20;
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
              C2 Mastery Level
            </h1>
            <p className="text-xl text-foreground/70">
              Can understand virtually everything heard or read. Can express themselves spontaneously with native-like fluency and precision.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 mb-2">
              <Diamond className="w-6 h-6 text-purple-500" />
              <span className="text-2xl font-bold text-foreground">{progress.points}</span>
              <span className="text-foreground/70">points</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-blue-500" />
              <span className="text-foreground/70">{progress.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Level Achievement Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-lg px-6 py-3">
            <Diamond className="w-4 h-4 mr-2" />
            C2 Mastery
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
                <Badge variant="secondary">{progress.completedLessons.length}/40</Badge>
              </div>
              <Progress value={progress.grammarProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.grammarProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-indigo-600" />
                  <span className="font-semibold">Vocabulary</span>
                </div>
                <Badge variant="secondary">{progress.masteredWords.length}/1500</Badge>
              </div>
              <Progress value={progress.vocabularyProgress} className="mb-2" />
              <p className="text-sm text-foreground/70">{Math.round(progress.vocabularyProgress)}% Complete</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                  <span className="font-semibold">Skills Practice</span>
                </div>
                <Badge variant="secondary">0/40</Badge>
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
                        {topic.lessons.length} native-level lessons - C2 Level
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
                                  {lesson.exercises.length} exercises • Native level
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">C2</Badge>
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
                <CardTitle>C2 Vocabulary Categories</CardTitle>
                <CardDescription>
                  Master 1500+ sophisticated C2-level English words for native-like fluency
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
                  C2-level vocabulary for native-like fluency and sophisticated expression
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
                            <Badge variant="outline" className="text-xs">C2</Badge>
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
                      <Badge className="bg-purple-600">C2</Badge>
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
                    Start Native-Level Activity
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
              <CardTitle>C2 Mastery Assessment</CardTitle>
              <CardDescription>
                Test your C2-level knowledge with comprehensive native-level assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-medium">Grammar Test</h4>
                    <p className="text-sm text-muted-foreground">80 questions</p>
                    <Badge className="mt-2 bg-purple-600">C2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                    <h4 className="font-medium">Vocabulary Test</h4>
                    <p className="text-sm text-muted-foreground">100 questions</p>
                    <Badge className="mt-2 bg-purple-600">C2 Level</Badge>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                    <h4 className="font-medium">Skills Test</h4>
                    <p className="text-sm text-muted-foreground">15 sections</p>
                    <Badge className="mt-2 bg-purple-600">C2 Level</Badge>
                  </div>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/assessment">Take C2 Assessment</Link>
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
            <Link href="/level/c1">
              <ArrowLeft className="mr-2 w-4 h-4" />
              C1 Advanced
            </Link>
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Congratulations!</p>
          <Badge className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
            <Diamond className="w-4 h-4 mr-2" />
            Native Mastery Achieved
          </Badge>
        </div>
      </div>
    </div>
  );
}