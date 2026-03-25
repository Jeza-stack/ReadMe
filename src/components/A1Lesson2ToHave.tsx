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

export default function A1Lesson2ToHave() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_have": "have",
    "q2_have": "has",
    "q3_have": "have",
    "q4_have": "has",
    "q5_have": "have",
    "q6_have": "has",
    "q7_have": "have"
  };

  const questions = [
    { id: 'q1_have', question: '1. I ____ a new phone.' },
    { id: 'q2_have', question: '2. She ____ two cats.' },
    { id: 'q3_have', question: '3. They ____ many friends.' },
    { id: 'q4_have', question: '4. He ____ a big family.' },
    { id: 'q5_have', question: '5. We ____ a new teacher.' },
    { id: 'q6_have', question: '6. My dog ____ a long tail.' },
    { id: 'q7_have', question: '7. You ____ blue eyes.' }
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
              A1 Grammar: Chapter 2
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
              The Verb 'To Have'
            </h2>
            <p className="text-base sm:text-lg text-gray-800 font-semibold px-2">
              Learn how to use 'have' and 'has' to talk about possession and family!
            </p>
          </div>

          {/* Introduction Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              Introduction to 'To Have'
            </h3>
            <p className="mb-4 sm:mb-6 leading-relaxed text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              We use the verb "to have" to talk about:
            </p>
            <ul className="list-disc ml-4 sm:ml-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-gray-900 text-sm sm:text-base lg:text-lg">
              <li><strong className="text-blue-600 font-bold">Possession:</strong> <span className="font-semibold">things that belong to someone.</span></li>
              <li><strong className="text-blue-600 font-bold">Family members:</strong> <span className="font-semibold">how many brothers, sisters, etc., you have.</span></li>
              <li><strong className="text-blue-600 font-bold">Characteristics:</strong> <span className="font-semibold">like eye color or hair color.</span></li>
            </ul>
            <p className="text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Like 'to be', 'to have' changes its form depending on the subject.
            </p>
          </section>

          {/* Positive Statements Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              1. Positive Statements (I have, You have, He has...)
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              When we want to say something positive about possession, we use these forms:
            </p>
            
            {/* Mobile-First Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[550px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Subject</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Verb Form</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">I</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I <strong>have</strong> a new phone.<br/>I <strong>have</strong> one sister.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">You</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">You <strong>have</strong> a big family.<br/>You <strong>have</strong> blue eyes.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">He</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">has</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">He <strong>has</strong> a dog.<br/>He <strong>has</strong> short hair.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">She</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">has</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">She <strong>has</strong> two cats.<br/>She <strong>has</strong> a red car.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">has</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">My car <strong>has</strong> four doors.<br/>The house <strong>has</strong> three bedrooms.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">We</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">We <strong>have</strong> a new teacher.<br/>We <strong>have</strong> an English class.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">They <strong>have</strong> many friends.<br/>They <strong>have</strong> a big house.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> We use <strong className="text-red-600">'has'</strong> only for <strong>he, she, it</strong> (or singular nouns like 'my brother', 'the dog'). For all other subjects (I, you, we, they, or plural nouns), we use <strong className="text-red-600">'have'</strong>.
              </p>
            </div>
          </section>

          {/* Negative Statements Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              2. Negative Statements (I do not have, He does not have...)
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              To make 'to have' negative, we use <strong>'do not have'</strong> or <strong>'does not have'</strong>.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[700px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
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
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">I do not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">I don't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I <strong>don't have</strong> a car.<br/>I <strong>don't have</strong> any brothers.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">You</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">You do not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">You don't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">You <strong>don't have</strong> a pen.<br/>You <strong>don't have</strong> time.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">He</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">He does not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">He doesn't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">He <strong>doesn't have</strong> a dog.<br/>He <strong>doesn't have</strong> long hair.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">She</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">She does not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">She doesn't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">She <strong>doesn't have</strong> a sister.<br/>She <strong>doesn't have</strong> blue eyes.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">It does not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">It doesn't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">The old car <strong>doesn't have</strong> air conditioning.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">We</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">We do not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">We don't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">We <strong>don't have</strong> class today.<br/>We <strong>don't have</strong> much money.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold">They do not have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">They don't have</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">They <strong>don't have</strong> children.<br/>They <strong>don't have</strong> a big house.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Important:</strong> In negative sentences, we always use the base form of the verb <strong className="text-red-600">'have'</strong>, even for 'he, she, it'. The 's' is already in <strong>'does'</strong>!
              </p>
            </div>
          </section>

          {/* Questions Section - Mobile Optimized */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              3. Yes/No Questions (Do you have...?, Does he have...?)
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              To ask a question with 'to have', we use <strong>'Do'</strong> or <strong>'Does'</strong> at the beginning of the sentence.
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
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Do I have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Do I have</strong> time?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, you do.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, you don't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Do you have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Do you have</strong> brothers or sisters?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, I do.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, I don't.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Does he have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Does he have</strong> a dog?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, he does.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, he doesn't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Does she have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Does she have</strong> blue eyes?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, she does.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, she doesn't.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Does it have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Does it have</strong> a name?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, it does.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, it doesn't.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Do we have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Do we have</strong> class today?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, we do.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, we don't.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-xs sm:text-sm">Do they have...?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>Do they have</strong> children?</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">Yes, they do.</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">No, they don't.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> We use <strong className="text-red-600">'Does'</strong> for 'he, she, it' and <strong className="text-red-600">'Do'</strong> for 'I, you, we, they'. Also, the main verb is always <strong>'have'</strong> in questions, even for 'he, she, it'!
              </p>
            </div>
          </section>

          {/* Practice Exercise - Mobile Optimized */}
          <Card className="bg-green-100 border-green-400 border-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-700 font-bold">
                Practice Exercise: Complete with 'have' or 'has'
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {questions.map((item) => {
                  const result = getQuestionResult(item.id);
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg min-w-0 sm:min-w-[220px]">
                          {item.question}
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className={`border-2 rounded-lg px-3 py-2 w-24 sm:w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold text-sm sm:text-base ${getInputBorderColor(item.id)}`}
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            placeholder="have/has"
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