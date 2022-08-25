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
    color: ${variation === ButtonVariation.feature
      ? theme.colors.background
      : theme.colors.text.copy};
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
    text-align: center;
    :hover {
      font-weight: bold;
      cursor: pointer;
    }
    :active {
      background-color: ${lightenDarkenColor(background, -5)};
    }
  `;
};

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
    </button>
  );
};

export function ButtonLink({
  to,
  href,
  onClick,
  cssOverride,
  children,
}: {
  to?: string;
  href?: string;
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
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        onClick={onClick}
        css={css`
          ${buttonStyle(theme, ButtonVariation.base)};
          ${cssOverride};
        `}
      >
        {children}
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
