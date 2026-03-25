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
              A1 Grammar: Chapter 1
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
              The Verb 'To Be'
            </h2>
            <p className="text-base sm:text-lg text-gray-800 font-semibold px-2">
              Learn how to use 'am', 'is', and 'are' to talk about yourself and others!
            </p>
          </div>

          {/* Introduction Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              Introduction to 'To Be'
            </h3>
            <p className="mb-4 sm:mb-6 leading-relaxed text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              The verb "to be" is one of the most important verbs in English. We use it to talk about:
            </p>
            <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-gray-900 text-sm sm:text-base lg:text-lg">
              <li><strong className="text-blue-600 font-bold">Names:</strong> <span className="font-semibold">My name is Ana.</span></li>
              <li><strong className="text-blue-600 font-bold">Nationalities:</strong> <span className="font-semibold">I am from Spain.</span></li>
              <li><strong className="text-blue-600 font-bold">Ages:</strong> <span className="font-semibold">He is 48 years old.</span></li>
              <li><strong className="text-blue-600 font-bold">Feelings:</strong> <span className="font-semibold">I am happy.</span></li>
              <li><strong className="text-blue-600 font-bold">Descriptions:</strong> <span className="font-semibold">It is a big house.</span></li>
            </ul>
            <p className="text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              The verb 'to be' changes its form depending on the subject (who or what is doing the action).
            </p>
          </section>

          {/* Positive Statements Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              1. Positive Statements (I am, You are, He is...)
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              When we want to say something positive or true, we use these forms:
            </p>
            
            {/* Mobile-First Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[600px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Subject</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Full Form</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Short Form</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">I</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">I am</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">I'm</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I'm a student.<br/>I'm happy.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">You</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">You are</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">You're</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">You're new.<br/>You're welcome.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">He</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">He is</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">He's</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">He's my brother.<br/>He's from Canada.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">She</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">She is</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">She's</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">She's my mother.<br/>She's 45.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">It is</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">It's</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">It's a dog.<br/>It's cold today.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">We</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">We are</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">We're</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">We're friends.<br/>We're in class.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">They are</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">They're</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">They're teachers.<br/>They're busy.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Note:</strong> Contractions (short forms) like "I'm" or "He's" are very common in spoken English and informal writing. Use them to sound more natural!
              </p>
            </div>
          </section>

          {/* Negative Statements Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              2. Negative Statements (I am not, You are not...)
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              To say that something is *not* true, we add "<strong>not</strong>" after the verb "to be".
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[600px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Subject</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Full Form + not</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Short Form</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">I</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">I am not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">I'm not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I'm not tired.<br/>I'm not from France.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">You</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">You are not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">You aren't</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">You aren't a teacher.<br/>You aren't old.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">He</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">He is not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">He isn't</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">He isn't sad.<br/>He isn't here.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">She</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">She is not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">She isn't</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">She isn't my sister.<br/>She isn't at home.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">It is not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">It isn't</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">It isn't a cat.<br/>It isn't hot.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">We</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">We are not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">We aren't</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">We aren't busy.<br/>We aren't colleagues.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">They are not</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">They aren't</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">They aren't students.<br/>They aren't happy.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Note:</strong> For "is not" and "are not", you can also say "is not" and "are not" (full forms), but "isn't" and "aren't" are more common in everyday speech.
              </p>
            </div>
          </section>

          {/* Questions Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              3. Yes/No Questions and Short Answers
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              To ask a question with "to be", we put the verb (am, are, is) <strong>before</strong> the subject.
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
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Am I...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Am I correct?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, you are.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, you aren't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Are you...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Are you new here?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, I am.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, I'm not.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Is he...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Is he from Canada?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, he is.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, he isn't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Is she...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Is she 12?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, she is.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, she isn't.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Is it...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Is it a dog?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, it is.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, it isn't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Are we...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Are we in class?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, we are.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, we aren't.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Are they...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Are they your parents?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, they are.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, they aren't.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Important:</strong> Always use a short answer (e.g., "Yes, I am." / "No, he isn't.") not just "Yes" or "No."
              </p>
            </div>
          </section>

          {/* Practice Exercise - Mobile Optimized */}
          <Card className="bg-green-100 border-green-400 border-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-700 font-bold">
                Practice Exercise: Complete with 'am', 'is', or 'are'
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {questions.map((item) => {
                  const result = getQuestionResult(item.id);
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg min-w-0 sm:min-w-[200px]">
                          {item.question}
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className={`border-2 rounded-lg px-3 py-2 w-20 sm:w-24 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold text-sm sm:text-base ${getInputBorderColor(item.id)}`}
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            placeholder="verb"
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
                            {item.question.replace('____', `"${result.correctAnswer}"`)}
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
