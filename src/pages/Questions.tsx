
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import QuestionView from '@/components/QuestionView';
import ProgressBar from '@/components/ProgressBar';
import CategorySelector from '@/components/CategorySelector';
import { Question, QuestionCategory, getQuestionsGroupedByCategory } from '@/lib/questions';

const Questions = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [categoryQuestions, setCategoryQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { rating: number; notes: string }>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const groupedQuestions = getQuestionsGroupedByCategory();
        // If a category is selected, set the questions for that category
        if (selectedCategory && groupedQuestions[selectedCategory]) {
          setCategoryQuestions(groupedQuestions[selectedCategory]);
          setCurrentQuestionIndex(0);
        }
      } catch (error) {
        console.error('Failed to load questions:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load questions. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [selectedCategory]);
  
  const handleSelectCategory = (category: QuestionCategory) => {
    setSelectedCategory(category);
  };
  
  const handleRating = (questionId: number, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        rating
      }
    }));
  };
  
  const handleNotes = (questionId: number, notes: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        notes
      }
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Check if there are more categories to assess
      navigate('/results', { 
        state: { 
          answers,
          assessedQuestions: Object.keys(answers).length
        } 
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const currentQuestion = categoryQuestions[currentQuestionIndex];
  
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
          ) : !selectedCategory ? (
            <CategorySelector onSelectCategory={handleSelectCategory} />
          ) : (
            <>
              <div className="w-full max-w-4xl mb-8">
                <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
                <ProgressBar 
                  current={currentQuestionIndex + 1} 
                  total={categoryQuestions.length} 
                  className="animate-fade-in"
                />
              </div>
              
              {currentQuestion && (
                <QuestionView 
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onRate={(rating) => handleRating(currentQuestion.id, rating)}
                  onAddNotes={(notes) => handleNotes(currentQuestion.id, notes)}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isFirst={currentQuestionIndex === 0}
                  isLast={currentQuestionIndex === categoryQuestions.length - 1}
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
