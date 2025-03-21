
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import ResultsSummary from '@/components/ResultsSummary';

interface LocationState {
  totalQuestions: number;
  answeredQuestions: number;
}

const Results = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Redirect if navigated directly without completing questions
  if (!state || !state.totalQuestions) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" aria-hidden="true" />
      
      <div className="flex-1 container max-w-screen-xl mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <main className="flex flex-col items-center justify-center py-12 md:py-20">
          <ResultsSummary 
            totalQuestions={state.totalQuestions}
            answeredQuestions={state.answeredQuestions}
          />
        </main>
      </div>
    </div>
  );
};

export default Results;
