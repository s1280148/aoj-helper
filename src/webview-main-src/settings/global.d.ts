declare type DisplayLanguage = import("./../../public-src/constants/constant").DisplayLanguage;
declare type ProgrammingLanguage = import("./../../public-src/constants/constant").ProgrammingLanguage;

interface VSCodeState {
  problemId: string;
  isArena: boolean;
  arenaId: string;
  arenaProblemId: string;
  displayLanguage: DisplayLanguage;
  programmingLanguage: ProgrammingLanguage;
  isDarkMode: boolean;
}

type VSCode = {
  postMessage(message: object): void;
  getState(): VSCodeState;
  setState(state: VSCodeState): void;
};

declare const vscode: VSCode;
