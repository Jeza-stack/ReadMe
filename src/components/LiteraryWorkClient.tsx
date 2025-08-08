
"use client";

import type { LiteraryWork, DifficultWord, QuizQuestion, Faq } from "@/lib/types";
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

// InteractiveText Component
function InteractiveText({ text, difficultWords }: { text: string; difficultWords: DifficultWord[] }) {
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

                            if (difficultWordsMap.has(wordOnly.toLowerCase())) {
                                const wordData = difficultWordsMap.get(wordOnly.toLowerCase())!;
                                return (
                                    <Popover key={index}>
                                        <PopoverTrigger asChild>
                                            <span className="cursor-pointer font-bold text-primary/80 hover:text-primary transition-colors">{part}</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80 bg-background border-border shadow-2xl">
                                            <div className="space-y-2">
                                                <h4 className="font-bold font-headline text-primary">{wordData.word}</h4>
                                                <p className="text-sm text-foreground/90">{wordData.definition}</p>
                                                {wordData.connotation && (
                                                  <p className="text-sm text-foreground/90"><span className="font-semibold">Connotation:</span> {wordData.connotation}</p>
                                                )}
                                                {wordData.example && (
                                                  <p className="text-sm text-foreground/90"><span className="font-semibold">Example:</span> <em>"{wordData.example}"</em></p>
                                                )}
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
                        
                        let stateClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
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
    return (
        <div className="space-y-16 md:space-y-24">
            {/* Full Text */}
            <section>
                 <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Read</h2>
                 <p className="text-foreground/70 mb-8 text-center">Click on <span className="text-primary font-bold">bolded words</span> for definitions.</p>
                <InteractiveText 
                    text={work.fullText} 
                    difficultWords={work.difficultWords}
                />
            </section>
            
            {/* Video Section */}
            {work.videoUrl && work.videoEmbedId && (
                <>
                    <Separator className="bg-border/30" />
                    <section>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">🎥 Watch the Historic Speech</h2>
                        <div className="flex justify-center">
                            <div className="w-full max-w-4xl">
                                <div className="relative aspect-video">
                                    <iframe 
                                        className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                                        src={`https://www.youtube.com/embed/${work.videoEmbedId}`}
                                        title={`${work.title} by ${work.author}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <p className="text-center mt-4 text-foreground/70">
                                    <a 
                                        href={work.videoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 transition-colors underline"
                                    >
                                        Watch on YouTube
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>
                </>
            )}
            
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
                        {Array.isArray(work.contentAnalysis.literaryDevices) ? (
                          work.contentAnalysis.literaryDevices.map((ld, i) => (
                              <p key={i} className="mb-2"><strong>{ld.device}:</strong> <em>"{ld.example}"</em></p>
                          ))
                        ) : (
                          <p className="text-sm text-foreground/70">No literary devices listed.</p>
                        )}
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
