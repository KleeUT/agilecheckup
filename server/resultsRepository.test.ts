import { ResultsRepository, TimeProvider, Hasher } from "./resultsRepository";

const fakeTimeProvider: () => TimeProvider = () => ({
  utcDateTimeStringNow: () => "2022-07-25T08:41:10.707Z",
});

const fakeHasher: () => Hasher = () => ({
  sha256: (str: string) => Promise.resolve(`sha256(${str})`),
});

const result1: () => Result = () => ({
  question: {
    advice: [{ priority: 1, scores: [1], text: "advice text" }],
    options: [{ score: 1, text: "option 1" }],
    text: "Question 1",
  },
  selectedOption: { score: 1, text: "option 1" },
});

const mockNamespace: () => {
  putFn: jest.Mock;
  kv: Partial<KVNamespace>;
} = () => {
  const putFn = jest.fn();
  const kv: Partial<KVNamespace> = {
    put: putFn,
  };
  return {
    kv,
    putFn,
  };
};

describe("ResultRepository", () => {
  it("Should store an item under a date based key", async () => {
    const { kv, putFn } = mockNamespace();
    const anIpAddress = "ip.addr.ess";
    const repository = new ResultsRepository(
      kv as KVNamespace,
      fakeTimeProvider(),
      fakeHasher()
    );

    await repository.storeResults([result1()], anIpAddress);
    const ipHash = await fakeHasher().sha256(anIpAddress);
    const key = `2022-07-25T08:41:10.707Z:${ipHash}`;
    expect(putFn).toHaveBeenCalledWith(key, JSON.stringify([result1()]));
  });
});
