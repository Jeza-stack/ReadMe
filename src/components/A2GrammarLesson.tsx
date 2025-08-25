'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, RotateCcw, ArrowRight } from 'lucide-react';

type Option = { text: string; correct?: boolean };
type Question = { prompt: string; options: Option[] };

export type A2Lesson = {
  slug: string;
  topic: string;
  topicKey: string;
  badge: string;
  title: string;
  canDo: string;
  ruleHTML: string;
  examplesHTML: string;
  challengeSeconds: number;
  nextSlug: string | null;
  questions: Question[];
};

interface Props { lesson: A2Lesson; }

const STORAGE_KEY = 'a2-grammar-progress-v1';

type Stored = {
  [slug: string]: {
    attempts: number;
    bestScore: number; // 0-100
    completed: boolean;
  }
};

export default function A2GrammarLesson({ lesson }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(lesson.questions.length).fill(-1));
  const [checked, setChecked] = useState(false);

  const numCorrect = useMemo(() => {
    return lesson.questions.reduce((acc, q, idx) => {
      const selectedIndex = answers[idx];
      if (selectedIndex === -1) return acc;
      const selected = q.options[selectedIndex];
      return acc + (selected?.correct ? 1 : 0);
    }, 0);
  }, [answers, lesson.questions]);

  const scorePct = Math.round((numCorrect / lesson.questions.length) * 100);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data: Stored = JSON.parse(raw);
      const stored = data[lesson.slug];
      if (stored && stored.completed) setChecked(true);
    } catch {}
  }, [lesson.slug]);

  const storeProgress = (completed: boolean) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data: Stored = raw ? JSON.parse(raw) : {};
      const prev = data[lesson.slug] || { attempts: 0, bestScore: 0, completed: false };
      const bestScore = Math.max(prev.bestScore ?? 0, scorePct);
      data[lesson.slug] = {
        attempts: (prev.attempts ?? 0) + 1,
        bestScore,
        completed: completed || bestScore === 100
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  };

  const onCheck = () => {
    setChecked(true);
    storeProgress(numCorrect === lesson.questions.length);
  };

  const onReset = () => {
    setAnswers(Array(lesson.questions.length).fill(-1));
    setChecked(false);
  };

  const progressValue = Math.round((answers.filter(i => i !== -1).length / lesson.questions.length) * 100);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Card className="mb-6">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600 text-white">A2 • {lesson.topic}</Badge>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Clock className="w-4 h-4" />
                {lesson.challengeSeconds}s
              </div>
            </div>
            <CardTitle className="text-2xl">{lesson.title}</CardTitle>
            <CardDescription>{lesson.canDo}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Rule</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lesson.ruleHTML }} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Examples</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lesson.examplesHTML }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Practice</CardTitle>
              <div className="w-40">
                <Progress value={progressValue} />
              </div>
            </div>
            <CardDescription>Choose the correct answers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lesson.questions.map((q, qIndex) => (
              <Card key={qIndex} className="border border-border/60">
                <CardContent className="pt-4">
                  <p className="font-medium mb-3">{qIndex + 1}. {q.prompt}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, optIndex) => {
                      const selected = answers[qIndex] === optIndex;
                      const isCorrect = checked && opt.correct;
                      const isWrong = checked && selected && !opt.correct;
                      return (
                        <Button
                          key={optIndex}
                          type="button"
                          variant={selected ? 'default' : 'outline'}
                          className={
                            'justify-start ' +
                            (isCorrect ? ' border-green-500 text-green-700' : '') +
                            (isWrong ? ' border-red-500 text-red-700' : '')
                          }
                          onClick={() => {
                            if (checked) return;
                            const next = [...answers];
                            next[qIndex] = optIndex;
                            setAnswers(next);
                          }}
                        >
                          {opt.text}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex flex-col sm:flex-row gap-2">
              {!checked ? (
                <Button onClick={onCheck} disabled={answers.includes(-1)}>Check Answers</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={onReset}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                  </Button>
                  <div className="flex items-center gap-2 ml-auto">
                    <CheckCircle className={scorePct === 100 ? 'text-green-600' : 'text-foreground/50'} />
                    <span className="text-sm">Score: {scorePct}%</span>
                  </div>
                </>
              )}
              {checked && lesson.nextSlug && (
                <Button asChild className="ml-auto">
                  <Link href={`/level/a2/grammar/${lesson.nextSlug}`}>
                    Next Lesson <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

