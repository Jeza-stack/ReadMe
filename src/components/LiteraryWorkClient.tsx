"use client";

import type { LiteraryWork, DifficultWord, QuizQuestion, Faq } from "@/lib/types";
import { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Play, Pause, Rewind, Loader, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { convertTextToSpeech } from "@/ai/flows/text-to-speech-flow";
import { useToast } from "@/hooks/use-toast";

// InteractiveText Component
function InteractiveText({ text, difficultWords }: { text: string; difficultWords: DifficultWord[] }) {
    const difficultWordsMap = new Map(difficultWords.map(dw => [dw.word.toLowerCase(), dw]));

    const stanzas = text.split('\n\n');

    return (
        <div className="font-body text-lg/relaxed space-y-6">
            {stanzas.map((stanza, stanzaIndex) => (
                <p key={stanzaIndex}>
                    {stanza.split(/(\s+)/).map((part, partIndex) => {
                        const wordPart = part.trim().replace(/[.,;!?—]$/, '');
                        if (difficultWordsMap.has(wordPart.toLowerCase())) {
                            const wordData = difficultWordsMap.get(wordPart.toLowerCase())!;
                            return (
                                <Popover key={partIndex}>
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
                        return <span key={partIndex}>{part}</span>;
                    })}
                </p>
            ))}
        </div>
    );
}


// AudioPlayer Component
function AudioPlayer({ text }: { text: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        async function generateAudio() {
            try {
                setIsLoading(true);
                const { audioDataUri } = await convertTextToSpeech({ text });
                setAudioSrc(audioDataUri);
            } catch (error) {
                console.error("Error generating audio:", error);
                toast({
                    variant: "destructive",
                    title: "Audio Error",
                    description: "Failed to generate audio for this text. Please try again later.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        generateAudio();
    }, [text, toast]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };
    
    const handleStop = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    if (isLoading) {
        return (
            <Card className="my-6">
                <CardContent className="p-4 flex items-center justify-center gap-4">
                    <Loader className="w-6 h-6 animate-spin" />
                    <p className="text-muted-foreground">Generating audio...</p>
                </CardContent>
            </Card>
        )
    }

    if (!audioSrc) {
        return (
            <Card className="my-6">
                <CardContent className="p-4 flex items-center justify-center gap-4">
                    <p className="text-destructive">Audio could not be loaded.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="my-6">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="w-6 h-6"/> : <Play className="w-6 h-6"/>}
                    </Button>
                     <Button size="icon" variant="ghost" onClick={handleStop}>
                        <Rewind className="w-6 h-6"/>
                    </Button>
                </div>
                 <audio 
                    ref={audioRef} 
                    src={audioSrc}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                />
            </CardContent>
        </Card>
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
    // Special handling for the poem "Don't Quit" to match the image style
    const isSpecialPoem = work.slug === 'dont-quit';

    if (isSpecialPoem) {
        return (
            <div>
                 <div className="max-w-md mx-auto bg-stone-50 p-8 sm:p-12">
                    <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-center tracking-wider mb-8">
                        {work.title.toUpperCase()}
                    </h1>
                    <div className="space-y-6 text-center font-serif text-lg text-stone-800">
                        {work.fullText.split('\n\n').map((stanza, i) => (
                            <p key={i} className="leading-relaxed">
                                {stanza.split('\n').map((line, j) => (
                                    <span key={j}>{line}<br/></span>
                                ))}
                            </p>
                        ))}
                    </div>
                    <p className="mt-12 text-center font-serif text-base tracking-[.25em] text-stone-700">
                        ~ {work.author.toUpperCase()}
                    </p>
                </div>
                <div className="mt-12">
                    <h2 className="font-headline text-2xl font-bold mb-4 text-center">Interactive Elements</h2>
                     <p className="text-muted-foreground mb-4 text-center">Click on <span className="text-primary font-bold">bolded words</span> below for definitions, listen to an audio version, and test your knowledge.</p>
                    <AudioPlayer text={work.fullText} />
                    <InteractiveText text={work.fullText} difficultWords={work.difficultWords} />
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
                            <p className="mb-4">{work.authorInfo.biography}</p>
                            <p><strong>Writing Style:</strong> {work.authorInfo.writingStyle}</p>
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
        )
    }

    return (
        <div>
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
                 <h2 className="font-headline text-3xl font-bold mt-12 mb-2">Full Text</h2>
                 <p className="text-muted-foreground mb-4">Click on <span className="text-primary font-bold">bolded words</span> for definitions.</p>
                <AudioPlayer text={work.fullText} />
                <InteractiveText text={work.fullText} difficultWords={work.difficultWords} />
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
                        <p className="mb-4">{work.authorInfo.biography}</p>
                        <p><strong>Writing Style:</strong> {work.authorInfo.writingStyle}</p>
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
