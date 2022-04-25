import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { Containers, Headings, Theme, Buttons, Rating } from "../components";
import { RoundButton } from "../components/button";
import { Header } from "../components/header";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Headings.H1>Results?</Headings.H1>
        <Header />
        <Rating.Rating percent={75} />
      </Main>
    </ThemeProvider>
  );
}

export default App;