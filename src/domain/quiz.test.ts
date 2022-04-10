import { useQuiz } from "./quiz";
import { useState } from "react";
jest.mock("react", () => ({
  useState: (initial: any) => [initial, jest.fn()],
}));

const asMock = <T>(anything: T): jest.Mock<T> =>
  anything as unknown as jest.Mock<T>;
describe(useQuiz, () => {
  it("should provide the next question", () => {
    // asMock(useState).mockImplementation((v) => [v, jest.fn()]);
    const quiz = useQuiz([]);
  });
});
