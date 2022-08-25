export function quizFactory(): QuizState {
  const deployFrequency = (): Question => ({
    text: "How often does you team deploy to production?",
    advice: [
      {
        scores: [1, 2, 3],
        priority: 1,
        text: `There is no way to be truely agile if you are not able to iterate and change quickly. 
        Anything you can do to decrease the time it takes to deiver to production will increase your agility. Allowing you to respond to chnage rather than follwing a plan.`,
      },
    ],
    options: [
      {
        score: 5,
        text: "Up to multiple times per day",
      },
      {
        score: 4,
        text: "Up to once per week",
      },
      {
        score: 3,
        text: "Up to once per fortnight",
      },
      {
        score: 2,
        text: "Not more than once a month",
      },
      {
        score: 1,
        text: "Maybe once a year",
      },
    ],
  });

  const automatedTests = (): Question => ({
    text: "How confident are you deploying with just your automated test suite?",
    advice: [
      {
        scores: [1, 2, 3],
        priority: 2,
        text: "Confidence deploying is a clear indicator of how agile a team is. Implementing better tests and monitoring will help to ensure that your team is able to quickly respond to any change rather than just following a plan.",
      },
    ],
    options: [
      {
        score: 5,
        text: "Very confident",
      },
      {
        score: 4,
        text: "Reasonably confident",
      },
      {
        score: 3,
        text: "Somewhat; We need some manual testing",
      },
      {
        score: 2,
        text: "We run a manual test suite",
      },
      {
        score: 1,
        text: "We have no testing or monitoring",
      },
    ],
  });

  return {
    currentIndex: 0,
    results: [],
  };
}
