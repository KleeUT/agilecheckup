import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons, Spacing } from "../components";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <div
          css={css`
            box-sizing: border-box;
          `}
        >
          <Headings.H1>How Agile Is Your Team?</Headings.H1>
          <Buttons.FeatureButtonLink
            cssOverride={css`
              ${Spacing.Margin.bottom1};
              ${Spacing.Margin.top1}
            `}
            to="/quiz"
          >
            Find out
          </Buttons.FeatureButtonLink>
          <Buttons.ButtonLink
            cssOverride={css`
              ${Spacing.Margin.bottom1};
              ${Spacing.Margin.top1}
            `}
            to="/about"
          >
            What is this?
          </Buttons.ButtonLink>
          <Buttons.ButtonLink
            cssOverride={css`
              ${Spacing.Margin.bottom1};
              ${Spacing.Margin.top1}
            `}
            to="/about-agile"
          >
            About agile
          </Buttons.ButtonLink>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
