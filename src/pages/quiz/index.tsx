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
import { useWindow } from "../../utils/useWindow";
import { navigate } from "gatsby";

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

function LinkToResults({
  quiz,
  quizState,
}: {
  quiz: Quiz;
  quizState: QuizState;
}) {
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
      <Buttons.FeatureButtonLink
        onClick={async () => {
          const url = `${process.env.GATSBY_API_URL}/api/result`;
          try {
            await fetch(url, {
              method: "POST",
              body: JSON.stringify(quizState.results),
              headers: {
                "Content-Type": "application/json",
              },
            });
          } catch (_) {}
          navigate("/quiz/results", { state: quiz });
        }}
      >
        Get Results
      </Buttons.FeatureButtonLink>
    </>
  );
}

function QuizPage() {
  const ls = useWindow();
  const repo = createRepository(() => ls.localStorage, quizFactory);
  const quiz = useQuiz(repo, questionFactory());
  return (
    <ThemeProvider theme={Theme.theme(Theme.Variant.dark)}>
      <Main>
        {quiz.complete ? (
          <LinkToResults quiz={quiz} quizState={repo.retrieveState()} />
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
