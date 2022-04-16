import { css } from "@emotion/react";
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

export const Rating = ({ percent }: { percent: number }) => {
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
