
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import { getRandomQuestions, Question } from '@/lib/questions';

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading questions
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        // Get 5 random questions for this assessment
        const loadedQuestions = getRandomQuestions(5);
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error('Failed to load questions:', error);
        toast.error('Failed to load questions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, []);
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Navigate to results when all questions are answered
      navigate('/results', { 
        state: { 
          totalQuestions: questions.length,
          answeredQuestions: Object.keys(answers).length
        } 
      });
    }
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" aria-hidden="true" />
      
      <div className="flex-1 container max-w-screen-xl mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <main className="flex flex-col items-center justify-center py-8 md:py-12">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse space-y-4">
                <div className="h-12 w-64 bg-secondary rounded-lg"></div>
                <div className="h-8 w-40 bg-secondary rounded-lg mx-auto"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-3xl mb-8">
                <ProgressBar 
                  current={currentQuestionIndex + 1} 
                  total={questions.length} 
                  className="animate-fade-in"
                />
              </div>
              
              {currentQuestion && (
                <QuestionCard 
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  key={currentQuestion.id}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Questions;
