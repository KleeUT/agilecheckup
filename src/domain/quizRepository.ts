export function createRepository(
  localStorage: Storage,
  factory: () => QuizState
) {
  const key = "quiz";
  function store(state: QuizState) {
    localStorage.setItem(key, JSON.stringify(state));
  }
  function initialise(): QuizState {
    const state = factory();
    store(state);
    return state;
  }
  function retrieveState(): QuizState {
    const dehydrated = localStorage.getItem(key);
    if (!dehydrated) {
      return initialise();
    }
    return JSON.parse(dehydrated);
  }

  return {
    retrieveState,
    update: store,
  };
}

export type QuizRepository = ReturnType<typeof createRepository>;
