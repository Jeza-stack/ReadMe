'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  MessageSquare,
  Target,
  Award,
  Clock,
  FileText,
  Mic,
  Eye,
  Trophy,
  FileCheck,
  Play,
  CheckCircle
} from 'lucide-react';
import A1Assessment from './A1Assessment';

export default function A1AssessmentHub() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testType, setTestType] = useState<'practice' | 'final'>('practice');
  const [testCategory, setTestCategory] = useState<string>('');

  const practiceTests = [
    {
      id: 'grammar',
      title: 'Grammar Practice Test',
      description: 'Test your understanding of A1 grammar concepts',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-500',
      timeLimit: 15,
      questions: 5
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Practice Test',
      description: 'Test your A1 vocabulary knowledge',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-green-500',
      timeLimit: 10,
      questions: 5
    },
    {
      id: 'listening',
      title: 'Listening Practice Test',
      description: 'Test your listening comprehension skills',
      icon: <Headphones className="w-6 h-6" />,
      color: 'bg-purple-500',
      timeLimit: 12,
      questions: 5
    },
    {
      id: 'reading',
      title: 'Reading Practice Test',
      description: 'Test your reading comprehension skills',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-orange-500',
      timeLimit: 15,
      questions: 5
    }
  ];

  const finalAssessment = {
    id: 'final',
    title: 'A1 Final Assessment',
    description: 'Complete evaluation of your A1 level skills',
    icon: <Trophy className="w-6 h-6" />,
    color: 'bg-red-500',
    timeLimit: 45,
    sections: ['Speaking', 'Writing', 'Comprehensive Test']
  };

  const startTest = (type: 'practice' | 'final', category?: string) => {
    setTestType(type);
    setTestCategory(category || '');
    setSelectedTest(type === 'practice' ? category! : 'final');
  };

  const goBack = () => {
    setSelectedTest(null);
    setTestType('practice');
    setTestCategory('');
  };

  if (selectedTest) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button onClick={goBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Assessment Hub
            </Button>
          </div>
          <A1Assessment 
            type={testType} 
            testType={testType === 'practice' ? testCategory as any : undefined} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-purple-500 text-white text-lg px-4 py-2 mb-4">
            A1 Level Assessment
          </Badge>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Test your knowledge and track your progress
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose from practice tests to improve specific skills or take the final assessment to evaluate your complete A1 level proficiency.
          </p>
        </div>

        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
            <TabsTrigger value="final">Final Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-6 h-6" />
                  Practice Tests
                </CardTitle>
                <CardDescription>
                  Regular quizzes to check understanding. Take these tests to practice specific skills before the final assessment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {practiceTests.map((test) => (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${test.color} text-white`}>
                            {test.icon}
                          </div>
                          {test.title}
                        </CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Questions: {test.questions}</span>
                          <span>Time: {test.timeLimit} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary">Practice</Badge>
                          <Button 
                            onClick={() => startTest('practice', test.id)}
                            className="flex items-center gap-2"
                          >
                            <Play className="w-4 h-4" />
                            Start Test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="final" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  Final Assessment
                </CardTitle>
                <CardDescription>
                  Complete A1 level evaluation. This comprehensive test covers all skills and provides a certificate upon successful completion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Assessment Sections:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-blue-600" />
                        <span>Speaking Assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-green-600" />
                        <span>Writing Tasks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span>Comprehensive Test</span>
                      </li>
                                             <li className="flex items-center gap-2">
                         <FileCheck className="w-4 h-4 text-orange-600" />
                         <span>Progress Certificate</span>
                       </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Requirements:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Complete all assessment sections</li>
                      <li>• Achieve minimum 70% overall score</li>
                      <li>• Demonstrate all four skills</li>
                      <li>• Meet CEFR A1 standards</li>
                    </ul>
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Time Limit:</span>
                        <span className="text-sm">{finalAssessment.timeLimit} minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Passing Score:</span>
                        <span className="text-sm">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    onClick={() => startTest('final')}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    size="lg"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Start Final Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Assessment Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Assessment Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Before Taking Tests:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Complete all vocabulary and grammar lessons</li>
                  <li>• Practice all skills activities</li>
                  <li>• Review CEFR A1 can-do statements</li>
                  <li>• Ensure a quiet environment for audio tests</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">During Tests:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Read questions carefully</li>
                  <li>• Manage your time effectively</li>
                  <li>• Review your answers before submitting</li>
                  <li>• Stay calm and focused</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import ArrowLeft for the back button
import { ArrowLeft } from 'lucide-react';