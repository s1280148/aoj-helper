import { MathJaxContext } from "better-react-mathjax";
import { ProblemInfoProvider } from "./ProblemInfoProvider";
import { ThemeInfoProvider } from "./ThemeInfoProvider";
import CustomMuiThemeProvider from "./CustomMuiThemeProvider";
import mathJaxConfig from "../util/MathJaxConfig";
import { MemoryRouter } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AppProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  // 以前に表示していた問題の問題IDを指定
  // 表示していた問題がなければ"ITP1_1_A"を指定
  const problemId = vscode.getState()?.problemId ?? `ITP1_1_A`;

  return (
    <MathJaxContext config={mathJaxConfig}>
      <ThemeInfoProvider>
        <CustomMuiThemeProvider>
          <ProblemInfoProvider>
            <MemoryRouter initialEntries={[`/problem/${problemId}/description`]} initialIndex={0}>
              {children}
            </MemoryRouter>
          </ProblemInfoProvider>
        </CustomMuiThemeProvider>
      </ThemeInfoProvider>
    </MathJaxContext>
  );
};

export default AppProvider;
