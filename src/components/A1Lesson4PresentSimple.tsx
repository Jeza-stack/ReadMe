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

export default function A1Lesson4PresentSimple() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_regular": "lives",
    "q2_regular": "study",
    "q3_regular": "don't",
    "q4_regular": "does",
    "q5_regular": "watch",
    "q6_regular": "goes",
    "q7_regular": "sleeps"
  };

  const questions = [
    { id: 'q1_regular', question: '1. My sister (live / lives) in London.' },
    { id: 'q2_regular', question: '2. I (study / studies) English every day.' },
    { id: 'q3_regular', question: '3. They (don\'t / doesn\'t) like coffee.' },
    { id: 'q4_regular', question: '4. (Do / Does) he play sports?' },
    { id: 'q5_regular', question: '5. We (watch / watches) movies on weekends.' },
    { id: 'q6_regular', question: '6. She (go / goes) to school by bus.' },
    { id: 'q7_regular', question: '7. My cat (sleep / sleeps) a lot.' }
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
    <div className="min-h-screen bg-gray-100 px-2 sm:px-4 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-800 mb-3 sm:mb-4 leading-tight">
              A1 Grammar: Chapter 4
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
              Present Simple (Regular Verbs)
            </h2>
            <p className="text-base sm:text-lg text-gray-800 font-semibold px-2">
              Learn how to use the Present Simple for daily routines, habits, and facts!
            </p>
          </div>

          {/* Introduction Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              What is the Present Simple?
            </h3>
            <p className="mb-4 sm:mb-6 leading-relaxed text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              We use the Present Simple tense to talk about:
            </p>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-bold text-blue-600 text-base sm:text-lg mb-2">Habits and routines: things you do regularly.</h4>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded text-sm sm:text-base">
                  <p className="mb-2 text-gray-900 font-medium">I <strong className="text-blue-700">wake up</strong> at 7 AM every day.</p>
                  <p className="text-gray-900 font-medium">She <strong className="text-blue-700">goes</strong> to work by bus.</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-blue-600 text-base sm:text-lg mb-2">General truths or facts: things that are always true.</h4>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded text-sm sm:text-base">
                  <p className="mb-2 text-gray-900 font-medium">The sun <strong className="text-blue-700">rises</strong> in the east.</p>
                  <p className="text-gray-900 font-medium">Birds <strong className="text-blue-700">fly</strong>.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Positive Statements Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              1. Positive Statements
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              For most verbs in the Present Simple, the form is simple!
            </p>
            
            {/* Mobile-First Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[600px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Subject</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Verb Form</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">I, You, We, They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Base form of the verb</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">
                      I <strong>work</strong> in an office.<br/>
                      You <strong>eat</strong> breakfast.<br/>
                      We <strong>watch</strong> TV.<br/>
                      They <strong>live</strong> in a city.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">He, She, It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Verb + -s / -es</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">
                      He <strong>works</strong> on his computer.<br/>
                      She <strong>eats</strong> lunch at 1 PM.<br/>
                      It <strong>sleeps</strong> a lot.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium mb-3">
                <strong className="text-blue-700 font-bold">Important Rule:</strong> For <strong>he, she, it</strong> (or singular nouns like 'my brother', 'the dog'), we add <strong className="text-red-600">-s</strong> or <strong className="text-red-600">-es</strong> to the end of the verb.
              </p>
              <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-900 text-sm sm:text-base">
                <li>Most verbs: add <strong className="text-red-600">-s</strong> (e.g., <strong>work</strong> → work<strong className="text-red-600">s</strong>, <strong>eat</strong> → eat<strong className="text-red-600">s</strong>, <strong>sleep</strong> → sleep<strong className="text-red-600">s</strong>).</li>
                <li>Verbs ending in <strong>-ch, -sh, -s, -x, -z, -o</strong>: add <strong className="text-red-600">-es</strong> (e.g., <strong>watch</strong> → watch<strong className="text-red-600">es</strong>, <strong>go</strong> → go<strong className="text-red-600">es</strong>).</li>
                <li>Verbs ending in consonant + <strong>-y</strong>: change <strong>-y</strong> to <strong className="text-red-600">-ies</strong> (e.g., <strong>study</strong> → stud<strong className="text-red-600">ies</strong>, <strong>fly</strong> → fl<strong className="text-red-600">ies</strong>).</li>
              </ul>
            </div>
          </section>

          {/* Negative Statements Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              2. Negative Statements
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              To make a negative sentence with most verbs in the Present Simple, we use <strong className="text-red-600">'do not'</strong> or <strong className="text-red-600">'does not'</strong> before the base form of the main verb.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[600px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Subject</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Negative Form</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">I, You, We, They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">do not (don't) + base verb</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">
                      I <strong>don't like</strong> milk.<br/>
                      We <strong>don't go</strong> to bed late.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">He, She, It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">does not (doesn't) + base verb</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">
                      He <strong>doesn't watch</strong> TV.<br/>
                      She <strong>doesn't cook</strong> every day.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> The main verb is always in its <strong className="text-red-600">base form</strong> after 'don't' or 'doesn't'. Don't add '-s' or '-es'!
              </p>
            </div>
          </section>

          {/* Questions Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              3. Questions
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              To ask a question with most verbs in the Present Simple, we use <strong className="text-red-600">'Do'</strong> or <strong className="text-red-600">'Does'</strong> at the beginning of the sentence, before the subject. The main verb stays in its base form.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[700px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Question Structure</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Example Question</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Short Answer (Yes)</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Short Answer (No)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Do I/you/we/they...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Do you</strong> like pizza?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, I do.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, I don't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Does he/she/it...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Does she</strong> cook dinner?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, she does.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, she doesn't.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> The main verb is always in its <strong className="text-red-600">base form</strong> in questions!
              </p>
            </div>
          </section>

          {/* Practice Exercise - Mobile Optimized */}
          <Card className="bg-green-100 border-green-400 border-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-700 font-bold">
                Practice Exercise: Choose the correct form of the verb
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {questions.map((item) => {
                  const result = getQuestionResult(item.id);
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg min-w-0 sm:min-w-[280px]">
                          {item.question}
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className={`border-2 rounded-lg px-3 py-2 w-24 sm:w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold text-sm sm:text-base ${getInputBorderColor(item.id)}`}
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            placeholder="answer"
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
                            {item.question.replace(/\([^)]*\)/, `"${result.correctAnswer}"`)}
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
                            {result.question.replace(/\([^)]*\)/, `"${result.correctAnswer}"`)}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-red-700 text-sm sm:text-base">✗ Incorrect Answers ({questionResults.filter(r => !r.isCorrect).length}):</h5>
                        {questionResults.filter(r => !r.isCorrect).map(result => (
                          <div key={result.id} className="text-xs sm:text-sm text-red-800 bg-red-100 px-2 sm:px-3 py-1 rounded">
                            {result.question.replace(/\([^)]*\)/, `"${result.correctAnswer}"`)}
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