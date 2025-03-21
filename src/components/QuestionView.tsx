
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question, SatisfactionRating, getLevelColor, getRatingDescription } from '@/lib/questions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RatingSelector from './RatingSelector';

interface QuestionViewProps {
  question: Question;
  answer?: {
    rating?: number;
    notes?: string;
  };
  onRate: (rating: number) => void;
  onAddNotes: (notes: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  answer,
  onRate,
  onAddNotes,
  onNext,
  onPrevious,
  isFirst,
  isLast
}) => {
  const [activeTab, setActiveTab] = useState('question');
  const [notes, setNotes] = useState(answer?.notes || '');
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    onAddNotes(e.target.value);
  };
  
  return (
    <Card className={cn(
      "w-full max-w-4xl transition-all duration-300",
      "glassmorphism card-shadow animate-scale-in"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center justify-center h-6 px-3 rounded-full text-xs font-medium",
              getLevelColor(question.level)
            )}>
              {question.level}
            </span>
          </div>
          {answer?.rating && (
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Rating:</span>
              <span className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {answer.rating} - {getRatingDescription(answer.rating as SatisfactionRating)}
              </span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl sm:text-2xl">{question.text}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="question">Question</TabsTrigger>
            <TabsTrigger value="guidelines">Evaluation Guidelines</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="question" className="space-y-4 py-4">
            <div>
              <h3 className="font-medium mb-2">Description:</h3>
              <p className="text-muted-foreground">{question.description}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="guidelines" className="space-y-4 py-4">
            <div>
              <h3 className="font-medium mb-2">What to look for:</h3>
              <p className="text-muted-foreground">{question.lookFor}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <h4 className="font-medium text-red-700 mb-2">Red Flags:</h4>
                <p className="text-sm text-red-600">{question.redFlags}</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h4 className="font-medium text-green-700 mb-2">Green Flags:</h4>
                <p className="text-sm text-green-600">{question.greenFlags}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assessment" className="space-y-4 py-4">
            <div>
              <h3 className="font-medium mb-4">Rate the candidate's answer:</h3>
              <RatingSelector 
                value={answer?.rating as SatisfactionRating} 
                onChange={rating => onRate(rating)}
              />
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Interview Notes:</h3>
              <Textarea 
                placeholder="Add notes about the candidate's response here..."
                className="min-h-[150px]"
                value={notes}
                onChange={handleNotesChange}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
        >
          {isLast ? 'Complete Assessment' : 'Next Question'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionView;
