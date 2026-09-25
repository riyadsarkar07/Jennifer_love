export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Set to 0–n once you know the real answer. Leave null until then. */
  correctIndex: number | null;
  note: string;
}

/**
 * Fill in correctIndex and personalized notes when you know the real answers.
 * Until then, any choice is treated as a sweet guess — nothing is marked wrong.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "who-said-ily",
    question: 'Who said "I love you" first?',
    options: ["Riyad", "Jennifer", "We said it together", "It is still our secret"],
    correctIndex: null,
    note: "Add the real answer here when you are ready.",
  },
  {
    id: "first-conversation",
    question: "What was our first conversation about?",
    options: ["Something small and sweet", "A late-night talk", "A shared laugh", "I will tell you in person"],
    correctIndex: null,
    note: "Placeholder until the real first-conversation details are added.",
  },
  {
    id: "when-we-met",
    question: "When did we first meet?",
    options: [
      "23 September 2026, 12:47 PM",
      "On a quiet evening",
      "I remember the feeling more than the clock",
      "The day everything changed",
    ],
    correctIndex: 0,
    note: "We first met on 23 September 2026 at 12:47 PM in Bangladesh time.",
  },
  {
    id: "favorite-memory",
    question: "What is our favorite memory together?",
    options: ["A message that made us smile", "A call that felt like home", "A photo we still love", "Every little moment"],
    correctIndex: null,
    note: "Add your favorite shared memory here.",
  },
  {
    id: "loves-most",
    question: "What is one thing Riyad loves most about Jennifer?",
    options: ["Her smile", "Her kind heart", "Her personality", "All of this, and more"],
    correctIndex: 3,
    note: "Your smile, your heart, your personality — you are special in every way.",
  },
];
