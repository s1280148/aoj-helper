import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Pagination, Snackbar } from "@mui/material";
import JudgeStatusIcon from "../components/JudgeStatusIcon";
import "../static/css/monacoEditor.css";
import Editor, { Monaco } from "@monaco-editor/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ReviewInfo, SessionInfo, SubmissionRecord } from "../../public-src/ApiResponseType";
import { SubmissionStatus, getStatusFromSubmissionStatus } from "../../public-src/util/JudgeInfoUtil";
import { getMonacoEditorLanguageFromProgrammingLanguage } from "../../public-src/util/LanguageUtil";
import { timeStampToDate } from "../../public-src/util/DateUtil";
import { editor } from "monaco-editor";
import { callApi } from "../../webview-public-src/ApiUtil";

const SubmissionRecordPage: React.FC = () => {
  const { problemId } = useParams<"problemId">();

  const [submissionRecordList, setSubmissionRecordList] = useState<null | SubmissionRecord[]>(null);

  const [displayingSubmissionRecordList, setDisplayingSubmissionRecordList] = useState<null | SubmissionRecord[]>(null);

  type JudgeInfo = {
    judgeId: number;
    submissionStatus: SubmissionStatus;
  };

  const [selectedJudgeInfo, setSelectedJudgeInfo] = useState<null | JudgeInfo>(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    const findSubmissionRecordList = async () => {
      const parametersForSession = {};
      const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      const parameterForSubmissionRecord = {
        userId: userId,
        problemId: problemId,
        page: 0,
        size: 65536,
      };

      const submissionRecordResponse = (await callApi(
        "findByUserIdAndProblemIdSubmissionRecords",
        parameterForSubmissionRecord,
      )) as SubmissionRecord[];

      setSubmissionRecordList(submissionRecordResponse);
    };

    findSubmissionRecordList();
  }, [problemId]);

  useEffect(() => {
    setDisplayingSubmissionRecordList(submissionRecordList?.slice(0, 10) ?? null);
  }, [submissionRecordList]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + PAGE_SIZE;

    setDisplayingSubmissionRecordList(submissionRecordList!.slice(startIndex, endIndex));
  };

  const handleSubmissionRecordRowClick = (judgeId: number, submissionStatus: SubmissionStatus) => {
    const judgeInfo: JudgeInfo = {
      judgeId: judgeId,
      submissionStatus: submissionStatus,
    };

    setSelectedJudgeInfo(judgeInfo);
  };

  const [targetReviewInfo, setTargetReviewInfo] = useState<null | ReviewInfo>();

  useEffect(() => {
    if (selectedJudgeInfo) {
      const findByJudgeIdReivew = async () => {
        const parameters = {
          judgeId: selectedJudgeInfo.judgeId,
        };

        const response = (await callApi("findByJudgeIdReivew", parameters)) as ReviewInfo;

        setTargetReviewInfo(response);

        window.scrollTo(0, 0);
        editorRef.current?.revealLine(1);
      };

      findByJudgeIdReivew();
    }
  }, [selectedJudgeInfo]);

  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
  };

  const handleCloseButtonClick = () => {
    setSelectedJudgeInfo(null);
    setTargetReviewInfo(null);
  };

  const [isOpenCopyToast, setIsOpenCopyToast] = useState<boolean>(false);

  const handleCopyButtonClick = () => {
    setIsOpenCopyToast(true);
  };

  const hideCopyToast = () => {
    setIsOpenCopyToast(false);
  };

  return (
    <Box>
      {selectedJudgeInfo && targetReviewInfo && (
        <Box className="border-2 rounded border-gray-300">
          <Box className="bg-gray-200 px-4 py-2">
            <Box className="text-gray-800 flex">
              <Box className="mr-2">
                <span>Judge ID : </span>
                <span
                  className={`
                  text-xs
                  border
                  inline-block
                  p-0.5
                  rounded
                  text-white
                  bg-${getStatusFromSubmissionStatus(selectedJudgeInfo.submissionStatus)}
                  border-${getStatusFromSubmissionStatus(selectedJudgeInfo.submissionStatus)}
                  `}
                >
                  {targetReviewInfo.judgeId}
                </span>
              </Box>
              <Box>
                <span>By : </span>
                <span
                  className={`
                  text-xs
                  border
                  inline-block
                  p-0.5
                  rounded
                  text-white
                  bg-${getStatusFromSubmissionStatus(selectedJudgeInfo.submissionStatus)}
                  border-${getStatusFromSubmissionStatus(selectedJudgeInfo.submissionStatus)}
                  `}
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
      {displayingSubmissionRecordList && (
        <Box className="flex justify-center mb-5">
          <table className="w-full mt-4 table-auto text-sm border-2 rounded border-gray-300">
            <thead className="bg-gray-100 border-gray-300">
              <tr>
                <th className="border p-1">Judge ID</th>
                <th className="border p-1">Status</th>
                <th className="border p-1">Language</th>
                <th className="border p-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayingSubmissionRecordList.map((displayingSubmissionRecord) => {
                return (
                  <tr
                    className={`
                      text-center 
                      ${
                        displayingSubmissionRecord.judgeId === selectedJudgeInfo?.judgeId
                          ? "bg-gray-200"
                          : "hover:bg-gray-200"
                      }
                    `}
                    onClick={() =>
                      handleSubmissionRecordRowClick(
                        displayingSubmissionRecord.judgeId,
                        displayingSubmissionRecord.status,
                      )
                    }
                  >
                    <td className="border px-1 py-2 border-gray-300">{displayingSubmissionRecord.judgeId}</td>
                    <td className="border px-1 py-2 border-gray-300">
                      <Box className="flex items-center justify-center">
                        <JudgeStatusIcon submissionStatus={displayingSubmissionRecord.status} />
                      </Box>
                    </td>
                    <td className="border px-1 py-2 border-gray-300">{displayingSubmissionRecord.language}</td>
                    <td className="border px-1 py-2 border-gray-300">
                      {timeStampToDate(displayingSubmissionRecord.submissionDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
      {submissionRecordList && (
        <Box className="flex justify-center">
          <Pagination count={Math.ceil(submissionRecordList.length / PAGE_SIZE)} onChange={handlePageChange} />
        </Box>
      )}
    </Box>
  );
};

export default SubmissionRecordPage;