import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, CheckCircle, FileText, Headphones, MessageSquare, BookOpen, Award, Target } from 'lucide-react';

export default function AssessmentPage() {
  const assessmentTypes = [
    {
      type: 'Quick Assessment',
      duration: '15 minutes',
      description: 'Get a rough estimate of your current level',
      icon: <Clock className="w-8 h-8" />,
      features: ['Basic grammar questions', 'Vocabulary recognition', 'Reading comprehension', 'Immediate results']
    },
    {
      type: 'Comprehensive Test',
      duration: '90 minutes',
      description: 'Complete evaluation of all four skills',
      icon: <FileText className="w-8 h-8" />,
      features: ['Grammar & vocabulary', 'Reading comprehension', 'Listening exercises', 'Writing tasks']
    },
    {
      type: 'Skills-Based Assessment',
      duration: '45 minutes',
      description: 'Focus on specific language skills',
      icon: <Target className="w-8 h-8" />,
      features: ['Choose specific skills', 'Detailed feedback', 'Skill-level recommendations', 'Learning path suggestions']
    }
  ];

  const skillAreas = [
    {
      skill: 'Grammar & Vocabulary',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Test your knowledge of English grammar rules and vocabulary range',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 25
    },
    {
      skill: 'Reading Comprehension',
      icon: <FileText className="w-6 h-6" />,
      description: 'Evaluate your ability to understand written English texts',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 20
    },
    {
      skill: 'Listening Comprehension',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Assess your understanding of spoken English in various contexts',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 20
    },
    {
      skill: 'Speaking Assessment',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Evaluate your ability to express yourself clearly in English',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      questions: 10
    }
  ];

  const levelDescriptions = [
    { level: 'A1', name: 'Beginner', color: 'bg-green-500', description: 'Can understand and use familiar everyday expressions' },
    { level: 'A2', name: 'Elementary', color: 'bg-green-600', description: 'Can communicate in simple and routine tasks' },
    { level: 'B1', name: 'Intermediate', color: 'bg-blue-500', description: 'Can deal with most situations while travelling' },
    { level: 'B2', name: 'Upper Intermediate', color: 'bg-blue-600', description: 'Can understand complex texts and interact fluently' },
    { level: 'C1', name: 'Advanced', color: 'bg-purple-500', description: 'Can use language flexibly and effectively' },
    { level: 'C2', name: 'Proficiency', color: 'bg-purple-600', description: 'Can understand virtually everything with ease' }
  ];

  const preparationTips = [
    'Ensure you have a quiet environment for the assessment',
    'Use headphones for the listening section',
    'Take your time to read questions carefully',
    'Answer honestly to get the most accurate results',
    'Have paper and pen ready for note-taking',
    'Complete the assessment in one sitting for best results'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
            CEFR Assessment
          </Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">Find Your English Level</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Take our comprehensive CEFR-aligned assessment to discover your current English proficiency level 
            and get personalized learning recommendations.
          </p>
        </div>

        {/* Assessment Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {assessmentTypes.map((assessment, index) => (
            <Card key={index} className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 text-primary">
                  {assessment.icon}
                </div>
                <CardTitle className="text-2xl mb-2">{assessment.type}</CardTitle>
                <Badge variant="outline" className="mx-auto">{assessment.duration}</Badge>
                <CardDescription className="mt-3">{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {assessment.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  Start {assessment.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Tests</TabsTrigger>
            <TabsTrigger value="levels">CEFR Levels</TabsTrigger>
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>How the Assessment Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold">Choose Assessment Type</h4>
                      <p className="text-sm text-foreground/70">Select quick, comprehensive, or skills-based assessment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold">Complete Tasks</h4>
                      <p className="text-sm text-foreground/70">Answer questions covering grammar, vocabulary, and skills</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold">Get Results</h4>
                      <p className="text-sm text-foreground/70">Receive your CEFR level with detailed feedback</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold">Start Learning</h4>
                      <p className="text-sm text-foreground/70">Begin your personalized learning journey</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>CEFR-aligned questions and scoring</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Adaptive difficulty based on responses</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Detailed skill breakdown and feedback</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Personalized learning recommendations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Progress tracking and certificates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Retake assessments to track improvement</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tests Tab */}
          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-6">
              {skillAreas.map((skill, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {skill.icon}
                      {skill.skill}
                    </CardTitle>
                    <CardDescription>{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Questions: {skill.questions}</span>
                        <span>Levels: {skill.levels.join(', ')}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.levels.map((level) => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {level}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full" variant="outline">
                        Test {skill.skill}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* CEFR Levels Tab */}
          <TabsContent value="levels">
            <Card>
              <CardHeader>
                <CardTitle>CEFR Proficiency Levels</CardTitle>
                <CardDescription>
                  Understanding what each level represents in terms of practical language ability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {levelDescriptions.map((level, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <Badge className={`${level.color} text-white font-bold text-lg px-3 py-2`}>
                        {level.level}
                      </Badge>
                      <div>
                        <h4 className="font-semibold text-lg">{level.name}</h4>
                        <p className="text-sm text-foreground/70 mt-1">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparation Tab */}
          <TabsContent value="preparation">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Before You Start</CardTitle>
                  <CardDescription>Preparation tips for the best assessment experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {preparationTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Requirements</CardTitle>
                  <CardDescription>Make sure your device is ready</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Stable internet connection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Modern web browser (Chrome, Firefox, Safari)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Working speakers or headphones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Microphone (for speaking assessment)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Full screen mode recommended</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center p-12">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Ready to Discover Your Level?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Take the assessment now and start your personalized English learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-headline font-semibold text-lg">
                Start Quick Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="font-headline font-semibold text-lg">
                View Sample Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}