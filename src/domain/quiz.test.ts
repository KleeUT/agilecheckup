import { Quiz, useQuiz } from "./quiz";
import React, { useState } from "react";
import { QuizRepository } from "./quizRepository";

const basicQuestion = (): Question => {
  return {
    text: "basic question",
    advice: [],
    options: [
      {
        score: 1,
        text: "Answer 1.1",
      },
      {
        score: 2,
        text: "Answer 1.2",
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
        text: "Answer 2.1",
      },
      {
        score: 2,
        text: "Answer 2.2",
      },
    ],
  };
};
const basicQuestion3 = (): Question => {
  return {
    text: "basic question 3",
    advice: [],
    options: [
      {
        score: 1,
        text: "Answer 3.1",
      },
      {
        score: 2,
        text: "Answer 3.2",
      },
    ],
  };
};
const basicState = (): QuizState => ({
  currentIndex: 0,
  questions: [],
  results: [],
});

jest.mock("react", () => ({
  useState: jest.fn(),
}));

describe(useQuiz, () => {
  const useStateMock = () => useState as unknown as jest.Mock;
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const setup = (sampleState: Partial<QuizState>) => {
    const mockSetState: React.Dispatch<unknown> = jest.fn();
    const repositoryUpdateMock = jest.fn();

    const repo: QuizRepository = {
      retrieveState: () => ({ ...basicState(), ...sampleState }),
      update: repositoryUpdateMock,
    };
    useStateMock().mockReturnValueOnce([repo.retrieveState(), mockSetState]);

    const quiz = useQuiz(repo);
    return {
      quiz,
      repositoryUpdateMock,
      mockSetState,
    };
  };

  it("should provide the next question", () => {
    const { quiz } = setup({ questions: [basicQuestion()] });
    expect(quiz.currentQuestion()).toEqual(basicQuestion());
  });

  it("should store answers to a question", () => {
    const question = basicQuestion();
    const { quiz, mockSetState } = setup({ questions: [question] });
    quiz.answerQuestion({
      question,
      selectedOption: question.options[0],
    });
    expect(mockSetState).toHaveBeenCalledWith({
      questions: [question],
      results: [
        {
          question: basicQuestion(),
          selectedOption: basicQuestion().options[0],
        },
      ],
      currentIndex: 1,
    } as QuizState);
  });
  it("should preserve answers to a previous question", () => {
    const question = basicQuestion();
    const question2 = basicQuestion2();
    const result = {
      question: question,
      selectedOption: question.options[0],
    };
    const { quiz, mockSetState, repositoryUpdateMock } = setup({
      questions: [question, question2],
      results: [result],
      currentIndex: 1,
    });

    quiz.answerQuestion({
      question: question2,
      selectedOption: question2.options[0],
    });

    expect(mockSetState).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 2,
      results: [
        result,
        {
          question: question2,
          selectedOption: question2.options[0],
        },
      ],
    } as QuizState);
    expect(repositoryUpdateMock).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 2,
      results: [
        result,
        {
          question: question2,
          selectedOption: question2.options[0],
        },
      ],
    } as QuizState);
  });

  it("should overwrite a previously answered question", () => {
    const question = basicQuestion();
    const question2 = basicQuestion2();
    const result = {
      question: question,
      selectedOption: question.options[0],
    };
    const { quiz, mockSetState, repositoryUpdateMock } = setup({
      questions: [question, question2],
      results: [result],
    });

    quiz.answerQuestion({
      question: question,
      selectedOption: question.options[1],
    });

    expect(mockSetState).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 1,
      results: [
        {
          question: question,
          selectedOption: question.options[1],
        },
      ],
    } as QuizState);
    expect(repositoryUpdateMock).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 1,
      results: [
        {
          question: question,
          selectedOption: question.options[1],
        },
      ],
    } as QuizState);
  });

  it("Should move to the previous question", () => {
    const question = basicQuestion();
    const question2 = basicQuestion2();
    const result = {
      question: question,
      selectedOption: question.options[0],
    };
    const { quiz, mockSetState, repositoryUpdateMock } = setup({
      questions: [question, question2],
      results: [result],
      currentIndex: 1,
    });

    quiz.previousQuestion();

    expect(mockSetState).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 0,
      results: [result],
    } as QuizState);
  });

  it("should not go before question 0", () => {
    const question = basicQuestion();
    const question2 = basicQuestion2();
    const result = {
      question: question,
      selectedOption: question.options[0],
    };
    const { quiz, mockSetState, repositoryUpdateMock } = setup({
      questions: [question, question2],
      results: [result],
      currentIndex: 0,
    });

    quiz.previousQuestion();

    expect(mockSetState).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 0,
      results: [result],
    } as QuizState);
  });

  it("should be able to reset quiz state", () => {
    const question = basicQuestion();
    const question2 = basicQuestion2();
    const result = {
      question: question,
      selectedOption: question.options[0],
    };
    const { quiz, mockSetState, repositoryUpdateMock } = setup({
      questions: [question, question2],
      results: [result],
      currentIndex: 1,
    });

    quiz.reset();

    expect(mockSetState).toHaveBeenCalledWith({
      questions: [question, question2],
      currentIndex: 0,
      results: [],
    } as QuizState);
  });

  it.each([
    [0, false],
    [1, true],
    [2, true],
  ])("should mark a quiz as complete", (currentIndex, complete) => {
    const question = basicQuestion();
    const result = {
      question: question,
      selectedOption: question.options[0],
    };
    const { quiz } = setup({
      currentIndex,
      results: [result],
      questions: [question],
    });

    expect(quiz.complete).toBe(complete);
  });
});
