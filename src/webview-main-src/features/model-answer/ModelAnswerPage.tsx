import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Pagination, PaginationItem, Snackbar } from "@mui/material";
import JudgeStatusIcon from "../../components/Element/JudgeStatusIcon";
import "../../assets/css/monacoEditor.css";
import Editor, { Monaco } from "@monaco-editor/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { editor } from "monaco-editor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ModelAnswerInfo, ReviewInfo, SessionInfo } from "../../../public-src/types/ApiResponseType";
import { getMonacoEditorLanguageFromProgrammingLanguage } from "../../../public-src/utils/LanguageUtil";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";
import { ThemeInfoContext } from "../../providers/ThemeInfoProvider";
import { SubmissionStatus } from "../../../public-src/constants/constant";

const ModelAnswerPage: React.FC = () => {
  const { problemId } = useParams<"problemId">();

  const [modelAnswerInfoList, setModelAnswerInfoList] = useState<null | ModelAnswerInfo[]>(null);

  const [displayingModelAnswerInfoList, setDisplayingModelAnswerInfoList] = useState<null | ModelAnswerInfo[]>(null);

  const [selectedJudgeId, setSelectedJudgeId] = useState<null | number>(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    const findModelAnswerList = async () => {
      const parametersForSession = {};
      const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

      const language = sessionResponse.defaultProgrammingLanguage;

      const parameterForModelAnswer = {
        problemId: problemId,
        lang: language,
        page: 0,
        size: 65536,
      };

      const modelAnswerResponse = (await callApi(
        "findByProblemIdAndLanguageModelAnswers",
        parameterForModelAnswer,
      )) as ModelAnswerInfo[];

      setModelAnswerInfoList(modelAnswerResponse);
    };

    findModelAnswerList();
  }, [problemId]);

  useEffect(() => {
    setDisplayingModelAnswerInfoList(modelAnswerInfoList?.slice(0, 10) ?? null);
  }, [modelAnswerInfoList]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + PAGE_SIZE;

    setDisplayingModelAnswerInfoList(modelAnswerInfoList!.slice(startIndex, endIndex));
  };

  const handleSubmissionRecordRowClick = (judgeId: number) => {
    setSelectedJudgeId(judgeId);
  };

  const [targetReviewInfo, setTargetReviewInfo] = useState<null | ReviewInfo>();

  useEffect(() => {
    if (selectedJudgeId) {
      const findByJudgeIdReivew = async () => {
        const parameters = {
          judgeId: selectedJudgeId,
        };

        const response = (await callApi("findByJudgeIdReivew", parameters)) as ReviewInfo;

        setTargetReviewInfo(response);

        window.scrollTo(0, 0);
        editorRef.current?.revealLine(1);
      };

      findByJudgeIdReivew();
    }
  }, [selectedJudgeId]);

  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
  };

  const handleCloseButtonClick = () => {
    setSelectedJudgeId(null);
    setTargetReviewInfo(null);
  };

  const [isOpenCopyToast, setIsOpenCopyToast] = useState<boolean>(false);

  const handleCopyButtonClick = () => {
    setIsOpenCopyToast(true);
  };

  const hideCopyToast = () => {
    setIsOpenCopyToast(false);
  };

  const handleDiffButtonClick = () => {
    vscode.postMessage({
      type: "showDiff",
      content: targetReviewInfo!.sourceCode,
    });
  };

  const { isDarkMode, setIsDarkMode } = useContext(ThemeInfoContext);

  return (
    <Box>
      {selectedJudgeId && targetReviewInfo && (
        <Box className="border-2 rounded border-gray-300 dark:border-darkMode-dark dark:bg-darkMode-darkest">
          <Box className="bg-gray-200 px-4 py-2 dark:bg-darkMode-dark">
            <Box className="text-gray-800 flex  dark:text-darkmode-text">
              <Box className="mr-2">
                <span className="dark:text-darkMode-text">Judge ID : </span>
                <span
                  className="
                  text-xs
                  border
                  inline-block
                  p-0.5
                  rounded
                  text-white
                  bg-accept
                  border-accept
                  dark:bg-accept-dark
                  dark:border-accept-dark
                  dark:text-darkMode-text
                  "
                >
                  {targetReviewInfo.judgeId}
                </span>
              </Box>
              <Box>
                <span className="dark:text-darkMode-text">By : </span>
                <span
                  className="
                  text-xs
                  border
                  inline-block
                  p-0.5
                  rounded
                  text-white
                  bg-accept
                  border-accept
                  dark:bg-accept-dark
                  dark:border-accept-dark
                  dark:text-darkMode-text
                  "
                >
                  {targetReviewInfo.userId}
                </span>
              </Box>
            </Box>
          </Box>
          <Box className="m-3 border-2 border-gray-200 dark:border-darkMode-dark">
            <Editor
              height="70vh"
              language={getMonacoEditorLanguageFromProgrammingLanguage(targetReviewInfo.language)}
              value={targetReviewInfo.sourceCode}
              options={{
                minimap: {
                  enabled: false,
                },
                readOnly: true,
                scrollBeyondLastLine: false,
              }}
              onMount={handleEditorDidMount}
              theme={isDarkMode ? "vs-dark" : "light"}
            />
          </Box>
          <Box className="m-3 text-right">
            <button
              className="
              items-center
              border
              rounded
              w-16
              transform
              duration-150
              mr-2
              focus:outline-none
              border-gray-400
              text-gray-800
              hover:border-gray-700
              dark:bg-darkMode
              dark:border-darkMode
              dark:text-darkMode-text
              dark:hover:border-darkMode-lighter"
              type="button"
              onClick={handleDiffButtonClick}
            >
              diff
            </button>
            <CopyToClipboard text={targetReviewInfo.sourceCode} onCopy={handleCopyButtonClick}>
              <button
                className="
                items-center
                border
                rounded
                w-16
                transform
                duration-150
                mr-2
                focus:outline-none
                border-gray-400
                text-gray-800
                hover:border-gray-700
                dark:bg-darkMode
                dark:border-darkMode
                dark:text-darkMode-text
                dark:hover:border-darkMode-lighter"
                type="button"
              >
                コピー
              </button>
            </CopyToClipboard>
            <button
              className="
              items-center
              border
              rounded
              w-16
              transform
              duration-150
              focus:outline-none
              border-gray-400
              text-gray-800
              hover:border-gray-700
              dark:bg-darkMode
              dark:border-darkMode
              dark:text-darkMode-text
              dark:hover:border-darkMode-lighter"
              type="button"
              onClick={handleCloseButtonClick}
            >
              閉じる
            </button>
          </Box>
          <Snackbar
            open={isOpenCopyToast}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            autoHideDuration={1000}
            onClose={hideCopyToast}
            sx={{ right: "auto" }}
          >
            <Alert severity="success">コピーしました</Alert>
          </Snackbar>
        </Box>
      )}
      {displayingModelAnswerInfoList && (
        <Box className="flex justify-center mb-5">
          <table className="w-full mt-4 table-auto text-sm border-2 rounded border-gray-300 dark:border-darkMode-dark">
            <thead className="bg-gray-100 border-gray-300 dark:bg-darkMode-dark dark:border-darkMode-dark">
              <tr>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Policy</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Judge ID</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Status</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Author</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Rating</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Language</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Time</th>
                <th className="border p-1 dark:border-darkMode-dark dark:text-darkMode-text">Code size</th>
              </tr>
            </thead>
            <tbody>
              {displayingModelAnswerInfoList.map((displayingModelAnswerInfo) => {
                return (
                  <tr
                    className={`
                      text-center 
                      ${
                        displayingModelAnswerInfo.judgeId === selectedJudgeId
                          ? "bg-gray-200 dark:bg-darkMode"
                          : "hover:bg-gray-200 dark:hover:bg-darkMode"
                      }
                    `}
                    onClick={
                      displayingModelAnswerInfo.policy === "public"
                        ? () => handleSubmissionRecordRowClick(displayingModelAnswerInfo.judgeId)
                        : () => {}
                    }
                  >
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark">
                      {displayingModelAnswerInfo.policy === "public" ? (
                        <VisibilityIcon className="text-accept dark:text-accept-dark" />
                      ) : (
                        <VisibilityOffIcon className="text-reject dark:text-reject-dark" />
                      )}
                    </td>
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">
                      {displayingModelAnswerInfo.judgeId}
                    </td>
                    <td className="border px-1 py-2 border-gray-300  dark:border-darkMode-dark">
                      <Box className="flex items-center justify-center">
                        <JudgeStatusIcon submissionStatus={SubmissionStatus.STATE_ACCEPTED} />
                      </Box>
                    </td>
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">
                      {displayingModelAnswerInfo.userId}
                    </td>
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">
                      {Math.round(displayingModelAnswerInfo.rating * 100) / 100}
                    </td>
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">
                      {displayingModelAnswerInfo.language}
                    </td>
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">{`${displayingModelAnswerInfo.cpuTime} sec`}</td>
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">{`${displayingModelAnswerInfo.codeSize} B`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
      {modelAnswerInfoList && (
        <Box className="flex justify-center">
          <Pagination
            count={Math.ceil(modelAnswerInfoList.length / PAGE_SIZE)}
            onChange={handlePageChange}
            renderItem={(item) => <PaginationItem {...item} className="dark:text-darkMode-text" />}
          />
        </Box>
      )}
    </Box>
  );
};

export default ModelAnswerPage;