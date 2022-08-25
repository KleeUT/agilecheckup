type Option = {
  score: number;
  text: string;
};

type Advice = {
  scores: number[];
  text: string;
  priority: number;
};

type Question = {
  text: string;
  options: Option[];
  advice: Advice[];
};

type Result = {
  question: Question;
  selectedOption: Option;
};

type QuizState = {
  results: Result[];
  currentIndex: number;
};

type QuizAnalysis = {
  results: Result[];
  prioritisedAdvice: Advice[];
  scorePercent: number;
};

type ResultSubmissionBody = {
  data: {
    results: Result[];
  };
};
