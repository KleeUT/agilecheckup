import { css } from "@emotion/react";
import { CopyStyle } from "../copy";
import { useMyTheme } from "../theme";

export const ExternalLink = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  const theme = useMyTheme();
  return (
    <a
      {...props}
      css={css`
        ${CopyStyle(theme)}
        text-decoration:underline;
        padding: 0;
      `}
    ></a>
  );
};
