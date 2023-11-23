import { MathJaxContext } from "better-react-mathjax";
import { ProblemInfoProvider } from "./ProblemInfoProvider";
import CustomMuiThemeProvider from "./CustomMuiThemeProvider";
import mathJaxConfig from "../settings/MathJaxConfig";
import { MemoryRouter } from "react-router-dom";
import { EnvironmentInfoProvider } from "./EnvironmentInfoProvider";

type Props = {
  children: React.ReactNode;
};

/**
 * アプリケーション全体のプロバイダ
 * @param props - props
 * @returns アプリケーション全体のプロバイダ
 */
const AppProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  // 以前に表示していた問題の問題IDを指定
  // 以前に表示していた問題がなければ"ITP1_1_A"を指定
  const problemId = vscode.getState()?.problemId ?? `ITP1_1_A`;

  return (
    <MathJaxContext config={mathJaxConfig}>
      <EnvironmentInfoProvider>
        <CustomMuiThemeProvider>
          <ProblemInfoProvider>
            <MemoryRouter initialEntries={[`/problem/${problemId}/description`]} initialIndex={0}>
              {children}
            </MemoryRouter>
          </ProblemInfoProvider>
        </CustomMuiThemeProvider>
      </EnvironmentInfoProvider>
    </MathJaxContext>
  );
};

export default AppProvider;
