'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Answer {
  [key: string]: string;
}

interface QuestionResult {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export default function A1Lesson5Articles() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_articles": "a",
    "q2_articles": "an",
    "q3_articles": "the",
    "q4_articles": "", // no article
    "q5_articles": "the",
    "q6_articles": "a",
    "q7_articles": "an",
    "q8_articles": "the"
  };

  const questions = [
    { id: 'q1_articles', question: '1. I have ____ dog. (pet)', hint: 'one dog, first time mentioning' },
    { id: 'q2_articles', question: '2. She is ____ English teacher.', hint: 'profession starting with vowel sound' },
    { id: 'q3_articles', question: '3. ____ sun is very bright today.', hint: 'unique object, only one in our world' },
    { id: 'q4_articles', question: '4. I like ____ music. (in general)', hint: 'general concept, no specific music' },
    { id: 'q5_articles', question: '5. Please close ____ window.', hint: 'specific window we both know about' },
    { id: 'q6_articles', question: '6. He bought ____ new car.', hint: 'one car, first time mentioning' },
    { id: 'q7_articles', question: '7. My sister is ____ architect.', hint: 'profession starting with vowel sound' },
    { id: 'q8_articles', question: '8. ____ book on the table is mine.', hint: 'specific book we can see' }
  ];

  const handleInputChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value.trim().toLowerCase()
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    const results: QuestionResult[] = [];

    questions.forEach((q) => {
      const userAnswer = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAnswer = correctAnswers[q.id];
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      }

      results.push({
        id: q.id,
        question: q.question,
        userAnswer: userAnswer || '(no answer)',
        correctAnswer: correctAnswer || '(no article)',
        isCorrect: isCorrect
      });
    });

    setQuestionResults(results);
    setShowResults(true);
    
    if (correctCount === totalQuestions) {
      setFeedback(`🎉 Excellent! You got all ${correctCount} answers correct!`);
    } else {
      setFeedback(`📊 You got ${correctCount} out of ${totalQuestions} correct. Review the detailed feedback below to improve!`);
    }
  };

  const getInputBorderColor = (questionId: string) => {
    if (!showResults) return 'border-gray-400';
    const result = questionResults.find(r => r.id === questionId);
    if (!result) return 'border-gray-400';
    return result.isCorrect ? 'border-green-600 border-4' : 'border-red-600 border-4';
  };

  const getQuestionResult = (questionId: string) => {
    return questionResults.find(r => r.id === questionId);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-2 sm:px-4 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-800 mb-3 sm:mb-4 leading-tight">
              A1 Grammar: Chapter 5
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
              Articles (a, an, the)
            </h2>
            <p className="text-base sm:text-lg text-gray-800 font-semibold px-2">
              Learn when and how to use articles to make your English more natural and precise!
            </p>
          </div>

          {/* Introduction Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              What are Articles?
            </h3>
            <p className="mb-4 sm:mb-6 leading-relaxed text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Articles are small words that come before nouns. They help us understand whether we're talking about something specific or general.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-blue-700 text-base sm:text-lg mb-2">A / AN</h4>
                <p className="text-gray-900 text-sm sm:text-base font-medium">Indefinite articles for general or first-time mentions</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-green-700 text-base sm:text-lg mb-2">THE</h4>
                <p className="text-gray-900 text-sm sm:text-base font-medium">Definite article for specific things</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-yellow-700 text-base sm:text-lg mb-2">NO ARTICLE</h4>
                <p className="text-gray-900 text-sm sm:text-base font-medium">Some nouns don't need articles</p>
              </div>
            </div>
          </section>

          {/* Indefinite Articles Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              1. Indefinite Articles: A and AN
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Use <strong className="text-red-600">'a'</strong> or <strong className="text-red-600">'an'</strong> when talking about something general or mentioning it for the first time.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[600px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Article</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">When to Use</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-sm sm:text-base">A</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Before consonant sounds (b, c, d, f, g...)</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">
                      <strong>A</strong> dog, <strong>A</strong> house<br/>
                      <strong>A</strong> university (sounds like "yu")
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-sm sm:text-base">AN</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Before vowel sounds (a, e, i, o, u sounds)</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">
                      <strong>An</strong> apple, <strong>An</strong> elephant<br/>
                      <strong>An</strong> hour (h is silent)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> It's about the <strong className="text-red-600">sound</strong>, not the letter! 
                "University" starts with 'u' but sounds like "yu" (consonant), so we use <strong>"a university"</strong>.
                "Hour" starts with 'h' but the 'h' is silent, so we use <strong>"an hour"</strong>.
              </p>
            </div>
          </section>

          {/* Definite Article Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              2. Definite Article: THE
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Use <strong className="text-red-600">'the'</strong> when both you and the listener know which specific thing you're talking about.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-bold text-green-600 text-base sm:text-lg mb-2">When to use THE:</h4>
                <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-gray-900 text-sm sm:text-base">
                  <li><strong>Specific things:</strong> "Please close <strong className="text-blue-700">the</strong> window." (we know which window)</li>
                  <li><strong>Unique things:</strong> "<strong className="text-blue-700">The</strong> sun is bright." (only one sun)</li>
                  <li><strong>Second mention:</strong> "I saw a dog. <strong className="text-blue-700">The</strong> dog was big." (same dog)</li>
                  <li><strong>Superlatives:</strong> "<strong className="text-blue-700">The</strong> best student" / "<strong className="text-blue-700">The</strong> tallest building"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* No Article Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              3. Zero Article (No Article)
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Sometimes we don't use any article at all!
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded text-sm sm:text-base mb-6">
              <h4 className="font-bold text-orange-700 text-base sm:text-lg mb-2">No article with:</h4>
              <ul className="list-disc ml-4 space-y-1 text-gray-900">
                <li><strong>General concepts:</strong> "I love music" (not specific music)</li>
                <li><strong>Plural nouns (general):</strong> "Dogs are friendly" (dogs in general)</li>
                <li><strong>Proper nouns:</strong> "London", "Mary", "English"</li>
                <li><strong>Meals:</strong> "I eat breakfast at 8 AM"</li>
              </ul>
            </div>
          </section>

          {/* Practice Exercise */}
          <Card className="bg-green-100 border-green-400 border-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-700 font-bold">
                Practice Exercise: Choose the correct article (a, an, the, or no article)
              </CardTitle>
              <p className="text-green-600 text-sm sm:text-base">
                Type your answer in the box. For no article, leave the box empty.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {questions.map((item) => {
                  const result = getQuestionResult(item.id);
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="min-w-0 sm:min-w-[320px]">
                          <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg block">
                            {item.question}
                          </span>
                          <span className="text-gray-600 text-xs sm:text-sm italic">
                            💡 {item.hint}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className={`border-2 rounded-lg px-3 py-2 w-24 sm:w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold text-sm sm:text-base ${getInputBorderColor(item.id)}`}
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            placeholder="a/an/the"
                            disabled={showResults}
                          />
                          {showResults && result?.isCorrect && (
                            <span className="text-green-700 font-bold text-sm sm:text-base">✓ Correct!</span>
                          )}
                        </div>
                      </div>
                      
                      {showResults && result && !result.isCorrect && (
                        <div className="ml-0 sm:ml-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                          <div className="text-red-800 font-semibold text-sm">
                            <span className="text-red-600">✗ Your answer:</span> <span className="font-bold">"{result.userAnswer}"</span>
                          </div>
                          <div className="text-green-800 font-semibold mt-1 text-sm">
                            <span className="text-green-600">✓ Correct answer:</span> <span className="font-bold text-green-700">"{result.correctAnswer}"</span>
                          </div>
                          <div className="text-gray-700 text-xs sm:text-sm mt-2 italic">
                            {item.hint}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {!showResults ? (
                    <Button 
                      onClick={checkAnswers}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold w-full sm:w-auto"
                    >
                      Check Answers
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        setShowResults(false);
                        setFeedback('');
                        setQuestionResults([]);
                        setUserAnswers({});
                      }}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold w-full sm:w-auto"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
                
                {feedback && (
                  <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg text-base sm:text-lg lg:text-xl font-bold ${
                    feedback.includes('Excellent') 
                      ? 'bg-green-200 text-green-800 border-2 border-green-400' 
                      : 'bg-blue-200 text-blue-800 border-2 border-blue-400'
                  }`}>
                    {feedback}
                  </div>
                )}

                {showResults && questionResults.length > 0 && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📋 Detailed Results Summary:</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-green-700 text-sm sm:text-base">✓ Correct Answers ({questionResults.filter(r => r.isCorrect).length}):</h5>
                        {questionResults.filter(r => r.isCorrect).map(result => (
                          <div key={result.id} className="text-xs sm:text-sm text-green-800 bg-green-100 px-2 sm:px-3 py-1 rounded">
                            {result.question.replace('____', `"${result.correctAnswer}"`)}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-red-700 text-sm sm:text-base">✗ Incorrect Answers ({questionResults.filter(r => !r.isCorrect).length}):</h5>
                        {questionResults.filter(r => !r.isCorrect).map(result => (
                          <div key={result.id} className="text-xs sm:text-sm text-red-800 bg-red-100 px-2 sm:px-3 py-1 rounded">
                            {result.question.replace('____', `"${result.correctAnswer}"`)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}