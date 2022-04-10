import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Copy } from "../components";

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
          <Copy.Warning>Work in progress: Check back soon</Copy.Warning>
          <Copy.Copy>
            A short quiz to check the health of your teams agile processes.
          </Copy.Copy>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
