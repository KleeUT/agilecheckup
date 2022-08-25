import { css, SerializedStyles } from "@emotion/react";
import { Link } from "gatsby";
import { CopyStyle } from "../copy";
import { useMyTheme } from "../theme";

export const ExternalLink = ({
  cssOverride,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  cssOverride?: SerializedStyles;
}) => {
  const theme = useMyTheme();
  return (
    <a
      {...props}
      css={css`
        ${CopyStyle(theme)}
        text-decoration:underline;
        padding: 0;
        ${cssOverride}
      `}
    ></a>
  );
};

export const InternalLink = ({
  to,
  cssOverride,
  children,
}: {
  to: string;
  children: React.ReactNode;
  cssOverride?: SerializedStyles;
}) => {
  const theme = useMyTheme();
  return (
    <Link
      to={to}
      css={css`
        ${CopyStyle(theme)}
        text-decoration:underline;
        padding: 0;
        ${cssOverride}
      `}
    >
      {children}
    </Link>
  );
};
