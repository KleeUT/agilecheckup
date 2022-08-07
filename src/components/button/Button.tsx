import { css, SerializedStyles } from "@emotion/react";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { useMyTheme, Theme, lightenDarkenColor, Variant } from "../theme";
import { GatsbyLinkProps, Link } from "gatsby";

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
    max-height: 100%;
    font-family: sans-serif;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -3px 3px 0px 0px
      ${lightenDarkenColor(theme.colors.backgroundHilight, -25)};
    /* box-shadow: ${background}; */
    box-shadow: -1px 1px 0px 0px black;
    position: relative;
    :hover {
      font-weight: bold;
      cursor: pointer;
    }
    :active {
      background-color: ${lightenDarkenColor(background, -5)};
    }
    > div {
      width: 10%;
      height: 10%;
      max-height: 10px;
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
  cssOverride,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  cssOverride?: SerializedStyles;
}) => {
  const theme = useMyTheme();
  return (
    <button
      type="button"
      css={css`
        ${buttonStyle(theme, ButtonVariation.base)};
        ${cssOverride}
      `}
      {...props}
    >
      {children}
      {/* <div /> */}
    </button>
  );
};

export function ButtonLink({
  to,
  onClick,
  cssOverride,
  children,
}: {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  cssOverride?: SerializedStyles;
}) {
  const theme = useMyTheme();
  if (to) {
    return (
      <Link
        to={to}
        css={css`
          ${buttonStyle(theme, ButtonVariation.base)};
          ${cssOverride};
        `}
      >
        {children}
        {/* <div /> */}
      </Link>
    );
  } else {
    return (
      <a
        onClick={onClick}
        css={css`
          ${buttonStyle(theme, ButtonVariation.base)};
          ${cssOverride};
        `}
      >
        {children}
        {/* <div /> */}
      </a>
    );
  }
}
export function FeatureButtonLink({
  to,
  children,
  onClick,
  state,
  cssOverride,
}: {
  to?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;

  state?: unknown;
  cssOverride?: SerializedStyles;
}) {
  const theme = useMyTheme();
  if (onClick) {
    return (
      <a
        onClick={onClick}
        css={css`
          ${buttonStyle(theme, ButtonVariation.feature)};
          ${cssOverride}
        `}
      >
        {children}
        {/* <div /> */}
      </a>
    );
  }
  return (
    <Link
      state={state}
      to={to!}
      css={css`
        ${buttonStyle(theme, ButtonVariation.feature)};
        ${cssOverride}
      `}
    >
      {children}
      {/* <div /> */}
    </Link>
  );
}
