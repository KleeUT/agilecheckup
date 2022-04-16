import { useQuiz } from "./quiz";
import React from "react";

const basicQuestion = (): Question => {
  return {
    text: "basic question",
    advice: [],
    options: [
      {
        score: 1,
        text: "Answer 1",
      },
      {
        score: 2,
        text: "Answer 2",
      },
    ],
  };
};
const basicQuestion2 = (): Question => {
  return {
    text: "basic question 2",
    advice: [],
    options: [
      {
        score: 1,
        text: "Answer 3",
      },
      {
        score: 2,
        text: "Answer 4",
      },
    ],
  };
};

describe(useQuiz, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const setupMocks = (
    {
      currentIndex,
      currentQuizState,
    }: {
      currentIndex?: number;
      currentQuizState?: Result[];
    } = { currentIndex: 0, currentQuizState: [] }
  ) => {
    const mockUseState = jest.spyOn(React, "useState");
    const mockSetCurrentIndex: React.Dispatch<unknown> = jest.fn();
    const mockSetResults: React.Dispatch<unknown> = jest.fn();
    mockUseState.mockReturnValueOnce([currentIndex || 0, mockSetCurrentIndex]);
    mockUseState.mockReturnValueOnce([currentQuizState || [], mockSetResults]);
    return {
      mockSetCurrentIndex,
      mockSetResults,
    };
  };
  it("should provide the next question", () => {
    // mock.mockImplementation(() => ([x, a]))
    setupMocks();
    const quiz = useQuiz([basicQuestion()]);
    expect(quiz.currentQuestion()).toEqual(basicQuestion());
  });
  it("should store answers to a question", () => {
    const { mockSetResults } = setupMocks();
    const quiz = useQuiz([basicQuestion()]);
    const question = basicQuestion();
    quiz.answerQuestion({
      question,
      selectedOption: question.options[0],
    });
    expect(mockSetResults).toHaveBeenCalledWith([
      {
        question,
        selectedOption: question.options[0],
      },
    ]);
  });
  it("should preserve answers to a previous question", () => {
    const question2 = basicQuestion2();
    const result = {
      question: question2,
      selectedOption: question2.options[0],
    };
    const { mockSetResults } = setupMocks({ currentQuizState: [result] });
    const quiz = useQuiz([basicQuestion()]);
    const question = basicQuestion();
    quiz.answerQuestion({
      question,
      selectedOption: question.options[0],
    });
    expect(mockSetResults).toHaveBeenCalledWith([
      result,
      {
        question,
        selectedOption: question.options[0],
      },
    ]);
  });

  it.each([
    [0, false],
    [1, true],
    [2, true],
  ])("should mark a quiz as complete", (currentIndex, complete) => {
    const question2 = basicQuestion2();
    const result = {
      question: question2,
      selectedOption: question2.options[0],
    };
    setupMocks({ currentIndex, currentQuizState: [result] });
    const quiz = useQuiz([basicQuestion()]);
    expect(quiz.complete).toBe(complete);
  });
});
