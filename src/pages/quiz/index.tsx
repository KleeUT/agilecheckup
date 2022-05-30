import React, { ButtonHTMLAttributes, useState } from "react";
import { css, PropsOf, ThemeProvider, useTheme } from "@emotion/react";
import {
  Containers,
  Headings,
  Theme,
  Buttons,
  Spacing,
  Copy,
} from "../../components";
import { Quiz, useQuiz } from "../../domain";
import { createRepository } from "../../domain/quizRepository";
import { quizFactory } from "../../domain/quizFactory";
import { questionFactory } from "../../domain/questionFactory";

const { Main } = Containers;

function QuestionDisplay({
  question,
  onSelect,
}: {
  question: Question;
  onSelect: (result: Result) => void;
}): JSX.Element {
  return (
    <div>
      <Headings.H2
        cssOverride={css`
          ${Spacing.Margin.bottom1}
        `}
        size={2}
      >
        {question.text}
      </Headings.H2>
      {question.options.map((option) => (
        <Buttons.Button
          key={option.text}
          css={css`
            ${Spacing.Margin.bottom1}
          `}
          onClick={() => onSelect({ selectedOption: option, question })}
        >
          {option.text}
        </Buttons.Button>
      ))}
    </div>
  );
}

function LinkToResults({ quiz }: { quiz: Quiz }) {
  return (
    <>
      <Headings.H2
        cssOverride={css`
          ${Spacing.Margin.bottom1}
        `}
        size={2}
      >
        All Done
      </Headings.H2>
      <Copy.Copy>Last chance to go back and change your answers</Copy.Copy>
      <Buttons.FeatureButtonLink to="/quiz/results" state={quiz}>
        Get Results
      </Buttons.FeatureButtonLink>
    </>
  );
}

function QuizPage() {
  const quiz = useQuiz(
    createRepository(localStorage, quizFactory),
    questionFactory()
  );
  return (
    <ThemeProvider theme={Theme.theme(Theme.Variant.dark)}>
      <Main
        onPrevClicked={
          quiz.hasPreviousQuestion ? quiz.previousQuestion : undefined
        }
      >
        {quiz.complete ? (
          <LinkToResults quiz={quiz} />
        ) : (
          <QuestionDisplay
            onSelect={quiz.answerQuestion}
            question={quiz.currentQuestion()}
          />
        )}
      </Main>
    </ThemeProvider>
  );
}

export default QuizPage;
