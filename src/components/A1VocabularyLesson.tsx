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
import { A1_DATASETS, DatasetKey } from '@/data/vocabulary';

interface VocabularyWord {
  id: number;
  word: string;
  translation: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  image: string;
  audioUrl?: string;
  audio?: string;
  difficulty: string;
  category: string;
  relatedWords: string[];
  usageNotes: string;
}

interface VocabularyLessonProps {
   theme: string;
   level: string;
   datasetKey?: DatasetKey;
 }
 
 export default function A1VocabularyLesson({ theme, level, datasetKey = 'family-relationships' as DatasetKey }: VocabularyLessonProps) {
     const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());
  const [favoriteWords, setFavoriteWords] = useState<Set<number>>(new Set());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
 
   const lessonData = A1_DATASETS[datasetKey] as any;
   const vocabulary = (lessonData?.vocabulary || []) as VocabularyWord[];
   const exercises = lessonData?.exercises || [];
   const grammarFocus = lessonData?.grammarFocus || {};

  const currentWord = vocabulary[currentWordIndex];
  const progress = (completedWords.size / Math.max(vocabulary.length, 1)) * 100;

  // Audio handling with caching and graceful fallback
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const audioSrc: string | undefined = currentWord ? (currentWord.audio || currentWord.audioUrl) : undefined;

  useEffect(() => {
    let isCancelled = false;
    setIsLoadingAudio(!!audioSrc);
    setIsPlaying(false);
    if (!audioSrc) {
      setAudioElement(null);
      setIsLoadingAudio(false);
      return;
    }
    const absoluteSrc = audioSrc.startsWith('/') ? audioSrc : `/${audioSrc}`;
    const audio = new Audio(absoluteSrc);
    audio.preload = 'auto';
    const handleCanPlay = () => {
      if (isCancelled) return;
      setIsLoadingAudio(false);
    };
    const handleEnded = () => {
      if (isCancelled) return;
      setIsPlaying(false);
    };
    const handleError = () => {
      if (isCancelled) return;
      setIsLoadingAudio(false);
      setIsPlaying(false);
    };
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    setAudioElement(audio);
    return () => {
      isCancelled = true;
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc]);

  useEffect(() => {
    // Warm preload of the next word's audio for smoother UX
    const next = vocabulary[currentWordIndex + 1];
    const nextSrc = next ? (next.audio || next.audioUrl) : undefined;
    if (!nextSrc) return;
    const src = nextSrc.startsWith('/') ? nextSrc : `/${nextSrc}`;
    const preloadAudio = new Audio(src);
    preloadAudio.preload = 'auto';
    // Do not attach to state; allow GC to collect
  }, [currentWordIndex, vocabulary]);

  const playAudio = async () => {
    if (!audioElement) return;
    try {
      // Always start from the beginning for consistent pronunciation
      audioElement.currentTime = 0;
      await audioElement.play();
      setIsPlaying(true);
    } catch (err) {
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (!audioElement) return;
    audioElement.pause();
    setIsPlaying(false);
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

  // Determine grammar topic dynamically (first key of grammarFocus object)
  const grammarKeys = Object.keys(grammarFocus || {});
  const selectedGrammarKey = grammarKeys.length > 0 ? grammarKeys[0] : '';
  const grammarTopic = selectedGrammarKey ? grammarFocus[selectedGrammarKey] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-green-500 text-white mb-4">
            {level} Level - {theme}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{lessonData?.theme || theme}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {Array.isArray(vocabulary) ? `Learn ${vocabulary.length} essential words with interactive exercises` : 'Interactive vocabulary lesson'}
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
                <CardTitle className="text-2xl mb-2">{currentWord?.word || '—'}</CardTitle>
                <div className="text-4xl mb-4">{currentWord?.image || '🔤'}</div>
                <div className="flex justify-center gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (isPlaying ? pauseAudio() : playAudio())}
                    disabled={!audioSrc || isLoadingAudio}
                    aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    disabled={!currentWord}
                  >
                    <Star className={`w-4 h-4 ${currentWord && favoriteWords.has(currentWord.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Phonetic and Translation */}
                <div className="text-center">
                  <p className="text-gray-600 mb-2">{currentWord?.phonetic || ''}</p>
                  <Button
                    variant="outline"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="w-full"
                    disabled={!currentWord}
                  >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                  </Button>
                  {showTranslation && currentWord && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-lg font-medium">{currentWord.translation}</p>
                    </div>
                  )}
                </div>

                {/* Definition and Example */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Definition:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{currentWord?.definition || ''}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Example:</h4>
                    <p className="text-gray-700 dark:text-gray-300 italic">{currentWord ? `"${currentWord.example}"` : ''}</p>
                  </div>
                </div>

                {/* Usage Notes */}
                {currentWord && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">💡 Usage Note:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{currentWord.usageNotes}</p>
                  </div>
                )}

                {/* Related Words */}
                {currentWord && (
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
                )}

                {/* Action Buttons */}
                {currentWord && (
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={markAsCompleted}
                      className="flex-1"
                      variant={completedWords.has(currentWord.id) ? 'default' : 'outline'}
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
                )}
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
                        {Array.isArray(exercises[currentExercise].items) && exercises[currentExercise].items.map((item: any, index: number) => (
                          <Card key={index} className="p-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{'word' in item ? item.word : ''}</span>
                              <span className="text-gray-600">{'definition' in item ? item.definition : ''}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {exercises[currentExercise].type === 'fill-in-blank' && (
                      <div className="space-y-4">
                        {Array.isArray(exercises[currentExercise].items) && exercises[currentExercise].items.map((item: any, index: number) => (
                          <div key={index} className="space-y-2">
                            <p className="text-gray-700">
                              {'sentence' in item ? item.sentence.replace('___', '_____') : ''}
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
                            <p className="text-sm text-gray-500">Hint: {'hint' in item ? item.hint : ''}</p>
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
                <CardTitle>
                  {grammarTopic?.title ? `Grammar Focus: ${grammarTopic.title}` : 'Grammar Focus'}
                </CardTitle>
                <CardDescription>
                  {grammarTopic?.description || 'Key grammar for this topic'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {grammarTopic?.examples && (
                  <div>
                    <h4 className="font-medium mb-3">Examples:</h4>
                    <div className="space-y-2">
                      {grammarTopic.examples.map((example: string, index: number) => (
                        <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <p className="text-gray-700 dark:text-gray-300">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {grammarTopic?.rules && (
                  <div>
                    <h4 className="font-medium mb-3">Rules:</h4>
                    <ul className="space-y-2">
                      {grammarTopic.rules.map((rule: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CEFR - display from mapping if available */}
                {lessonData?.cefrMapping?.canDoStatements && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">🎯 CEFR A1 Can-Do Statements:</h4>
                    <ul className="space-y-1 text-sm">
                      {lessonData.cefrMapping.canDoStatements.map((s: string, i: number) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
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