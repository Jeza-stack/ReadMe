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

export default function A1Lesson2Articles() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_art": "a",
    "q2_art": "an", 
    "q3_art": "the",
    "q4_art": "a",
    "q5_art": "an",
    "q6_art": "the",
    "q7_art": "a"
  };

  const questions = [
    { id: 'q1_art', question: '1. I have ____ dog.' },
    { id: 'q2_art', question: '2. She is ____ engineer.' },
    { id: 'q3_art', question: '3. ____ sun is bright today.' },
    { id: 'q4_art', question: '4. He bought ____ new car.' },
    { id: 'q5_art', question: '5. My father is ____ architect.' },
    { id: 'q6_art', question: '6. ____ book on the table is mine.' },
    { id: 'q7_art', question: '7. There is ____ apple in the basket.' }
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
          A1 Grammar: Lesson 2 - Articles (a, an, the)
        </h1>
        <p className="text-xl text-center mb-10 text-gray-800 font-semibold">
          Learn when to use 'a', 'an', and 'the' in English sentences!
        </p>

        {/* Introduction Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Introduction to Articles</h2>
          <p className="mb-6 leading-relaxed text-gray-900 text-lg font-medium">
            Articles are small words that come before nouns. In English, we have three articles:
          </p>
          <ul className="list-disc ml-8 mb-6 space-y-2 text-gray-900 text-lg">
            <li><strong className="text-blue-600 font-bold">'a':</strong> <span className="font-semibold">Used before consonant sounds - a cat, a house</span></li>
            <li><strong className="text-blue-600 font-bold">'an':</strong> <span className="font-semibold">Used before vowel sounds - an apple, an hour</span></li>
            <li><strong className="text-blue-600 font-bold">'the':</strong> <span className="font-semibold">Used for specific things - the book, the sun</span></li>
          </ul>
        </section>

        {/* Indefinite Articles Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">1. Indefinite Articles: 'a' and 'an'</h2>
          <p className="mb-6 text-gray-900 text-lg font-medium">Use 'a' and 'an' when talking about one thing that is not specific:</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Use 'A'</h3>
              <p className="mb-4 text-gray-900 font-semibold">Before consonant sounds (b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z)</p>
              <div className="space-y-2 text-gray-900">
                <div><strong>a</strong> book</div>
                <div><strong>a</strong> car</div>
                <div><strong>a</strong> dog</div>
                <div><strong>a</strong> house</div>
                <div><strong>a</strong> university (sounds like "you")</div>
                <div><strong>a</strong> European country</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">Use 'AN'</h3>
              <p className="mb-4 text-gray-900 font-semibold">Before vowel sounds (a, e, i, o, u)</p>
              <div className="space-y-2 text-gray-900">
                <div><strong>an</strong> apple</div>
                <div><strong>an</strong> elephant</div>
                <div><strong>an</strong> ice cream</div>
                <div><strong>an</strong> orange</div>
                <div><strong>an</strong> umbrella</div>
                <div><strong>an</strong> hour (h is silent)</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-900 text-lg font-medium"><strong className="text-blue-700 font-bold">Remember:</strong> It's about the SOUND, not the letter! 'University' starts with 'u' but sounds like 'you', so we use 'a'. 'Hour' starts with 'h' but sounds like 'our', so we use 'an'.</p>
          </div>
        </section>

        {/* Definite Article Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">2. Definite Article: 'the'</h2>
          <p className="mb-6 text-gray-900 text-lg font-medium">Use 'the' when talking about something specific that both you and the listener know about:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">When to use 'THE'</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-semibold text-gray-900 text-lg">Unique things</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>The</strong> sun, <strong>the</strong> moon, <strong>the</strong> earth</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-semibold text-gray-900 text-lg">Second mention</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">I saw a dog. <strong>The</strong> dog was big.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-semibold text-gray-900 text-lg">Specific location</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>The</strong> book on the table</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-semibold text-gray-900 text-lg">Superlatives</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>The</strong> best student, <strong>the</strong> tallest building</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-semibold text-gray-900 text-lg">Musical instruments</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Play <strong>the</strong> piano, <strong>the</strong> guitar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When NOT to use articles */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">3. When NOT to use Articles</h2>
          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200 mb-6">
            <h3 className="text-xl font-bold mb-4 text-red-800">No Article Needed:</h3>
            <ul className="space-y-2 text-gray-900 text-lg">
              <li>• <strong>Names:</strong> John, Mary, London, France</li>
              <li>• <strong>General plural nouns:</strong> Dogs are animals (all dogs)</li>
              <li>• <strong>Uncountable nouns (general):</strong> Water is important</li>
              <li>• <strong>Languages:</strong> I speak English, Spanish</li>
              <li>• <strong>Meals:</strong> Have breakfast, lunch, dinner</li>
              <li>• <strong>Sports:</strong> Play football, tennis, basketball</li>
            </ul>
          </div>
        </section>

        {/* Practice Exercise */}
        <Card className="bg-green-100 border-green-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold">Practice Exercise: Complete with 'a', 'an', or 'the'</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((item) => {
                const result = getQuestionResult(item.id);
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="min-w-[300px] text-gray-900 font-bold text-lg">{item.question}</span>
                      <input
                        type="text"
                        className={`border-3 rounded-lg px-4 py-2 w-20 focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-900 font-semibold text-lg ${getInputBorderColor(item.id)}`}
                        value={userAnswers[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="a/an/the"
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
                        <div className="text-gray-700 text-sm mt-2 italic">
                          {item.question.replace('____', `"${result.correctAnswer}"`)}
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
                          {result.question.replace('____', `"${result.correctAnswer}"`)}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-700">✗ Incorrect Answers ({questionResults.filter(r => !r.isCorrect).length}):</h4>
                      {questionResults.filter(r => !r.isCorrect).map(result => (
                        <div key={result.id} className="text-sm text-red-800 bg-red-100 px-3 py-1 rounded">
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
  );
}