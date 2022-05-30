import { css } from "@emotion/react";
import React from "react";
import useCollapse from "react-collapsed";
import { useMyTheme } from "../theme";

export function Collapse({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const theme = useMyTheme();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <button
        css={css`
          background: ${theme.colors.background};
          border: 0;
          color: ${theme.colors.text.copy};
          font-size: 2rem;
          cursor: pointer;
          /* transform: translateY(1rem); */
          width: 100%;

          text-align: left;
        `}
        {...getToggleProps()}
      >
        {isExpanded ? "-" : "+"}
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  );
}
