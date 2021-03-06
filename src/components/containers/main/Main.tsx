import React from "react";
import { css, useTheme, Global } from "@emotion/react";
import { Theme } from "../../theme";

export const Main = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const theme = useTheme() as Theme;
  return (
    <div
      css={css`
        background: ${theme.colors.background};
        background: radial-gradient(
          circle,
          ${theme.colors.background} 0%,
          ${theme.colors.backgroundHilight} 50%,
          ${theme.colors.background} 100%
        );
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        box-sizing: border-box;
      `}
    >
      <Global
        styles={css`
          body {
            padding: 0;
            margin: 0;
            font-size: 18pt;
          }
          * {
            box-sizing: border-box;
            font-family: sans-serif;
          }
        `}
      />
      {children}
    </div>
  );
};
