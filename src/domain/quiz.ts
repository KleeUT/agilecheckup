import { useState } from "react";

export const useQuiz = (questions: Question[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  return {
    currentQuestion(): Question {
      return questions[currentIndex];
    },
    answerQuestion(result: Result): void {
      setResults([...results, result]);
      setCurrentIndex(currentIndex + 1);
    },
  };
};
