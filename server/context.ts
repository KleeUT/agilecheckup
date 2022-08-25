import { hasher } from "./hasher";
import { ResultsRepository } from "./resultsRepository";
import { timeProvider } from "./timeProvider";

export function initialise(resultsStore: KVNamespace): {
  storeResults: (ip: string, results: Result[]) => Promise<void>;
  retrieveResults: () => Promise<Result[]>;
} {
  const resultsRepository = new ResultsRepository(
    resultsStore,
    timeProvider(),
    hasher()
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
