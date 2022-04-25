import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons } from "../../components";
import { useQuiz } from "../../domain";
import { createRepository } from "../../domain/quizRepository";
import { quizFactory } from "../../domain/quizFactory";
import { navigate } from "gatsby";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  const quiz = useQuiz(createRepository(localStorage, quizFactory));
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Headings.H1>Results? Implement start over</Headings.H1>
        <Buttons.ButtonLink
          onClick={() => {
            quiz.reset();
            navigate("/quiz");
          }}
        >
          Start over
        </Buttons.ButtonLink>
      </Main>
    </ThemeProvider>
  );
}

export default App;
