import { assert } from "console";
import { questionFactory } from "./questionFactory";

describe(questionFactory, () => {
  it("Each question should have a unique priority", () => {
    const questions = questionFactory();
    const errors: string[] = [];
    const countedAdvice = questions.reduce((p, c) => {
      c.advice.forEach((a) => {
        p[a.priority] = (p[a.priority] || 0) + 1;
      });
      return p;
    }, {} as { [key: number]: number });
    for (let k in countedAdvice) {
      if (countedAdvice[k] > 1) {
        errors.push(`${k} has ${countedAdvice[k]} values associated`);
      }
    }
    expect(errors).toEqual([]);
  });
});
