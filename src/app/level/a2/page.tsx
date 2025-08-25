import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, BookOpen, Headphones, PenTool, MessageSquare, Clock, Target } from 'lucide-react';

type A2Lesson = {
  slug: string;
  topic: string;
  topicKey: 'past' | 'present' | 'comp' | 'modals' | 'future' | 'prep';
  badge: string;
  title: string;
  canDo: string;
};

type TopicInfo = { topic: string; lessons: number; firstSlug: string };

async function getA2GrammarTopics(): Promise<TopicInfo[]> {
  const filePath = path.join(process.cwd(), 'public', 'grammar', 'a2', 'data', 'lessons.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const json: { lessons: A2Lesson[] } = JSON.parse(raw);
  const groups = new Map<string, { topic: string; firstSlug: string; count: number }>();
  for (const l of json.lessons) {
    const key = l.topicKey;
    if (!groups.has(key)) groups.set(key, { topic: l.topic, firstSlug: l.slug, count: 0 });
    const g = groups.get(key)!;
    g.count += 1;
  }
  const order: Array<keyof typeof topicTitles> = ['past','present','comp','modals','future','prep'];
  const result: TopicInfo[] = [];
  for (const k of order) {
    const g = groups.get(k);
    if (g) result.push({ topic: topicTitles[k], lessons: g.count, firstSlug: g.firstSlug });
  }
  return result;
}

const topicTitles = {
  past: 'Past Simple (regular & irregular)',
  present: 'Present Continuous',
  comp: 'Comparative & Superlative',
  modals: 'Modal Verbs (can, could, should)',
  future: 'Future (going to, will)',
  prep: 'Prepositions of Time & Place'
} as const;

export default async function A2Level() {
  const grammarTopics = await getA2GrammarTopics();

  const vocabularyThemes = [
    { theme: 'Shopping & Services', words: 40, status: 'available' },
    { theme: 'Travel & Transportation', words: 35, status: 'available' },
    { theme: 'Health & Body', words: 30, status: 'available' },
    { theme: 'Work & Jobs', words: 45, status: 'available' },
    { theme: 'Weather & Seasons', words: 25, status: 'available' },
    { theme: 'Hobbies & Entertainment', words: 35, status: 'available' }
  ];

  const skills = [
    {
      name: 'Reading',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Short, simple texts on familiar topics',
      activities: ['Personal letters', 'Simple articles', 'Advertisements', 'Basic instructions']
    },
    {
      name: 'Listening',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Phrases and vocabulary about immediate needs',
      activities: ['Announcements', 'Simple interviews', 'Basic dialogues', 'Weather reports']
    },
    {
      name: 'Writing',
      icon: <PenTool className="w-6 h-6" />,
      description: 'Simple connected text on familiar topics',
      activities: ['Personal letters', 'Simple descriptions', 'Basic stories', 'Email messages']
    },
    {
      name: 'Speaking',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Simple conversations about routine matters',
      activities: ['Describe experiences', 'Make requests', 'Give opinions', 'Talk about plans']
    }
  ];

  const canDoStatements = [
    'I can describe my family, living conditions, and educational background',
    'I can communicate in simple routine tasks requiring direct exchange',
    'I can describe in simple terms aspects of my background and immediate environment',
    'I can understand sentences and frequently used expressions',
    'I can write short, simple notes and messages',
    'I can read very short, simple texts and find specific information'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-green-600 text-white text-lg px-4 py-2 mb-4">A2 Level</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Elementary English</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Build on your basics! Learn past tenses, express opinions, and handle everyday situations 
            with growing confidence.
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
                  <span className="text-sm text-foreground/60">0/210 words</span>
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
              By the end of A2 level, you will be able to:
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
                <CardTitle>A2 Grammar Topics</CardTitle>
                <CardDescription>
                  Expand your grammar knowledge with more complex structures
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
                        <Button asChild className="w-full" variant="outline">
                          <Link href={`/level/a2/grammar/${item.firstSlug}`}>
                            <Clock className="w-4 h-4 mr-2" />
                            Start Learning
                          </Link>
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
                <CardTitle>A2 Vocabulary</CardTitle>
                <CardDescription>
                  Expand your vocabulary for everyday situations and routine tasks
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
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
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
                <CardTitle>A2 Level Assessment</CardTitle>
                <CardDescription>
                  Test your elementary level knowledge and skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Tests</CardTitle>
                      <CardDescription>Regular assessments to check progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Past tense exercises</li>
                        <li>• Vocabulary in context</li>
                        <li>• Listening practice</li>
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
                      <CardDescription>Complete A2 level evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Spoken interaction</li>
                        <li>• Personal writing</li>
                        <li>• Comprehensive exam</li>
                        <li>• Level certificate</li>
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
            <Link href="/level/a1">
              ← Back to A1
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/level/b1">
              Continue to B1 →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}