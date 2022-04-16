import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons } from "../../components";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Headings.H1>Results?</Headings.H1>

        <Buttons.ButtonLink to="/quiz">Start over</Buttons.ButtonLink>
      </Main>
    </ThemeProvider>
  );
}

export default App;
