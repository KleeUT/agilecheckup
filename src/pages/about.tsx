import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import {
  Containers,
  Headings,
  Theme,
  Buttons,
  Copy,
  Spacing,
  ExternalLink,
} from "../components";

const { Main } = Containers;
const { Copy: Text } = Copy;
function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <div>
          <Headings.H1>What is this?</Headings.H1>
          <Text>
            There is more to agile software development than just having standup
            meetings.
          </Text>
          <Text>
            This quiz goes through a short set of questions to asses the health
            of your agile process.
          </Text>
          <Buttons.FeatureButtonLink
            cssOverride={css`
              ${Spacing.Margin.bottom1};
              ${Spacing.Margin.top1}
            `}
            to="/quiz"
          >
            Take the quiz
          </Buttons.FeatureButtonLink>
          <Text>
            If you disagree with the questions, advice or just have some innput
            you'd like to add you can reach out on{" "}
            <ExternalLink href="https://github.com/KleeUT/agilecheckup">
              GitHub
            </ExternalLink>
            . Raise an issue or a PR, we'd love to hear from you.
          </Text>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
