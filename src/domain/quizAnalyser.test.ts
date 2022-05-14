import { quizAnalyser } from "./quizAnalyser";
describe(quizAnalyser, () => {
  function question1(): Question {
    return {
      text: "question 1",
      advice: [
        { scores: [1, 2], text: "Question 1 low scores", priority: 3 },
        { scores: [3, 4, 5], text: "Question 1 high scores", priority: 4 },
      ],
      options: [
        {
          text: "Question 1 score 1",
          score: 1,
        },
        {
          text: "Question 1 score 2",
          score: 2,
        },
        {
          text: "Question 1 score 3",
          score: 3,
        },
        {
          text: "Question 1 score 4",
          score: 4,
        },
        {
          text: "Question 1 score 5",
          score: 5,
        },
      ],
    };
  }
  function question2(): Question {
    return {
      text: "question 2",
      advice: [
        { scores: [1, 2], text: "Question 2 low scores", priority: 2 },
        { scores: [3, 4, 5], text: "Question 2 high scores", priority: 1 },
      ],
      options: [
        {
          text: "Question 2 score 1",
          score: 1,
        },
        {
          text: "Question 2 score 2",
          score: 2,
        },
        {
          text: "Question 2 score 3",
          score: 3,
        },
        {
          text: "Question 2 score 4",
          score: 4,
        },
        {
          text: "Question 2 score 5",
          score: 5,
        },
      ],
    };
  }
  function question3(): Question {
    return {
      text: "question 3",
      advice: [
        { scores: [1, 2], text: "Question 3 low scores", priority: 2 },
        { scores: [3, 4, 5], text: "Question 3 high scores", priority: 1 },
      ],
      options: [
        {
          text: "Question 3 score 1",
          score: 1,
        },
        {
          text: "Question 3 score 2",
          score: 2,
        },
        {
          text: "Question 3 score 3",
          score: 3,
        },
        {
          text: "Question 3 score 4",
          score: 4,
        },
        {
          text: "Question 3 score 5",
          score: 5,
        },
      ],
    };
  }
  describe("Score calculation", () => {
    it("should calculate the percentage", () => {
      const questions = [question1(), question2(), question3()];
      const quiz: QuizState = {
        currentIndex: 3,
        questions,
        results: [1, 2, 3].map(
          (x, i) =>
            ({
              question: questions[i],
              selectedOption: {
                score: x,
                text: "",
                advice: [{ text: "", scores: [1, 2, 3, 4, 5] }],
              },
            } as Result)
        ),
      };
      const result = quizAnalyser(quiz);
      expect(result.scorePercent).toEqual(40);
    });
    it("should calculate the percentage", () => {
      const questions = [question1(), question2(), question3()];

      const quiz: QuizState = {
        currentIndex: 3,
        questions,
        results: [2, 2, 3].map(
          (x, i) =>
            ({
              question: questions[i],
              selectedOption: {
                score: x,
                text: "",
                advice: [{ text: "", scores: [1, 2, 3, 4, 5] }],
              },
            } as Result)
        ),
      };
      const result = quizAnalyser(quiz);
      expect(result.scorePercent).toEqual(140 / 3);
    });
  });
  describe("Advice", () => {
    function aQuizState(results: Result[]): QuizState {
      return {
        currentIndex: results.length - 1,
        questions: results.map((x) => x.question),
        results: results,
      };
    }
    test.each`
      option | advice
      ${0}   | ${0}
      ${1}   | ${0}
      ${2}   | ${1}
      ${3}   | ${1}
    `(
      "Should select the correct advice ($advice) for a question with selected option ($option)",
      ({ option, advice }) => {
        const question = question1();
        const quizState = aQuizState([
          {
            question,
            selectedOption: question.options[option],
          },
        ]);
        const result = quizAnalyser(quizState);
        expect(result.prioritisedAdvice[0]).toEqual(question.advice[advice]);
      }
    );
    it("Should prioritize based on question priority", () => {
      const quizState = aQuizState([
        {
          question: question1(),
          selectedOption: question1().options[1],
        },
        {
          question: question2(),
          selectedOption: question2().options[3],
        },
      ]);
      const result = quizAnalyser(quizState);
      expect(result.prioritisedAdvice).toEqual([
        question2().advice[1],
        question1().advice[0],
      ]);
    });
  });
});
