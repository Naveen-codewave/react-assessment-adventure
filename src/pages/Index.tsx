
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { ArrowRight, Lightbulb, Users, Code } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" aria-hidden="true" />
      
      <div className="flex-1 container max-w-screen-xl mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <main className="flex flex-col items-center justify-center py-12 md:py-20">
          <div className="w-full max-w-4xl space-y-16 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="inline-flex mb-4 items-center justify-center px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-slide-up [animation-delay:0.2s]">
                Interviewer Tool
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-slide-up [animation-delay:0.3s]">
                React Developer Assessment
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up [animation-delay:0.4s]">
                A comprehensive template to evaluate React developer skills across different experience levels.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up [animation-delay:0.5s]">
                <Link to="/questions">
                  <Button size="lg" className="h-12 px-8 rounded-full">
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glassmorphism card-shadow animate-slide-up [animation-delay:0.6s]">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Technical Depth</CardTitle>
                  <CardDescription>
                    Assess proficiency in React fundamentals and advanced concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      JavaScript & React Core Concepts
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Component Architecture
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      State Management Approaches
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism card-shadow animate-slide-up [animation-delay:0.7s]">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Problem Solving</CardTitle>
                  <CardDescription>
                    Evaluate critical thinking and implementation approaches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Code Organization
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Performance Optimization
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Troubleshooting Skills
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism card-shadow animate-slide-up [animation-delay:0.8s]">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Developer Experience</CardTitle>
                  <CardDescription>
                    Gauge experience level from junior to senior positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Beginner Level Questions
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Intermediate Challenges
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      Expert Scenarios
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
