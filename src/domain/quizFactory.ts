export function quizFactory(): QuizState {
  const deployFrequency = (): Question => ({
    text: "How often does you team deploy to production?",
    advice: [],
    options: [
      {
        score: 1,
        text: "Up to multiple times per day",
      },
      {
        score: 2,
        text: "Up to once per week",
      },
      {
        score: 3,
        text: "Up to once per fortnight",
      },
      {
        score: 4,
        text: "Not more than once a month",
      },
      {
        score: 5,
        text: "Maybe once a year",
      },
    ],
  });

  const automatedTests = (): Question => ({
    text: "How confident are you deploying with just your automated test suite?",
    advice: [],
    options: [
      {
        score: 1,
        text: "Very confident",
      },
      {
        score: 2,
        text: "Reasonably confident",
      },
      {
        score: 3,
        text: "Somewhat; We need some manual testing",
      },
      {
        score: 4,
        text: "We run a manual test suite",
      },
      {
        score: 5,
        text: "We have no testing or monitoring",
      },
    ],
  });

  return {
    currentIndex: 0,
    results: [],
    questions: [deployFrequency(), automatedTests()],
  };
}
