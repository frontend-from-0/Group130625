'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { useEffect, useState } from 'react';

import { ExplanationPanel } from '@/components/ExplanationPanel';
import { FlashcardShell } from '@/components/FlashcardShell';
import { FlashcardSkeleton } from '@/components/FlashcardSkeleton';
import { NextQuestionButton } from '@/components/NextQuestionButton';
import { OptionButton } from '@/components/OptionButton';
import { PromptView } from '@/components/PromptView';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { SessionOutlinePanel } from '@/components/SessionOutlinePanel';
import { SessionProgressHeader } from '@/components/SessionProgressHeader';
import { SessionResultsView } from '@/components/SessionResultsView';
import { TopicSuggestions } from '@/components/TopicSuggestions';
import {
  quizResponseSchema,
  type SessionAnswer,
  type SessionLength,
} from '@/lib/schema';
import {
  computeSessionResults,
  isFlashcardReady,
} from '@/lib/session';

type Phase = 'setup' | 'generating' | 'active' | 'complete';

type SessionRequest = {
  topic: string;
  questionCount: SessionLength;
};

function getOptionState(
  optionId: number,
  selectedOptionId: number | null,
  correctOptionId: number | undefined,
  isLocked: boolean,
): 'default' | 'correct' | 'wrong' | 'dimmed' | 'loading' {
  if (!isLocked || correctOptionId === undefined) {
    return 'default';
  }

  if (optionId === correctOptionId) {
    return 'correct';
  }

  if (optionId === selectedOptionId) {
    return 'wrong';
  }

  return 'dimmed';
}

function filterOutline(outline: (string | null | undefined)[] | null | undefined) {
  return (
    outline?.filter(
      (item): item is string => typeof item === 'string' && item.length > 0,
    ) ?? []
  );
}

function filterSuggestedTopics(
  topics: (string | null | undefined)[] | null | undefined,
) {
  return (
    topics?.filter(
      (item): item is string => typeof item === 'string' && item.length > 0,
    ) ?? []
  );
}

export function QuizPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState<SessionLength>(10);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<SessionAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: '/api/quiz',
    schema: quizResponseSchema,
  });

  const session = object?.kind === 'session' ? object : undefined;

  const questions = session?.questions ?? [];
  const currentCard = questions[questionIndex];
  const isCurrentCardReady = isFlashcardReady(currentCard);
  const isLastQuestion = questionIndex >= questionCount - 1;

  const showClarify =
    phase === 'generating' && !isLoading && object?.kind === 'clarify';

  const showOutline =
    phase === 'generating' &&
    object?.kind === 'session' &&
    filterOutline(object.outline).length > 0;

  const showSessionCard =
    phase === 'active' || (phase === 'generating' && object?.kind === 'session');

  const showPrompt = phase === 'setup';

  const optionsEnabled =
    object?.kind === 'session' &&
    (phase === 'active' || phase === 'generating') &&
    isCurrentCardReady &&
    !isLocked;

  const sessionTopic = session?.topic ?? topic;

  useEffect(() => {
    if (
      phase === 'generating' &&
      object?.kind === 'session' &&
      isFlashcardReady(object.questions?.[0])
    ) {
      setPhase('active');
    }
  }, [phase, object]);

  function resetQuestionProgress() {
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setIsLocked(false);
  }

  function beginSession(request: SessionRequest) {
    resetQuestionProgress();
    setPhase('generating');
    submit(request);
  }

  function resetToSetup() {
    stop();
    clear();
    resetQuestionProgress();
    setPhase('setup');
  }

  function handleStartSession() {
    const trimmed = topic.trim();
    if (!trimmed) {
      return;
    }
    beginSession({ topic: trimmed, questionCount });
  }

  function handleTopicSelect(selectedTopic: string) {
    setTopic(selectedTopic);
    beginSession({ topic: selectedTopic, questionCount });
  }

  function handleOptionSelect(optionId: number) {
    if (!optionsEnabled || !isFlashcardReady(currentCard)) {
      return;
    }

    const wasCorrect = optionId === currentCard.correctOptionId;
    setSelectedOptionId(optionId);
    setIsLocked(true);

    setAnswers((previous) => {
      const withoutCurrent = previous.filter(
        (entry) => entry.questionIndex !== questionIndex,
      );
      return [
        ...withoutCurrent,
        {
          questionIndex,
          selectedOptionId: optionId,
          wasCorrect,
          concept: currentCard.concept,
        },
      ];
    });
  }

  function handleNextQuestion() {
    if (isLastQuestion) {
      setPhase('complete');
      return;
    }

    setQuestionIndex((index) => index + 1);
    setSelectedOptionId(null);
    setIsLocked(false);
  }

  function handleRetry() {
    const trimmed = topic.trim();
    if (!trimmed) {
      return;
    }
    stop();
    clear();
    beginSession({ topic: trimmed, questionCount });
  }

  const correctOptionId = isFlashcardReady(currentCard)
    ? currentCard.correctOptionId
    : undefined;
  const selectedOption =
    selectedOptionId !== null && isFlashcardReady(currentCard)
      ? currentCard.options[selectedOptionId]
      : undefined;
  const correctOption =
    correctOptionId != null && isFlashcardReady(currentCard)
      ? currentCard.options[correctOptionId]
      : undefined;

  const wasCorrect =
    selectedOptionId !== null &&
    correctOptionId != null &&
    selectedOptionId === correctOptionId;

  const errorMessage = error?.message;
  const outlineItems = filterOutline(session?.outline ?? object?.outline);
  const showCardSkeleton = showSessionCard && !isCurrentCardReady;

  const showGeneratingSkeleton =
    phase === 'generating' && !showSessionCard && !showClarify;

  const readyQuestions =
    phase === 'complete'
      ? questions.filter((card) => isFlashcardReady(card))
      : [];

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        {showPrompt ? (
          <PromptView
            topic={topic}
            questionCount={questionCount}
            onTopicChange={setTopic}
            onQuestionCountChange={setQuestionCount}
            onSubmit={handleStartSession}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        ) : null}

        {showClarify && object.kind === 'clarify' ? (
          <TopicSuggestions
            message={object.message ?? 'Pick a topic to continue:'}
            topics={filterSuggestedTopics(object.suggestedTopics)}
            onSelect={handleTopicSelect}
          />
        ) : null}

        {showOutline ? (
          <SessionOutlinePanel
            outline={outlineItems}
            isStreaming={isLoading}
          />
        ) : null}

        {showGeneratingSkeleton ? (
          <FlashcardShell>
            <FlashcardSkeleton />
          </FlashcardShell>
        ) : null}

        {phase === 'complete' ? (
          <SessionResultsView
            topic={sessionTopic}
            results={computeSessionResults(answers, readyQuestions)}
            onNewTopic={resetToSetup}
            onRetry={handleRetry}
          />
        ) : null}

        {showSessionCard ? (
          <FlashcardShell topic={sessionTopic}>
            {phase === 'active' ? (
              <SessionProgressHeader
                topic={sessionTopic}
                questionIndex={questionIndex}
                questionCount={questionCount}
              />
            ) : null}

            {showCardSkeleton ? <FlashcardSkeleton /> : null}

            {isCurrentCardReady ? (
              <>
                <QuestionDisplay
                  key={questionIndex}
                  question={currentCard.question}
                  isStreaming={false}
                />

                <div
                  className="space-y-2"
                  role="list"
                  aria-label="Answer options"
                >
                  {Array.from({ length: 4 }).map((_, index) => {
                    const option = currentCard.options[index];
                    const state = getOptionState(
                      index,
                      selectedOptionId,
                      correctOptionId,
                      isLocked,
                    );

                    return (
                      <OptionButton
                        key={index}
                        optionId={index}
                        answer={option.answer}
                        disabled={!optionsEnabled}
                        state={state}
                        onSelect={handleOptionSelect}
                      />
                    );
                  })}
                </div>

                <ExplanationPanel
                  visible={isLocked && Boolean(selectedOption?.explanation)}
                  selectedExplanation={selectedOption?.explanation ?? ''}
                  correctAnswer={correctOption?.answer ?? ''}
                  wasCorrect={wasCorrect}
                />

                <NextQuestionButton
                  visible={isLocked}
                  isLastQuestion={isLastQuestion}
                  onClick={handleNextQuestion}
                />
              </>
            ) : null}
          </FlashcardShell>
        ) : null}
      </div>
    </main>
  );
}
