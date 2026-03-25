'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Star,
  Volume2,
  Play,
  Pause,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

export default function A1GrammarChapter5() {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const sections = [
    {
      title: "Introduction to Articles",
      content: "Articles are small words that come before nouns. In English, we have three articles: a, an, and the.",
      examples: [
        "a cat",
        "an apple", 
        "the book"
      ],
      rules: [
        "Use 'a' before words that start with consonant sounds",
        "Use 'an' before words that start with vowel sounds",
        "Use 'the' when you're talking about something specific"
      ]
    },
    {
      title: "Indefinite Articles: A and An",
      content: "We use 'a' and 'an' when we're talking about something for the first time or when it's not specific.",
      examples: [
        "I have a dog. (any dog)",
        "She bought an umbrella. (any umbrella)",
        "There's a car outside. (any car)"
      ],
      rules: [
        "Use 'a' before consonant sounds: a cat, a dog, a book",
        "Use 'an' before vowel sounds: an apple, an elephant, an orange",
        "Remember: it's about the sound, not the letter!"
      ]
    },
    {
      title: "The Definite Article: The",
      content: "We use 'the' when we're talking about something specific that both the speaker and listener know about.",
      examples: [
        "The cat is on the table. (specific cat)",
        "I'm reading the book you gave me. (specific book)",
        "The sun is bright today. (there's only one sun)"
      ],
      rules: [
        "Use 'the' when talking about something specific",
        "Use 'the' when there's only one of something",
        "Use 'the' when you've already mentioned something"
      ]
    },
    {
      title: "No Article",
      content: "Sometimes we don't use any article at all, especially with plural nouns and uncountable nouns.",
      examples: [
        "I like cats. (not 'the cats' in general)",
        "She drinks water. (not 'the water' in general)",
        "They speak English. (not 'the English')"
      ],
      rules: [
        "Don't use articles with plural nouns in general statements",
        "Don't use articles with uncountable nouns in general",
        "Don't use articles with proper nouns (names)"
      ]
    },
    {
      title: "Common Mistakes and Tips",
      content: "Here are some common mistakes and helpful tips for using articles correctly.",
      examples: [
        "❌ I have the dog. (if it's your first time mentioning the dog)",
        "✅ I have a dog.",
        "❌ She is teacher. (missing article)",
        "✅ She is a teacher."
      ],
      rules: [
        "Always use an article with singular countable nouns",
        "Remember: 'a' and 'an' are for non-specific things",
        "Remember: 'the' is for specific things",
        "Practice listening to native speakers to learn the patterns"
      ]
    }
  ];

  const exercises = [
    {
      type: "multiple-choice",
      title: "Choose the correct article",
      questions: [
        {
          question: "I have ___ dog.",
          options: ["a", "an", "the", "no article"],
          correct: 0,
          explanation: "We use 'a' because 'dog' starts with a consonant sound."
        },
        {
          question: "She bought ___ umbrella.",
          options: ["a", "an", "the", "no article"],
          correct: 1,
          explanation: "We use 'an' because 'umbrella' starts with a vowel sound."
        },
        {
          question: "___ sun is bright today.",
          options: ["a", "an", "the", "no article"],
          correct: 2,
          explanation: "We use 'the' because there's only one sun."
        },
        {
          question: "I like ___ cats.",
          options: ["a", "an", "the", "no article"],
          correct: 3,
          explanation: "We don't use an article with plural nouns in general statements."
        },
        {
          question: "She is ___ teacher.",
          options: ["a", "an", "the", "no article"],
          correct: 0,
          explanation: "We use 'a' because 'teacher' starts with a consonant sound."
        }
      ]
    },
    {
      type: "fill-in-blank",
      title: "Fill in the blanks with the correct article",
      questions: [
        {
          sentence: "I have ___ cat and ___ dog.",
          answers: ["a", "a"],
          explanation: "Both 'cat' and 'dog' start with consonant sounds, so we use 'a'."
        },
        {
          sentence: "She bought ___ apple and ___ orange.",
          answers: ["an", "an"],
          explanation: "Both 'apple' and 'orange' start with vowel sounds, so we use 'an'."
        },
        {
          sentence: "___ book on the table is mine.",
          answers: ["The"],
          explanation: "We use 'The' because we're talking about a specific book."
        },
        {
          sentence: "I speak ___ English and ___ Spanish.",
          answers: ["no article", "no article"],
          explanation: "We don't use articles with language names."
        }
      ]
    },
    {
      type: "conversation",
      title: "Practice in conversation",
      scenarios: [
        {
          situation: "Introducing yourself and your family",
          dialogue: [
            "Hi, I'm Maria. I have a sister and a brother.",
            "My sister is a teacher and my brother is a student.",
            "We live in the same house with our parents.",
            "The house is near the school."
          ],
          focus: "Notice how 'a' is used for non-specific family members and 'the' for specific things like 'the house' and 'the school'."
        },
        {
          situation: "Describing your home",
          dialogue: [
            "I live in an apartment in the city.",
            "The apartment has two bedrooms and a kitchen.",
            "There's a park near the apartment.",
            "I like the park because it's quiet."
          ],
          focus: "Notice the use of 'an' before 'apartment' (vowel sound) and 'the' for specific places."
        }
      ]
    }
  ];

  const currentSectionData = sections[currentSection];
  const progress = (completedSections.size / sections.length) * 100;

  const markSectionComplete = () => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(currentSection);
    setCompletedSections(newCompleted);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const playAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-purple-500 text-white mb-4">A1 Grammar - Chapter 5</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Articles: A, An, The</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn how to use articles correctly in English
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {completedSections.size}/{sections.length} sections
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        <Tabs defaultValue="lesson" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          {/* Lesson Tab */}
          <TabsContent value="lesson">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex justify-between items-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousSection}
                    disabled={currentSection === 0}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Section {currentSection + 1} of {sections.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextSection}
                    disabled={currentSection === sections.length - 1}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl mb-4">{currentSectionData.title}</CardTitle>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playAudio}
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Content */}
                <div className="text-center">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    {currentSectionData.content}
                  </p>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Examples:
                  </h4>
                  <div className="space-y-2">
                    {currentSectionData.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    Rules:
                  </h4>
                  <ul className="space-y-2">
                    {currentSectionData.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CEFR Can-Do Statements */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">🎯 CEFR A1 Can-Do Statements:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• I can use basic articles (a, an, the) correctly</li>
                    <li>• I can understand when to use articles and when not to</li>
                    <li>• I can use articles in simple sentences about familiar topics</li>
                    <li>• I can identify common article mistakes</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={markSectionComplete}
                    className="flex-1"
                    variant={completedSections.has(currentSection) ? "default" : "outline"}
                  >
                    {completedSections.has(currentSection) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Practice Exercises</CardTitle>
                <CardDescription>
                  Test your understanding of articles with interactive exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentExercise < exercises.length ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        {exercises[currentExercise].title}
                      </h3>
                    </div>

                    {exercises[currentExercise].type === "multiple-choice" && Array.isArray(exercises[currentExercise].questions) && (
                      <div className="space-y-4">
                        {exercises[currentExercise].questions.map((question: any, index: number) => (
                          <Card key={index} className="p-4">
                            <h4 className="font-medium mb-3">{(question as { question?: string }).question ?? ''}</h4>
                            <div className="space-y-2">
                              {Array.isArray((question as { options?: string[] }).options) && (question as { options: string[] }).options.map((option: string, optionIndex: number) => (
                                <Button
                                  key={optionIndex}
                                  variant="outline"
                                  className="w-full justify-start"
                                  onClick={() => {
                                    const newAnswers = [...exerciseAnswers];
                                    newAnswers[index] = option;
                                    setExerciseAnswers(newAnswers);
                                  }}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setCurrentExercise(currentExercise + 1)}
                        className="flex-1"
                      >
                        Next Exercise
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h3 className="text-xl font-semibold">Exercises Complete!</h3>
                    <p className="text-gray-600">Great job completing all exercises.</p>
                    <Button onClick={() => setCurrentExercise(0)}>
                      Restart Exercises
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Conversation Practice</CardTitle>
                <CardDescription>
                  Practice using articles in real conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {exercises[2] && Array.isArray(exercises[2].scenarios) && exercises[2].scenarios.map((scenario, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium mb-3">{scenario.situation}</h4>
                      <div className="space-y-2 mb-4">
                        {Array.isArray(scenario.dialogue) && scenario.dialogue.map((line, lineIndex) => (
                          <div key={lineIndex} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <p className="text-gray-700 dark:text-gray-300">{line}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Focus:</strong> {scenario.focus}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile Navigation */}
        <div className="fixed bottom-4 left-4 right-4 md:hidden">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousSection}
                  disabled={currentSection === 0}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">
                  {currentSection + 1}/{sections.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSection}
                  disabled={currentSection === sections.length - 1}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}