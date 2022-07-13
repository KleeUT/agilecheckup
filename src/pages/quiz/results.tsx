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
        <Headings.H2 size={2}>Results?</Headings.H2>
        <Rating.Rating
          percent={quizAnaysis.scorePercent}
          cssOverride={css`
            ${Spacing.Margin.bottom1};
            ${Spacing.Margin.top1}
          `}
        />
        <Text>{quizAnaysis.prioritisedAdvice[0]?.text ?? "No advice"}</Text>
        <Headings.H3
          cssOverride={css`
            ${Spacing.Margin.top1}
          `}
          size={3}
        >
          Extra advice
        </Headings.H3>
        {quizAnaysis.prioritisedAdvice.slice(1).map((x) => {
          return (
            <div
              css={css`
                ${Spacing.Margin.bottom1}
                width:100%;
              `}
            >
              <Collapse>
                <Text>{x.text}</Text>
              </Collapse>
            </div>
          );
        })}
        <hr />
        <Headings.H2 size={2}>About Agile</Headings.H2>
        <Text>
          Find out more about agile by reading the{" "}
          <ExternalLink href="https://agilemanifesto.org/principles.html">
            12 principles that underly the agile manifesto
          </ExternalLink>{" "}
          and the{" "}
          <ExternalLink href="https://agilemanifesto.org">
            Agile Manifresto
          </ExternalLink>
        </Text>
        <Text>
          Agile isn't static and opinions have grown from the initital
          manefesto. If you're interested in more recent takes on agile have a
          look at{" "}
          <ExternalLink href="https://modernagile.org/">
            Modern Agile
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://heartofagile.com/">
            The heart of agile
          </ExternalLink>
          .
        </Text>
        <Buttons.ButtonLink
          onClick={() => {
            quiz.reset();
            navigate("/quiz");
          }}
          cssOverride={Spacing.Margin.top1}
        >
          Dont like the result? Start over.
        </Buttons.ButtonLink>
      </Main>
    </ThemeProvider>
  );
}

export default App;
