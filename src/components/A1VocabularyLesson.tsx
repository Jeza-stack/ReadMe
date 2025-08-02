'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Volume2, 
  BookOpen, 
  Target, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Star,
  Users,
  Heart
} from 'lucide-react';
import vocabularyData from '@/data/vocabulary-data.json';

interface VocabularyWord {
  id: number;
  word: string;
  translation: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  image: string;
  audioUrl: string;
  difficulty: string;
  category: string;
  relatedWords: string[];
  usageNotes: string;
}

interface VocabularyLessonProps {
  theme: string;
  level: string;
}

export default function A1VocabularyLesson({ theme, level }: VocabularyLessonProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
  const [favoriteWords, setFavoriteWords] = useState<Set<number>>(new Set());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const vocabulary = vocabularyData.a1['family-relationships'].vocabulary as VocabularyWord[];
  const exercises = vocabularyData.a1['family-relationships'].exercises;
  const grammarFocus = vocabularyData.a1['family-relationships'].grammarFocus;

  const currentWord = vocabulary[currentWordIndex];
  const progress = (completedWords.size / vocabulary.length) * 100;

  const playAudio = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const toggleFavorite = () => {
    const newFavorites = new Set(favoriteWords);
    if (newFavorites.has(currentWord.id)) {
      newFavorites.delete(currentWord.id);
    } else {
      newFavorites.add(currentWord.id);
    }
    setFavoriteWords(newFavorites);
  };

  const markAsCompleted = () => {
    const newCompleted = new Set(completedWords);
    newCompleted.add(currentWord.id);
    setCompletedWords(newCompleted);
  };

  const nextWord = () => {
    if (currentWordIndex < vocabulary.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowTranslation(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
    }
  };

  const resetLesson = () => {
    setCurrentWordIndex(0);
    setCompletedWords(new Set());
    setShowTranslation(false);
    setCurrentExercise(0);
    setExerciseAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-green-500 text-white mb-4">
            {level} Level - {theme}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Family & Relationships</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn 25 essential family vocabulary words with interactive exercises
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {completedWords.size}/{vocabulary.length} words
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        <Tabs defaultValue="vocabulary" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="grammar">Grammar</TabsTrigger>
          </TabsList>

          {/* Vocabulary Tab */}
          <TabsContent value="vocabulary">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex justify-between items-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousWord}
                    disabled={currentWordIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    {currentWordIndex + 1} of {vocabulary.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextWord}
                    disabled={currentWordIndex === vocabulary.length - 1}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl mb-2">{currentWord.word}</CardTitle>
                <div className="text-4xl mb-4">{currentWord.image}</div>
                <div className="flex justify-center gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playAudio}
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                  >
                    <Star className={`w-4 h-4 ${favoriteWords.has(currentWord.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Phonetic and Translation */}
                <div className="text-center">
                  <p className="text-gray-600 mb-2">{currentWord.phonetic}</p>
                  <Button
                    variant="outline"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="w-full"
                  >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                  </Button>
                  {showTranslation && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-lg font-medium">{currentWord.translation}</p>
                    </div>
                  )}
                </div>

                {/* Definition and Example */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Definition:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{currentWord.definition}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Example:</h4>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{currentWord.example}"</p>
                  </div>
                </div>

                {/* Usage Notes */}
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Usage Note:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentWord.usageNotes}</p>
                </div>

                {/* Related Words */}
                <div>
                  <h4 className="font-medium mb-2">Related Words:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentWord.relatedWords.map((word, index) => (
                      <Badge key={index} variant="secondary">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={markAsCompleted}
                    className="flex-1"
                    variant={completedWords.has(currentWord.id) ? "default" : "outline"}
                  >
                    {completedWords.has(currentWord.id) ? (
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
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Practice Exercises</CardTitle>
                <CardDescription>
                  Test your knowledge with interactive exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentExercise < exercises.length ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        {exercises[currentExercise].title}
                      </h3>
                      <p className="text-gray-600">{exercises[currentExercise].description}</p>
                    </div>

                    {exercises[currentExercise].type === 'matching' && (
                      <div className="space-y-4">
                        {exercises[currentExercise].items.map((item, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{item.word}</span>
                              <span className="text-gray-600">{item.definition}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {exercises[currentExercise].type === 'fill-in-blank' && (
                      <div className="space-y-4">
                        {exercises[currentExercise].items.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <p className="text-gray-700">
                              {item.sentence.replace('___', '_____')}
                            </p>
                            <input
                              type="text"
                              placeholder="Type your answer"
                              className="w-full p-2 border rounded"
                              value={exerciseAnswers[index] || ''}
                              onChange={(e) => {
                                const newAnswers = [...exerciseAnswers];
                                newAnswers[index] = e.target.value;
                                setExerciseAnswers(newAnswers);
                              }}
                            />
                            <p className="text-sm text-gray-500">Hint: {item.hint}</p>
                          </div>
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

          {/* Grammar Tab */}
          <TabsContent value="grammar">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Grammar Focus: Possessive Adjectives</CardTitle>
                <CardDescription>
                  Learn to use my, your, his, her, their with family members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Examples:</h4>
                  <div className="space-y-2">
                    {grammarFocus.possessiveAdjectives.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-gray-700 dark:text-gray-300">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Rules:</h4>
                  <ul className="space-y-2">
                    {grammarFocus.possessiveAdjectives.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">🎯 CEFR A1 Can-Do Statements:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• I can understand and use basic family vocabulary</li>
                    <li>• I can introduce my family members</li>
                    <li>• I can ask and answer simple questions about family</li>
                    <li>• I can describe basic family relationships</li>
                  </ul>
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
                  onClick={previousWord}
                  disabled={currentWordIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">
                  {currentWordIndex + 1}/{vocabulary.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextWord}
                  disabled={currentWordIndex === vocabulary.length - 1}
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