import React, { ButtonHTMLAttributes, useState } from "react";
import { css, PropsOf, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons } from "../components";
import { Link } from "gatsby";
import { useQuiz } from "../domain/quiz";

const { Main } = Containers;

const deployFrequency: Question = {
  text: "How often does you team deploy to production?",
  advice: [],
  options: [
    {
      score: 1,
      text: "Up to multiple times per day",
    },
    {
      score: 2,
      text: "Up to once per week",
    },
    {
      score: 3,
      text: "Up to once per fortnight",
    },
    {
      score: 4,
      text: "Not more than once a month",
    },
    {
      score: 5,
      text: "Maybe once a year",
    },
  ],
};

const automatedTests: Question = {
  text: "How confident are you deploying with just your automated test suite?",
  advice: [],
  options: [
    {
      score: 1,
      text: "Very confident",
    },
    {
      score: 2,
      text: "Reasonably confident",
    },
    {
      score: 3,
      text: "Somewhat; We need some manual testing",
    },
    {
      score: 4,
      text: "We run a manual test suite",
    },
    {
      score: 5,
      text: "We have no testing or monitoring",
    },
  ],
};

function QuestionDisplay({
  question,
  onSelect,
}: {
  question: Question;
  onSelect: (result: Result) => void;
}): JSX.Element {
  return (
    <div>
      <Headings.H1 size={2}>{question.text}</Headings.H1>
      {question.options.map((option) => (
        <Buttons.OptionButton
          onClick={() => onSelect({ selectedOption: option, question })}
        >
          {option.text}
        </Buttons.OptionButton>
      ))}
    </div>
  );
}

function QuizPage() {
  const quiz = useQuiz([deployFrequency, automatedTests]);
  return (
    <ThemeProvider theme={Theme.theme(Theme.Variant.dark)}>
      <Main>
        <QuestionDisplay
          onSelect={quiz.answerQuestion}
          question={quiz.currentQuestion()}
        />
      </Main>
    </ThemeProvider>
  );
}

export default QuizPage;
