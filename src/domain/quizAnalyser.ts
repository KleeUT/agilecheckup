import { Quiz } from "./quiz";

function prioritizeAdvice(completedQuiz: QuizState): Advice[] {
  const advice = completedQuiz.results
    .map((result) =>
      result.question.advice.find((question) =>
        question.scores.includes(result.selectedOption.score)
      )
    )
    .filter((x) => x != undefined) as Advice[];

  console.table(advice);
  advice.sort((a, b) => (a < b ? 1 : -1));
  console.table(advice);

  return advice;
}

export function quizAnalyser(completedQuiz: QuizState): QuizAnalysis {
  const scorePercent =
    completedQuiz.results.reduce((previous, current) => {
      const result = Math.round((current.selectedOption.score / 5) * 100);
      return result + previous;
    }, 0) / completedQuiz.results.length;

  return {
    prioritisedAdvice: prioritizeAdvice(completedQuiz),
    results: completedQuiz.results,
    scorePercent,
  };
}
