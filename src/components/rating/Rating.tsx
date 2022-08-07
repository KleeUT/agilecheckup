import { css, SerializedStyles } from "@emotion/react";
import { Headings } from "../headings";
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

const ratings = [
  { upto: 10, rating: "hippopotamus" },
  { upto: 30, rating: "rhinoceros" },
  { upto: 60, rating: "giraffe" },
  { upto: 90, rating: "lion" },
  { upto: 100, rating: "cheetah" },
];

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
    <div>
      <Headings.H2 size={2}>
        Your team is agile like a{" "}
        {ratings.find((x) => percent < x.upto)?.rating || ""}
      </Headings.H2>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(100, 1fr);
          height: 10px;
          width: 100%;
          ${cssOverride}
        `}
      >
        {goods.map((x, i) => (
          <Good key={i} />
        ))}
        {bads.map((x, i) => (
          <Bad key={i} />
        ))}
      </div>
    </div>
  );
};
