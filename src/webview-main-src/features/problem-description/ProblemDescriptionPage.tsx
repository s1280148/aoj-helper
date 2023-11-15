import { Alert, Box, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ScrollRestoration, useLocation, useNavigate, useParams } from "react-router-dom";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import "../../assets/css/description.css";
import { ProblemInfoContext } from "../../providers/ProblemInfoProvider";
import { ProblemDescription } from "../../../public-src/types/ApiResponseType";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";
import { ThemeInfoContext } from "../../providers/ThemeInfoProvider";

/**
 * 問題説明ページ
 * @returns 問題説明ページ
 */
const ProblemDescriptionPage: React.FC = () => {
  // パスパラメータから問題IDを取得
  const { problemId } = useParams<"problemId">();

  const navigate = useNavigate();

  useEffect(() => {
    const getProblemInfo = async () => {
      const parameters = {
        lang: "ja",
        problemId: problemId,
      };

      try {
        // 問題の情報を取得し、stateにセット
        const response = await callApi("findByProblemIdDescription", parameters);

        const problemDescription = response as ProblemDescription;

        setProblemInfo(problemDescription);

        vscode.setState({ ...vscode.getState(), problemId: problemDescription.problem_id });
      } catch (e) {
        // エラーが発生した場合、エラートーストを表示し、前の問題を表示
        showErrorToast();

        const beforeProblemId = problemInfo?.problem_id;

        navigate(`/problem/${beforeProblemId}/description`);
      }
    };

    getProblemInfo();
  }, [problemId]);

  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo } = useContext(ProblemInfoContext);

  // エラートーストの表示状態のstate
  const [errorToastOpen, setErrorToastOpen] = useState<boolean>(false);

  /**
   * エラートーストを表示します。
   */
  const showErrorToast = () => {
    setErrorToastOpen(true);
  };

  /**
   * エラートーストを非表示にします。
   */
  const hideErrorToast = () => {
    setErrorToastOpen(false);
  };

  // ダークモードかのstate
  const { isDarkMode, setIsDarkMode } = useContext(ThemeInfoContext);

  return (
    <>
      {problemInfo && (
        <>
          <Box className="flex mt-1">
            <span className="text-xs border inline-block px-1 mr-3 ml-1 my-auto rounded border-red-500 text-red-600 bg-red-200 dark:border-red-900 dark:text-darkMode-text dark:bg-red-900">
              {problemInfo.time_limit} sec
            </span>
            <span className="text-xs border inline-block px-1 my-auto rounded border-red-500 text-red-600 bg-red-200 dark:border-red-900 dark:text-darkMode-text dark:bg-red-900">
              {problemInfo.memory_limit} KB
            </span>
          </Box>
          <MathJax dynamic>
            <Box
              id="description"
              className={isDarkMode ? "description-dark" : "description"}
              dangerouslySetInnerHTML={{ __html: problemInfo.html }}
            ></Box>
          </MathJax>
        </>
      )}
      <Snackbar
        open={errorToastOpen}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        autoHideDuration={2000}
        onClose={hideErrorToast}
        sx={{ right: "auto" }}
      >
        <Alert severity="error">問題が見つかりません。</Alert>
      </Snackbar>
    </>
  );
};

export default ProblemDescriptionPage;
