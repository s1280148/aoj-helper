declare type ProgrammingLanguage = import("./../../public-src/constants/constant").ProgrammingLanguage;

interface VSCodeState {
  problemId: string;
  programmingLanguage: ProgrammingLanguage;
  isDarkMode: boolean;
}

type VSCode = {
  postMessage(message: object): void;
  getState(): VSCodeState;
  setState(state: VSCodeState): void;
};

declare const vscode: VSCode;
