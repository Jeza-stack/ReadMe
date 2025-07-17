
"use client";

import type { LiteraryWork, DifficultWord, QuizQuestion, Faq } from "@/lib/types";
import { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, XCircle, Play, Pause, Volume2, VolumeX, FastForward } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { convertTextToSpeech } from "@/ai/flows/text-to-speech-flow";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function AudioPlayer({ text }: { text: string }) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function generateAudio() {
      try {
        setIsLoading(true);
        setError(null);
        const { audioDataUri } = await convertTextToSpeech({ text });
        setAudioSrc(audioDataUri);
      } catch (e: any) {
        console.error(e);
        setError("Audio could not be loaded due to high demand. Please try again later.");
        toast({
            variant: "destructive",
            title: "Audio Generation Failed",
            description: "Could not generate audio due to high demand. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    generateAudio();
  }, [text]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const seekTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setProgress(value[0]);
    }
  };

  const changePlaybackRate = () => {
    const rates = [1, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };
  
  const toggleMute = () => {
      const newVolume = volume > 0 ? 0 : 1;
      setVolume(newVolume);
      if(audioRef.current) {
          audioRef.current.volume = newVolume;
      }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4 flex items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Generating audio...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return null;
  }

  if (!audioSrc) {
    return null;
  }

  return (
    <Card>
        <CardContent className="p-4 flex items-center gap-4">
            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
            <Button onClick={togglePlayPause} variant="ghost" size="icon">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <div className="flex-grow flex items-center gap-3">
                <span className="text-sm font-mono">{formatTime(currentTime)}</span>
                <Slider
                    value={[progress]}
                    max={100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                />
                <span className="text-sm font-mono">{formatTime(duration)}</span>
            </div>
             <Button onClick={changePlaybackRate} variant="ghost" size="sm" className="w-20">
                Speed: {playbackRate}x
            </Button>
            <Button onClick={toggleMute} variant="ghost" size="icon">
                {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
        </CardContent>
    </Card>
  );
}


// InteractiveText Component
function InteractiveText({ text, difficultWords }: { text: string; difficultWords: DifficultWord[] }) {
    const difficultWordsMap = new Map(difficultWords.map(dw => [dw.word.toLowerCase(), dw]));
    
    const paragraphs = text.split('\n\n');
    
    return (
        <div className="font-serif text-lg/relaxed space-y-6">
            {paragraphs.map((paragraph, pIndex) => {
                const words = paragraph.split(/(\s+)/); // Split by spaces, keeping them
                return (
                    <p key={pIndex}>
                        {words.map((part, index) => {
                            const isWord = part.trim() !== '';
                            if (!isWord) {
                                return <span key={index}>{part}</span>;
                            }
                            
                            const wordPart = part.trim().replace(/[.,;!?—]$/, '');

                            if (difficultWordsMap.has(wordPart.toLowerCase())) {
                                const wordData = difficultWordsMap.get(wordPart.toLowerCase())!;
                                return (
                                    <Popover key={index}>
                                        <PopoverTrigger asChild>
                                            <span className="cursor-pointer font-bold text-primary hover:underline">{part}</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="space-y-2">
                                                <h4 className="font-bold font-headline">{wordData.word}</h4>
                                                <p className="text-sm">{wordData.definition}</p>
                                                <p className="text-sm"><span className="font-semibold">Connotation:</span> {wordData.connotation}</p>
                                                <p className="text-sm"><span className="font-semibold">Example:</span> <em>"{wordData.example}"</em></p>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            }
                            return <span key={index}>{part}</span>;
                        })}
                    </p>
                )
            })}
        </div>
    );
}

// Quiz Component
function Quiz({ questions }: { questions: QuizQuestion[] }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (option: string) => {
        if (isAnswered) return;
        setSelectedAnswer(option);
        setIsAnswered(true);
        if (option === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
        } else {
            setShowResults(true);
        }
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    }

    if (showResults) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quiz Results</CardTitle>
                    <CardDescription>You scored {score} out of {questions.length}!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={(score / questions.length) * 100} className="mb-4" />
                    <Button onClick={handleRestart}>Try Again</Button>
                </CardContent>
            </Card>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Quiz: Check Your Understanding</CardTitle>
                <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-semibold mb-4 text-lg">{currentQuestion.question}</p>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const isSelected = option === selectedAnswer;
                        let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
                        if (isAnswered) {
                            if (isCorrect) variant = "default";
                            else if (isSelected) variant = "destructive";
                            else variant = "outline";
                        }

                        return (
                            <Button
                                key={index}
                                variant={variant}
                                className="w-full justify-start h-auto py-3 text-left"
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                            >
                                {option}
                                {isAnswered && isCorrect && <CheckCircle className="ml-auto w-5 h-5 text-primary-foreground" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="ml-auto w-5 h-5" />}
                            </Button>
                        );
                    })}
                </div>
                {isAnswered && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p><span className="font-bold">Explanation:</span> {currentQuestion.explanation}</p>
                    </div>
                )}
                <div className="mt-6 flex justify-end">
                    {isAnswered && <Button onClick={handleNext}>
                        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Show Results"}
                    </Button>}
                </div>
            </CardContent>
        </Card>
    );
}

// Main Client Component
export default function LiteraryWorkClient({ work }: { work: LiteraryWork }) {
    
    return (
        <div>
            {/* Audio Player */}
             <div className="mb-8">
                 <h2 className="font-headline text-3xl font-bold mb-4">Audio Narration</h2>
                 <AudioPlayer text={work.fullText} />
            </div>
            
            <Separator className="my-12" />

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                 <h2 className="font-headline text-3xl font-bold mt-12 mb-2">Full Text</h2>
                 <p className="text-muted-foreground mb-4">Click on <span className="text-primary font-bold">bolded words</span> for definitions.</p>
                <InteractiveText 
                    text={work.fullText} 
                    difficultWords={work.difficultWords} 
                />
            </div>
            
            <Separator className="my-12" />

            {/* Content Analysis */}
            <section className="space-y-8">
                <h2 className="font-headline text-3xl font-bold">Content Analysis</h2>
                <Card>
                    <CardHeader><CardTitle className="font-headline">Summary</CardTitle></CardHeader>
                    <CardContent><p>{work.contentAnalysis.summary}</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="font-headline">Themes</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            {work.contentAnalysis.themes.map((theme, i) => <li key={i}>{theme}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="font-headline">Literary Devices</CardTitle></CardHeader>
                    <CardContent>
                        {work.contentAnalysis.literaryDevices.map((ld, i) => (
                            <p key={i} className="mb-2"><strong>{ld.device}:</strong> <em>"{ld.example}"</em></p>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <Separator className="my-12" />

            {/* Author Info */}
            <section>
                 <h2 className="font-headline text-3xl font-bold mb-8">About the Author</h2>
                 <Card>
                    <CardContent className="p-6">
                        {work.authorInfo.biography && <p className="mb-4">{work.authorInfo.biography}</p>}
                        {work.authorInfo.writingStyle && <p><strong>Writing Style:</strong> {work.authorInfo.writingStyle}</p>}
                    </CardContent>
                 </Card>
            </section>

            <Separator className="my-12" />

            {/* FAQs */}
            <section>
                <h2 className="font-headline text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {work.faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <Separator className="my-12" />

            {/* Quiz */}
            <section>
                <Quiz questions={work.quiz} />
            </section>
        </div>
    );
}
