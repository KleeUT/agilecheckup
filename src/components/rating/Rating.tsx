import { css, SerializedStyles } from "@emotion/react";
import { useMyTheme, Variant } from "../theme";

const Good = () => {
  const theme = useMyTheme();
  return (
    <div
      css={css`
        background-color: ${theme.colors.button.feature};
      `}
    />
  );
};

const Bad = () => {
  const theme = useMyTheme();
  return (
    <div
      css={css`
        background-color: ${theme.colors.button.primary};
      `}
    />
  );
};

export const Rating = ({
  percent,
  cssOverride,
}: {
  percent: number;
  cssOverride?: SerializedStyles;
}) => {
  const goods: boolean[] = [];
  for (let i = 0; i < percent; i++) {
    goods.push(true);
  }
  const bads: boolean[] = [];
  for (let i = 0; i < 100 - percent; i++) {
    bads.push(true);
  }
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(100, 1fr);
        height: 10px;
        width: 100%;
        ${cssOverride}
      `}
    >
      {goods.map((x) => (
        <Good />
      ))}
      {bads.map((x) => (
        <Bad />
      ))}
    </div>
  );
};
