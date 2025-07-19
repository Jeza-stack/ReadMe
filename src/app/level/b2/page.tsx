import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target } from 'lucide-react';

export default function B2Level() {
  const grammarTopics = [
    { topic: 'Advanced Conditional Forms', status: 'available', lessons: 8 },
    { topic: 'Mixed Conditionals & Wish', status: 'available', lessons: 6 },
    { topic: 'Advanced Passive Constructions', status: 'available', lessons: 5 },
    { topic: 'Subjunctive & Unreal Past', status: 'available', lessons: 7 },
    { topic: 'Participle Clauses', status: 'available', lessons: 5 },
    { topic: 'Advanced Modal Verbs', status: 'available', lessons: 6 }
  ];

  const vocabularyThemes = [
    { theme: 'Academic & Professional', words: 60, status: 'available' },
    { theme: 'Politics & Global Issues', words: 55, status: 'available' },
    { theme: 'Science & Innovation', words: 50, status: 'available' },
    { theme: 'Arts & Literature', words: 45, status: 'available' },
    { theme: 'Psychology & Behavior', words: 40, status: 'available' },
    { theme: 'Advanced Expressions', words: 50, status: 'available' }
  ];

  const skills = [
    {
      name: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Complex texts, articles, and literary works',
      activities: ['Academic papers', 'Literary analysis', 'Reports', 'Complex articles']
    },
    {
      name: 'Listening',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Extended speech, lectures, and discussions',
      activities: ['Lectures', 'Debates', 'Documentaries', 'Complex discussions']
    },
    {
      name: 'Writing',
      icon: <PenTool className="w-6 h-6" />,
      description: 'Detailed writing with clear argumentation',
      activities: ['Academic essays', 'Reports', 'Proposals', 'Critical reviews']
    },
    {
      name: 'Speaking',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Fluent, natural speech with complex ideas',
      activities: ['Presentations', 'Academic discussions', 'Negotiations', 'Debates']
    }
  ];

  const canDoStatements = [
    'I can understand the main ideas of complex texts on concrete and abstract topics',
    'I can interact with a degree of fluency and spontaneity with native speakers',
    'I can produce clear, detailed text on a wide range of subjects',
    'I can explain a viewpoint giving advantages and disadvantages',
    'I can understand extended speech and follow complex lines of argument',
    'I can write clear, detailed descriptions of real or imaginary events'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white text-lg px-4 py-2 mb-4">B2 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Upper Intermediate English</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Achieve fluency! Master complex grammar, express nuanced ideas, and communicate 
            effectively in academic and professional contexts.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
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
                  <span className="text-sm text-foreground/60">0/300 words</span>
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
              By the end of B2 level, you will be able to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
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
                <CardTitle>B2 Grammar Topics</CardTitle>
                <CardDescription>
                  Advanced grammar structures for sophisticated communication
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
                <CardTitle>B2 Vocabulary</CardTitle>
                <CardDescription>
                  Academic and professional vocabulary for complex communication
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
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
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
                <CardTitle>B2 Level Assessment</CardTitle>
                <CardDescription>
                  Advanced assessments for upper intermediate proficiency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Tests</CardTitle>
                      <CardDescription>Complex tasks and academic scenarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Advanced grammar analysis</li>
                        <li>• Academic vocabulary</li>
                        <li>• Extended listening tasks</li>
                        <li>• Complex text analysis</li>
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Take Practice Test
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Final Assessment</CardTitle>
                      <CardDescription>Complete B2 level evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Academic presentations</li>
                        <li>• Research essays</li>
                        <li>• Comprehensive exam</li>
                        <li>• Certified assessment</li>
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
            <Link href="/level/b1">
              ← Back to B1
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/level/c1">
              Continue to C1 →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}