'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, BookOpen, FileText, MessageSquare } from 'lucide-react';

interface VisibleAnswers {
  [key: string]: boolean;
}

export default function SampleQuestions() {
  const [visibleAnswers, setVisibleAnswers] = useState<VisibleAnswers>({});

  const toggleAnswer = (answerId: string) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [answerId]: !prev[answerId]
    }));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'bg-red-500';
      case 'A2': return 'bg-orange-500';
      case 'B1': return 'bg-yellow-500';
      case 'B2': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 sm:px-4 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-800 mb-3 sm:mb-4">
              Sample Questions
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore different types of questions you might find on our platform, from A1 to B1 levels.
            </p>
          </div>

          {/* Grammar Samples Section */}
          <Card className="mb-8 sm:mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-blue-700 border-b-2 border-blue-200 pb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Grammar Samples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* A1 Grammar Sample */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    1. My parents ____ (be) from Italy.
                  </h4>
                  <Badge className={`${getLevelColor('A1')} text-white text-xs w-fit`}>
                    A1
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  {['am', 'is', 'are'].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name="sample_g1"
                        value={option}
                        className="w-4 h-4 text-blue-600"
                        disabled
                      />
                      <span className="text-sm sm:text-base text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
                
                <Button 
                  onClick={() => toggleAnswer('answer_g1')}
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                >
                  {visibleAnswers['answer_g1'] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>
                
                {visibleAnswers['answer_g1'] && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      Correct Answer: c) are
                    </p>
                  </div>
                )}
              </div>

              {/* A2 Grammar Sample */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    2. What ____ you ____ (do) last weekend?
                  </h4>
                  <Badge className={`${getLevelColor('A2')} text-white text-xs w-fit`}>
                    A2
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Verb 1"
                    className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Verb 2"
                    className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    disabled
                  />
                </div>
                
                <Button 
                  onClick={() => toggleAnswer('answer_g2')}
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                >
                  {visibleAnswers['answer_g2'] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>
                
                {visibleAnswers['answer_g2'] && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      Correct Answer: did, do
                    </p>
                  </div>
                )}
              </div>

              {/* B1 Grammar Sample */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    3. If I ____ (have) more time, I would travel the world.
                  </h4>
                  <Badge className={`${getLevelColor('B1')} text-white text-xs w-fit`}>
                    B1
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  {['have', 'had', 'would have'].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name="sample_g3"
                        value={option}
                        className="w-4 h-4 text-blue-600"
                        disabled
                      />
                      <span className="text-sm sm:text-base text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
                
                <Button 
                  onClick={() => toggleAnswer('answer_g3')}
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                >
                  {visibleAnswers['answer_g3'] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>
                
                {visibleAnswers['answer_g3'] && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      Correct Answer: b) had
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vocabulary Samples Section */}
          <Card className="mb-8 sm:mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-blue-700 border-b-2 border-blue-200 pb-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                Vocabulary Samples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* A1 Vocabulary Sample */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    4. Which word means 'to stop sleeping'?
                  </h4>
                  <Badge className={`${getLevelColor('A1')} text-white text-xs w-fit`}>
                    A1
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  {['go to bed', 'wake up', 'eat breakfast'].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name="sample_v1"
                        value={option}
                        className="w-4 h-4 text-blue-600"
                        disabled
                      />
                      <span className="text-sm sm:text-base text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
                
                <Button 
                  onClick={() => toggleAnswer('answer_v1')}
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                >
                  {visibleAnswers['answer_v1'] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>
                
                {visibleAnswers['answer_v1'] && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      Correct Answer: b) wake up
                    </p>
                  </div>
                )}
              </div>

              {/* A2 Vocabulary Sample */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    5. Choose the best word: 'I enjoy ____ in my free time, like painting and drawing.'
                  </h4>
                  <Badge className={`${getLevelColor('A2')} text-white text-xs w-fit`}>
                    A2
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  {['chores', 'hobbies', 'duties'].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                      <input
                        type="radio"
                        name="sample_v2"
                        value={option}
                        className="w-4 h-4 text-blue-600"
                        disabled
                      />
                      <span className="text-sm sm:text-base text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
                
                <Button 
                  onClick={() => toggleAnswer('answer_v2')}
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                >
                  {visibleAnswers['answer_v2'] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>
                
                {visibleAnswers['answer_v2'] && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      Correct Answer: b) hobbies
                    </p>
                  </div>
                )}
              </div>

              {/* B1 Vocabulary Sample */}
              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    6. Complete the sentence: 'The company needs to ____ new strategies to increase sales.' (develop)
                  </h4>
                  <Badge className={`${getLevelColor('B1')} text-white text-xs w-fit`}>
                    B1
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    disabled
                  />
                </div>
                
                <Button 
                  onClick={() => toggleAnswer('answer_v3')}
                  variant="outline"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                >
                  {visibleAnswers['answer_v3'] ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Answer
                    </>
                  )}
                </Button>
                
                {visibleAnswers['answer_v3'] && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      Correct Answer: implement
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reading Comprehension Samples Section */}
          <Card className="mb-8 sm:mb-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-blue-700 border-b-2 border-blue-200 pb-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Reading Comprehension Samples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* A1 Reading Sample */}
              <div>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h4 className="font-bold text-blue-800 text-base sm:text-lg">Text: My Pet Dog</h4>
                    <Badge className={`${getLevelColor('A1')} text-white text-xs w-fit`}>
                      A1
                    </Badge>
                  </div>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    I have a pet dog. His name is Max. He is small and brown. Max likes to play with a ball. 
                    Every morning, I walk Max in the park. He is a very happy dog.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">
                    7. What color is Max?
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    {['Black', 'Brown', 'White'].map((option, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                        <input
                          type="radio"
                          name="sample_r1"
                          value={option}
                          className="w-4 h-4 text-blue-600"
                          disabled
                        />
                        <span className="text-sm sm:text-base text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => toggleAnswer('answer_r1')}
                    variant="outline"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                  >
                    {visibleAnswers['answer_r1'] ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Answer
                      </>
                    )}
                  </Button>
                  
                  {visibleAnswers['answer_r1'] && (
                    <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                      <p className="text-green-800 font-semibold text-sm sm:text-base">
                        Correct Answer: b) Brown
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* B1 Reading Sample */}
              <div>
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border-l-4 border-green-500 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h4 className="font-bold text-green-800 text-base sm:text-lg">Text: The Importance of Exercise</h4>
                    <Badge className={`${getLevelColor('B1')} text-white text-xs w-fit`}>
                      B1
                    </Badge>
                  </div>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    Regular exercise is crucial for maintaining good physical and mental health. It helps to strengthen muscles, 
                    improve cardiovascular health, and reduce the risk of chronic diseases such as diabetes and heart disease. 
                    Furthermore, physical activity can significantly boost mood and reduce stress levels, contributing to overall well-being. 
                    Experts recommend at least 30 minutes of moderate-intensity exercise most days of the week.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">
                    8. What is one benefit of regular exercise mentioned in the text?
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    {[
                      'It helps you earn more money.',
                      'It can improve your mood and reduce stress.',
                      'It makes you taller.'
                    ].map((option, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors">
                        <input
                          type="radio"
                          name="sample_r2"
                          value={option}
                          className="w-4 h-4 text-blue-600"
                          disabled
                        />
                        <span className="text-sm sm:text-base text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => toggleAnswer('answer_r2')}
                    variant="outline"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                  >
                    {visibleAnswers['answer_r2'] ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Answer
                      </>
                    )}
                  </Button>
                  
                  {visibleAnswers['answer_r2'] && (
                    <div className="mt-3 p-3 bg-green-100 border border-green-400 rounded-lg">
                      <p className="text-green-800 font-semibold text-sm sm:text-base">
                        Correct Answer: b) It can improve your mood and reduce stress.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Ready to Take the Full Assessment?
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                These are just samples! Take our complete assessment to get your accurate CEFR level.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-bold"
                onClick={() => window.location.href = '/assessment/quick'}
              >
                Start Full Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}