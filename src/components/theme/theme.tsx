import { useTheme } from "@emotion/react";
import { Warning } from "../copy/Copy";
import { lightenDarkenColor } from "./colorUtils";

export enum Variant {
  dark,
  light,
}
type ColorPalette = {
  background: string;
  backgroundHilight: string;
  text: { copy: string; warning: string };
  button: { feature: string; primary: string };
};
export type Theme = {
  variation: Variant;
  colors: ColorPalette;
};
const dark: Theme = {
  variation: Variant.dark,
  colors: {
    background: "#3c074b",
    backgroundHilight: lightenDarkenColor("#3c074b", 10),
    text: { copy: "#ffefff", warning: "#f08023" },
    button: {
      feature: "#08e4f0",
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
    button: { primary: "#ffddff", feature: "#40afff" },
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
