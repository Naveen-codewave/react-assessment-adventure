
export type QuestionLevel = 'Beginner' | 'Intermediate' | 'Expert';
export type QuestionCategory = 
  'JavaScript & React Fundamentals' | 
  'Architecture & Component Design' | 
  'TypeScript & Static Typing' | 
  'Testing & Quality Assurance' | 
  'Performance & Optimization' | 
  'Leadership & Entrepreneurial Mindset' | 
  'Self-Management & Execution';

export interface Question {
  id: number;
  category: QuestionCategory;
  level: QuestionLevel;
  text: string;
  description: string;
  lookFor: string;
  redFlags: string;
  greenFlags: string;
}

export const questions: Question[] = [
  // JavaScript & React Fundamentals - Beginner
  {
    id: 1,
    category: 'JavaScript & React Fundamentals',
    level: 'Beginner',
    text: 'What is the difference between props and state in React?',
    description: 'Look for understanding of data flow and component management.',
    lookFor: 'Understanding that props are passed from parent components and are immutable, while state is managed within a component and can change.',
    redFlags: 'Confusion about mutability of props or misunderstanding component re-rendering.',
    greenFlags: 'Mentions one-way data flow, component lifecycle impacts, and when to use each.'
  },
  {
    id: 2,
    category: 'JavaScript & React Fundamentals',
    level: 'Beginner',
    text: 'What are React hooks and why were they introduced?',
    description: 'Assess knowledge of modern React patterns.',
    lookFor: 'Basic understanding of useState and useEffect, and knowledge that hooks allow function components to use state and lifecycle features.',
    redFlags: 'Unable to name basic hooks or explain their purpose.',
    greenFlags: 'Mentions rules of hooks, custom hooks concept, or migration from class components.'
  },
  // JavaScript & React Fundamentals - Intermediate
  {
    id: 3,
    category: 'JavaScript & React Fundamentals',
    level: 'Intermediate',
    text: 'Explain the useEffect hook and its dependency array.',
    description: 'Check understanding of component lifecycle and optimization.',
    lookFor: 'Understanding of component lifecycle, cleanup function, and how dependencies control when effects run.',
    redFlags: 'Not mentioning cleanup or incorrectly explaining dependencies.',
    greenFlags: 'Detailed explanation of common pitfalls like infinite loops, stale closures, and optimization patterns.'
  },
  {
    id: 4,
    category: 'JavaScript & React Fundamentals',
    level: 'Intermediate',
    text: 'How does React handle re-rendering, and what techniques can you use to optimize it?',
    description: 'Assess knowledge of React performance optimization.',
    lookFor: 'Knowledge of virtual DOM, React\'s reconciliation process, and basic optimization techniques.',
    redFlags: 'No mention of memo, useMemo, or useCallback.',
    greenFlags: 'Deep understanding of React\'s diffing algorithm, render batching, and when to apply different optimization techniques.'
  },
  // JavaScript & React Fundamentals - Expert
  {
    id: 5,
    category: 'JavaScript & React Fundamentals',
    level: 'Expert',
    text: 'Explain React Suspense and concurrent rendering features.',
    description: 'Evaluate advanced React knowledge and future-facing concepts.',
    lookFor: 'Understanding of code splitting, data fetching with Suspense, and concurrent mode benefits.',
    redFlags: 'Confusion between Suspense for code splitting vs. data fetching, or general unfamiliarity with the concept.',
    greenFlags: 'Knowledge of transition API, upcoming React features, and real-world implementation considerations.'
  },
  // Architecture & Component Design - Beginner
  {
    id: 6,
    category: 'Architecture & Component Design',
    level: 'Beginner',
    text: 'What makes a component reusable, and how do you design for reusability?',
    description: 'Assess component design principles understanding.',
    lookFor: 'Understanding of props, component composition, and separation of concerns.',
    redFlags: 'Not considering component API design or prop structure.',
    greenFlags: 'Mentions children prop, render props pattern, or component composition techniques.'
  },
  // TypeScript & Static Typing - Beginner
  {
    id: 7,
    category: 'TypeScript & Static Typing',
    level: 'Beginner',
    text: 'What are the benefits of using TypeScript with React?',
    description: 'Check understanding of TypeScript advantages.',
    lookFor: 'Basic understanding of type safety, developer experience, and error prevention.',
    redFlags: 'Inability to explain concrete benefits beyond "it\'s better".',
    greenFlags: 'Mentions IDE integration, refactoring benefits, or team collaboration advantages.'
  },
  // Testing & Quality Assurance - Beginner
  {
    id: 8,
    category: 'Testing & Quality Assurance',
    level: 'Beginner',
    text: 'What testing approaches do you use for React components?',
    description: 'Evaluate testing knowledge and experience.',
    lookFor: 'Knowledge of unit testing basics and testing frameworks like Jest and React Testing Library.',
    redFlags: 'Unfamiliarity with basic testing concepts or tools.',
    greenFlags: 'Understanding of testing philosophy (testing behavior vs. implementation).'
  },
  // Performance & Optimization - Intermediate
  {
    id: 9,
    category: 'Performance & Optimization',
    level: 'Intermediate',
    text: 'Explain code splitting in React and when you would implement it.',
    description: 'Check understanding of bundle optimization techniques.',
    lookFor: 'Understanding of dynamic imports, React.lazy, Suspense, and bundle analysis.',
    redFlags: 'Vague knowledge without implementation details.',
    greenFlags: 'Discussion of route-based vs. component-based splitting, preloading strategies, and performance metrics.'
  },
  // Leadership & Entrepreneurial Mindset - Expert
  {
    id: 10,
    category: 'Leadership & Entrepreneurial Mindset',
    level: 'Expert',
    text: 'How do you approach building new features from ideation to deployment in a way that balances technical excellence with business needs?',
    description: 'Assess business acumen and technical leadership.',
    lookFor: 'Business acumen, stakeholder collaboration, and pragmatic decision-making.',
    redFlags: 'Over-engineering without business context or cutting corners without considering technical debt.',
    greenFlags: 'Evidence of product thinking, business value assessment, and balanced technical decisions.'
  }
];

export type SatisfactionRating = 1 | 2 | 3 | 4 | 5;

export interface QuestionAnswer {
  questionId: number;
  rating?: SatisfactionRating;
  notes?: string;
}

export const getQuestionsGroupedByCategory = () => {
  const groupedQuestions: Record<QuestionCategory, Question[]> = {} as Record<QuestionCategory, Question[]>;
  
  questions.forEach(question => {
    if (!groupedQuestions[question.category]) {
      groupedQuestions[question.category] = [];
    }
    groupedQuestions[question.category].push(question);
  });
  
  return groupedQuestions;
};

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(q => q.id === id);
};

export const getLevelColor = (level: QuestionLevel): string => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-700';
    case 'Intermediate':
      return 'bg-blue-500/20 text-blue-700';
    case 'Expert':
      return 'bg-purple-500/20 text-purple-700';
    default:
      return 'bg-gray-500/20 text-gray-700';
  }
};

export const getRatingDescription = (rating: SatisfactionRating): string => {
  switch (rating) {
    case 1:
      return 'Unsatisfactory';
    case 2:
      return 'Needs Improvement';
    case 3:
      return 'Satisfactory';
    case 4:
      return 'Good';
    case 5:
      return 'Excellent';
    default:
      return '';
  }
};

