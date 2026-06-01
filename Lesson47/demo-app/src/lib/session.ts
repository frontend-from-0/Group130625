import {
  type Flashcard,
  type SessionAnswer,
  type SessionResults,
} from '@/lib/schema';

export function isFlashcardReady(card: unknown): card is Flashcard {
  if (!card || typeof card !== 'object') {
    return false;
  }

  const record = card as Record<string, unknown>;
  const options = record.options;

  return (
    typeof record.concept === 'string' &&
    record.concept.length > 0 &&
    typeof record.question === 'string' &&
    record.question.length > 0 &&
    Array.isArray(options) &&
    options.length === 4 &&
    options.every((option) => {
      if (!option || typeof option !== 'object') {
        return false;
      }
      const optionRecord = option as Record<string, unknown>;
      return (
        typeof optionRecord.answer === 'string' &&
        optionRecord.answer.length > 0 &&
        typeof optionRecord.explanation === 'string' &&
        optionRecord.explanation.length > 0 &&
        typeof optionRecord.id === 'number'
      );
    }) &&
    typeof record.correctOptionId === 'number'
  );
}

export function computeSessionResults(
  answers: SessionAnswer[],
  questions: Flashcard[],
): SessionResults {
  const total = questions.length;
  const score = answers.filter((answer) => answer.wasCorrect).length;

  const correctConcepts: string[] = [];
  const missedConcepts: string[] = [];

  for (const answer of answers) {
    const concept =
      answer.concept ||
      questions[answer.questionIndex]?.concept ||
      `Question ${answer.questionIndex + 1}`;

    if (answer.wasCorrect) {
      if (!correctConcepts.includes(concept)) {
        correctConcepts.push(concept);
      }
    } else if (!missedConcepts.includes(concept)) {
      missedConcepts.push(concept);
    }
  }

  return { score, total, correctConcepts, missedConcepts };
}
