'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { cefrLevels } from '@/data/cefr-levels';

interface LevelCardProps {
  level: {
    level: string;
    name: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    grammar: number;
    vocabulary: number;
    activities: number;
    features: string[];
  };
}

function LevelCard({ level }: LevelCardProps) {
  const skillsByLevel = {
    'A1': [
      'Basic greetings and introductions',
      'Simple present tense',
      'Numbers, dates, and time',
      'Common everyday vocabulary'
    ],
    'A2': [
      'Past and future tenses',
      'Shopping and travel phrases',
      'Family and personal information',
      'Simple conversations'
    ],
    'B1': [
      'Complex sentence structures',
      'Express opinions and preferences',
      'Work and study vocabulary',
      'Handle most travel situations'
    ],
    'B2': [
      'Abstract topics discussion',
      'Professional communication',
      'Advanced grammar structures',
      'Detailed explanations'
    ],
    'C1': [
      'Fluent spontaneous speech',
      'Academic and professional writing',
      'Complex text comprehension',
      'Subtle language nuances'
    ],
    'C2': [
      'Native-like fluency',
      'Literary and technical texts',
      'Precise expression',
      'Cultural understanding'
    ]
  };

  const skills = skillsByLevel[level.level as keyof typeof skillsByLevel] || level.features;

  return (
    <Card className={`level-card group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${level.borderColor} border-2`}>
      <CardHeader className={`${level.bgColor} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <CardTitle className={`text-2xl font-bold ${level.textColor}`}>
            {level.level} - {level.name}
          </CardTitle>
          <Badge className={`bg-gradient-to-r ${level.color} text-white border-0`}>
            {level.level}
          </Badge>
        </div>
        <CardDescription className="text-sm opacity-80">
          {level.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{level.grammar}</div>
              <div className="text-xs text-muted-foreground">Grammar</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{level.vocabulary}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{level.activities}</div>
              <div className="text-xs text-muted-foreground">Activities</div>
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Key Skills:</h4>
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button 
              asChild 
              className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 transition-opacity`}
            >
              <Link href={`/level/${level.level.toLowerCase()}`}>
                Start {level.level} Level
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LevelsGrid() {
  return (
    <section id="levels" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master English step by step with our comprehensive CEFR-aligned curriculum. 
            From absolute beginner to native-like proficiency.
          </p>
        </div>

        <div className="levels-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cefrLevels.map((level) => (
            <LevelCard key={level.level} level={level} />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Not sure which level to start with?
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            Take Free Assessment
          </Button>
        </div>
      </div>
    </section>
  );
}