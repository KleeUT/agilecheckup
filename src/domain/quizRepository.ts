export function createRepository(
  localStorageProvider: () => Storage | undefined,
  factory: () => QuizState
) {
  const key = "quiz";
  function store(state: QuizState) {
    localStorageProvider()?.setItem(key, JSON.stringify(state));
  }
  function initialise(): QuizState {
    const state = factory();
    store(state);
    return state;
  }
  function retrieveState(): QuizState {
    const dehydrated = localStorageProvider()?.getItem(key);
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
