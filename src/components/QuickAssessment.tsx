'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Award, Target, BookOpen, CheckCircle } from 'lucide-react';

interface AssessmentAnswer {
  [key: string]: string;
}

interface QuestionResult {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  level: string;
}

interface CEFRLevel {
  level: string;
  name: string;
  color: string;
  minScore: number;
  description: string;
  feedback: string;
}

export default function QuickAssessment() {
  const [currentSection, setCurrentSection] = useState<'intro' | 'test' | 'results'>('intro');
  const [userAnswers, setUserAnswers] = useState<AssessmentAnswer>({});
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [score, setScore] = useState(0);
  const [cefrLevel, setCefrLevel] = useState<CEFRLevel | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState<string>('');

  const cefrLevels: CEFRLevel[] = [
    {
      level: 'A1',
      name: 'Beginner',
      color: 'bg-red-500',
      minScore: 0,
      description: 'Basic user with limited vocabulary and simple expressions',
      feedback: 'Focus on basic greetings, simple sentences, and everyday vocabulary. Start with our A1 grammar lessons!'
    },
    {
      level: 'A2',
      name: 'Pre-Intermediate', 
      color: 'bg-orange-500',
      minScore: 5,
      description: 'Can communicate in simple routine tasks',
      feedback: 'Great start! You can handle basic communication. Build on your foundation with A2 content.'
    },
    {
      level: 'B1',
      name: 'Intermediate',
      color: 'bg-yellow-500',
      minScore: 10,
      description: 'Can handle main points and familiar situations',
      feedback: 'Good work! You can handle most travel situations and express yourself on familiar topics.'
    },
    {
      level: 'B2',
      name: 'Upper-Intermediate',
      color: 'bg-green-500',
      minScore: 15,
      description: 'Can interact fluently and understand complex ideas',
      feedback: 'Excellent! You can communicate effectively on a wide range of topics with good fluency.'
    },
    {
      level: 'C1',
      name: 'Advanced',
      color: 'bg-blue-500',
      minScore: 18,
      description: 'Can use language flexibly for academic and professional purposes',
      feedback: 'Outstanding! You demonstrate advanced proficiency with sophisticated language use.'
    },
    {
      level: 'C2',
      name: 'Proficiency',
      color: 'bg-purple-500',
      minScore: 19,
      description: 'Near-native proficiency in all aspects',
      feedback: 'Exceptional! You have near-native proficiency. Consider preparing for official certification.'
    }
  ];

  const questions = [
    // Grammar Questions (8)
    {
      id: 'q1',
      type: 'radio',
      level: 'A1',
      category: 'Grammar',
      question: 'My name ____ Sarah.',
      options: ['am', 'is', 'are'],
      correct: 'is'
    },
    {
      id: 'q2',
      type: 'fill',
      level: 'A1', 
      category: 'Grammar',
      question: 'They ____ (not / like) cold weather.',
      placeholder: 'don\'t like',
      correct: 'don\'t like'
    },
    {
      id: 'q3',
      type: 'radio',
      level: 'A2',
      category: 'Grammar',
      question: 'What ____ you ____ tomorrow evening? (do)',
      options: ['do...do', 'are...doing', 'will...do'],
      correct: 'are...doing'
    },
    {
      id: 'q4',
      type: 'radio',
      level: 'A2',
      category: 'Grammar', 
      question: 'I ____ to visit London next year. (plan)',
      options: ['am going to plan', 'am planning', 'plan'],
      correct: 'am planning'
    },
    {
      id: 'q5',
      type: 'fill',
      level: 'B1',
      category: 'Grammar',
      question: 'If I ____ (know) his number, I would call him.',
      placeholder: 'knew',
      correct: 'knew'
    },
    {
      id: 'q6',
      type: 'radio',
      level: 'B1',
      category: 'Grammar',
      question: 'She ____ (live) in this city for five years. (still lives here)',
      options: ['lived', 'has lived', 'is living'],
      correct: 'has lived'
    },
    {
      id: 'q7',
      type: 'fill',
      level: 'B2',
      category: 'Grammar',
      question: 'The report ____ (write) by the manager yesterday.',
      placeholder: 'was written',
      correct: 'was written'
    },
    {
      id: 'q8',
      type: 'radio',
      level: 'B2',
      category: 'Grammar',
      question: 'He said that he ____ (finish) the project by Friday.',
      options: ['will finish', 'had finished', 'finishes'],
      correct: 'had finished'
    },
    // Vocabulary Questions (8)
    {
      id: 'q9',
      type: 'radio',
      level: 'A1',
      category: 'Vocabulary',
      question: 'Which word means "your male parent"?',
      options: ['Mother', 'Father', 'Sister'],
      correct: 'Father'
    },
    {
      id: 'q10',
      type: 'fill',
      level: 'A1',
      category: 'Vocabulary',
      question: 'Complete the sentence: "I ____ up at 7 AM every day."',
      placeholder: 'wake',
      correct: 'wake'
    },
    {
      id: 'q11',
      type: 'radio',
      level: 'A2',
      category: 'Vocabulary',
      question: 'What is a "hobby"?',
      options: ['A type of food', 'An activity you do for pleasure', 'A school subject'],
      correct: 'An activity you do for pleasure'
    },
    {
      id: 'q12',
      type: 'radio',
      level: 'A2',
      category: 'Vocabulary',
      question: 'Choose the correct word: "The train station is very ____ the city center." (near)',
      options: ['far', 'close to', 'on'],
      correct: 'close to'
    },
    {
      id: 'q13',
      type: 'radio',
      level: 'B1',
      category: 'Vocabulary',
      question: 'Which word means "a strong desire to achieve something"?',
      options: ['Ambition', 'Hobby', 'Habit'],
      correct: 'Ambition'
    },
    {
      id: 'q14',
      type: 'fill',
      level: 'B1',
      category: 'Vocabulary',
      question: 'Complete the sentence: "It\'s important to ____ your opinion clearly." (express)',
      placeholder: 'express',
      correct: 'express'
    },
    {
      id: 'q15',
      type: 'radio',
      level: 'B2',
      category: 'Vocabulary',
      question: 'Which word means "to make something worse"?',
      options: ['Improve', 'Enhance', 'Exacerbate'],
      correct: 'Exacerbate'
    },
    {
      id: 'q16',
      type: 'radio',
      level: 'B2',
      category: 'Vocabulary',
      question: 'Choose the correct idiom: "He finally decided to ____ and start his own business." (take a risk)',
      options: ['bite the bullet', 'take the plunge', 'break a leg'],
      correct: 'take the plunge'
    },
    // Reading Comprehension Questions (4)
    {
      id: 'q17',
      type: 'radio',
      level: 'A1',
      category: 'Reading',
      question: 'What is Alex\'s job? (See reading text)',
      options: ['A student', 'A doctor', 'A teacher'],
      correct: 'A teacher'
    },
    {
      id: 'q18',
      type: 'radio',
      level: 'A1',
      category: 'Reading',
      question: 'What does Alex do in the evening?',
      options: ['He goes to work.', 'He reads books or plays games.', 'He cooks dinner.'],
      correct: 'He reads books or plays games.'
    },
    {
      id: 'q19',
      type: 'radio',
      level: 'B1',
      category: 'Reading',
      question: 'According to the climate text, what is a primary cause of climate change?',
      options: ['Natural weather patterns', 'Human activities, like burning fossil fuels', 'Volcanic eruptions'],
      correct: 'Human activities, like burning fossil fuels'
    },
    {
      id: 'q20',
      type: 'radio',
      level: 'B2',
      category: 'Reading',
      question: 'What does "mitigate" most closely mean in the climate text?',
      options: ['Increase', 'Worsen', 'Reduce the severity of'],
      correct: 'Reduce the severity of'
    }
  ];

  const handleInputChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value.trim()
    }));
  };

  const startAssessment = () => {
    setCurrentSection('test');
    setStartTime(new Date());
  };

  const calculateResults = () => {
    const endTime = new Date();
    if (startTime) {
      const timeDiff = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
      setTimeSpent(`${timeDiff} minutes`);
    }

    let correctAnswers = 0;
    const questionResults: QuestionResult[] = [];

    questions.forEach(question => {
      const userAnswer = userAnswers[question.id]?.toLowerCase() || '';
      const correctAnswer = question.correct.toLowerCase();
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect) correctAnswers++;

      questionResults.push({
        id: question.id,
        question: question.question,
        userAnswer: userAnswers[question.id] || '(no answer)',
        correctAnswer: question.correct,
        isCorrect,
        level: question.level
      });
    });

    setScore(correctAnswers);
    setResults(questionResults);

    // Determine CEFR level
    const level = cefrLevels
      .slice()
      .reverse()
      .find(level => correctAnswers >= level.minScore) || cefrLevels[0];
    
    setCefrLevel(level);
    setCurrentSection('results');
  };

  const resetAssessment = () => {
    setCurrentSection('intro');
    setUserAnswers({});
    setResults([]);
    setScore(0);
    setCefrLevel(null);
    setStartTime(null);
    setTimeSpent('');
  };

  if (currentSection === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Target className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
              Quick Assessment: Find Your Level
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              This 15-minute assessment will help you estimate your current English CEFR level (A1-C2)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Your estimated CEFR level (A1-C2)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Detailed feedback on your performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Personalized learning recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Immediate results and progress tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Assessment Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-sm sm:text-base">Grammar Questions</span>
                    <Badge variant="secondary">8 questions</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-sm sm:text-base">Vocabulary Questions</span>
                    <Badge variant="secondary">8 questions</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-sm sm:text-base">Reading Comprehension</span>
                    <Badge variant="secondary">4 questions</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="text-center">
            <CardContent className="p-6 sm:p-8">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Start?</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                The assessment will take approximately 15 minutes. Make sure you have a quiet environment.
              </p>
              <Button 
                onClick={startAssessment}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-bold"
              >
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentSection === 'test') {
    return (
      <div className="min-h-screen bg-gray-50 px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Quick Assessment
              </h1>
              <div className="flex justify-center items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="text-sm sm:text-base">Estimated time: 15 minutes</span>
              </div>
            </div>

            {/* Reading Texts */}
            <Card className="mb-8 sm:mb-10">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-blue-700">Reading Texts</CardTitle>
                <p className="text-sm text-gray-600">Read these texts carefully. You'll answer questions about them later.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 mb-3">Text 1: Daily Routine (A1)</h4>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    My name is Alex. I am 30 years old. I am a teacher. I work in a school. Every morning, I get up at 7:00 AM. 
                    I eat breakfast and then I go to school. My school is big. I like my job very much. In the evening, 
                    I read books or play games.
                  </p>
                </div>
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-3">Text 2: Climate Change (B1/B2)</h4>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    Climate change is a significant global challenge that requires urgent attention. Scientists agree that human activities, 
                    particularly the burning of fossil fuels, are primarily responsible for the increase in greenhouse gases in the atmosphere. 
                    This leads to rising global temperatures, more frequent extreme weather events, and disruptions to ecosystems. 
                    Addressing this issue necessitates a shift towards renewable energy sources, sustainable consumption, and international cooperation. 
                    Many individuals are also adopting eco-friendly habits to mitigate their personal impact.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <form className="space-y-6 sm:space-y-8">
              {['Grammar', 'Vocabulary', 'Reading'].map(category => (
                <Card key={category} className="border-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg sm:text-xl text-blue-700">
                      {category} Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {questions
                      .filter(q => q.category === category)
                      .map((question, index) => (
                        <div key={question.id} className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                              {questions.filter(q => q.category === category).indexOf(question) + 1}. {question.question}
                            </h4>
                            <Badge className={`${cefrLevels.find(l => l.level === question.level)?.color} text-white text-xs w-fit`}>
                              {question.level}
                            </Badge>
                          </div>
                          
                          {question.type === 'radio' && question.options ? (
                            <div className="space-y-2">
                              {question.options.map((option, optIndex) => (
                                <label key={optIndex} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-sm sm:text-base text-gray-800">{option}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <input
                              type="text"
                              placeholder={question.placeholder || 'Type your answer...'}
                              className="w-full max-w-xs border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
                              onChange={(e) => handleInputChange(question.id, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
              
              <div className="text-center pt-6">
                <Button 
                  onClick={calculateResults}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold"
                >
                  Submit Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'results') {
    return (
      <div className="min-h-screen bg-gray-50 px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8 sm:mb-12">
              <Award className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Here are your results and personalized recommendations
              </p>
            </div>

            {/* Main Results */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <Card className={`border-4 ${cefrLevel?.color} text-center`}>
                <CardContent className="p-6 sm:p-8">
                  <div className="text-4xl sm:text-6xl font-black text-gray-900 mb-2">
                    {score}/20
                  </div>
                  <div className="text-lg sm:text-xl text-gray-600 mb-4">
                    Questions Correct
                  </div>
                  <Badge className={`${cefrLevel?.color} text-white text-lg sm:text-xl px-4 py-2 font-bold`}>
                    {cefrLevel?.level} - {cefrLevel?.name}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-medium">Time Spent:</span>
                    <span className="font-bold text-blue-600">{timeSpent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-medium">Accuracy:</span>
                    <span className="font-bold text-green-600">{Math.round((score/20)*100)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-medium">Level:</span>
                    <span className="font-bold text-purple-600">{cefrLevel?.level}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback */}
            <Card className="mb-8 sm:mb-12">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Your Feedback & Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    {cefrLevel?.feedback}
                  </p>
                </div>
                <div className="text-sm sm:text-base text-gray-700 mb-4">
                  <strong>Level Description:</strong> {cefrLevel?.description}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="mb-8 sm:mb-12">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Detailed Breakdown by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                  {['Grammar', 'Vocabulary', 'Reading'].map(category => {
                    const categoryQuestions = questions.filter(q => q.category === category);
                    const categoryCorrect = results.filter(r => 
                      categoryQuestions.some(q => q.id === r.id) && r.isCorrect
                    ).length;
                    
                    return (
                      <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{category}</h4>
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                          {categoryCorrect}/{categoryQuestions.length}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {Math.round((categoryCorrect/categoryQuestions.length)*100)}% correct
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={resetAssessment}
                  variant="outline"
                  size="lg"
                  className="font-semibold text-base sm:text-lg px-6 sm:px-8"
                >
                  Take Again
                </Button>
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg px-6 sm:px-8"
                >
                  Start Learning at {cefrLevel?.level} Level
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}