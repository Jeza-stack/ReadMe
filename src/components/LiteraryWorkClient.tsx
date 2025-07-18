
"use client";

import type { LiteraryWork, DifficultWord, QuizQuestion, Faq } from "@/lib/types";
import { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, XCircle, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { convertTextToSpeech } from "@/ai/flows/text-to-speech-flow";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function AudioPlayer({ text, onWordHighlight }: { text: string; onWordHighlight: (word: string | null) => void; }) {
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
  const wordTimestampsRef = useRef<Map<string, { start: number, end: number }>>(new Map());

  useEffect(() => {
    async function generateAudio() {
      try {
        setIsLoading(true);
        setError(null);
        // This is a simplified approach. A real implementation would need
        // the TTS API to return word-level timestamps.
        const { audioDataUri } = await convertTextToSpeech({ text });
        setAudioSrc(audioDataUri);
      } catch (e: any) {
        console.error(e);
        setError("Audio could not be loaded. This may be due to API rate limits.");
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
        onWordHighlight(null);
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      setProgress((time / audioRef.current.duration) * 100);

      // Simplified highlighting logic
      const words = text.split(/\s+/);
      const approxWordTime = audioRef.current.duration / words.length;
      const currentWordIndex = Math.floor(time / approxWordTime);
      const currentWord = words[currentWordIndex];
      if (currentWord) {
        onWordHighlight(currentWord.replace(/[.,;!?—]$/, ''));
      }
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
      <Card className="bg-card/50">
        <CardContent className="p-4 flex items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <p className="text-foreground/70">Generating audio...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !audioSrc) {
     return null;
  }

  return (
    <Card className="bg-card/50 shadow-lg">
        <CardContent className="p-4 flex items-center gap-4">
            <audio
                ref={audioRef}
                src={audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                  setIsPlaying(false);
                  onWordHighlight(null);
                }}
            />
            <Button onClick={togglePlayPause} variant="ghost" size="icon">
                {isPlaying ? <Pause className="w-6 h-6 text-primary" /> : <Play className="w-6 h-6" />}
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
             <Button onClick={changePlaybackRate} variant="ghost" size="sm" className="w-24">
                {playbackRate}x Speed
            </Button>
            <Button onClick={toggleMute} variant="ghost" size="icon">
                {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
        </CardContent>
    </Card>
  );
}


// InteractiveText Component
function InteractiveText({ text, difficultWords, highlightedWord }: { text: string; difficultWords: DifficultWord[], highlightedWord: string | null }) {
    const difficultWordsMap = new Map(difficultWords.map(dw => [dw.word.toLowerCase(), dw]));
    
    const paragraphs = text.split('\n\n');
    
    return (
        <div className="font-body text-lg/relaxed space-y-6 text-foreground/90">
            {paragraphs.map((paragraph, pIndex) => {
                const parts = paragraph.split(/(\s+)/); // Split by spaces, keeping them
                return (
                    <p key={pIndex}>
                        {parts.map((part, index) => {
                            const wordOnly = part.trim().replace(/[.,;!?—]$/, '');
                            const isHighlighted = highlightedWord && wordOnly.toLowerCase() === highlightedWord.toLowerCase();

                            if (difficultWordsMap.has(wordOnly.toLowerCase())) {
                                const wordData = difficultWordsMap.get(wordOnly.toLowerCase())!;
                                return (
                                    <Popover key={index}>
                                        <PopoverTrigger asChild>
                                            <span className={cn(
                                                "cursor-pointer font-bold text-primary/80 hover:text-primary transition-colors",
                                                isHighlighted && "bg-primary/30 rounded-md px-1"
                                                )}>{part}</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 bg-background border-border shadow-2xl">
                                            <div className="space-y-2">
                                                <h4 className="font-bold font-headline text-primary">{wordData.word}</h4>
                                                <p className="text-sm text-foreground/90">{wordData.definition}</p>
                                                <p className="text-sm text-foreground/90"><span className="font-semibold">Connotation:</span> {wordData.connotation}</p>
                                                <p className="text-sm text-foreground/90"><span className="font-semibold">Example:</span> <em>"{wordData.example}"</em></p>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            }
                            return <span key={index} className={cn(isHighlighted && "bg-primary/30 rounded-md")}>{part}</span>;
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
             <Card className="bg-card/50 border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Quiz Results</CardTitle>
                    <CardDescription>You scored {score} out of {questions.length}!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={(score / questions.length) * 100} className="mb-6" />
                    <Button onClick={handleRestart} className="font-semibold">Try Again</Button>
                </CardContent>
            </Card>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Card className="bg-card/50 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Quiz: Check Your Understanding</CardTitle>
                <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-semibold mb-6 text-lg">{currentQuestion.question}</p>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.correctAnswer;
                        const isSelected = option === selectedAnswer;
                        
                        let stateClass = "bg-secondary hover:bg-secondary/80";
                        if (isAnswered) {
                            if (isCorrect) stateClass = "bg-green-500/80 text-white";
                            else if (isSelected) stateClass = "bg-red-500/80 text-white";
                        }

                        return (
                            <Button
                                key={index}
                                className={cn("w-full justify-start h-auto py-3 text-left", stateClass)}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                            >
                                {option}
                                {isAnswered && isCorrect && <CheckCircle className="ml-auto w-5 h-5" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="ml-auto w-5 h-5" />}
                            </Button>
                        );
                    })}
                </div>
                {isAnswered && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p><span className="font-bold">Explanation:</span> {currentQuestion.explanation}</p>
                    </div>
                )}
                <div className="mt-6 flex justify-end">
                    {isAnswered && <Button onClick={handleNext} className="font-semibold">
                        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Show Results"}
                    </Button>}
                </div>
            </CardContent>
        </Card>
    );
}

// Main Client Component
export default function LiteraryWorkClient({ work }: { work: LiteraryWork }) {
    const [highlightedWord, setHighlightedWord] = useState<string | null>(null);
    
    return (
        <div className="space-y-16 md:space-y-24">
            {/* Audio Player & Full Text */}
            <section>
                 <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Read & Listen</h2>
                 <div className="sticky top-20 z-10 mb-8 backdrop-blur-sm p-2 -m-2 rounded-lg">
                    <AudioPlayer text={work.fullText} onWordHighlight={setHighlightedWord} />
                 </div>
                 <p className="text-foreground/70 mb-8 text-center">Click on <span className="text-primary font-bold">bolded words</span> for definitions, or press play to listen along.</p>
                <InteractiveText 
                    text={work.fullText} 
                    difficultWords={work.difficultWords}
                    highlightedWord={highlightedWord}
                />
            </section>
            
            <Separator className="bg-border/30" />

            {/* Content Analysis */}
            <section className="space-y-8">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Content Analysis</h2>
                <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader><CardTitle className="font-headline">Summary</CardTitle></CardHeader>
                    <CardContent><p className="text-foreground/80">{work.contentAnalysis.summary}</p></CardContent>
                </Card>
                 <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader><CardTitle className="font-headline">Themes</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                            {work.contentAnalysis.themes.map((theme, i) => <li key={i}>{theme}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader><CardTitle className="font-headline">Literary Devices</CardTitle></CardHeader>
                    <CardContent className="text-foreground/80">
                        {work.contentAnalysis.literaryDevices.map((ld, i) => (
                            <p key={i} className="mb-2"><strong>{ld.device}:</strong> <em>"{ld.example}"</em></p>
                        ))}
                    </CardContent>
                </Card>
            </section>
            
            <Separator className="bg-border/30" />

            {/* Author Info */}
            <section>
                 <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">About the Author</h2>
                 <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardContent className="p-8 text-foreground/80">
                        {work.authorInfo.biography && <p className="mb-4">{work.authorInfo.biography}</p>}
                        {work.authorInfo.writingStyle && <p><strong>Writing Style:</strong> {work.authorInfo.writingStyle}</p>}
                    </CardContent>
                 </Card>
            </section>

            <Separator className="bg-border/30" />

            {/* FAQs */}
            <section>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full bg-card/50 border border-border/50 rounded-lg shadow-lg">
                    {work.faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className={cn(index === work.faqs.length - 1 && "border-b-0")}>
                            <AccordionTrigger className="font-semibold text-left p-6 text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="px-6 text-foreground/80">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <Separator className="bg-border/30" />

            {/* Quiz */}
            <section>
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Test Your Knowledge</h2>
                <Quiz questions={work.quiz} />
            </section>
        </div>
    );
}
