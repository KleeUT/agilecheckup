import { useState } from "react";
import { QuizRepository } from "./quizRepository";

const upsertResult = (
  currentResults: Result[],
  newResult: Result
): Result[] => {
  const duplicateQuestionIndex = currentResults.findIndex((x) => {
    return x.question.text === newResult.question.text;
  });
  if (duplicateQuestionIndex === -1) {
    return [...currentResults, newResult];
  }
  const beforeDuplicate = currentResults.slice(0, duplicateQuestionIndex);
  const afterDuplicate = currentResults.slice(
    duplicateQuestionIndex + 1,
    currentResults.length
  );
  return [...beforeDuplicate, newResult, ...afterDuplicate];
};

export const useQuiz = (repo: QuizRepository, questions: Question[]) => {
  const [state, updateState] = useState(repo.retrieveState());
  const update = (state: QuizState) => {
    repo.update(state);
    updateState(state);
  };
  return {
    currentQuestion(): Question {
      return questions[state.currentIndex];
    },
    answerQuestion(result: Result): void {
      const updatedState = {
        ...state,
        results: upsertResult(state.results, result),
        currentIndex: state.currentIndex + 1,
      };
      update(updatedState);
    },
    complete: state.currentIndex >= questions.length,
    previousQuestion: () => {
      update({
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      });
    },
    reset: () => {
      update({
        ...state,
        results: [],
        currentIndex: 0,
      });
    },
    hasPreviousQuestion: state.currentIndex > 0,
  };
};

export type Quiz = ReturnType<typeof useQuiz>;
