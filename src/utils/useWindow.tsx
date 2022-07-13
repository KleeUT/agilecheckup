import { useEffect } from "react";
import { useState } from "react";

export const useWindow = (): { localStorage?: Storage } => {
  const [ls, setLs] = useState<Storage>();
  useEffect(() => {
    if (ls) {
      return;
    }
    setLs(localStorage);
  });
  return { localStorage: ls };
};
