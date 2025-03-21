
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SatisfactionRating, Question, getQuestionById, QuestionCategory, getRatingDescription } from '@/lib/questions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, RefreshCw } from 'lucide-react';

interface LocationState {
  answers: Record<number, { rating: number; notes: string }>;
  assessedQuestions: number;
}

interface CategorySummary {
  category: QuestionCategory;
  questions: Array<{
    id: number;
    text: string;
    level: string;
    rating?: number;
    notes?: string;
  }>;
  averageRating: number;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [categoryReports, setCategoryReports] = useState<CategorySummary[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  
  useEffect(() => {
    if (state && state.answers) {
      // Group questions by category and calculate averages
      const categoryMap = new Map<QuestionCategory, CategorySummary>();
      
      Object.entries(state.answers).forEach(([questionId, answer]) => {
        const question = getQuestionById(parseInt(questionId));
        if (question) {
          if (!categoryMap.has(question.category)) {
            categoryMap.set(question.category, {
              category: question.category,
              questions: [],
              averageRating: 0
            });
          }
          
          const summary = categoryMap.get(question.category)!;
          summary.questions.push({
            id: question.id,
            text: question.text,
            level: question.level,
            rating: answer.rating,
            notes: answer.notes
          });
        }
      });
      
      // Calculate averages
      const reports: CategorySummary[] = [];
      let totalRating = 0;
      let totalQuestions = 0;
      
      categoryMap.forEach(summary => {
        const ratedQuestions = summary.questions.filter(q => q.rating);
        if (ratedQuestions.length > 0) {
          const sum = ratedQuestions.reduce((acc, q) => acc + (q.rating || 0), 0);
          summary.averageRating = parseFloat((sum / ratedQuestions.length).toFixed(1));
          
          totalRating += sum;
          totalQuestions += ratedQuestions.length;
        }
        reports.push(summary);
      });
      
      setCategoryReports(reports);
      setOverallRating(totalQuestions > 0 ? parseFloat((totalRating / totalQuestions).toFixed(1)) : 0);
    }
  }, [state]);
  
  // Redirect if navigated directly without completing questions
  if (!state || !state.answers) {
    return <Navigate to="/" replace />;
  }
  
  const getRatingColor = (rating: number): string => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    if (rating >= 1.5) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const handleNewAssessment = () => {
    navigate('/questions');
  };
  
  const handleDownloadReport = () => {
    // Create report content
    let reportContent = `# React Developer Assessment Report\n\n`;
    reportContent += `Overall Rating: ${overallRating} / 5 (${overallRating >= 3.5 ? 'Recommended' : 'Not Recommended'})\n\n`;
    
    categoryReports.forEach(category => {
      reportContent += `## ${category.category}\n`;
      reportContent += `Average Rating: ${category.averageRating} / 5\n\n`;
      
      category.questions.forEach(question => {
        reportContent += `### ${question.text}\n`;
        reportContent += `Level: ${question.level}\n`;
        reportContent += `Rating: ${question.rating} - ${getRatingDescription(question.rating as SatisfactionRating)}\n`;
        if (question.notes) {
          reportContent += `Notes: ${question.notes}\n`;
        }
        reportContent += `\n`;
      });
      
      reportContent += `\n`;
    });
    
    // Create a blob and download
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'react-developer-assessment-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" aria-hidden="true" />
      
      <div className="flex-1 container max-w-screen-xl mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <main className="flex flex-col items-center justify-center py-12 md:py-20">
          <Card className="w-full max-w-4xl glassmorphism card-shadow animate-blur-in">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-center">Assessment Report</CardTitle>
              <CardDescription className="text-center text-base">
                Candidate evaluation summary
              </CardDescription>
              
              <div className="mt-6 flex justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2 flex items-center justify-center">
                    <span className={getRatingColor(overallRating)}>{overallRating}</span>
                    <span className="text-2xl text-muted-foreground ml-1">/5</span>
                  </div>
                  <div className={`text-sm font-medium ${getRatingColor(overallRating)}`}>
                    {overallRating >= 4.5 ? 'Excellent' : 
                     overallRating >= 3.5 ? 'Good' : 
                     overallRating >= 2.5 ? 'Satisfactory' : 
                     overallRating >= 1.5 ? 'Needs Improvement' : 'Unsatisfactory'}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Overall Rating
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Report</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="py-4 space-y-4">
                  <div className="grid gap-4">
                    {categoryReports.map((category, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-lg border flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-medium">{category.category}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.questions.length} questions assessed
                          </p>
                        </div>
                        <div className={`text-xl font-semibold ${getRatingColor(category.averageRating)}`}>
                          {category.averageRating}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Assessment Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      {overallRating >= 4.0 ? 
                        'The candidate demonstrated excellent understanding across most areas. Highly recommended.' :
                       overallRating >= 3.0 ?
                        'The candidate showed good knowledge with some areas for improvement. Recommended.' :
                       overallRating >= 2.0 ?
                        'The candidate has basic understanding but significant gaps in knowledge. May need additional training.' :
                        'The candidate did not demonstrate sufficient knowledge in key areas. Not recommended at this time.'}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="py-4 space-y-6">
                  {categoryReports.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">{category.category}</h3>
                      <div className="space-y-4">
                        {category.questions.map((question) => (
                          <div key={question.id} className="p-4 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{question.text}</h4>
                              <span className={`font-semibold ${question.rating ? getRatingColor(question.rating) : 'text-gray-400'}`}>
                                {question.rating ? `${question.rating}/5` : 'Not Rated'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                                {question.level}
                              </span>
                              {question.rating && (
                                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary-foreground">
                                  {getRatingDescription(question.rating as SatisfactionRating)}
                                </span>
                              )}
                            </div>
                            {question.notes && (
                              <div className="mt-2">
                                <p className="text-sm text-muted-foreground">{question.notes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={handleNewAssessment}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Assessment
              </Button>
              <Button onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Results;
