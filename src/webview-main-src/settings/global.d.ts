interface VSCodeState {
  problemId: string;
  isDarkMode: boolean;
}

type VSCode = {
  postMessage(message: object): void;
  getState(): VSCodeState;
  setState(state: VSCodeState): void;
};

declare const vscode: VSCode;
