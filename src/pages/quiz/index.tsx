import React, { ButtonHTMLAttributes, useState } from "react";
import { css, PropsOf, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons } from "../../components";
import { Quiz, useQuiz } from "../../domain";
import { createRepository } from "../../domain/quizRepository";
import { quizFactory } from "../../domain/quizFactory";

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
      <Headings.H1 size={2}>{question.text}</Headings.H1>
      {question.options.map((option) => (
        <Buttons.Button
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
    <Buttons.FeatureButtonLink to="/quiz/results" state={quiz}>
      Get Results
    </Buttons.FeatureButtonLink>
  );
}

function QuizPage() {
  const quiz = useQuiz(createRepository(localStorage, quizFactory));
  console.log(quiz);
  return (
    <ThemeProvider theme={Theme.theme(Theme.Variant.dark)}>
      <Main>
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
