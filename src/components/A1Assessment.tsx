'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Eye,
  Timer,
  AlertCircle,
  Trophy,
  FileCheck
} from 'lucide-react';
import assessmentData from '@/data/assessment-data.json';

interface AssessmentProps {
  type: 'practice' | 'final';
  testType?: 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'comprehensive';
}

export default function A1Assessment({ type, testType }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [writingText, setWritingText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const getTestData = () => {
    if (type === 'practice' && testType) {
      return assessmentData.a1.practiceTests[testType as keyof typeof assessmentData.a1.practiceTests];
    } else if (type === 'final') {
      return assessmentData.a1.finalAssessment;
    }
    return null;
  };

  const testData = getTestData();
  const questions = testData?.questions || [];
  const currentQuestionData = questions[currentQuestion];

  const startTimer = (duration: number) => {
    setTimeLeft(duration);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const simulateAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correct) {
        correctCount++;
      }
    });
    return (correctCount / questions.length) * 100;
  };

  const handleSubmitTest = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    setTestCompleted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
    setTimeLeft(0);
    setIsRecording(false);
    setRecordedAudio(null);
    setWritingText('');
    setTestStarted(false);
    setTestCompleted(false);
  };

  const startTest = () => {
    setTestStarted(true);
    if (testData?.timeLimit) {
      startTimer(testData.timeLimit * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-green-500' };
    if (score >= 70) return { text: 'Good', color: 'bg-blue-500' };
    if (score >= 50) return { text: 'Satisfactory', color: 'bg-yellow-500' };
    return { text: 'Needs Improvement', color: 'bg-red-500' };
  };

  if (!testData) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please select a valid assessment type.</p>
            </CardContent>
          </Card>
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
            A1 Assessment
          </Badge>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">
            {testData.title}
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {testData.description}
          </p>
        </div>

        {/* Timer */}
        {testStarted && timeLeft > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                <Clock className="w-6 h-6 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">
                  Time Remaining: {formatTime(timeLeft)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Start Screen */}
        {!testStarted && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Test Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Test Details:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• {questions.length} questions</li>
                    <li>• Time limit: {testData.timeLimit} minutes</li>
                    <li>• Passing score: 70%</li>
                    <li>• You can review your answers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Instructions:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Read each question carefully</li>
                    <li>• Select the best answer</li>
                    <li>• Use the navigation buttons</li>
                    <li>• Submit when you're ready</li>
                  </ul>
                </div>
              </div>
              <Button onClick={startTest} className="w-full" size="lg">
                Start Test
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Test Interface */}
        {testStarted && !showResults && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <Badge variant="secondary">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Content */}
              <div className="space-y-4">
                {/* Audio Question */}
                {currentQuestionData?.type === 'audio-question' && (
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
                        Audio: "{currentQuestionData.audioText}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Text Question */}
                {currentQuestionData?.type === 'text-question' && (
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Read the text:</h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                        {currentQuestionData.text}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Speaking Question */}
                {currentQuestionData?.type === 'speaking' && (
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Speaking Task:</h3>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">{currentQuestionData.prompt}</p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                        <h4 className="font-medium mb-2">Assessment Criteria:</h4>
                        <ul className="space-y-1 text-sm">
                          {currentQuestionData.criteria.map((criterion: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={isRecording ? stopRecording : startRecording}
                          className="flex items-center gap-2"
                          variant={isRecording ? "destructive" : "default"}
                        >
                          <Mic className="w-4 h-4" />
                          {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </Button>
                        {isRecording && (
                          <div className="flex items-center gap-2 text-sm text-red-600">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            Recording...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Writing Task */}
                {currentQuestionData?.type === 'writing' && (
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Writing Task:</h3>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">{currentQuestionData.task}</p>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="space-y-1 text-sm">
                          {currentQuestionData.requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Answer:</label>
                        <textarea
                          value={writingText}
                          onChange={(e) => setWritingText(e.target.value)}
                          placeholder="Write your response here..."
                          className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>Word count: {writingText.split(' ').length}</span>
                          {currentQuestionData.wordLimit && (
                            <span>Limit: {currentQuestionData.wordLimit}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Multiple Choice Question */}
                {currentQuestionData?.type === 'multiple-choice' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{currentQuestionData.question}</h3>
                    <div className="grid gap-3">
                      {currentQuestionData.options.map((option: string, index: number) => (
                        <Button
                          key={index}
                          variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                          className="justify-start text-left h-auto p-4"
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <div className="w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center">
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {currentQuestion + 1} of {questions.length}
                  </span>
                  {selectedAnswers[currentQuestion] !== undefined && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Answered
                    </Badge>
                  )}
                </div>

                {currentQuestion === questions.length - 1 ? (
                  <Button onClick={handleSubmitTest} className="flex items-center gap-2">
                    Submit Test
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {showResults && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {score >= 70 ? <Trophy className="w-6 h-6 text-yellow-500" /> : <Target className="w-6 h-6" />}
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="text-6xl font-bold mb-4">
                  <span className={getScoreColor(score)}>{Math.round(score)}%</span>
                </div>
                <Badge className={`${getScoreBadge(score).color} text-white text-lg px-4 py-2`}>
                  {getScoreBadge(score).text}
                </Badge>
                <p className="text-lg">
                  {score >= 70 ? 'Congratulations! You passed the test!' : 'Keep practicing to improve your score.'}
                </p>
                
                {/* Detailed Results */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-semibold mb-3">Score Breakdown:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Correct Answers:</span>
                        <span className="font-medium">{Math.round((score / 100) * questions.length)}/{questions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-medium">{Math.round(score)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Used:</span>
                        <span className="font-medium">{formatTime(testData.timeLimit * 60 - timeLeft)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Performance:</h3>
                    <Progress value={score} className="h-3 mb-2" />
                    <div className="text-sm text-gray-600">
                      {score >= 90 ? 'Excellent performance!' :
                       score >= 70 ? 'Good job! You meet the requirements.' :
                       score >= 50 ? 'Satisfactory, but needs improvement.' :
                       'Needs more practice to reach the required level.'}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button onClick={resetTest} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Test
                  </Button>
                                     {score >= 70 && (
                     <Button className="bg-green-600 hover:bg-green-700">
                       <FileCheck className="w-4 h-4 mr-2" />
                       Download Certificate
                     </Button>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}