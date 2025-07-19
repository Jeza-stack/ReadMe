import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target, Award } from 'lucide-react';

export default function C2Level() {
  const grammarTopics = [
    { topic: 'Stylistic Variations & Register', status: 'available', lessons: 10 },
    { topic: 'Pragmatic Functions', status: 'available', lessons: 8 },
    { topic: 'Discourse Analysis', status: 'available', lessons: 9 },
    { topic: 'Implicit & Contextual Meaning', status: 'available', lessons: 8 },
    { topic: 'Cross-Cultural Communication', status: 'available', lessons: 7 },
    { topic: 'Language Variation & Evolution', status: 'available', lessons: 6 }
  ];

  const vocabularyThemes = [
    { theme: 'Expert Professional Terminology', words: 80, status: 'available' },
    { theme: 'Literary & Poetic Language', words: 75, status: 'available' },
    { theme: 'Historical & Cultural References', words: 70, status: 'available' },
    { theme: 'Technical & Scientific Precision', words: 75, status: 'available' },
    { theme: 'Philosophical & Theoretical', words: 65, status: 'available' },
    { theme: 'Regional & Dialectal Variations', words: 60, status: 'available' }
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

  const canDoStatements = [
    'I can understand with ease virtually everything heard or read',
    'I can summarize information from different spoken and written sources',
    'I can express myself spontaneously, very fluently and precisely',
    'I can differentiate finer shades of meaning even in complex situations',
    'I can present complex subjects with clarity and elegance',
    'I can adapt my language use to various social and professional contexts'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-600 text-white text-lg px-4 py-2 mb-4">C2 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Proficiency English</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Native-like mastery! Perfect your command of English with sophisticated expression, 
            cultural insight, and professional excellence at the highest level.
          </p>
        </div>

        {/* Mastery Badge */}
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="text-center p-8">
            <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="font-headline text-2xl font-bold mb-2">English Language Mastery</h2>
            <p className="text-foreground/70">
              C2 represents the highest level of English proficiency - equivalent to an educated native speaker
            </p>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Mastery Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Advanced Concepts</span>
                  <span className="text-sm text-foreground/60">0/6 topics</span>
                </div>
                <Progress value={0} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Expert Vocabulary</span>
                  <span className="text-sm text-foreground/60">0/425 words</span>
                </div>
                <Progress value={0} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Mastery Tasks</span>
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
              By completing C2 level, you will be able to:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {canDoStatements.map((statement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{statement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="grammar" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grammar">Advanced Concepts</TabsTrigger>
            <TabsTrigger value="vocabulary">Expert Vocabulary</TabsTrigger>
            <TabsTrigger value="skills">Mastery Skills</TabsTrigger>
            <TabsTrigger value="assessment">Certification</TabsTrigger>
          </TabsList>

          {/* Advanced Concepts Tab */}
          <TabsContent value="grammar">
            <Card>
              <CardHeader>
                <CardTitle>C2 Advanced Language Concepts</CardTitle>
                <CardDescription>
                  Master the most sophisticated aspects of English language use
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
                          Master Concept
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expert Vocabulary Tab */}
          <TabsContent value="vocabulary">
            <Card>
              <CardHeader>
                <CardTitle>C2 Expert Vocabulary</CardTitle>
                <CardDescription>
                  Master specialized terminology and sophisticated expressions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {vocabularyThemes.map((theme, index) => (
                    <Card key={index} className="border border-border/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{theme.theme}</CardTitle>
                        <CardDescription>{theme.words} expressions</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button className="w-full" variant="outline">
                          Master Vocabulary
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mastery Skills Tab */}
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
                      <h4 className="font-medium text-sm">Mastery Activities:</h4>
                      {skill.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-sm">{activity}</span>
                        </div>
                      ))}
                      <Button className="w-full mt-4">
                        Perfect {skill.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certification Tab */}
          <TabsContent value="assessment">
            <Card>
              <CardHeader>
                <CardTitle>C2 Proficiency Certification</CardTitle>
                <CardDescription>
                  Demonstrate mastery with official C2 level certification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Mastery Assessments</CardTitle>
                      <CardDescription>Expert-level evaluations and tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Stylistic analysis</li>
                        <li>• Cultural competency</li>
                        <li>• Expert communication</li>
                        <li>• Creative expression</li>
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Take Mastery Test
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Official Certification</CardTitle>
                      <CardDescription>C2 Proficiency Certificate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Expert-level assessment</li>
                        <li>• Professional portfolio</li>
                        <li>• Comprehensive evaluation</li>
                        <li>• Official C2 certificate</li>
                      </ul>
                      <Button className="w-full mt-4" disabled>
                        Unlock with Mastery
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievement Section */}
                <Card className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-300 dark:border-purple-700">
                  <CardContent className="text-center p-8">
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-headline text-xl font-bold mb-2">Congratulations!</h3>
                    <p className="text-sm text-foreground/70">
                      Completing C2 represents achieving native-like English proficiency. 
                      You will have mastered the highest level of the Common European Framework.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/level/c1">
              ← Back to C1
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/assessment">
              Complete Assessment <Award className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}