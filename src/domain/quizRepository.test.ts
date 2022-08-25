import { createRepository } from "./quizRepository";

describe("quizRepository", () => {
  function fakeFactory() {
    const basicQuestion = (): Question => {
      return {
        text: "basic question",
        advice: [],
        options: [
          {
            score: 1,
            text: "Answer 1",
          },
          {
            score: 2,
            text: "Answer 2",
          },
        ],
      };
    };
    const basicQuestion2 = (): Question => {
      return {
        text: "basic question 2",
        advice: [],
        options: [
          {
            score: 1,
            text: "Answer 3",
          },
          {
            score: 2,
            text: "Answer 4",
          },
        ],
      };
    };
    return {
      currentIndex: 0,
      results: [] as Result[],
      complete: false,
      questions: [basicQuestion(), basicQuestion2()],
    };
  }

  function fakeLocalStorage(): {
    mockSet: jest.Mock<any, any>;
    mockGet: jest.Mock<any, any>;
    storage: Storage;
  } {
    const mockGet = jest.fn();
    const mockSet = jest.fn();

    return {
      mockGet,
      mockSet,
      storage: {
        setItem: mockSet,
        getItem: mockGet,
        length: 0,
        clear: jest.fn(),
        key: jest.fn(),
        removeItem: jest.fn(),
      },
    };
  }
  // it("should store state on initialisation", () => {
  //   const fakeStoage = fakeLocalStorage();
  //   const repo = createRepository(fakeStoage.storage, fakeFactory);
  //   const state = repo.initialise();
  //   expect(fakeStoage.mockSet).toHaveBeenCalledWith(
  //     "quiz",
  //     JSON.stringify(state)
  //   );
  // });

  it("should store the state when told to update", () => {
    const fakeStoage = fakeLocalStorage();
    const repo = createRepository(fakeStoage.storage, fakeFactory);
    const state = fakeFactory();
    state.results = [
      {
        question: state.questions[0],
        selectedOption: state.questions[0].options[0],
      },
    ];
    repo.update(state);

    expect(fakeStoage.mockSet).toHaveBeenCalledWith(
      "quiz",
      JSON.stringify(state)
    );
  });
  it("should retrieve from storage when there is data", () => {
    const fakeStoage = fakeLocalStorage();
    const state = fakeFactory();
    state.results = [
      {
        question: state.questions[0],
        selectedOption: state.questions[0].options[0],
      },
    ];
    fakeStoage.mockGet.mockReturnValue(JSON.stringify(state));
    const repo = createRepository(fakeStoage.storage, fakeFactory);
    const rehydratedState = repo.retrieveState();
    expect(fakeStoage.mockGet).toHaveBeenCalledWith("quiz");
    expect(rehydratedState).toEqual(state);
  });
  it("should store a new state when rehydrating with no data", () => {
    const fakeStoage = fakeLocalStorage();
    fakeStoage.mockGet.mockReturnValue(null);
    const repo = createRepository(fakeStoage.storage, fakeFactory);
    const rehydratedState = repo.retrieveState();
    expect(fakeStoage.mockGet).toHaveBeenCalledWith("quiz");
    expect(fakeStoage.mockSet).toHaveBeenCalledWith(
      "quiz",
      JSON.stringify(rehydratedState)
    );
    expect(rehydratedState).toEqual(fakeFactory());
  });
});
