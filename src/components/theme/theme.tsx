import { useTheme } from "@emotion/react";
import { Warning } from "../copy/Copy";

export enum Variant {
  dark,
  light,
}
type ColorPalette = {
  background: string;
  backgroundHilight: string;
  text: { copy: string; warning: string };
  button: { text: string; primary: string };
};
export type Theme = {
  variation: Variant;
  colors: ColorPalette;
};
const dark: Theme = {
  variation: Variant.dark,
  colors: {
    background: "#1f151f",
    backgroundHilight: "#3c074b",
    text: { copy: "#ffefff", warning: "#f08023" },
    button: {
      text: "#33aa33",
      primary: "#1f151f",
    },
  },
};
const light: Theme = {
  variation: Variant.light,
  colors: {
    background: "#ffefff",
    backgroundHilight: "#a77cb3",
    text: { copy: "#1f151f", warning: "#be5500" },
    button: { text: "#ffddff", primary: "#33aa33" },
  },
};

export const theme = (variant: Variant) => {
  switch (variant) {
    case Variant.dark:
      return dark;
    case Variant.light:
      return light;
    default:
      return dark;
  }
};

export const useMyTheme = useTheme as () => Theme;
