import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target } from 'lucide-react';

export default function B1Level() {
  const grammarTopics = [
    { topic: 'Present Perfect vs Past Simple', status: 'available', lessons: 7 },
    { topic: 'Conditional Sentences (1st & 2nd)', status: 'available', lessons: 6 },
    { topic: 'Passive Voice (Present & Past)', status: 'available', lessons: 5 },
    { topic: 'Reported Speech', status: 'available', lessons: 6 },
    { topic: 'Relative Clauses', status: 'available', lessons: 5 },
    { topic: 'Modal Verbs (Advanced)', status: 'available', lessons: 4 }
  ];

  const vocabularyThemes = [
    { theme: 'Abstract Concepts & Ideas', words: 50, status: 'available' },
    { theme: 'Technology & Media', words: 45, status: 'available' },
    { theme: 'Environment & Nature', words: 40, status: 'available' },
    { theme: 'Society & Culture', words: 55, status: 'available' },
    { theme: 'Education & Learning', words: 35, status: 'available' },
    { theme: 'Emotions & Relationships', words: 40, status: 'available' }
  ];

  const skills = [
    {
      name: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Texts with clear argumentation and factual articles',
      activities: ['News articles', 'Blog posts', 'Opinion pieces', 'Travel guides']
    },
    {
      name: 'Listening',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Standard speech on familiar and unfamiliar topics',
      activities: ['Radio programs', 'Podcasts', 'Presentations', 'Interviews']
    },
    {
      name: 'Writing',
      icon: <PenTool className="w-6 h-6" />,
      description: 'Clear, connected text expressing opinions and ideas',
      activities: ['Essays', 'Reports', 'Reviews', 'Formal letters']
    },
    {
      name: 'Speaking',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Express ideas fluently and spontaneously',
      activities: ['Debates', 'Presentations', 'Discussions', 'Problem solving']
    }
  ];

  const canDoStatements = [
    'I can understand the main points of clear speech on familiar matters',
    'I can deal with most situations likely to arise while travelling',
    'I can produce simple connected text on familiar topics',
    'I can describe experiences, events, dreams, hopes and ambitions',
    'I can briefly give reasons and explanations for opinions and plans',
    'I can understand texts consisting mainly of familiar vocabulary'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-500 text-white text-lg px-4 py-2 mb-4">B1 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Intermediate English</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Gain independence! Express opinions, handle complex situations, and communicate 
            confidently in most real-world contexts.
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
                  <span className="text-sm text-foreground/60">0/265 words</span>
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
              By the end of B1 level, you will be able to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
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
                <CardTitle>B1 Grammar Topics</CardTitle>
                <CardDescription>
                  Master intermediate grammar for complex communication
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
                <CardTitle>B1 Vocabulary</CardTitle>
                <CardDescription>
                  Develop vocabulary for abstract concepts and complex ideas
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
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
                <CardTitle>B1 Level Assessment</CardTitle>
                <CardDescription>
                  Test your intermediate level skills and knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Tests</CardTitle>
                      <CardDescription>Complex exercises and real-world scenarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Complex grammar tasks</li>
                        <li>• Context-based vocabulary</li>
                        <li>• Extended listening</li>
                        <li>• Article comprehension</li>
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Take Practice Test
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Final Assessment</CardTitle>
                      <CardDescription>Complete B1 level evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Extended speaking tasks</li>
                        <li>• Essay writing</li>
                        <li>• Comprehensive test</li>
                        <li>• Official certificate</li>
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
            <Link href="/level/a2">
              ← Back to A2
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/level/b2">
              Continue to B2 →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}