import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Award, ArrowLeft } from 'lucide-react';
import { BackNav } from '@/components/BackNav';

export default function C2Level() {
  const grammarTopics = [
    { topic: 'Stylistic Variations & Register', lessons: 10 },
    { topic: 'Pragmatic Functions', lessons: 8 },
    { topic: 'Discourse Analysis', lessons: 9 },
    { topic: 'Implicit & Contextual Meaning', lessons: 8 },
    { topic: 'Cross-Cultural Communication', lessons: 7 },
    { topic: 'Language Variation & Evolution', lessons: 6 }
  ];

  const vocabularyThemes = [
    { theme: 'Expert Professional Terminology', words: 80 },
    { theme: 'Literary & Poetic Language', words: 75 },
    { theme: 'Historical & Cultural References', words: 70 },
    { theme: 'Technical & Scientific Precision', words: 75 },
    { theme: 'Philosophical & Theoretical', words: 65 },
    { theme: 'Regional & Dialectal Variations', words: 60 }
  ];

  const skills = [
    {
      name: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'All types of texts with ease, including abstract and complex works',
      activities: ['Ancient literature', 'Technical manuals', 'Legal documents', 'Philosophical texts']
    },
    {
      name: 'Listening',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Any spoken language with ease, including fast speech and dialects',
      activities: ['Regional accents', 'Historical recordings', 'Specialized conferences', 'Cultural nuances']
    },
    {
      name: 'Writing',
      icon: <PenTool className="w-6 h-6" />,
      description: 'Complex writing with appropriate style for any purpose',
      activities: ['Academic publications', 'Creative literature', 'Policy documents', 'Expert analysis']
    },
    {
      name: 'Speaking',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Spontaneous, precise expression with cultural and emotional nuances',
      activities: ['Expert testimony', 'Cultural mediation', 'Creative expression', 'Leadership communication']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <BackNav 
        crumbs={[{ label: 'Home', href: '/' }, { label: 'CEFR English', href: '/courses/cefr-english' }]} 
        current="Level C2 - Proficiency" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <Badge className="bg-[#00A2C9] text-white text-lg px-6 py-2 mb-6 rounded-full shadow-lg shadow-cyan-400/20">C2 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">Proficiency English</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Native-like mastery! Perfect your command of English with sophisticated expression, 
            cultural insight, and professional excellence at the highest level.
          </p>
        </div>

        {/* Mastery Badge */}
        <Card className="mb-12 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-[#043370] to-[#00A2C9] text-white rounded-3xl">
          <CardContent className="text-center p-12 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <Award className="w-20 h-20 text-[var(--ce-golden-yellow)] mx-auto mb-6 drop-shadow-lg" />
            <h2 className="font-headline text-3xl font-bold mb-4">English Language Mastery</h2>
            <p className="text-cyan-50/80 max-w-2xl mx-auto text-lg leading-relaxed">
                C2 represents the absolute pinnacle of English proficiency - equivalent to an educated native speaker capable of navigating the most complex linguistic environments.
            </p>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="mb-12 overflow-hidden border-0 shadow-xl bg-white dark:bg-[#0A1330] rounded-2xl">
          <div className="h-2 bg-gradient-to-r from-[#043370] to-[#00A2C9]"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white">
              <Target className="w-6 h-6 text-[#00A2C9]" />
              Mastery Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Advanced Concepts</span>
                  <span className="text-xs font-bold text-[#00A2C9]">0/6 topics</span>
                </div>
                <Progress value={0} className="h-2 bg-slate-100 dark:bg-white/10" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Expert Vocabulary</span>
                  <span className="text-xs font-bold text-[#00A2C9]">0/425 words</span>
                </div>
                <Progress value={0} className="h-2 bg-slate-100 dark:bg-white/10" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Mastery Tasks</span>
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
             <TabsTrigger value="grammar" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-md">Concepts</TabsTrigger>
             <TabsTrigger value="vocabulary" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-md">Vocabulary</TabsTrigger>
             <TabsTrigger value="skills" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-md">Skills</TabsTrigger>
             <TabsTrigger value="assessment" className="rounded-lg font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-md">Certification</TabsTrigger>
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
                        <Button className="w-full bg-[#043370] hover:bg-[#00A2C9] text-white rounded-lg h-11 font-semibold group">
                           Master Concept <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                        <CardDescription>{theme.words} expert expressions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full font-semibold" variant="outline">Master Lexicon</Button>
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
                           <Button className="w-full mt-4 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-[#043370] hover:text-white border-0 font-bold">Perfect {skill.name}</Button>
                        </div>
                     </CardContent>
                   </Card>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="assessment" className="animate-in fade-in duration-500 outline-none">
             <Card className="border-2 border-dashed border-slate-200 dark:border-white/10 bg-transparent text-center p-12 rounded-3xl">
                <Target className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">C2 Mastery Certification</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">Ready for the ultimate credential? Complete your mastery benchmarks to unlock the final Proficiency Assessment.</p>
                <Button disabled size="lg" className="rounded-full px-10 h-14 font-bold">Locked (0% Progress)</Button>
             </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Nav */}
        <div className="mt-20 flex justify-between items-center py-8 border-t border-slate-200 dark:border-white/10">
           <Link href="/level/c1" className="flex items-center gap-2 text-slate-500 hover:text-[#043370] font-bold transition-colors group">
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Previous: C1 Advanced
           </Link>
           <Link href="/assessment" className="flex items-center gap-2 text-[#00A2C9] hover:text-[#043370] font-bold transition-colors group">
             Final Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}