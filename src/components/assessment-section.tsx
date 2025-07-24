'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Target, BookOpen, Headphones, PenTool, MessageSquare } from 'lucide-react';

export function AssessmentSection() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const assessmentFeatures = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Accurate Placement',
      description: 'Get placed in the right level based on your current skills'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '15-20 Minutes',
      description: 'Quick assessment that respects your time'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Instant Results',
      description: 'Receive your level and personalized learning plan immediately'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Comprehensive',
      description: 'Tests all four language skills: reading, writing, listening, speaking'
    }
  ];

  const skillAreas = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      name: 'Reading',
      description: 'Text comprehension and vocabulary',
      duration: '5 min'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      name: 'Listening',
      description: 'Audio comprehension and pronunciation',
      duration: '5 min'
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      name: 'Writing',
      description: 'Grammar and sentence structure',
      duration: '5 min'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      name: 'Speaking',
      description: 'Fluency and communication skills',
      duration: '5 min'
    }
  ];

  return (
    <section id="assessment" className="py-20 bg-gradient-to-b from-background to-blue-50/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">
            Find Your <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Perfect Level</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take our comprehensive assessment to discover your current English level and get a personalized learning path
          </p>
        </div>

        {!isStarted ? (
          <div className="max-w-4xl mx-auto">
            {/* Assessment Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {assessmentFeatures.map((feature, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Assessment Card */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Free English Level Assessment</CardTitle>
                <CardDescription className="text-lg">
                  Discover your CEFR level and get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skill Areas */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">What we'll test:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillAreas.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="text-primary">
                          {skill.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{skill.name}</div>
                          <div className="text-xs text-muted-foreground">{skill.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {skill.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg px-8"
                    onClick={() => setIsStarted(true)}
                  >
                    Start Free Assessment
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    No registration required • Takes 15-20 minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Assessment in Progress
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Assessment in Progress</CardTitle>
                  <Badge variant="outline">{currentStep}/4</Badge>
                </div>
                <Progress value={(currentStep / 4) * 100} className="mt-2" />
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="text-primary mb-4">
                  {skillAreas[currentStep - 1]?.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {skillAreas[currentStep - 1]?.name} Assessment
                </h3>
                <p className="text-muted-foreground mb-6">
                  {skillAreas[currentStep - 1]?.description}
                </p>
                <Button 
                  onClick={() => {
                    if (currentStep < 4) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      // Complete assessment - this would normally redirect to results
                      alert('Assessment completed! Your level: B1 Intermediate');
                      setIsStarted(false);
                      setCurrentStep(1);
                    }
                  }}
                >
                  {currentStep < 4 ? 'Continue' : 'Complete Assessment'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Trusted by 10,000+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>CEFR-certified assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% free, no hidden costs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}