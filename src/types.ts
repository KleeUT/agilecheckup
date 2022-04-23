type Option = {
  score: number;
  text: string;
};

type Advice = {
  ranks: number[];
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
  questions: Question[];
  currentIndex: number;
};
