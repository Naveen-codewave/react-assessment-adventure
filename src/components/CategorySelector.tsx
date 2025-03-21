
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionCategory } from '@/lib/questions';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  onSelectCategory: (category: QuestionCategory) => void;
}

const categories: QuestionCategory[] = [
  'JavaScript & React Fundamentals',
  'Architecture & Component Design',
  'TypeScript & Static Typing',
  'Testing & Quality Assurance',
  'Performance & Optimization',
  'Leadership & Entrepreneurial Mindset',
  'Self-Management & Execution'
];

const getCategoryIcon = (category: QuestionCategory): string => {
  switch (category) {
    case 'JavaScript & React Fundamentals':
      return '⚛️';
    case 'Architecture & Component Design':
      return '🏗️';
    case 'TypeScript & Static Typing':
      return '📝';
    case 'Testing & Quality Assurance':
      return '🧪';
    case 'Performance & Optimization':
      return '⚡';
    case 'Leadership & Entrepreneurial Mindset':
      return '👑';
    case 'Self-Management & Execution':
      return '⏱️';
    default:
      return '📋';
  }
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full max-w-4xl">
      <Card className="glassmorphism card-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl">React Developer Assessment</CardTitle>
          <CardDescription className="text-base">
            Select a category to begin the assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category}
              className={cn(
                "flex items-center p-4 rounded-lg border-2 border-border",
                "hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
              )}
              onClick={() => onSelectCategory(category)}
            >
              <div className="mr-4 text-2xl">{getCategoryIcon(category)}</div>
              <div>
                <h3 className="font-medium">{category}</h3>
                <p className="text-sm text-muted-foreground">Assess candidate skills</p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center text-center text-sm text-muted-foreground">
          Select a category based on the candidate's experience level and role requirements
        </CardFooter>
      </Card>
    </div>
  );
};

export default CategorySelector;
