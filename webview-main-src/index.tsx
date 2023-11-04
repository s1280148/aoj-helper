import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./static/css/index.css";
import { MemoryRouter } from "react-router";
import { ProblemInfoProvider } from "./providers/ProblemInfoProvider";
import { MathJaxContext } from "better-react-mathjax";
import mathJaxConfig from "./util/MathJaxConfig";
import { ThemeInfoProvider } from "./providers/ThemeInfoProvider";

// 以前に表示していた問題の問題IDを指定
// 表示していた問題がなければ"ITP1_1_A"を指定
const problemId = vscode.getState()?.problemId ?? `ITP1_1_A`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <MathJaxContext config={mathJaxConfig}>
    <ProblemInfoProvider>
      <ThemeInfoProvider>
        <MemoryRouter initialEntries={[`/problem/${problemId}/description`]} initialIndex={0}>
          <App />
        </MemoryRouter>
      </ThemeInfoProvider>
    </ProblemInfoProvider>
  </MathJaxContext>,
);
