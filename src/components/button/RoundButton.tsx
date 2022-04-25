import { css } from "@emotion/react";
import { Button } from "./Button";
export const RoundButton = () => {
  return (
    <div
      css={css`
        max-width: 15%;
      `}
    >
      <Button>Prev</Button>;
    </div>
  );
};
