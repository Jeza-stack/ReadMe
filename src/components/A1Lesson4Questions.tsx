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

export default function A1Lesson4Questions() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_qw": "what",
    "q2_qw": "where", 
    "q3_qw": "when",
    "q4_qw": "who",
    "q5_qw": "how",
    "q6_qw": "what",
    "q7_qw": "where"
  };

  const questions = [
    { id: 'q1_qw', question: '1. ____ is your name?' },
    { id: 'q2_qw', question: '2. ____ do you live?' },
    { id: 'q3_qw', question: '3. ____ is your birthday?' },
    { id: 'q4_qw', question: '4. ____ is your teacher?' },
    { id: 'q5_qw', question: '5. ____ are you today?' },
    { id: 'q6_qw', question: '6. ____ time is it?' },
    { id: 'q7_qw', question: '7. ____ is the library?' }
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
          A1 Grammar: Lesson 4 - Question Words
        </h1>
        <p className="text-xl text-center mb-10 text-gray-800 font-semibold">
          Learn to ask questions with What, Where, When, Who, Why, and How!
        </p>

        {/* Introduction Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Question Words (WH-Questions)</h2>
          <p className="mb-6 leading-relaxed text-gray-900 text-lg font-medium">
            Question words help us get specific information. They usually start with "WH" (except "How").
          </p>
        </section>

        {/* Question Words Table */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">The 6 Most Important Question Words</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Question Word</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Asks About</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Examples</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Possible Answers</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">WHAT</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Things, objects, actions</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>What</strong> is your name?<br/><strong>What</strong> do you like?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">My name is John.<br/>I like pizza.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">WHERE</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Places, locations</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>Where</strong> do you live?<br/><strong>Where</strong> is the bank?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">I live in Paris.<br/>It's on Main Street.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">WHEN</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Time, dates</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>When</strong> is your birthday?<br/><strong>When</strong> do you work?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">June 15th.<br/>From 9 to 5.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">WHO</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">People</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>Who</strong> is your teacher?<br/><strong>Who</strong> are you?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Ms. Smith.<br/>I'm a student.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">WHY</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Reasons</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>Why</strong> are you late?<br/><strong>Why</strong> do you study English?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Because of traffic.<br/>For my job.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-2xl">HOW</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Ways, methods, feelings</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium"><strong>How</strong> are you?<br/><strong>How</strong> do you go to work?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">I'm fine, thanks.<br/>By bus.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Question Formation */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">How to Form Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-800">With "To Be" (am/is/are)</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div><strong className="text-blue-600">Question Word + am/is/are + subject</strong></div>
                <div>• What <strong>is</strong> your name?</div>
                <div>• Where <strong>are</strong> you from?</div>
                <div>• Who <strong>is</strong> that person?</div>
                <div>• How <strong>are</strong> you today?</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-800">With Other Verbs</h3>
              <div className="space-y-2 text-gray-900 text-lg">
                <div><strong className="text-blue-600">Question Word + do/does + subject + verb</strong></div>
                <div>• What <strong>do</strong> you like?</div>
                <div>• Where <strong>does</strong> she work?</div>
                <div>• When <strong>do</strong> they study?</div>
                <div>• How <strong>do</strong> you go home?</div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Question Patterns */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Common Question Patterns</h2>
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200 mb-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-800">Everyday Questions You Should Know:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-900 text-lg">
              <div className="space-y-2">
                <div>• <strong>What</strong> time is it?</div>
                <div>• <strong>Where</strong> is the bathroom?</div>
                <div>• <strong>How</strong> much does it cost?</div>
                <div>• <strong>When</strong> is the meeting?</div>
              </div>
              <div className="space-y-2">
                <div>• <strong>Who</strong> is calling?</div>
                <div>• <strong>What</strong> color do you like?</div>
                <div>• <strong>Where</strong> can I buy this?</div>
                <div>• <strong>How</strong> old are you?</div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercise */}
        <Card className="bg-green-100 border-green-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold">Practice Exercise: Complete with the correct question word</CardTitle>
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
                        className={`border-3 rounded-lg px-4 py-2 w-28 focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-900 font-semibold text-lg ${getInputBorderColor(item.id)}`}
                        value={userAnswers[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="question word"
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