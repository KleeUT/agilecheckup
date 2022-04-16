import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";
import { useMyTheme, Theme, lightenDarkenColor, Variant } from "../theme";
import { Link } from "gatsby";

enum ButtonVariation {
  base,
  feature,
}

const buttonStyle = (theme: Theme, variation: ButtonVariation) => {
  const background =
    variation === ButtonVariation.base
      ? theme.colors.button.primary
      : theme.colors.button.feature;
  return css`
    font-size: 1.5rem;
    box-sizing: border-box;
    padding: 1rem;
    color: ${theme.colors.text.copy};
    background-color: ${background};
    border-radius: 1rem;
    border: 0;
    width: 100%;
    margin-top: 1rem;
    font-family: sans-serif;
    text-decoration: none;
    display: block;
    text-align: center;
    box-shadow: -3px 3px 0px 0px
      ${lightenDarkenColor(theme.colors.backgroundHilight, -25)};
    box-shadow: ${background};
    position: relative;
    :hover {
      font-weight: bold;
      cursor: pointer;
    }
    :active {
      background-color: ${lightenDarkenColor(background, -5)};
      box-shadow: -1px 1px 0px 0px black;
    }
    > div {
      width: 10%;
      height: 10px;
      top: 10px;
      right: 10px;
      border-radius: 3px;
      position: absolute;
      background-color: ${lightenDarkenColor(background, 60)};
    }
    :hover > div {
      background-color: ${lightenDarkenColor(background, 40)};
    }
    :active > div {
      background-color: ${lightenDarkenColor(background, 10)};
    }
  `;
};

/* background:${theme.colors.background};
        box-shadow: 3px 3px 0px 0px ${theme.colors.primary}; */
export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const theme = useMyTheme();
  return (
    <button
      type="button"
      css={buttonStyle(theme, ButtonVariation.base)}
      {...props}
    >
      {children}
      <div />
    </button>
  );
};

export function ButtonLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const theme = useMyTheme();

  return (
    <Link to={to} css={buttonStyle(theme, ButtonVariation.base)}>
      {children}
      <div />
    </Link>
  );
}
export function FeatureButtonLink({
  to,
  children,
  state,
}: {
  to: string;
  children: React.ReactNode;
  state?: unknown;
}) {
  const theme = useMyTheme();

  return (
    <Link
      state={state}
      to={to}
      css={buttonStyle(theme, ButtonVariation.feature)}
    >
      {children}
      <div />
    </Link>
  );
}
