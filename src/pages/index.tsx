import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons } from "../components";

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
          <Buttons.FeatureButtonLink to="/quiz">
            Find out
          </Buttons.FeatureButtonLink>
          <Buttons.ButtonLink to="/about">What is this?</Buttons.ButtonLink>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
