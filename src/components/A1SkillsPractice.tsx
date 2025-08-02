'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  MessageSquare,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  ArrowLeft,
  ArrowRight,
  Target,
  Star,
  Award,
  Clock,
  User,
  FileText,
  Mic,
  Eye
} from 'lucide-react';
import skillsData from '@/data/skills-data.json';

interface SkillsPracticeProps {
  skill: 'reading' | 'listening' | 'writing' | 'speaking';
  level: string;
}

export default function A1SkillsPractice({ skill, level }: SkillsPracticeProps) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [writingText, setWritingText] = useState('');
  const [speakingMode, setSpeakingMode] = useState(false);

  const skillData = skillsData.a1[skill];
  const activities = skillData.practiceActivities;
  const currentActivityData = activities[currentActivity];

  const getSkillIcon = (skillName: string) => {
    switch (skillName) {
      case 'reading': return <BookOpen className="w-6 h-6" />;
      case 'listening': return <Headphones className="w-6 h-6" />;
      case 'writing': return <PenTool className="w-6 h-6" />;
      case 'speaking': return <MessageSquare className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const getSkillColor = (skillName: string) => {
    switch (skillName) {
      case 'reading': return 'bg-blue-500';
      case 'listening': return 'bg-green-500';
      case 'writing': return 'bg-purple-500';
      case 'speaking': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (skill === 'reading' || skill === 'listening') {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = answerIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const checkAnswers = () => {
    if (skill === 'reading' || skill === 'listening') {
      let correctCount = 0;
      const currentContent = currentActivityData.content[0];
      
      currentContent.questions.forEach((question: any, index: number) => {
        if (selectedAnswers[index] === question.correct) {
          correctCount++;
        }
      });
      
      const percentage = (correctCount / currentContent.questions.length) * 100;
      setScore(percentage);
      setShowResults(true);
      
      if (percentage >= 70) {
        const newCompleted = new Set(completedActivities);
        newCompleted.add(currentActivity);
        setCompletedActivities(newCompleted);
      }
    }
  };

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
      setScore(0);
      setWritingText('');
      setSpeakingMode(false);
    }
  };

  const previousActivity = () => {
    if (currentActivity > 0) {
      setCurrentActivity(currentActivity - 1);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
      setScore(0);
      setWritingText('');
      setSpeakingMode(false);
    }
  };

  const resetActivity = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
    setWritingText('');
    setSpeakingMode(false);
  };

  const simulateAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const progress = (completedActivities.size / activities.length) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className={`${getSkillColor(skill)} text-white text-lg px-4 py-2 mb-4`}>
            {skillData.skill} Practice
          </Badge>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            {skillData.skill} - {skillData.description}
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Practice your {skill.toLowerCase()} skills with interactive activities designed for A1 level.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Activities Completed</span>
                  <span className="text-sm text-foreground/60">{completedActivities.size}/{activities.length}</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Current Activity</span>
                  <span className="text-sm text-foreground/60">{currentActivity + 1}/{activities.length}</span>
                </div>
                <Progress value={((currentActivity + 1) / activities.length) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Average Score</span>
                  <span className="text-sm text-foreground/60">
                    {showResults ? `${Math.round(score)}%` : '--'}
                  </span>
                </div>
                <Progress value={showResults ? score : 0} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CEFR Can-Do Statements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>CEFR A1 Can-Do Statements</CardTitle>
            <CardDescription>
              By the end of this practice, you should be able to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {skillData.cefrMapping.canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{statement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Practice Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getSkillIcon(skill)}
              {currentActivityData.title}
            </CardTitle>
            <CardDescription>{currentActivityData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="practice" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="practice">Practice</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="practice" className="space-y-6">
                {/* Reading Practice */}
                {skill === 'reading' && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Read the text:</h3>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                          {currentActivityData.content[0].text}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Answer the questions:</h3>
                      {currentActivityData.content[0].questions.map((question: any, qIndex: number) => (
                        <div key={qIndex} className="space-y-3">
                          <p className="font-medium">{question.question}</p>
                          <div className="grid gap-2">
                            {question.options.map((option: string, oIndex: number) => (
                              <Button
                                key={oIndex}
                                variant={selectedAnswers[qIndex] === oIndex ? "default" : "outline"}
                                className="justify-start text-left h-auto p-3"
                                onClick={() => handleAnswerSelect(oIndex)}
                              >
                                <div className="w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center">
                                  {selectedAnswers[qIndex] === oIndex && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Listening Practice */}
                {skill === 'listening' && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Listen to the audio:</h3>
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={simulateAudio}
                          disabled={isPlaying}
                          className="flex items-center gap-2"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          {isPlaying ? 'Playing...' : 'Play Audio'}
                        </Button>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div className={`bg-blue-500 h-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded border">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Audio: "{currentActivityData.content[0].audioText}"
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Answer the questions:</h3>
                      {currentActivityData.content[0].questions.map((question: any, qIndex: number) => (
                        <div key={qIndex} className="space-y-3">
                          <p className="font-medium">{question.question}</p>
                          <div className="grid gap-2">
                            {question.options.map((option: string, oIndex: number) => (
                              <Button
                                key={oIndex}
                                variant={selectedAnswers[qIndex] === oIndex ? "default" : "outline"}
                                className="justify-start text-left h-auto p-3"
                                onClick={() => handleAnswerSelect(oIndex)}
                              >
                                <div className="w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center">
                                  {selectedAnswers[qIndex] === oIndex && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Writing Practice */}
                {skill === 'writing' && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Writing Task:</h3>
                      <div className="space-y-4">
                        <p className="text-sm">{currentActivityData.content[0].scenario}</p>
                        
                        {currentActivityData.content[0].template && (
                          <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                            <h4 className="font-medium mb-2">Template:</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Greeting:</strong> {currentActivityData.content[0].template.greeting}</p>
                              <p><strong>Body:</strong> {currentActivityData.content[0].template.body}</p>
                              <p><strong>Closing:</strong> {currentActivityData.content[0].template.closing}</p>
                            </div>
                          </div>
                        )}

                        {currentActivityData.content[0].prompts && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                            <h4 className="font-medium mb-2">Writing Prompts:</h4>
                            <ul className="space-y-1 text-sm">
                              {currentActivityData.content[0].prompts.map((prompt: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{prompt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Your Writing:</h3>
                      <textarea
                        value={writingText}
                        onChange={(e) => setWritingText(e.target.value)}
                        placeholder="Write your response here..."
                        className="w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Minimum 50 words recommended</span>
                        <span>{writingText.split(' ').length} words</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Speaking Practice */}
                {skill === 'speaking' && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Speaking Task:</h3>
                      <div className="space-y-4">
                        <p className="text-sm">{currentActivityData.content[0].scenario}</p>
                        
                        {currentActivityData.content[0].dialogue && (
                          <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                            <h4 className="font-medium mb-2">Sample Dialogue:</h4>
                            <div className="space-y-2 text-sm">
                              {Object.entries(currentActivityData.content[0].dialogue).map(([key, value]) => (
                                <div key={key} className="flex gap-2">
                                  <span className="font-medium text-blue-600">{key}:</span>
                                  <span>{value as string}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {currentActivityData.content[0].phrases && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                            <h4 className="font-medium mb-2">Useful Phrases:</h4>
                            <div className="grid gap-2">
                              {currentActivityData.content[0].phrases.map((phrase: string, index: number) => (
                                <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded text-sm">
                                  "{phrase}"
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Practice Speaking:</h3>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => setSpeakingMode(!speakingMode)}
                          className="flex items-center gap-2"
                          variant={speakingMode ? "default" : "outline"}
                        >
                          <Mic className="w-4 h-4" />
                          {speakingMode ? 'Stop Recording' : 'Start Recording'}
                        </Button>
                        {speakingMode && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Recording...
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                        <h4 className="font-medium mb-2">Speaking Tips:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Speak slowly and clearly</li>
                          <li>• Use simple vocabulary</li>
                          <li>• Practice pronunciation</li>
                          <li>• Ask for clarification if needed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {(skill === 'reading' || skill === 'listening') && (
                    <Button onClick={checkAnswers} className="flex-1">
                      Check Answers
                    </Button>
                  )}
                  {(skill === 'writing' || skill === 'speaking') && (
                    <Button onClick={() => setShowResults(true)} className="flex-1">
                      Submit Practice
                    </Button>
                  )}
                  <Button onClick={resetActivity} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-6">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Assessment Criteria:</h3>
                  <div className="space-y-3">
                    {skillData.assessment.criteria.map((criterion: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Scoring Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Excellent</span>
                        <Badge variant="secondary">{skillData.assessment.scoring.excellent}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Good</span>
                        <Badge variant="secondary">{skillData.assessment.scoring.good}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Satisfactory</span>
                        <Badge variant="secondary">{skillData.assessment.scoring.satisfactory}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Needs Improvement</span>
                        <Badge variant="secondary">{skillData.assessment.scoring.needsImprovement}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {completedActivities.size}/{activities.length}
                          </div>
                          <div className="text-sm text-gray-600">Activities Completed</div>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {score >= 70 ? <Award className="w-6 h-6 text-yellow-500" /> : <Target className="w-6 h-6" />}
                Practice Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-blue-600">{Math.round(score)}%</div>
                <div className="text-lg">
                  {score >= 90 ? 'Excellent!' : 
                   score >= 70 ? 'Good job!' : 
                   score >= 50 ? 'Satisfactory' : 'Needs improvement'}
                </div>
                <p className="text-sm text-gray-600">
                  {score >= 70 ? 'You\'ve completed this activity successfully!' : 'Keep practicing to improve your skills.'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={previousActivity}
            disabled={currentActivity === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Activity {currentActivity + 1} of {activities.length}
            </span>
            {completedActivities.has(currentActivity) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Completed
              </Badge>
            )}
          </div>

          <Button
            onClick={nextActivity}
            disabled={currentActivity === activities.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}