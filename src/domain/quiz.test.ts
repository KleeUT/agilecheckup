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

describe(useQuiz, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const setupMocks = () => {
    const mockUseState = jest.spyOn(React, "useState");
    const mockSetCurrentIndex: React.Dispatch<unknown> = jest.fn();
    const mockSetResults: React.Dispatch<unknown> = jest.fn();
    mockUseState.mockReturnValueOnce([0, mockSetCurrentIndex]);
    mockUseState.mockReturnValueOnce([[], mockSetResults]);
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
    expect(mockSetResults).toHaveBeenCalledWith({
      question,
      selectedOption: question.options[0],
    });
  });
});
