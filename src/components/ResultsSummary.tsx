
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResultsSummaryProps {
  totalQuestions: number;
  answeredQuestions: number;
  className?: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  totalQuestions,
  answeredQuestions,
  className
}) => {
  const navigate = useNavigate();
  const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  const handleRestart = () => {
    navigate('/questions');
  };
  
  return (
    <Card className={cn(
      "w-full max-w-2xl transition-all duration-300",
      "glassmorphism card-shadow animate-blur-in",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-center">Assessment Complete</CardTitle>
        <CardDescription className="text-center text-base">
          Thank you for completing the assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="h-36 w-36 relative flex items-center justify-center">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary stroke-current animate-[dash_1.5s_ease-in-out_forwards]"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
                style={{
                  strokeDasharray: 264,
                  strokeDashoffset: 264 - (264 * percentage) / 100,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
              {percentage}%
            </div>
          </div>
          <p className="mt-4 text-lg font-medium">
            {answeredQuestions} of {totalQuestions} questions answered
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Assessment Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Questions Attempted</span>
              <span className="font-semibold">{answeredQuestions}/{totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Completion Rate</span>
              <span className="font-semibold">{percentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleRestart} className="px-8 rounded-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start New Assessment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsSummary;
