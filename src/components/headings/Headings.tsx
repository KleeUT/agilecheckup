import { css } from "@emotion/react";
import { useMyTheme } from "../theme/theme";

const sizes = (size?: number) => {
  switch (size) {
    case 3:
      return "1rem";
    case 2:
      return "2rem";
    default:
      return "3rem";
  }
};

export const H1 = ({
  children,
  size,
}: {
  children: string;
  size?: number;
}): JSX.Element => {
  const theme = useMyTheme();
  return (
    <h1
      css={css`
        margin: 0;
        margin-bottom: 2rem;
        color: ${theme.colors.text.copy};
        font-family: sans-serif;
        text-align: center;
        font-size: ${sizes(size)};
      `}
    >
      {children}
    </h1>
  );
};
