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
      setFeedback(`Excellent! You got all ${correctCount} answers correct!`);
    } else {
      setFeedback(`You got ${correctCount} out of ${totalQuestions} correct. Keep practicing!`);
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
        <p className="text-lg text-center mb-8 text-gray-700">
          Learn how to use 'am', 'is', and 'are' to talk about yourself and others!
        </p>

        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Introduction to 'To Be'</h2>
          <p className="mb-4 leading-relaxed">
            The verb "to be" is one of the most important verbs in English. We use it to talk about:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li><strong>Names:</strong> My name is Ana.</li>
            <li><strong>Nationalities:</strong> I am from Spain.</li>
            <li><strong>Ages:</strong> He is 48 years old.</li>
            <li><strong>Feelings:</strong> I am happy.</li>
            <li><strong>Descriptions:</strong> It is a big house.</li>
          </ul>
          <p>The verb 'to be' changes its form depending on the subject (who or what is doing the action).</p>
        </section>

        {/* Positive Statements Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">1. Positive Statements (I am, You are, He is...)</h2>
          <p className="mb-4">When we want to say something positive or true, we use these forms:</p>
          
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Subject</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Full Form</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Short Form (Contraction)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { subject: 'I', full: 'I am', short: "I'm", examples: ["I'm a student.", "I'm happy."] },
                  { subject: 'You', full: 'You are', short: "You're", examples: ["You're new.", "You're welcome."] },
                  { subject: 'He', full: 'He is', short: "He's", examples: ["He's my brother.", "He's from Canada."] },
                  { subject: 'She', full: 'She is', short: "She's", examples: ["She's my mother.", "She's 45."] },
                  { subject: 'It', full: 'It is', short: "It's", examples: ["It's a dog.", "It's cold today."] },
                  { subject: 'We', full: 'We are', short: "We're", examples: ["We're friends.", "We're in class."] },
                  { subject: 'They', full: 'They are', short: "They're", examples: ["They're teachers.", "They're busy."] }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{row.subject}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.full}</td>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{row.short}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.examples.map((example, i) => (
                        <div key={i}>{example}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p><strong>Note:</strong> Contractions (short forms) like "I'm" or "He's" are very common in spoken English and informal writing. Use them to sound more natural!</p>
          </div>
        </section>

        {/* Negative Statements Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">2. Negative Statements (I am not, You are not...)</h2>
          <p className="mb-4">To say that something is <em>not</em> true, we add "<strong>not</strong>" after the verb "to be".</p>
          
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Subject</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Full Form + not</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Short Form (Contraction)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { subject: 'I', full: 'I am not', short: "I'm not", examples: ["I'm not tired.", "I'm not from France."] },
                  { subject: 'You', full: 'You are not', short: "You aren't", examples: ["You aren't a teacher.", "You aren't old."] },
                  { subject: 'He', full: 'He is not', short: "He isn't", examples: ["He isn't sad.", "He isn't here."] },
                  { subject: 'She', full: 'She is not', short: "She isn't", examples: ["She isn't my sister.", "She isn't at home."] },
                  { subject: 'It', full: 'It is not', short: "It isn't", examples: ["It isn't a cat.", "It isn't hot."] },
                  { subject: 'We', full: 'We are not', short: "We aren't", examples: ["We aren't busy.", "We aren't colleagues."] },
                  { subject: 'They', full: 'They are not', short: "They aren't", examples: ["They aren't students.", "They aren't happy."] }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{row.subject}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.full}</td>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{row.short}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.examples.map((example, i) => (
                        <div key={i}>{example}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p><strong>Note:</strong> For "is not" and "are not", you can also say "is not" and "are not" (full forms), but "isn't" and "aren't" are more common in everyday speech.</p>
          </div>
        </section>

        {/* Questions Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">3. Yes/No Questions and Short Answers</h2>
          <p className="mb-4">To ask a question with "to be", we put the verb (am, are, is) <strong>before</strong> the subject.</p>
          
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Question Structure</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Example Question</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Short Answer (Yes)</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-900">Short Answer (No)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { structure: 'Am I...?', question: 'Am I correct?', yes: 'Yes, you are.', no: "No, you aren't." },
                  { structure: 'Are you...?', question: 'Are you new here?', yes: 'Yes, I am.', no: "No, I'm not." },
                  { structure: 'Is he...?', question: 'Is he from Canada?', yes: 'Yes, he is.', no: "No, he isn't." },
                  { structure: 'Is she...?', question: 'Is she 12?', yes: 'Yes, she is.', no: "No, she isn't." },
                  { structure: 'Is it...?', question: 'Is it a dog?', yes: 'Yes, it is.', no: "No, it isn't." },
                  { structure: 'Are we...?', question: 'Are we in class?', yes: 'Yes, we are.', no: "No, we aren't." },
                  { structure: 'Are they...?', question: 'Are they your parents?', yes: 'Yes, they are.', no: "No, they aren't." }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{row.structure}</td>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{row.question}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.yes}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p><strong>Important:</strong> Always use a short answer (e.g., "Yes, I am." / "No, he isn't.") not just "Yes" or "No."</p>
          </div>
        </section>

        {/* Practice Exercise */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Practice Exercise: Complete with 'am', 'is', or 'are'</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'q1_be', question: '1. I ____ happy.' },
                { id: 'q2_be', question: '2. She ____ from Spain.' },
                { id: 'q3_be', question: '3. They ____ students.' },
                { id: 'q4_be', question: '4. He ____ my brother.' },
                { id: 'q5_be', question: '5. You ____ new here.' },
                { id: 'q6_be', question: '6. It ____ a small cat.' },
                { id: 'q7_be', question: '7. We ____ friends.' }
              ].map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="min-w-[200px]">{item.question}</span>
                  <input
                    type="text"
                    className={`border-2 rounded px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300 ${getInputBorderColor(item.id)}`}
                    value={userAnswers[item.id] || ''}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder="am/is/are"
                  />
                </div>
              ))}
              
              <div className="pt-4">
                <Button 
                  onClick={checkAnswers}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  Check Answers
                </Button>
              </div>
              
              {feedback && (
                <div className={`mt-4 p-3 rounded text-lg font-semibold ${
                  feedback.includes('Excellent') 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
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