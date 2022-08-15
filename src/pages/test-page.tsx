import React, { useState } from "react";
import { css, ThemeProvider, useTheme } from "@emotion/react";
import {
  Containers,
  Headings,
  Theme,
  Buttons,
  Rating,
  Copy,
} from "../components";
import { RoundButton } from "../components/button";
import useCollapse from "react-collapsed";

const { Main } = Containers;

function App() {
  const theme = Theme.theme(Theme.Variant.dark);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Headings.H1>Results?</Headings.H1>
        <Header />
        <div
          css={css`
            width: 100%;
          `}
        >
          <button
            css={css`
              background: transparent;
              border: 0;
              color: ${theme.colors.text.copy};
              font-size: 2rem;
              cursor: pointer;
              transform: translateY(1rem);
            `}
            {...getToggleProps()}
          >
            ...
          </button>
          <section {...getCollapseProps()}>
            <Copy.Copy>
              Some text Some text Some text. Some text Some text Some text Some
              text
            </Copy.Copy>
          </section>
        </div>
        <Honk theme={theme} />
      </Main>
    </ThemeProvider>
  );
}

function Honk({ theme }: { theme: Theme.Theme }): JSX.Element {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <button
        css={css`
          background: transparent;
          border: 0;
          color: ${theme.colors.text.copy};
          font-size: 2rem;
          cursor: pointer;
          transform: translateY(1rem);
        `}
        {...getToggleProps()}
      >
        ...
      </button>
      <section {...getCollapseProps()}>
        <Copy.Copy>
          Some text Some text Some text. Some text Some text Some text Some text
        </Copy.Copy>
      </section>
    </div>
  );
}

export default App;
