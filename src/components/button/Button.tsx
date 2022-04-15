import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";
import { useMyTheme, Theme, lightenDarkenColor } from "../theme";
import { Link } from "gatsby";

const buttonStyle = (theme: Theme) => css`
  font-size: 1.5rem;
  box-sizing: border-box;
  padding: 1rem;
  color: ${theme.colors.text.copy};
  background-color: ${theme.colors.button.primary};
  border-radius: 3px;
  border: 0;
  width: 100%;
  margin-top: 1rem;
  font-family: sans-serif;
  text-decoration: none;
  display: block;
  text-align: center;
  box-shadow: -3px 3px 0px 0px black;
  box-shadow: ${theme.colors.button.primary};
  position: relative;
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
  :active {
    background-color: ${lightenDarkenColor(theme.colors.button.primary, -5)};
    box-shadow: -1px 1px 0px 0px black;
  }
  > div {
    width: 10%;
    height: 15%;
    top: 10px;
    right: 10px;
    border-radius: 3px;
    position: absolute;
    background-color: ${lightenDarkenColor(theme.colors.button.primary, 35)};
  }
  :hover > div {
    background-color: ${lightenDarkenColor(theme.colors.button.primary, 30)};
  }
  :active > div {
    background-color: ${lightenDarkenColor(theme.colors.button.primary, 10)};
  }
`;

/* background:${theme.colors.background};
        box-shadow: 3px 3px 0px 0px ${theme.colors.primary}; */
export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const theme = useMyTheme();
  return (
    <button type="button" css={buttonStyle(theme)} {...props}>
      {children}
      <div />
    </button>
  );
};

export const OptionButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const theme = useMyTheme();
  return (
    <button
      type="button"
      css={css`
        ${buttonStyle(theme)};
        background: ${theme.colors.background};
        color: ${theme.colors.button.primary};
        :active {
          background-color: ${lightenDarkenColor(theme.colors.background, -10)};
        }
      `}
      {...props}
    >
      {children}
      <div />
    </button>
  );
};

export function ButtonLink<T>({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const theme = useMyTheme();

  return (
    <Link to={to} css={buttonStyle(theme)}>
      {children}
      <div />
    </Link>
  );
}
