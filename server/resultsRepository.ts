export type TimeProvider = {
  utcDateTimeStringNow: () => string;
};

export type Hasher = {
  sha256: (str: string) => Promise<string>;
};

export class ResultsRepository {
  constructor(
    private resultsNamespace: KVNamespace,
    private timeProvider: TimeProvider,
    private hasher: Hasher
  ) {}

  async storeResults(results: Result[], ip: string): Promise<void> {
    const key = await this.keyFromIp(ip);
    await this.resultsNamespace.put(key, JSON.stringify(results));
  }

  async retrieveResults(): Promise<Result[]> {
    const keys = await this.resultsNamespace.list();
    const itemsPromise = keys.keys.map(async (key) => {
      const n = await this.resultsNamespace.get(key.name);
      if (!n) {
        return null;
      }
      return JSON.parse(n) as Result;
    });
    const results = (await Promise.all(itemsPromise)).filter(
      (x) => x
    ) as Result[];
    return results;
  }

  private async keyFromIp(ip: string): Promise<string> {
    const hash = await this.hasher.sha256(ip);
    return `${this.timeProvider.utcDateTimeStringNow()}:${btoa(hash)}`;
  }
}
