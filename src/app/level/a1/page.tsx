import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, ArrowLeft } from 'lucide-react';
import { BackNav } from '@/components/BackNav';

export default function A1Level() {
  const grammarTopics = [
    { topic: 'The Verb "To Be"', status: 'available', lessons: 1, href: '/level/a1/verb-to-be' },
    { topic: 'The Verb "To Have"', status: 'available', lessons: 1, href: '/level/a1/to-have' },
    { topic: 'The Verb "To Do" (Auxiliary)', status: 'available', lessons: 1, href: '/level/a1/to-do' },
    { topic: 'Present Simple (Regular Verbs)', status: 'available', lessons: 1, href: '/level/a1/present-simple' },
    { topic: 'Articles (a, an, the)', status: 'available', lessons: 1, href: '/level/a1/articles' },
    { topic: 'Personal Pronouns', status: 'available', lessons: 1, href: '/level/a1/personal-pronouns' }
  ];

  const vocabularyThemes = [
    { theme: 'Personal Information', words: 25, status: 'available', href: '/level/a1/personal-vocabulary' },
    { theme: 'Family & Relationships', words: 25, status: 'available', href: '/level/a1/family-vocabulary' },
    { theme: 'Colors & Basic Adjectives', words: 15, status: 'available', href: '/level/a1/colors-vocabulary' },
    { theme: 'Food & Drinks', words: 30, status: 'available', href: '/level/a1/food-vocabulary' },
    { theme: 'Days, Months, Time', words: 20, status: 'available', href: '/level/a1/time-vocabulary' },
    { theme: 'Basic Verbs', words: 40, status: 'available', href: '/level/a1/verbs-vocabulary' }
  ];

  const skills = [
    {
      name: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Simple texts about familiar topics',
      activities: ['Personal ads', 'Simple emails', 'Basic signs', 'Short messages']
    },
    {
      name: 'Listening',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Slow, clear speech about familiar matters',
      activities: ['Introductions', 'Simple directions', 'Basic conversations', 'Phone numbers']
    },
    {
      name: 'Writing',
      icon: <PenTool className="w-6 h-6" />,
      description: 'Simple phrases and sentences',
      activities: ['Fill forms', 'Write postcards', 'Short notes', 'Personal details']
    },
    {
      name: 'Speaking',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Simple phrases about yourself and familiar topics',
      activities: ['Introduce yourself', 'Ask for things', 'Basic conversations', 'Describe people']
    }
  ];

  const canDoStatements = [
    'I can introduce myself and others',
    'I can ask and answer questions about personal details',
    'I can interact in a simple way if the other person speaks slowly',
    'I can understand familiar names, words and very simple sentences',
    'I can write a short, simple postcard',
    'I can fill in forms with personal details'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[{ label: 'Home', href: '/' }, { label: 'CEFR English', href: '/courses/cefr-english' }]} 
        current="Level A1 - Beginner" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <Badge className="bg-[#00A2C9] text-white text-lg px-6 py-2 mb-6 rounded-full shadow-lg shadow-cyan-400/20">A1 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Beginner English</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Start your English journey! Learn basic vocabulary, simple grammar, and essential communication skills 
            for everyday situations.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 overflow-hidden border-0 shadow-xl bg-white dark:bg-[#0A1330] rounded-2xl">
          <div className="h-2 bg-gradient-to-r from-[#043370] to-[#00A2C9]"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
              <Target className="w-6 h-6 text-[#00A2C9]" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Grammar</span>
                  <span className="text-xs font-bold text-[#00A2C9]">0/6 topics</span>
                </div>
                <Progress value={0} className="h-2 bg-slate-100 dark:bg-white/10" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Vocabulary</span>
                  <span className="text-xs font-bold text-[#00A2C9]">0/150 words</span>
                </div>
                <Progress value={0} className="h-2 bg-slate-100 dark:bg-white/10" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Skills</span>
                  <span className="text-xs font-bold text-[#00A2C9]">0/16 activities</span>
                </div>
                <Progress value={0} className="h-2 bg-slate-100 dark:bg-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="grammar" className="space-y-10">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
            <TabsTrigger value="grammar" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-md">Grammar</TabsTrigger>
            <TabsTrigger value="vocabulary" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-md">Vocabulary</TabsTrigger>
            <TabsTrigger value="skills" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-md">Skills</TabsTrigger>
            <TabsTrigger value="assessment" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-md">Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="grammar" className="animate-in fade-in duration-500 outline-none">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grammarTopics.map((item, index) => (
                <Card key={index} className="border border-slate-100 dark:border-white/5 hover:border-[#00A2C9] transition-all bg-white dark:bg-[#0A1330] rounded-xl shadow-sm hover:shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-lg font-bold leading-tight">{item.topic}</CardTitle>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-widest shrink-0">{item.lessons} lessons</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Button className="w-full bg-[#043370] hover:bg-[#00A2C9] text-white rounded-lg h-11 font-semibold group" asChild>
                      <Link href={item.href}>
                        Start Lesson <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vocabulary" className="animate-in fade-in duration-500 outline-none">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {vocabularyThemes.map((theme, index) => (
                  <Card key={index} className="border border-slate-100 dark:border-white/5 hover:border-[#00A2C9] transition-all bg-white dark:bg-[#0A1330] rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">{theme.theme}</CardTitle>
                      <CardDescription>{theme.words} fundamental words</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full font-semibold" variant="outline" asChild>
                        <Link href={theme.href}>Master Vocabulary</Link>
                      </Button>
                    </CardContent>
                  </Card>
               ))}
             </div>
          </TabsContent>

          <TabsContent value="skills" className="animate-in fade-in duration-500 outline-none">
             <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                   <Card key={index} className="overflow-hidden border-0 shadow-lg bg-white dark:bg-[#0A1330] rounded-2xl">
                     <CardHeader className="bg-slate-100/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                        <CardTitle className="flex items-center gap-3 text-[#00A2C9] font-bold">
                          {skill.icon} {skill.name}
                        </CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                     </CardHeader>
                     <CardContent className="pt-6">
                        <div className="space-y-4">
                           {skill.activities.map((act, i) => (
                             <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                               <CheckCircle className="w-4 h-4 text-[#00A2C9]/50" />
                               {act}
                             </div>
                           ))}
                           <Button className="w-full mt-4 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-[#043370] hover:text-white border-0 font-bold">Practice {skill.name}</Button>
                        </div>
                     </CardContent>
                   </Card>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="assessment" className="animate-in fade-in duration-500 outline-none">
             <Card className="border-2 border-dashed border-slate-200 dark:border-white/10 bg-transparent text-center p-12 rounded-3xl">
                <Target className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Final Level Assessment</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">Complete all lessons in the Grammar and Skills sections to unlock the final A1 certification exam.</p>
                <Button disabled size="lg" className="rounded-full px-10 h-14 font-bold">Locked (0% Progress)</Button>
             </Card>
          </TabsContent>
        </Tabs>

        {/* Level Footer Nav */}
        <div className="mt-20 flex justify-between items-center py-8 border-t border-slate-200 dark:border-white/10">
           <Link href="/courses/cefr-english" className="flex items-center gap-2 text-slate-500 hover:text-[#043370] font-bold transition-colors group">
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to CEFR Overview
           </Link>
           <Link href="/level/a2" className="flex items-center gap-2 text-[#00A2C9] hover:text-[#043370] font-bold transition-colors group">
             Next Level: A2 Elementary <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}