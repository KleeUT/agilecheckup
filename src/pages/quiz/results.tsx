import { css, ThemeProvider } from "@emotion/react";
import {
  Containers,
  Headings,
  Theme,
  Buttons,
  Copy,
  Rating,
  Spacing,
  Collapse,
} from "../../components";
import { useQuiz } from "../../domain";
import { createRepository } from "../../domain/quizRepository";
import { quizFactory } from "../../domain/quizFactory";
import { navigate } from "gatsby";
import { useQuizAnalysis } from "../../domain/quizAnalyser";
import { questionFactory } from "../../domain/questionFactory";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  const repo = createRepository(localStorage, quizFactory);
  const quiz = useQuiz(repo, questionFactory());
  const quizAnaysis = useQuizAnalysis(repo);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Headings.H1>Results?</Headings.H1>
        <Rating.Rating
          percent={quizAnaysis.scorePercent}
          cssOverride={css`
            ${Spacing.Margin.bottom1};
            ${Spacing.Margin.top1}
          `}
        />
        <Copy.Copy>
          {quizAnaysis.prioritisedAdvice[0]?.text ?? "No advice"}
        </Copy.Copy>
        {quizAnaysis.prioritisedAdvice.slice(1).map((x) => {
          return (
            <Collapse>
              <Copy.Copy>{x.text}</Copy.Copy>
            </Collapse>
          );
        })}
        <Buttons.ButtonLink
          onClick={() => {
            quiz.reset();
            navigate("/quiz");
          }}
          cssOverride={Spacing.Margin.top1}
        >
          Start over
        </Buttons.ButtonLink>
      </Main>
    </ThemeProvider>
  );
}

export default App;
