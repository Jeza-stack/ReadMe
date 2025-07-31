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

export default function A1Lesson5Numbers() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_num": "fifteen",
    "q2_num": "twenty-three", 
    "q3_num": "fifty",
    "q4_num": "one hundred",
    "q5_num": "thirty-seven",
    "q6_num": "eighty-nine",
    "q7_num": "sixty-four"
  };

  const questions = [
    { id: 'q1_num', question: '1. Write in words: 15' },
    { id: 'q2_num', question: '2. Write in words: 23' },
    { id: 'q3_num', question: '3. Write in words: 50' },
    { id: 'q4_num', question: '4. Write in words: 100' },
    { id: 'q5_num', question: '5. Write in words: 37' },
    { id: 'q6_num', question: '6. Write in words: 89' },
    { id: 'q7_num', question: '7. Write in words: 64' }
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
        correctAnswer: correctAnswer,
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
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-5xl font-black text-blue-800 text-center mb-6">
          A1 Grammar: Lesson 5 - Numbers & Basic Math
        </h1>
        <p className="text-xl text-center mb-10 text-gray-800 font-semibold">
          Learn numbers from 0 to 100 and basic math vocabulary in English!
        </p>

        {/* Numbers 0-20 */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Numbers 0-20</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-blue-800 text-lg">Number</th>
                  <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-blue-800 text-lg">Word</th>
                  <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-blue-800 text-lg">Number</th>
                  <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-blue-800 text-lg">Word</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">0</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">zero</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">11</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">eleven</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">1</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">one</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">12</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">twelve</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">2</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">two</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">13</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">thirteen</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">3</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">three</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">14</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">fourteen</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">4</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">four</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">15</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">fifteen</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">5</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">five</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">16</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">sixteen</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">6</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">six</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">17</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">seventeen</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">7</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">seven</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">18</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">eighteen</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">8</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">eight</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">19</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">nineteen</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">9</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">nine</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">20</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">twenty</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl">10</td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium">ten</td>
                  <td className="border-2 border-gray-300 px-4 py-3 font-bold text-blue-600 text-xl"></td>
                  <td className="border-2 border-gray-300 px-4 py-3 text-gray-900 text-lg font-medium"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Numbers 21-100 */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Numbers 21-100</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800">Pattern for 21-99:</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div><strong className="text-blue-600">Tens + Ones</strong></div>
                <div>• 21 = twenty-<strong>one</strong></div>
                <div>• 35 = thirty-<strong>five</strong></div>
                <div>• 47 = forty-<strong>seven</strong></div>
                <div>• 68 = sixty-<strong>eight</strong></div>
                <div>• 92 = ninety-<strong>two</strong></div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Tens (10, 20, 30...100):</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div>• 30 = <strong>thirty</strong></div>
                <div>• 40 = <strong>forty</strong> (not "fourty"!)</div>
                <div>• 50 = <strong>fifty</strong></div>
                <div>• 60 = <strong>sixty</strong></div>
                <div>• 70 = <strong>seventy</strong></div>
                <div>• 80 = <strong>eighty</strong></div>
                <div>• 90 = <strong>ninety</strong></div>
                <div>• 100 = <strong>one hundred</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Math */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Basic Math Vocabulary</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Symbol</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Word</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Example</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">How to Say It</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-3xl">+</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">plus / add</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">5 + 3 = 8</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Five plus three equals eight</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-3xl">-</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">minus / subtract</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">10 - 4 = 6</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Ten minus four equals six</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-3xl">×</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">times / multiply</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">3 × 4 = 12</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Three times four equals twelve</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-3xl">÷</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">divided by</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">20 ÷ 5 = 4</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Twenty divided by five equals four</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-3xl">=</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">equals / is</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">7 + 8 = 15</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Seven plus eight equals fifteen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Using Numbers in Daily Life */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Using Numbers in Daily Life</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">Age</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div>• I am <strong>25</strong> years old.</div>
                <div>• She is <strong>thirty</strong>.</div>
                <div>• How old are you?</div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-800">Time</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div>• It's <strong>three</strong> o'clock.</div>
                <div>• At <strong>half past seven</strong>.</div>
                <div>• <strong>Quarter to nine</strong>.</div>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-800">Money</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div>• It costs <strong>fifteen</strong> dollars.</div>
                <div>• That's <strong>$23.50</strong>.</div>
                <div>• How much is it?</div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercise */}
        <Card className="bg-green-100 border-green-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold">Practice Exercise: Write numbers in words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((item) => {
                const result = getQuestionResult(item.id);
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="min-w-[250px] text-gray-900 font-bold text-lg">{item.question}</span>
                      <input
                        type="text"
                        className={`border-3 rounded-lg px-4 py-2 w-40 focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-900 font-semibold text-lg ${getInputBorderColor(item.id)}`}
                        value={userAnswers[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="number in words"
                        disabled={showResults}
                      />
                      {showResults && result?.isCorrect && (
                        <span className="text-green-700 font-bold text-lg">✓ Correct!</span>
                      )}
                    </div>
                    
                    {showResults && result && !result.isCorrect && (
                      <div className="ml-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                        <div className="text-red-800 font-semibold">
                          <span className="text-red-600">✗ Your answer:</span> <span className="font-bold">"{result.userAnswer}"</span>
                        </div>
                        <div className="text-green-800 font-semibold mt-1">
                          <span className="text-green-600">✓ Correct answer:</span> <span className="font-bold text-green-700">"{result.correctAnswer}"</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="pt-6 flex gap-4">
                {!showResults ? (
                  <Button 
                    onClick={checkAnswers}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-lg font-bold"
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
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-bold"
                  >
                    Try Again
                  </Button>
                )}
              </div>
              
              {feedback && (
                <div className={`mt-6 p-4 rounded-lg text-xl font-bold ${
                  feedback.includes('Excellent') 
                    ? 'bg-green-200 text-green-800 border-2 border-green-400' 
                    : 'bg-blue-200 text-blue-800 border-2 border-blue-400'
                }`}>
                  {feedback}
                </div>
              )}

              {showResults && questionResults.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Detailed Results Summary:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-700">✓ Correct Answers ({questionResults.filter(r => r.isCorrect).length}):</h4>
                      {questionResults.filter(r => r.isCorrect).map(result => (
                        <div key={result.id} className="text-sm text-green-800 bg-green-100 px-3 py-1 rounded">
                          {result.question} → {result.correctAnswer}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-700">✗ Incorrect Answers ({questionResults.filter(r => !r.isCorrect).length}):</h4>
                      {questionResults.filter(r => !r.isCorrect).map(result => (
                        <div key={result.id} className="text-sm text-red-800 bg-red-100 px-3 py-1 rounded">
                          {result.question} → {result.correctAnswer}
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
  );
}