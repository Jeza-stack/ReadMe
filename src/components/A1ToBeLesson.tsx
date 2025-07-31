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

export default function A1ToBeLesson() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_be": "am",
    "q2_be": "is", 
    "q3_be": "are",
    "q4_be": "is",
    "q5_be": "are",
    "q6_be": "is",
    "q7_be": "are"
  };

  const questions = [
    { id: 'q1_be', question: '1. I ____ happy.' },
    { id: 'q2_be', question: '2. She ____ from Spain.' },
    { id: 'q3_be', question: '3. They ____ students.' },
    { id: 'q4_be', question: '4. He ____ my brother.' },
    { id: 'q5_be', question: '5. You ____ new here.' },
    { id: 'q6_be', question: '6. It ____ a small cat.' },
    { id: 'q7_be', question: '7. We ____ friends.' }
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

    // Analyze each question
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
          A1 Grammar: Chapter 1 - The Verb 'To Be'
        </h1>
        <p className="text-xl text-center mb-10 text-gray-800 font-semibold">
          Learn how to use 'am', 'is', and 'are' to talk about yourself and others!
        </p>

        {/* Introduction Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Introduction to 'To Be'</h2>
          <p className="mb-6 leading-relaxed text-gray-900 text-lg font-medium">
            The verb "to be" is one of the most important verbs in English. We use it to talk about:
          </p>
          <ul className="list-disc ml-8 mb-6 space-y-2 text-gray-900 text-lg">
            <li><strong className="text-blue-600 font-bold">Names:</strong> <span className="font-semibold">My name is Ana.</span></li>
            <li><strong className="text-blue-600 font-bold">Nationalities:</strong> <span className="font-semibold">I am from Spain.</span></li>
            <li><strong className="text-blue-600 font-bold">Ages:</strong> <span className="font-semibold">He is 48 years old.</span></li>
            <li><strong className="text-blue-600 font-bold">Feelings:</strong> <span className="font-semibold">I am happy.</span></li>
            <li><strong className="text-blue-600 font-bold">Descriptions:</strong> <span className="font-semibold">It is a big house.</span></li>
          </ul>
          <p className="text-gray-900 text-lg font-medium">The verb 'to be' changes its form depending on the subject (who or what is doing the action).</p>
        </section>

        {/* Positive Statements Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">1. Positive Statements (I am, You are, He is...)</h2>
          <p className="mb-6 text-gray-900 text-lg font-medium">When we want to say something positive or true, we use these forms:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Subject</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Full Form</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Short Form (Contraction)</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">I</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">I am</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">I'm</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">I'm a student.<br/>I'm happy.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">You</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">You are</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">You're</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">You're new.<br/>You're welcome.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">He</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">He is</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">He's</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">He's my brother.<br/>He's from Canada.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">She</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">She is</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">She's</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">She's my mother.<br/>She's 45.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">It</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">It is</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">It's</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">It's a dog.<br/>It's cold today.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">We</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">We are</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">We're</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">We're friends.<br/>We're in class.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">They</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">They are</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">They're</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">They're teachers.<br/>They're busy.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-900 text-lg font-medium"><strong className="text-blue-700 font-bold">Note:</strong> Contractions (short forms) like "I'm" or "He's" are very common in spoken English and informal writing. Use them to sound more natural!</p>
          </div>
        </section>

        {/* Negative Statements Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">2. Negative Statements (I am not, You are not...)</h2>
          <p className="mb-6 text-gray-900 text-lg font-medium">To say that something is <em>not</em> true, we add "<strong className="text-red-600 font-bold">not</strong>" after the verb "to be".</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Subject</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Full Form + not</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Short Form (Contraction)</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">I</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">I am not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">I'm not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">I'm not tired.<br/>I'm not from France.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">You</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">You are not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">You aren't</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">You aren't a teacher.<br/>You aren't old.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">He</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">He is not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">He isn't</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">He isn't sad.<br/>He isn't here.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">She</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">She is not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">She isn't</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">She isn't my sister.<br/>She isn't at home.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">It</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">It is not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">It isn't</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">It isn't a cat.<br/>It isn't hot.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">We</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">We are not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">We aren't</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">We aren't busy.<br/>We aren't colleagues.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">They</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-semibold">They are not</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">They aren't</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">They aren't students.<br/>They aren't happy.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-900 text-lg font-medium"><strong className="text-blue-700 font-bold">Note:</strong> For "is not" and "are not", you can also say "is not" and "are not" (full forms), but "isn't" and "aren't" are more common in everyday speech.</p>
          </div>
        </section>

        {/* Questions Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">3. Yes/No Questions and Short Answers</h2>
          <p className="mb-6 text-gray-900 text-lg font-medium">To ask a question with "to be", we put the verb (am, are, is) <strong className="text-blue-700 font-bold">before</strong> the subject.</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Question Structure</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Example Question</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Short Answer (Yes)</th>
                  <th className="border-2 border-gray-300 px-6 py-4 text-left font-bold text-blue-800 text-lg">Short Answer (No)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Am I...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Am I correct?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, you are.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, you aren't.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Are you...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Are you new here?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, I am.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, I'm not.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Is he...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Is he from Canada?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, he is.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, he isn't.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Is she...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Is she 12?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, she is.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, she isn't.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Is it...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Is it a dog?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, it is.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, it isn't.</td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Are we...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Are we in class?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, we are.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, we aren't.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-blue-600 text-lg">Are they...?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 font-bold text-gray-900 text-lg">Are they your parents?</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">Yes, they are.</td>
                  <td className="border-2 border-gray-300 px-6 py-4 text-gray-900 text-lg font-medium">No, they aren't.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-gray-900 text-lg font-medium"><strong className="text-blue-700 font-bold">Important:</strong> Always use a short answer (e.g., "Yes, I am." / "No, he isn't.") not just "Yes" or "No."</p>
          </div>
        </section>

        {/* Practice Exercise */}
        <Card className="bg-green-100 border-green-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 font-bold">Practice Exercise: Complete with 'am', 'is', or 'are'</CardTitle>
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
                        className={`border-3 rounded-lg px-4 py-2 w-36 focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-900 font-semibold text-lg ${getInputBorderColor(item.id)}`}
                        value={userAnswers[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="am/is/are"
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
