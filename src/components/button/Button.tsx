import { css } from "@emotion/react";
import { ButtonHTMLAttributes } from "react";
import { useMyTheme, Theme } from "../theme";
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
  box-shadow: 3px 3px 0px 0px ${theme.colors.button.text};
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

/* background:${theme.colors.background};
        box-shadow: 3px 3px 0px 0px ${theme.colors.primary}; */
export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const theme = useMyTheme();
  return <button type="button" css={buttonStyle(theme)} {...props} />;
};

export const OptionButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const theme = useMyTheme();
  return (
    <button
      type="button"
      css={css`
        ${buttonStyle(theme)};
        background: ${theme.colors.background};
        color: ${theme.colors.button.primary};
        /* box-shadow: 3px 3px 0px 0px ${theme.colors.button.primary}; */
      `}
      {...props}
    />
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
    </Link>
  );
}
