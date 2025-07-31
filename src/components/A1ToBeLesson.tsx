'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Answer {
  [key: string]: string;
}

export default function A1ToBeLesson() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const correctAnswers: Answer = {
    "q1_be": "am",
    "q2_be": "is", 
    "q3_be": "are",
    "q4_be": "is",
    "q5_be": "are",
    "q6_be": "is",
    "q7_be": "are"
  };

  const handleInputChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value.trim().toLowerCase()
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    for (const id in correctAnswers) {
      if (userAnswers[id] === correctAnswers[id]) {
        correctCount++;
      }
    }

    setShowResults(true);
    if (correctCount === totalQuestions) {
      setFeedback('Excellent! You got all ' + correctCount + ' answers correct!');
    } else {
      setFeedback('You got ' + correctCount + ' out of ' + totalQuestions + ' correct. Keep practicing!');
    }
  };

  const getInputBorderColor = (questionId: string) => {
    if (!showResults) return 'border-gray-300';
    return userAnswers[questionId] === correctAnswers[questionId] 
      ? 'border-green-500' 
      : 'border-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
          A1 Grammar: Chapter 1 - The Verb 'To Be'
        </h1>
        <p className="text-lg text-center mb-8 text-black">
          Learn how to use 'am', 'is', and 'are' to talk about yourself and others!
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Introduction to 'To Be'</h2>
          <p className="mb-4 leading-relaxed text-black">
            The verb "to be" is one of the most important verbs in English. We use it to talk about:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-1 text-black">
            <li><strong className="text-blue-800">Names:</strong> My name is Ana.</li>
            <li><strong className="text-blue-800">Nationalities:</strong> I am from Spain.</li>
            <li><strong className="text-blue-800">Ages:</strong> He is 48 years old.</li>
            <li><strong className="text-blue-800">Feelings:</strong> I am happy.</li>
            <li><strong className="text-blue-800">Descriptions:</strong> It is a big house.</li>
          </ul>
          <p className="text-black">The verb 'to be' changes its form depending on the subject.</p>
        </section>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Practice Exercise: Complete with 'am', 'is', or 'are'</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="min-w-[200px] text-black font-medium">1. I ____ happy.</span>
                <input
                  type="text"
                  className="border-2 rounded px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black border-gray-300"
                  value={userAnswers['q1_be'] || ''}
                  onChange={(e) => handleInputChange('q1_be', e.target.value)}
                  placeholder="am/is/are"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-[200px] text-black font-medium">2. She ____ from Spain.</span>
                <input
                  type="text"
                  className="border-2 rounded px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black border-gray-300"
                  value={userAnswers['q2_be'] || ''}
                  onChange={(e) => handleInputChange('q2_be', e.target.value)}
                  placeholder="am/is/are"
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={checkAnswers}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  Check Answers
                </Button>
              </div>
              
              {feedback && (
                <div className="mt-4 p-3 rounded text-lg font-semibold bg-green-100 text-green-800 border border-green-300">
                  {feedback}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
