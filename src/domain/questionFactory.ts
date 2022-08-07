export function questionFactory(): Question[] {
  const deployFrequency = (): Question => ({
    text: "How often does you team deploy to production?",
    advice: [
      {
        scores: [1, 2, 3],
        priority: 1,
        text: `There is no way to be truely agile if you are not able to iterate and change quickly. 
        Anything you can do to decrease the time it takes to deiver to production will increase your agility. Allowing you to respond to chnage rather than follwing a plan.`,
      },
      {
        scores: [4],
        priority: 20,
        text: `Looks like you're doing great. If anything deploying to production a little more often coud make you even better`,
      },
      {
        scores: [5],
        priority: 99,
        text: `Looks like you're doing great. But you already knew that.`,
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
        text: "We have no testing",
      },
    ],
  });

  const collaboration = (): Question => ({
    text: "How do you rate the collaboration within your team?",
    advice: [
      {
        scores: [1, 2, 3],
        priority: 3,
        text: `Collaboration is a key factor in ensuring that a team is functional. 
        Without good lines of communication a team will ship the wrong thing or spend time reworking as stake holders clarify requirements after the work is complete.`,
      },
    ],
    options: [
      {
        score: 5,
        text: "Amazing!",
      },
      {
        score: 4,
        text: "Great",
      },
      {
        score: 3,
        text: "Good most of the time we have all the people we need in the room.",
      },
      {
        score: 2,
        text: "Poor, we often feel like we're working with half the data.",
      },
      {
        score: 1,
        text: "What communicaton?",
      },
    ],
  });

  const retrospectives = (): Question => ({
    text: "How often do suggestions raised in team retrospectives result in process change?",
    advice: [
      {
        scores: [1, 2, 3],
        priority: 4,
        text: `At the heart of truely agile teams is self organisation. 
        The team should own the process and feel empowered to adjust those processes as they see fit`,
      },
    ],
    options: [
      {
        score: 5,
        text: "Every retrospective.",
      },
      {
        score: 4,
        text: "Often.",
      },
      {
        score: 3,
        text: "When the suggestions are good enough to take to management.",
      },
      {
        score: 2,
        text: "Rarely if ever. The processes are set out by managment.",
      },
      {
        score: 1,
        text: "We dont have retrospectives.",
      },
    ],
  });

  const monitoring = (): Question => ({
    text: "How confident are you in your production monitoring and alerting?",
    advice: [
      {
        scores: [1, 2, 3],
        priority: 5,
        text: `If you can't see what your users are doing, where they're having problems and what features they're using how can you be confident that you are truely delivierng value to your customers?
        `,
      },
    ],
    options: [
      {
        score: 5,
        text: "Very confident, we know about probelms before our users do.",
      },
      {
        score: 4,
        text: "Pretty good",
      },
      {
        score: 3,
        text: "Somewaht, we have some logs they can usually help us solve issues.",
      },
      {
        score: 2,
        text: "We have some logs, sometimes they can help us.",
      },
      {
        score: 1,
        text: "We have no monitoring or alerting.",
      },
    ],
  });

  const vision = (): Question => ({
    text: "How well would you say the members of the team can describe the product vision?",
    advice: [],
    options: [
      {
        score: 5,
        text: "We all share a vision and can communicate it effectively.",
      },
      {
        score: 4,
        text: "The senior members of the team share a vision and can communicate it.",
      },
      {
        score: 3,
        text: "The product manager has a vision and is available to communicate it.",
      },
      {
        score: 2,
        text: "There is a vision but it is not well defined.",
      },
      {
        score: 1,
        text: "I'm not sure that there is a vision.",
      },
    ],
  });

  // Work out how to word this
  // const visionDelivery = (): Question => ({
  //   text: "How empowered is the team to deliver the product vision?",
  //   advice: [],
  //   options: [
  //     {
  //       score: 5,
  //       text: "The team is free to make decisions that help us get to where we need to go.",
  //     },
  //     {
  //       score: 4,
  //       text: "The senior members of the team share a vision and can communicate it.",
  //     },
  //     {
  //       score: 3,
  //       text: "The product manager has a vision and is available to communicate it.",
  //     },
  //     {
  //       score: 2,
  //       text: "There is a vision but it is not well defined.",
  //     },
  //     {
  //       score: 1,
  //       text: "I'm not sure that there is a vision.",
  //     },
  //   ],
  // });

  return [
    deployFrequency(),
    automatedTests(),
    collaboration(),
    vision(),
    retrospectives(),
    monitoring(),
    // visionDelivery(),
  ];
}
