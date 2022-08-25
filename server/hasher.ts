import { Hasher } from "./resultsRepository";

export function hasher(): Hasher {
  return {
    sha256: async (str: string): Promise<string> => {
      const hashArray = await crypto.subtle.digest(
        { name: "SHA-256" },
        new TextEncoder().encode(str)
      );
      return String.fromCharCode(...Array.from(new Uint8Array(hashArray)));
    },
  };
}
