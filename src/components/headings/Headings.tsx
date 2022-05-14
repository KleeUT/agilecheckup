import { css, SerializedStyles } from "@emotion/react";
import { Theme, useMyTheme } from "../theme/theme";

const sizes = (size?: number) => {
  switch (size) {
    case 3:
      return 1;
    case 2:
      return 2;
    default:
      return 3;
  }
};

const headingStyles = (
  theme: Theme,
  size?: number,
  passedCss?: SerializedStyles
) => css`
  margin: 0;
  color: ${theme.colors.text.copy};
  font-family: sans-serif;
  text-align: center;
  font-size: ${sizes(size)}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 42rem) {
    font-size: ${sizes(size) / 2}rem;
  }
  ${passedCss}
`;
export const H1 = ({
  children,
  size,
  cssOverride,
}: {
  size?: number;
  children: string;
  cssOverride?: SerializedStyles;
}): JSX.Element => {
  const theme = useMyTheme();
  return <h1 css={headingStyles(theme, size, cssOverride)}>{children}</h1>;
};
export const H2 = ({
  children,
  size,
  cssOverride,
}: {
  size?: number;
  children: string;
  cssOverride?: SerializedStyles;
}): JSX.Element => {
  const theme = useMyTheme();
  return <h1 css={headingStyles(theme, size, cssOverride)}>{children}</h1>;
};
