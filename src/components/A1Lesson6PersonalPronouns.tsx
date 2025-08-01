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

export default function A1Lesson6PersonalPronouns() {
  const [userAnswers, setUserAnswers] = useState<Answer>({});
  const [feedback, setFeedback] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  const correctAnswers: Answer = {
    "q1_pronouns": "she",
    "q2_pronouns": "they",
    "q3_pronouns": "it",
    "q4_pronouns": "we",
    "q5_pronouns": "he",
    "q6_pronouns": "you",
    "q7_pronouns": "i",
    "q8_pronouns": "her",
    "q9_pronouns": "them",
    "q10_pronouns": "us"
  };

  const questions = [
    { id: 'q1_pronouns', question: '1. Maria is my friend. ____ is very kind.', hint: 'Replace Maria (female name)', type: 'subject' },
    { id: 'q2_pronouns', question: '2. My parents are doctors. ____ work at the hospital.', hint: 'Replace parents (plural)', type: 'subject' },
    { id: 'q3_pronouns', question: '3. The cat is sleeping. ____ is very cute.', hint: 'Replace the cat (animal/thing)', type: 'subject' },
    { id: 'q4_pronouns', question: '4. My sister and I are students. ____ study English.', hint: 'Replace my sister and I (includes speaker)', type: 'subject' },
    { id: 'q5_pronouns', question: '5. Mr. Brown is a teacher. ____ teaches math.', hint: 'Replace Mr. Brown (male name)', type: 'subject' },
    { id: 'q6_pronouns', question: '6. Are ____ a student? (talking to someone)', hint: 'Talking directly to the person', type: 'subject' },
    { id: 'q7_pronouns', question: '7. ____ am 20 years old. (about yourself)', hint: 'The speaker talking about themselves', type: 'subject' },
    { id: 'q8_pronouns', question: '8. I know Sarah. I like ____ very much.', hint: 'Replace Sarah (female, object of verb)', type: 'object' },
    { id: 'q9_pronouns', question: '9. The books are heavy. Can you carry ____?', hint: 'Replace the books (plural, object of verb)', type: 'object' },
    { id: 'q10_pronouns', question: '10. Please help ____. We need assistance.', hint: 'Replace we (includes speaker, object of verb)', type: 'object' }
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
              A1 Grammar: Chapter 6
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
              Personal Pronouns
            </h2>
            <p className="text-base sm:text-lg text-gray-800 font-semibold px-2">
              Learn how to use personal pronouns to replace nouns and make your speech more natural!
            </p>
          </div>

          {/* Introduction Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              What are Personal Pronouns?
            </h3>
            <p className="mb-4 sm:mb-6 leading-relaxed text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Personal pronouns are words that replace nouns (people, animals, or things) to avoid repetition and make our speech flow better.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded text-sm sm:text-base mb-6">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700">Example:</strong><br/>
                ❌ "John is a teacher. John teaches English. John is very kind."<br/>
                ✅ "John is a teacher. <strong className="text-blue-700">He</strong> teaches English. <strong className="text-blue-700">He</strong> is very kind."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-green-700 text-base sm:text-lg mb-2">Subject Pronouns</h4>
                <p className="text-gray-900 text-sm sm:text-base font-medium">Used as the subject of a sentence (who does the action)</p>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-orange-700 text-base sm:text-lg mb-2">Object Pronouns</h4>
                <p className="text-gray-900 text-sm sm:text-base font-medium">Used as the object of a verb (who receives the action)</p>
              </div>
            </div>
          </section>

          {/* Subject Pronouns Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              1. Subject Pronouns
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Subject pronouns replace the subject of a sentence (the person or thing doing the action).
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[650px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Person</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Subject Pronoun</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Replaces</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">1st singular</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">I</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">the speaker</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>I</strong> am a student.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">2nd singular/plural</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">You</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">the listener(s)</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>You</strong> are kind.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">3rd singular (male)</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">He</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">male person</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>He</strong> is a doctor.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">3rd singular (female)</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">She</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">female person</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>She</strong> is a teacher.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">3rd singular (thing/animal)</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">animals, things, places</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>It</strong> is raining.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">1st plural</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">We</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">speaker + others</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>We</strong> are friends.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-sm sm:text-base">3rd plural</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">multiple people/things</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium"><strong>They</strong> are students.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> Subject pronouns go <strong className="text-red-600">before</strong> the verb. 
                They tell us <strong>who</strong> is doing the action.
              </p>
            </div>
          </section>

          {/* Object Pronouns Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              2. Object Pronouns
            </h3>
            <p className="mb-4 sm:mb-6 text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
              Object pronouns replace the object of a sentence (the person or thing receiving the action).
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[650px] border-collapse bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-300">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-orange-800 text-xs sm:text-sm lg:text-base">Subject Pronoun</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-orange-800 text-xs sm:text-sm lg:text-base">Object Pronoun</th>
                    <th className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-orange-800 text-xs sm:text-sm lg:text-base">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">I</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">me</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">She likes <strong>me</strong>.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">You</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">you</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I see <strong>you</strong>.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">He</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">him</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">We know <strong>him</strong>.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">She</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">her</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I help <strong>her</strong>.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">It</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">it</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">I bought <strong>it</strong>.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">We</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">us</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">He calls <strong>us</strong>.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-blue-600 text-lg sm:text-xl">They</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-orange-600 text-lg sm:text-xl">them</td>
                    <td className="border-2 border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-gray-900 text-xs sm:text-sm font-medium">She loves <strong>them</strong>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                <strong className="text-blue-700 font-bold">Remember:</strong> Object pronouns go <strong className="text-red-600">after</strong> the verb. 
                They tell us <strong>who</strong> receives the action.
              </p>
            </div>
          </section>

          {/* Quick Reference Section */}
          <section className="mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-700">
              3. Quick Reference & Tips
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-purple-700 text-base sm:text-lg mb-2">✨ Common Patterns</h4>
                <ul className="text-gray-900 text-sm sm:text-base space-y-1">
                  <li><strong>Subject + Verb:</strong> "<strong className="text-blue-600">She</strong> works."</li>
                  <li><strong>Verb + Object:</strong> "I know <strong className="text-orange-600">her</strong>."</li>
                  <li><strong>Preposition + Object:</strong> "with <strong className="text-orange-600">him</strong>"</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
                <h4 className="font-bold text-red-700 text-base sm:text-lg mb-2">⚠️ Common Mistakes</h4>
                <ul className="text-gray-900 text-sm sm:text-base space-y-1">
                  <li>❌ "Me am happy" → ✅ "<strong>I</strong> am happy"</li>
                  <li>❌ "I know she" → ✅ "I know <strong>her</strong>"</li>
                  <li>❌ "Him is nice" → ✅ "<strong>He</strong> is nice"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practice Exercise */}
          <Card className="bg-green-100 border-green-400 border-2">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-green-700 font-bold">
                Practice Exercise: Choose the correct personal pronoun
              </CardTitle>
              <p className="text-green-600 text-sm sm:text-base">
                Read each sentence and choose the correct pronoun to complete it.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 sm:space-y-6">
                {questions.map((item) => {
                  const result = getQuestionResult(item.id);
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="min-w-0 sm:min-w-[350px]">
                          <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg block">
                            {item.question}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-600 text-xs sm:text-sm italic">
                              💡 {item.hint}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              item.type === 'subject' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className={`border-2 rounded-lg px-3 py-2 w-24 sm:w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-semibold text-sm sm:text-base ${getInputBorderColor(item.id)}`}
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            placeholder="pronoun"
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
                            {item.hint} • {item.type === 'subject' ? 'Subject pronoun needed' : 'Object pronoun needed'}
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