import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Pagination, Snackbar } from "@mui/material";
import JudgeStatusIcon from "../components/JudgeStatusIcon";
import "../static/css/monacoEditor.css";
import Editor, { Monaco } from "@monaco-editor/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { editor } from "monaco-editor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ModelAnswerInfo, ReviewInfo, SessionInfo } from "../../public-src/ApiResponseType";
import { getMonacoEditorLanguageFromProgrammingLanguage } from "../../public-src/util/LanguageUtil";
import { SubmissionStatus } from "../../public-src/util/JudgeInfoUtil";
import { callApi } from "../../webview-public-src/ApiUtil";

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

  return (
    <Box>
      {selectedJudgeId && targetReviewInfo && (
        <Box className="border-2 rounded border-gray-300">
          <Box className="bg-gray-200 px-4 py-2">
            <Box className="text-gray-800 flex">
              <Box className="mr-2">
                <span>Judge ID : </span>
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
                  "
                >
                  {targetReviewInfo.judgeId}
                </span>
              </Box>
              <Box>
                <span>By : </span>
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
                  "
                >
                  {targetReviewInfo.userId}
                </span>
              </Box>
            </Box>
          </Box>
          <Box className="m-3 border-2 border-gray-200">
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
              hover:border-gray-700"
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
                hover:border-gray-700"
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
              hover:border-gray-700"
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
          <table className="w-full mt-4 table-auto text-sm border-2 rounded border-gray-300">
            <thead className="bg-gray-100 border-gray-300">
              <tr>
                <th className="border p-1">Policy</th>
                <th className="border p-1">Judge ID</th>
                <th className="border p-1">Status</th>
                <th className="border p-1">Author</th>
                <th className="border p-1">Rating</th>
                <th className="border p-1">Language</th>
                <th className="border p-1">Time</th>
                <th className="border p-1">Code size</th>
              </tr>
            </thead>
            <tbody>
              {displayingModelAnswerInfoList.map((displayingModelAnswerInfo) => {
                return (
                  <tr
                    className={`
                      text-center 
                      ${displayingModelAnswerInfo.judgeId === selectedJudgeId ? "bg-gray-200" : "hover:bg-gray-200"}
                    `}
                    onClick={
                      displayingModelAnswerInfo.policy === "public"
                        ? () => handleSubmissionRecordRowClick(displayingModelAnswerInfo.judgeId)
                        : () => {}
                    }
                  >
                    <td className="border px-1 py-2  border-gray-300">
                      {displayingModelAnswerInfo.policy === "public" ? (
                        <VisibilityIcon className="text-accept" />
                      ) : (
                        <VisibilityOffIcon className="text-reject" />
                      )}
                    </td>
                    <td className="border px-1 py-2 border-gray-300">{displayingModelAnswerInfo.judgeId}</td>
                    <td className="border px-1 py-2 border-gray-300">
                      <Box className="flex items-center justify-center">
                        <JudgeStatusIcon submissionStatus={SubmissionStatus.STATE_ACCEPTED} />
                      </Box>
                    </td>
                    <td className="border px-1 py-2 border-gray-300">{displayingModelAnswerInfo.userId}</td>
                    <td className="border px-1 py-2 border-gray-300">
                      {Math.round(displayingModelAnswerInfo.rating * 100) / 100}
                    </td>
                    <td className="border px-1 py-2 border-gray-300">{displayingModelAnswerInfo.language}</td>
                    <td className="border px-1 py-2 border-gray-300">{`${displayingModelAnswerInfo.cpuTime} sec`}</td>
                    <td className="border px-1 py-2 border-gray-300">{`${displayingModelAnswerInfo.codeSize} B`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
      {modelAnswerInfoList && (
        <Box className="flex justify-center">
          <Pagination count={Math.ceil(modelAnswerInfoList.length / PAGE_SIZE)} onChange={handlePageChange} />
        </Box>
      )}
    </Box>
  );
};

export default ModelAnswerPage;
