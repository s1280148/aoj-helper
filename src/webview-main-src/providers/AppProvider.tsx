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
  const vscodeState = vscode.getState();

  const problemId = vscodeState?.problemId ?? `ITP1_1_A`;

  const isArena = vscodeState?.isArena ?? false;

  const initialEntry = isArena
    ? `/problem/arena/${vscodeState!.arenaId}/${vscodeState.arenaProblemId}/${vscodeState.problemId}/description`
    : `/problem/${problemId}/description`;

  return (
    <MathJaxContext config={mathJaxConfig}>
      <EnvironmentInfoProvider>
        <CustomMuiThemeProvider>
          <ProblemInfoProvider>
            <MemoryRouter initialEntries={[initialEntry]} initialIndex={0}>
              {children}
            </MemoryRouter>
          </ProblemInfoProvider>
        </CustomMuiThemeProvider>
      </EnvironmentInfoProvider>
    </MathJaxContext>
  );
};

export default AppProvider;
