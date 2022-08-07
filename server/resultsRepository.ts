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

  private async keyFromIp(ip: string): Promise<string> {
    return `${this.timeProvider.utcDateTimeStringNow()}:${await this.hasher.sha256(
      ip
    )}`;
  }
}
