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
  ExternalLink,
} from "../../components";
import { useQuiz } from "../../domain";
import { createRepository } from "../../domain/quizRepository";
import { quizFactory } from "../../domain/quizFactory";
import { navigate } from "gatsby";
import { useQuizAnalysis } from "../../domain/quizAnalyser";
import { questionFactory } from "../../domain/questionFactory";
import { useWindow } from "../../utils/useWindow";

const { Main } = Containers;
const Text = Copy.Copy;
function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  const ls = useWindow();
  const repo = createRepository(() => ls.localStorage, quizFactory);
  const quiz = useQuiz(repo, questionFactory());
  const quizAnaysis = useQuizAnalysis(repo);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Rating.Rating
          percent={quizAnaysis.scorePercent}
          cssOverride={css`
            ${Spacing.Margin.bottom1};
            ${Spacing.Margin.top1}
          `}
        />
        <Collapse label="Advice">
          <Text>{quizAnaysis.prioritisedAdvice[0]?.text ?? "No advice"}</Text>
        </Collapse>
        <Buttons.ButtonLink
          onClick={() => {
            quiz.reset();
            navigate("/aboutAgile");
          }}
          cssOverride={Spacing.Margin.top1}
        >
          About agile
        </Buttons.ButtonLink>
        <Headings.H3 size={2} cssOverride={Spacing.Margin.top1}>
          Dont like the result?
        </Headings.H3>
        <Buttons.ButtonLink
          onClick={() => {
            quiz.reset();
            navigate("/quiz");
          }}
          cssOverride={Spacing.Margin.top1}
        >
          Start over
        </Buttons.ButtonLink>
        <Headings.H3 size={2} cssOverride={Spacing.Margin.top1}>
          Found a problem?
        </Headings.H3>
        <ExternalLink
          href="https://github.com/KleeUT/agilecheckup"
          cssOverride={Spacing.Margin.top1}
        >
          Let us know on GitHub
        </ExternalLink>
      </Main>
    </ThemeProvider>
  );
}

export default App;
