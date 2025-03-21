
export interface Question {
  id: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  text: string;
  description: string;
  options: string[];
  correctAnswer?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    category: 'React Fundamentals',
    level: 'Beginner',
    text: 'What is the difference between props and state in React?',
    description: 'Select the most accurate description of props vs state in React components.',
    options: [
      'Props are internal and mutable, while state is passed from parent components and immutable.',
      'Props are passed from parent components and immutable, while state is internal and mutable.',
      'Props and state are both mutable and can be changed directly.',
      'Props and state are both immutable and cannot be changed after initialization.'
    ]
  },
  {
    id: 2,
    category: 'React Fundamentals',
    level: 'Beginner',
    text: 'What are React hooks and why were they introduced?',
    description: 'Select the most accurate description of React hooks and their purpose.',
    options: [
      'Hooks are a way to add state to function components, introduced to simplify code organization.',
      'Hooks are classes that extend React.Component, introduced to replace functional components.',
      'Hooks are special DOM events, introduced to improve React performance.',
      'Hooks are debugging tools, introduced to catch common React bugs.'
    ]
  },
  {
    id: 3,
    category: 'React Fundamentals',
    level: 'Intermediate',
    text: 'Explain the useEffect hook and its dependency array.',
    description: 'Select the most accurate description of how the dependency array impacts useEffect behavior.',
    options: [
      'An empty dependency array means the effect runs after every render.',
      'A dependency array with values means the effect runs only when those values change.',
      'No dependency array means the effect runs only once at component mount.',
      'The dependency array is optional and has no impact on when the effect runs.'
    ]
  },
  {
    id: 4,
    category: 'React Fundamentals',
    level: 'Intermediate',
    text: 'How does React handle re-rendering?',
    description: 'Select the most accurate description of React\'s re-rendering process.',
    options: [
      'React re-renders all components whenever any state changes anywhere in the application.',
      'React uses the Virtual DOM to compare changes and only updates the real DOM when necessary.',
      'React only re-renders components when props change, not when state changes.',
      'React requires manual control of rendering through shouldComponentUpdate.'
    ]
  },
  {
    id: 5,
    category: 'Architecture',
    level: 'Beginner',
    text: 'What makes a component reusable?',
    description: 'Select the most important characteristic of a reusable React component.',
    options: [
      'Using inline styles for all elements',
      'Hardcoding all text and values',
      'Using specific class names tied to a particular page',
      'Being configurable through props with sensible defaults'
    ]
  },
  {
    id: 6,
    category: 'Architecture',
    level: 'Intermediate',
    text: 'How do you structure a React application?',
    description: 'Select the approach that best represents modern React application structure.',
    options: [
      'Placing all components in a single file',
      'Organizing by technical concerns (components, hooks, utils)',
      'Organizing by features or business domains',
      'Random organization without any specific pattern'
    ]
  },
  {
    id: 7,
    category: 'TypeScript',
    level: 'Beginner',
    text: 'What are the benefits of using TypeScript with React?',
    description: 'Select the primary benefit of using TypeScript in React applications.',
    options: [
      'It makes the code run faster',
      'It provides static type checking and better IDE support',
      'It eliminates the need for unit testing',
      'It automatically fixes bugs in your code'
    ]
  },
  {
    id: 8,
    category: 'Testing',
    level: 'Beginner',
    text: 'What testing approaches do you use for React components?',
    description: 'Select the best approach for testing React components.',
    options: [
      'Manual testing only',
      'Testing implementation details with enzyme',
      'Testing component behavior from a user perspective',
      'No testing is necessary for React components'
    ]
  },
  {
    id: 9,
    category: 'Performance',
    level: 'Intermediate',
    text: 'Explain code splitting in React.',
    description: 'Select the most accurate description of code splitting in React.',
    options: [
      'Breaking large components into smaller ones',
      'Separating CSS from JavaScript',
      'Dividing your app into multiple bundle files to load on demand',
      'Using multiple React instances in one application'
    ]
  },
  {
    id: 10,
    category: 'Leadership',
    level: 'Expert',
    text: 'How do you approach mentoring junior React developers?',
    description: 'Select the most effective approach to mentoring junior React developers.',
    options: [
      'Assigning them only easy tasks',
      'Providing detailed solutions without explaining concepts',
      'Regularly reviewing code and providing constructive feedback',
      'Letting them figure everything out independently'
    ]
  }
];

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
