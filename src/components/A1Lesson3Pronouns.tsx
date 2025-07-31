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

export default function A1Lesson3Pronouns() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_pro": "he",
    "q2_pro": "she", 
    "q3_pro": "it",
    "q4_pro": "they",
    "q5_pro": "we",
    "q6_pro": "you",
    "q7_pro": "i"
  };

  const questions = [
    { id: 'q1_pro', question: '1. John is tall. ____ is my friend.' },
    { id: 'q2_pro', question: '2. Mary is a doctor. ____ works at the hospital.' },
    { id: 'q3_pro', question: '3. The book is on the table. ____ is red.' },
    { id: 'q4_pro', question: '4. Tom and Lisa are students. ____ study English.' },
    { id: 'q5_pro', question: '5. My family and I live here. ____ are happy.' },
    { id: 'q6_pro', question: '6. Are ____ ready for the test?' },
    { id: 'q7_pro', question: '7. ____ am learning English.' }
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
          A1 Grammar: Lesson 3 - Personal Pronouns
        </h1>
        <p className="text-xl text-center mb-10 text-gray-800 font-semibold">
          Learn to use I, you, he, she, it, we, they instead of repeating names!
        </p>

        {/* Introduction Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">What are Personal Pronouns?</h2>
          <p className="mb-6 leading-relaxed text-gray-900 text-lg font-medium">
            Personal pronouns are words we use instead of names or nouns. They make speaking and writing easier and less repetitive.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 mb-6">
            <p className="text-gray-900 text-lg font-semibold">
              Instead of saying: "John is tall. John is my friend."<br/>
              We say: "John is tall. <strong className="text-blue-700">He</strong> is my friend."
            </p>
          </div>
        </section>

        {/* Subject Pronouns Table */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Subject Pronouns</h2>
          <p className="mb-6 text-gray-900 text-lg font-medium">Subject pronouns replace the subject (who does the action) in a sentence:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Pronoun</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Replaces</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">I</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Myself (the speaker)</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>I</strong> am a student. <strong>I</strong> like pizza.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">You</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">The person I'm talking to</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>You</strong> are smart. <strong>You</strong> speak English.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">He</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">A man or boy</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">John → <strong>He</strong> is tall. <strong>He</strong> works here.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">She</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">A woman or girl</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Mary → <strong>She</strong> is kind. <strong>She</strong> teaches math.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">It</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Things, animals, places</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">The book → <strong>It</strong> is red. <strong>It</strong> is interesting.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">We</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">The speaker + other people</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">My family and I → <strong>We</strong> are happy. <strong>We</strong> live here.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">They</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Two or more people/things</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Tom and Lisa → <strong>They</strong> are students. <strong>They</strong> study hard.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Usage Rules */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Important Rules</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800">✓ Remember:</h3>
              <ul className="space-y-2 text-gray-900 text-lg">
                <li>• <strong>"I"</strong> is always CAPITAL (never "i")</li>
                <li>• <strong>"You"</strong> is both singular and plural</li>
                <li>• <strong>"He/She"</strong> for people only</li>
                <li>• <strong>"It"</strong> for things, animals, weather</li>
                <li>• <strong>"We"</strong> includes the speaker</li>
                <li>• <strong>"They"</strong> for multiple people/things</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">Examples in Context:</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div><strong>Sarah</strong> is a teacher. → <strong className="text-blue-600">She</strong> is a teacher.</div>
                <div><strong>The cat</strong> is sleeping. → <strong className="text-blue-600">It</strong> is sleeping.</div>
                <div><strong>My friends</strong> are coming. → <strong className="text-blue-600">They</strong> are coming.</div>
                <div><strong>You and I</strong> are here. → <strong className="text-blue-600">We</strong> are here.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Common Mistakes to Avoid</h2>
          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200 mb-6">
            <h3 className="text-xl font-bold mb-4 text-red-800">❌ Don't do this:</h3>
            <div className="space-y-3 text-gray-900 text-lg">
              <div>
                <span className="text-red-600 font-semibold">❌ Wrong:</span> "i am a student" 
                <span className="ml-4 text-green-600 font-semibold">✓ Correct:</span> "<strong>I</strong> am a student"
              </div>
              <div>
                <span className="text-red-600 font-semibold">❌ Wrong:</span> "The book is good. <strong>He</strong> is interesting" 
                <span className="ml-4 text-green-600 font-semibold">✓ Correct:</span> "The book is good. <strong>It</strong> is interesting"
              </div>
              <div>
                <span className="text-red-600 font-semibold">❌ Wrong:</span> "My sister are happy" 
                <span className="ml-4 text-green-600 font-semibold">✓ Correct:</span> "<strong>She</strong> is happy"
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercise */}
        <Card className="bg-green-100 border-green-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold">Practice Exercise: Choose the correct pronoun</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((item) => {
                const result = getQuestionResult(item.id);
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="min-w-[350px] text-gray-900 font-bold text-lg">{item.question}</span>
                      <input
                        type="text"
                        className={`border-3 rounded-lg px-4 py-2 w-24 focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-900 font-semibold text-lg ${getInputBorderColor(item.id)}`}
                        value={userAnswers[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="pronoun"
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