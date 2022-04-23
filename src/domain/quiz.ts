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

export const useQuiz = (repo: QuizRepository) => {
  const [state, updateState] = useState(repo.retrieveState());
  return {
    currentQuestion(): Question {
      return state.questions[state.currentIndex];
    },
    answerQuestion(result: Result): void {
      const updatedState = {
        ...state,
        results: upsertResult(state.results, result),
        currentIndex: state.currentIndex + 1,
      };
      repo.update(updatedState);
      updateState(updatedState);
    },
    complete: state.currentIndex >= state.questions.length,
    previousQuestion: () => {
      updateState({
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      });
    },
    reset: () => {
      updateState({
        ...state,
        results: [],
        currentIndex: 0,
      });
    },
  };
};

export type Quiz = ReturnType<typeof useQuiz>;
