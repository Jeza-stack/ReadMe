import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target } from 'lucide-react';

export default function C1Level() {
  const grammarTopics = [
    { topic: 'Advanced Discourse Markers', status: 'available', lessons: 8 },
    { topic: 'Inversion & Emphasis', status: 'available', lessons: 7 },
    { topic: 'Nominalization Techniques', status: 'available', lessons: 6 },
    { topic: 'Complex Sentence Structures', status: 'available', lessons: 9 },
    { topic: 'Register & Style Variation', status: 'available', lessons: 7 },
    { topic: 'Ellipsis & Substitution', status: 'available', lessons: 5 }
  ];

  const vocabularyThemes = [
    { theme: 'Academic Research & Methodology', words: 70, status: 'available' },
    { theme: 'Specialized Professional Fields', words: 65, status: 'available' },
    { theme: 'Critical Analysis & Evaluation', words: 60, status: 'available' },
    { theme: 'Cultural & Historical Context', words: 55, status: 'available' },
    { theme: 'Abstract Philosophical Concepts', words: 50, status: 'available' },
    { theme: 'Nuanced Expressions & Idioms', words: 60, status: 'available' }
  ];

  const skills = [
    {
      name: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Complex texts with implicit meaning and style nuances',
      activities: ['Research papers', 'Literary criticism', 'Technical manuals', 'Historical texts']
    },
    {
      name: 'Listening',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Extended speech with cultural references and implications',
      activities: ['Academic lectures', 'Professional conferences', 'Cultural discussions', 'Specialized debates']
    },
    {
      name: 'Writing',
      icon: <PenTool className="w-6 h-6" />,
      description: 'Well-structured, complex texts with appropriate style',
      activities: ['Research proposals', 'Critical essays', 'Professional reports', 'Creative writing']
    },
    {
      name: 'Speaking',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Fluent, spontaneous expression with cultural appropriateness',
      activities: ['Academic presentations', 'Professional meetings', 'Cultural discussions', 'Expert interviews']
    }
  ];

  const canDoStatements = [
    'I can understand a wide range of demanding, longer texts and recognize implicit meaning',
    'I can express myself fluently and spontaneously without much obvious searching for expressions',
    'I can use language flexibly and effectively for social, academic and professional purposes',
    'I can produce clear, well-structured, detailed text on complex subjects',
    'I can understand extended speech even when it is not clearly structured',
    'I can express myself spontaneously, very fluently and precisely'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-500 text-white text-lg px-4 py-2 mb-4">C1 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Advanced English</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Near-native proficiency! Master sophisticated language use, cultural nuances, 
            and professional communication at the highest levels.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
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
                  <span className="text-sm text-foreground/60">0/360 words</span>
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
              By the end of C1 level, you will be able to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
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
                <CardTitle>C1 Grammar Topics</CardTitle>
                <CardDescription>
                  Sophisticated grammar for native-like expression and style
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
                        <Button className="w-full" variant="outline">
                          <Clock className="w-4 h-4 mr-2" />
                          Start Learning
                        </Button>
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
                <CardTitle>C1 Vocabulary</CardTitle>
                <CardDescription>
                  Sophisticated vocabulary for professional and academic contexts
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
                        <Button className="w-full" variant="outline">
                          Learn Words
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
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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
                <CardTitle>C1 Level Assessment</CardTitle>
                <CardDescription>
                  Advanced assessments for near-native proficiency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Tests</CardTitle>
                      <CardDescription>Sophisticated tasks and professional scenarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Style and register analysis</li>
                        <li>• Specialized terminology</li>
                        <li>• Cultural context tasks</li>
                        <li>• Critical evaluation</li>
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Take Practice Test
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Final Assessment</CardTitle>
                      <CardDescription>Complete C1 level evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Professional presentations</li>
                        <li>• Research dissertations</li>
                        <li>• Comprehensive evaluation</li>
                        <li>• Advanced certification</li>
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

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/level/b2">
              ← Back to B2
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/level/c2">
              Continue to C2 →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}