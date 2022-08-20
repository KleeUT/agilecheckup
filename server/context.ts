import { Hasher, ResultsRepository, TimeProvider } from "./resultsRepository";

const hasher: Hasher = {
  sha256: async (str: string): Promise<string> => {
    const hashArray = await crypto.subtle.digest(
      { name: "SHA-256" },
      new TextEncoder().encode(str)
    );
    return String.fromCharCode(...Array.from(new Uint8Array(hashArray)));
  },
};

const timeProvider: TimeProvider = {
  utcDateTimeStringNow: () => new Date().toUTCString(),
};

export function initialise(resultsStore: KVNamespace): {
  storeResults: (ip: string, results: Result[]) => Promise<void>;
  retrieveResults: () => Promise<Result[]>;
} {
  const resultsRepository = new ResultsRepository(
    resultsStore,
    timeProvider,
    hasher
  );
  return {
    storeResults: async (ip: string, results: Result[]) => {
      await resultsRepository.storeResults(results, ip);
    },
    retrieveResults: async () => {
      return await resultsRepository.retrieveResults();
    },
  };
}
