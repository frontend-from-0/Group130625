import { z } from 'zod';

export const SESSION_LENGTHS = [5, 10, 15] as const;
export type SessionLength = (typeof SESSION_LENGTHS)[number];

export const sessionLengthSchema = z
  .union([z.literal(5), z.literal(10), z.literal(15)])
  .default(10);

/** POST /api/quiz body: `{ topic, questionCount? }` */
export const quizRequestSchema = z.object({
  topic: z.string().trim().min(1, 'Topic is required.'),
  questionCount: sessionLengthSchema,
});

export type QuizRequest = z.infer<typeof quizRequestSchema>;

const quizOptionSchema = z.object({
  id: z.number().describe('Index from 0 to 3'),
  answer: z
    .string()
    .describe(
      'The answer text shown on the option (code, concept, API, command, or short phrase as appropriate).',
    ),
  explanation: z
    .string()
    .describe(
      'Detailed explanation of what this specific option means, and why it is right or wrong.',
    ),
});

export const flashcardSchema = z.object({
  concept: z
    .string()
    .describe(
      'Short label for the sub-skill tested (e.g. "cleanup timing", "dependency arrays").',
    ),
  question: z.string().describe('Scenario-based multiple-choice question.'),
  options: z.array(quizOptionSchema).length(4),
  correctOptionId: z.number().describe('Id (0–3) of the correct option.'),
});

/** Single object schema for OpenAI structured output (no discriminated union). */
export const quizResponseSchema = z.object({
  kind: z
    .enum(['clarify', 'session'])
    .describe(
      'Use "clarify" when the topic is too vague; use "session" when you can generate a study session.',
    ),
  message: z
    .string()
    .nullable()
    .describe('When kind is clarify: friendly message asking to refine the topic.'),
  suggestedTopics: z
    .array(z.string())
    .min(3)
    .max(5)
    .nullable()
    .describe('When kind is clarify: 3–5 specific learning topics to pick from.'),
  topic: z
    .string()
    .nullable()
    .describe('When kind is session: short label for the skill or concept being studied.'),
  outline: z
    .array(z.string())
    .min(3)
    .max(6)
    .nullable()
    .describe(
      'When kind is session: 3–6 bullets previewing what the session will cover.',
    ),
  questions: z
    .array(flashcardSchema)
    .nullable()
    .describe(
      'When kind is session: exactly the requested number of flashcards, each with concept, question, options, correctOptionId.',
    ),
});

export type Flashcard = z.infer<typeof flashcardSchema>;
export type QuizOption = Flashcard['options'][number];
export type QuizResponse = z.infer<typeof quizResponseSchema>;

export type ClarifyResponse = QuizResponse & {
  kind: 'clarify';
  message: string;
  suggestedTopics: string[];
};

export type SessionResponse = QuizResponse & {
  kind: 'session';
  topic: string;
  outline: string[];
  questions: Flashcard[];
};

export type SessionAnswer = {
  questionIndex: number;
  selectedOptionId: number;
  wasCorrect: boolean;
  concept: string;
};

export type SessionResults = {
  score: number;
  total: number;
  correctConcepts: string[];
  missedConcepts: string[];
};
