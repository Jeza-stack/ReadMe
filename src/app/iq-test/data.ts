export type QuestionType = 'matrix' | 'sequence' | 'logic';

export interface IQQuestion {
  id: number;
  type: QuestionType;
  category: string;
  prompt: string;
  visuals?: string[]; // Used for matrix grid items (strings or emoji representing shapes)
  sequence?: string[]; // Used for horizontal sequences
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    content: string; // The content of the option
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const IQ_QUESTIONS: IQQuestion[] = [
  {
    id: 1,
    type: 'sequence',
    category: 'Numerical Reasoning',
    prompt: 'Identify the next number in the sequence: 2, 4, 8, 16, 32, __',
    sequence: ['2', '4', '8', '16', '32', '?'],
    options: [
      { id: 'A', content: '48', isCorrect: false },
      { id: 'B', content: '64', isCorrect: true },
      { id: 'C', content: '128', isCorrect: false },
      { id: 'D', content: '60', isCorrect: false },
    ],
    explanation: 'The sequence doubles with each step (2x2=4, 4x2=8, ...). 32 x 2 = 64.'
  },
  {
    id: 2,
    type: 'matrix',
    category: 'Pattern Recognition',
    prompt: 'Identify the missing element in the 3x3 matrix:',
    visuals: ['△', '△△', '△△△', '◯', '◯◯', '◯◯◯', '□', '□□'],
    options: [
      { id: 'A', content: '□□□', isCorrect: true },
      { id: 'B', content: '□◯', isCorrect: false },
      { id: 'C', content: '□', isCorrect: false },
      { id: 'D', content: '△□', isCorrect: false },
    ],
    explanation: 'Each row progresses by adding one more of the same shape. The third row consists of squares (□), so following the pattern 1, 2, 3, it should be 3 squares.'
  },
  {
    id: 3,
    type: 'logic',
    category: 'Verbal Logic',
    prompt: 'Odometer is to mileage as compass is to...',
    options: [
      { id: 'A', content: 'Speed', isCorrect: false },
      { id: 'B', content: 'Hiking', isCorrect: false },
      { id: 'C', content: 'Needle', isCorrect: false },
      { id: 'D', content: 'Direction', isCorrect: true },
    ],
    explanation: 'An odometer measures mileage. A compass determines direction.'
  },
  {
    id: 4,
    type: 'sequence',
    category: 'Numerical Reasoning',
    prompt: 'Find the missing number: 3, 6, 11, 18, 27, __',
    sequence: ['3', '6', '11', '18', '27', '?'],
    options: [
      { id: 'A', content: '34', isCorrect: false },
      { id: 'B', content: '36', isCorrect: false },
      { id: 'C', content: '38', isCorrect: true },
      { id: 'D', content: '42', isCorrect: false },
    ],
    explanation: 'The difference between terms increases by consecutive odd numbers: +3, +5, +7, +9. The next difference is +11, making 27 + 11 = 38.'
  },
  {
    id: 5,
    type: 'logic',
    category: 'Logical Deduction',
    prompt: 'If all Zips are Zaps, and some Zaps are Zoons, which of the following must be true?',
    options: [
      { id: 'A', content: 'All Zips are Zoons', isCorrect: false },
      { id: 'B', content: 'Some Zips are Zoons', isCorrect: false },
      { id: 'C', content: 'Some Zoons are Zaps', isCorrect: true },
      { id: 'D', content: 'No Zips are Zoons', isCorrect: false },
    ],
    explanation: 'If "some Zaps are Zoons" is true, the inverse is automatically true: "Some Zoons are Zaps". We cannot definitively prove the relationship between Zips and Zoons based on the premises.'
  },
  {
    id: 6,
    type: 'matrix',
    category: 'Spatial Visualization',
    prompt: 'Determine the missing rotation in the grid:',
    visuals: ['↑', '→', '↓', '←', '↑', '→', '↓', '←'],
    options: [
      { id: 'A', content: '↑', isCorrect: true },
      { id: 'B', content: '→', isCorrect: false },
      { id: 'C', content: '↓', isCorrect: false },
      { id: 'D', content: '←', isCorrect: false },
    ],
    explanation: 'The arrows rotate 90 degrees clockwise in each step. After pointing left (←), it rotates back to pointing up (↑).'
  },
  {
    id: 7,
    type: 'sequence',
    category: 'Alphabetic Reasoning',
    prompt: 'What letter comes next in the sequence? A, C, F, J, O, __',
    sequence: ['A', 'C', 'F', 'J', 'O', '?'],
    options: [
      { id: 'A', content: 'S', isCorrect: false },
      { id: 'B', content: 'U', isCorrect: true },
      { id: 'C', content: 'V', isCorrect: false },
      { id: 'D', content: 'T', isCorrect: false },
    ],
    explanation: 'The gap between letters increases sequentially: +2 (A->C), +3 (C->F), +4 (F->J), +5 (J->O). Therefore, the next gap is +6, landing on U (15 + 6 = 21).'
  },
  {
    id: 8,
    type: 'logic',
    category: 'Analytical Thinking',
    prompt: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    options: [
      { id: 'A', content: '$0.10', isCorrect: false },
      { id: 'B', content: '$0.05', isCorrect: true },
      { id: 'C', content: '$0.15', isCorrect: false },
      { id: 'D', content: '$0.01', isCorrect: false },
    ],
    explanation: 'If the ball costs $0.05, the bat costs $1.05 ($1.00 more). The sum is exactly $1.10. Answering $0.10 is the classic cognitive trap.'
  },
  {
    id: 9,
    type: 'sequence',
    category: 'Complex Number Sequences',
    prompt: 'Complete this alternating sequence: 10, 5, 20, 15, 60, __',
    sequence: ['10', '5', '20', '15', '60', '?'],
    options: [
      { id: 'A', content: '55', isCorrect: true },
      { id: 'B', content: '65', isCorrect: false },
      { id: 'C', content: '120', isCorrect: false },
      { id: 'D', content: '30', isCorrect: false },
    ],
    explanation: 'The pattern alternates operations: -5, x4, -5, x4. Thus, 15 x 4 = 60, followed by 60 - 5 = 55.'
  },
  {
    id: 10,
    type: 'matrix',
    category: 'Pattern Synthesis',
    prompt: 'If colors combine additively, what completes the matrix?',
    visuals: ['🔴', '🔵', '🟣', '🟡', '🔴', '🟠', '🔵', '🟡'],
    options: [
      { id: 'A', content: '🟤', isCorrect: false },
      { id: 'B', content: '🟢', isCorrect: true },
      { id: 'C', content: '🟣', isCorrect: false },
      { id: 'D', content: '⚫', isCorrect: false },
    ],
    explanation: 'The third column is the color blend of the first two. Red + Blue = Purple. Yellow + Red = Orange. Blue + Yellow = Green.'
  },
  {
    id: 11,
    type: 'logic',
    category: 'Verbal Relationship',
    prompt: 'Book is to Chapter as Building is to...',
    options: [
      { id: 'A', content: 'Roof', isCorrect: false },
      { id: 'B', content: 'Story', isCorrect: true },
      { id: 'C', content: 'Elevator', isCorrect: false },
      { id: 'D', content: 'Foundation', isCorrect: false },
    ],
    explanation: 'A chapter is a primary structural division of a book, just as a story (floor) is a primary structural vertical division of a building.'
  },
  {
    id: 12,
    type: 'sequence',
    category: 'Fibonacci Variant',
    prompt: 'Find the next number: 1, 1, 2, 4, 7, 13, 24, __',
    sequence: ['1', '1', '2', '4', '7', '13', '24', '?'],
    options: [
      { id: 'A', content: '44', isCorrect: true },
      { id: 'B', content: '37', isCorrect: false },
      { id: 'C', content: '41', isCorrect: false },
      { id: 'D', content: '48', isCorrect: false },
    ],
    explanation: 'This is a "Tribonacci" sequence where each number is the sum of the THREE preceding numbers. Summing 4 + 7 + 13 = 24. Next is 7 + 13 + 24 = 44.'
  },
  {
    id: 13,
    type: 'logic',
    category: 'Syllogistic Reasoning',
    prompt: 'No mammals breathe underwater completely naturally. All dolphins are mammals. Therefore...',
    options: [
      { id: 'A', content: 'Dolphins breathe underwater.', isCorrect: false },
      { id: 'B', content: 'Dolphins do not breathe underwater completely naturally.', isCorrect: true },
      { id: 'C', content: 'Some mammals are not dolphins.', isCorrect: false },
      { id: 'D', content: 'Dolphins are not mammals.', isCorrect: false },
    ],
    explanation: 'Based strictly on the premises provided, since no mammals breathe water natively, and dolphins are mammals, dolphins cannot breathe underwater natively.'
  },
  {
    id: 14,
    type: 'matrix',
    category: 'Advanced Spatial Logic',
    prompt: 'Identify the intersection rule for the matrix:',
    visuals: ['✖', '✚', '✱', '⟋', '⟍', '╳', '▲', '▼'],
    options: [
      { id: 'A', content: '◆', isCorrect: false },
      { id: 'B', content: '✚', isCorrect: false },
      { id: 'C', content: '✡', isCorrect: true },
      { id: 'D', content: '⭕', isCorrect: false },
    ],
    explanation: 'The third column visually combines the structures of the first two columns. Combining an upward triangle (▲) and downward triangle (▼) creates a hexagram (✡).'
  },
  {
    id: 15,
    type: 'sequence',
    category: 'Cryptic Series',
    prompt: 'What comes next? O, T, T, F, F, S, S, E, __',
    sequence: ['O', 'T', 'T', 'F', 'F', 'S', 'S', 'E', '?'],
    options: [
      { id: 'A', content: 'N', isCorrect: true },
      { id: 'B', content: 'E', isCorrect: false },
      { id: 'C', content: 'T', isCorrect: false },
      { id: 'D', content: 'M', isCorrect: false },
    ],
    explanation: 'These are the first letters of numbers: One, Two, Three, Four, Five, Six, Seven, Eight. The next number is Nine, so the letter is N.'
  }
];
