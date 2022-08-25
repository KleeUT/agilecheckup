export function lightenDarkenColor(col: string, amt: number): string {
  const maxMin = (num: number): number => {
    return Math.max(0, Math.min(255, Math.round(num)));
  };

  const mustBeTwoDecimals = (str: string) => (str === "0" ? "00" : str);
  const redInt = parseInt(col[1] + col[2], 16);
  const greenInt = parseInt(col[3] + col[4], 16);
  const blueInt = parseInt(col[5] + col[6], 16);

  const red = maxMin(redInt + (255 / 100) * amt);
  const green = maxMin(greenInt + (255 / 100) * amt);
  const blue = maxMin(blueInt + (255 / 100) * amt);

  return `#${mustBeTwoDecimals(red.toString(16))}${mustBeTwoDecimals(
    green.toString(16)
  )}${mustBeTwoDecimals(blue.toString(16))}`;
}
