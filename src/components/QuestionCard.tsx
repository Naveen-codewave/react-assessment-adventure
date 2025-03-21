
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/lib/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onNext,
  className
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSelectAnswer = (value: string) => {
    if (!isSubmitted) {
      setSelectedAnswer(value);
    }
  };
  
  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      onAnswer(selectedAnswer);
    }
  };
  
  const handleNext = () => {
    setSelectedAnswer('');
    setIsSubmitted(false);
    onNext();
  };
  
  return (
    <Card className={cn(
      "w-full max-w-2xl transition-all duration-300",
      "glassmorphism card-shadow animate-scale-in",
      className
    )}>
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {question.level}
          </span>
          <span className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            {question.category}
          </span>
        </div>
        <CardTitle className="text-xl sm:text-2xl">{question.text}</CardTitle>
        <CardDescription className="text-sm sm:text-base mt-2">
          {question.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedAnswer} 
          onValueChange={handleSelectAnswer}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div 
              key={index}
              className={cn(
                "flex items-center space-x-3 rounded-lg border p-4 transition-all",
                selectedAnswer === option && !isSubmitted && "border-primary",
                isSubmitted && selectedAnswer === option && "bg-primary/5 border-primary",
                "hover:border-primary/50 cursor-pointer"
              )}
              onClick={() => handleSelectAnswer(option)}
            >
              <RadioGroupItem 
                value={option} 
                id={`option-${index}`} 
                disabled={isSubmitted}
                className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
              />
              <Label 
                htmlFor={`option-${index}`}
                className={cn(
                  "text-base font-normal cursor-pointer w-full",
                  isSubmitted && selectedAnswer === option && "font-medium"
                )}
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer}
            className="px-8"
          >
            Submit
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="px-8"
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
