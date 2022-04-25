import { css } from "@emotion/react";
import { Button } from "../button";
import { Headings } from "../headings";
export const Header = ({ onPrevClicked }: { onPrevClicked?: () => void }) => {
  return (
    <div
      css={css`
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 100px;
        `}
      >
        {onPrevClicked ? (
          <Button
            onClick={() => {
              onPrevClicked();
            }}
          >
            Prev
          </Button>
        ) : null}
      </div>
      <Headings.H1>Agile Checkup</Headings.H1>
      <div />
    </div>
  );
};
