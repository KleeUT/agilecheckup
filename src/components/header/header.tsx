import { css } from "@emotion/react";
import { Button } from "../button";
import { Headings } from "../headings";
export const Header = ({ onPrevClicked }: { onPrevClicked?: () => void }) => {
  return (
    <div
      css={css`
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {onPrevClicked ? (
        <Button
          cssOverride={css`
            width: 100px;
          `}
          onClick={() => {
            onPrevClicked();
          }}
        >
          Prev
        </Button>
      ) : null}

      <Headings.H1>Agile Checkup</Headings.H1>
      <div />
    </div>
  );
};
