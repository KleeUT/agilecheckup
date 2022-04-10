import { css } from "@emotion/react";
import { Theme, useMyTheme } from "../theme";

const baseStyle = (theme: Theme) => css`
  margin: 0;
  padding: 2rem;
  background: ${theme.colors.background};
  color: ${theme.colors.text.copy};
  border-radius: 0.5rem;
`;

export const Copy = ({ children }: { children: string }) => {
  const theme = useMyTheme();
  return <p css={baseStyle(theme)}>{children}</p>;
};

export const Warning = ({ children }: { children: string }) => {
  const theme = useMyTheme();
  return (
    <p
      css={css`
        ${baseStyle(theme)}
        color: ${theme.colors.text.warning};
        text-align: center;
      `}
    >
      {children}
    </p>
  );
};
