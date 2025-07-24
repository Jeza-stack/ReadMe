'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Maria Rodriguez',
    level: 'A1 → B2',
    country: 'Spain',
    image: '/api/placeholder/100/100',
    text: 'I started as a complete beginner and now I can confidently speak English at work. The step-by-step approach made all the difference!',
    rating: 5,
    achievement: 'Promoted to International Sales Manager'
  },
  {
    name: 'Chen Wei',
    level: 'B1 → C1',
    country: 'China',
    image: '/api/placeholder/100/100',
    text: 'The interactive lessons and real-world scenarios helped me pass my IELTS exam with a score of 8.5. Highly recommended!',
    rating: 5,
    achievement: 'Accepted to Oxford University'
  },
  {
    name: 'Ahmed Hassan',
    level: 'A2 → B2',
    country: 'Egypt',
    image: '/api/placeholder/100/100',
    text: 'The cultural context and practical exercises made learning English enjoyable. I can now communicate with confidence in any situation.',
    rating: 5,
    achievement: 'Started own international business'
  },
  {
    name: 'Anna Kowalski',
    level: 'B2 → C2',
    country: 'Poland',
    image: '/api/placeholder/100/100',
    text: 'Reaching C2 level seemed impossible, but this platform made it achievable. The advanced modules are incredibly comprehensive.',
    rating: 5,
    achievement: 'Became certified English teacher'
  }
];

export function TestimonialsSection() {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section id="testimonials" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of learners who have transformed their English skills and achieved their dreams
          </p>
        </div>

        <div 
          ref={elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/60" />
                  
                  {/* Testimonial Text */}
                  <p className="text-foreground/90 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.country} • {testimonial.level}
                      </div>
                      <div className="text-xs text-green-600 font-medium mt-1">
                        ✓ {testimonial.achievement}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">10,000+</div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}