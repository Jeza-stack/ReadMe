import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target } from 'lucide-react';

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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-green-500 text-white text-lg px-4 py-2 mb-4">A1 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Beginner English</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Start your English journey! Learn basic vocabulary, simple grammar, and essential communication skills 
            for everyday situations.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Grammar</span>
                  <span className="text-sm text-foreground/60">0/6 topics</span>
                </div>
                <Progress value={0} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Vocabulary</span>
                  <span className="text-sm text-foreground/60">0/150 words</span>
                </div>
                <Progress value={0} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Skills Practice</span>
                  <span className="text-sm text-foreground/60">0/16 activities</span>
                </div>
                <Progress value={0} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Can-Do Statements */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What You'll Be Able To Do (CEFR Can-Do Statements)</CardTitle>
            <CardDescription>
              By the end of A1 level, you will be able to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{statement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="grammar" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grammar">Grammar</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
          </TabsList>

          {/* Grammar Tab */}
          <TabsContent value="grammar">
            <Card>
              <CardHeader>
                <CardTitle>A1 Grammar Topics</CardTitle>
                <CardDescription>
                  Master the essential grammar structures for basic communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {grammarTopics.map((item, index) => (
                    <Card key={index} className="border border-border/50">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.topic}</CardTitle>
                          <Badge variant="secondary">{item.lessons} lessons</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {item.href ? (
                          <Link href={item.href}>
                            <Button className="w-full" variant="outline">
                              <Clock className="w-4 h-4 mr-2" />
                              Start Learning
                            </Button>
                          </Link>
                        ) : (
                          <Button className="w-full" variant="outline" disabled>
                            <Clock className="w-4 h-4 mr-2" />
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vocabulary Tab */}
          <TabsContent value="vocabulary">
            <Card>
              <CardHeader>
                <CardTitle>A1 Vocabulary</CardTitle>
                <CardDescription>
                  Build your word bank with essential vocabulary for daily life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {vocabularyThemes.map((theme, index) => (
                    <Card key={index} className="border border-border/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{theme.theme}</CardTitle>
                        <CardDescription>{theme.words} words</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button className="w-full" variant="outline" asChild>
                          <Link href={theme.href}>
                            Learn Words
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </CardTitle>
                    <CardDescription>{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Practice Activities:</h4>
                      {skill.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                      <Button className="w-full mt-4">
                        Practice {skill.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment">
            <Card>
              <CardHeader>
                <CardTitle>A1 Level Assessment</CardTitle>
                <CardDescription>
                  Test your knowledge and track your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Tests</CardTitle>
                      <CardDescription>Regular quizzes to check understanding</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Grammar exercises</li>
                        <li>• Vocabulary tests</li>
                        <li>• Listening comprehension</li>
                        <li>• Reading comprehension</li>
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Take Practice Test
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Final Assessment</CardTitle>
                      <CardDescription>Complete A1 level evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Speaking assessment</li>
                        <li>• Writing tasks</li>
                        <li>• Comprehensive test</li>
                        <li>• Progress certificate</li>
                      </ul>
                      <Button className="w-full mt-4" disabled>
                        Unlock with Progress
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Next Level CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="text-center p-8">
            <h3 className="font-headline text-2xl font-bold mb-4">Ready for the Next Level?</h3>
            <p className="text-foreground/70 mb-6">
              Complete A1 to unlock A2 Elementary level with more complex grammar and vocabulary.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/level/a2">
                Preview A2 Level <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}