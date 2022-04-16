import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons, Copy } from "../components";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <div>
          <Headings.H1>What is this?</Headings.H1>
          <Copy.Copy>
            There is more to agile software development than just having standup
            meetings.
          </Copy.Copy>
          <Copy.Copy>
            This quiz goes through a short set of questions to asses the health
            of your agile process.
          </Copy.Copy>
          <Buttons.FeatureButtonLink to="/quiz">
            Take the quiz
          </Buttons.FeatureButtonLink>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
