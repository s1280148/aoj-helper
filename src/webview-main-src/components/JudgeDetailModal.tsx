import { Box, Dialog } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "../static/css/judgeDetail.css";
import {
  SubmissionStatus,
  getClassNameFromShortStatusName,
  getClassNameFromSubmissionStatus,
  getShortStatusNameFromSubmissionStatus,
  getSubmissionProgressFromSubmissionStatus,
} from "../../public-src/util/JudgeInfoUtil";
import { JudgeDetail } from "../../public-src/ApiResponseType";

/**
 * ジャッジ詳細モーダル
 * @returns ジャッジ詳細モーダル
 */
const JudgeDetailModal: React.FC = () => {
  useEffect(() => {
    // 拡張機能からメッセージを受信
    window.addEventListener("message", (event) => {
      const message = event.data;

      switch (message.type) {
        case "judgeDetail":
          switch (message.command) {
            case "show":
              setJudgeDetail(message.contents);
              openJudgeDetailModal();
              break;
          }
          break;
      }
    });
  }, []);

  // モーダルの開閉のstate
  const [open, setOpen] = useState<boolean>(false);

  /**
   * ジャッジ詳細モーダルを開きます。
   */
  const openJudgeDetailModal = () => {
    setOpen(true);
  };

  /**
   * ジャッジ詳細モーダルを閉じます。
   */
  const closeJudgeDetailModal = () => {
    setOpen(false);
  };

  // ジャッジ詳細のstate
  const [judgeDetail, setJudgeDetail] = useState<JudgeDetail | null>(null);

  return (
    <>
      {judgeDetail && (
        <Dialog
          open={open}
          onClose={closeJudgeDetailModal}
          maxWidth="xl"
          fullWidth
          PaperProps={{
            className: "dark:bg-darkMode-bg",
          }}
        >
          <Box className="p-2 w-full h-full">
            <Box className="border-2 rounded mb-3 border-gray-300 dark:border-darkMode-dark dark:bg-darkMode-darkest">
              <Box className="px-3 py-2 flex bg-gray-200 text-gray-600 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
                <span className="mx-1 flex items-center dark:text-darkMode-text">結果 :</span>
                <p
                  className={`${getClassNameFromSubmissionStatus(
                    judgeDetail.submissionRecord.status,
                  )} text-white text-xs w-6 h-6 rounded flex items-center justify-center dark:text-darkMode-text`}
                >
                  {getShortStatusNameFromSubmissionStatus(judgeDetail.submissionRecord.status)}
                </p>
              </Box>
              <Box className="border-b border-gray-300 dark:border-darkMode-dark">
                <Box className="grid grid-cols-7 gap-y-2 pt-2 justify-self-center dark:bg-darkMode-darkest">
                  <>
                    {getSubmissionProgressIconElementsFromSubmitStatus(judgeDetail.submissionRecord.status)}
                    {getSubmissionProgressTextElements()}
                  </>
                </Box>
              </Box>
              <Box className="grid grid-cols-4 border-b h-8 text-base font-bold text-gray-800 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  言語
                </Box>
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  時間
                </Box>
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  メモリー
                </Box>
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  コード長
                </Box>
              </Box>
              <Box className="grid grid-cols-4 h-8 text-base text-gray-800 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                <Box className="border-r flex justify-center items-center dark:text-darkMode-text dark:border-darkMode-dark">
                  {judgeDetail.submissionRecord.language}
                </Box>
                <Box className="border-r flex justify-center items-center dark:text-darkMode-text dark:border-darkMode-dark">
                  {(judgeDetail.submissionRecord.cpuTime / 100).toFixed(2)} sec
                </Box>
                <Box className="border-r flex justify-center items-center dark:text-darkMode-text dark:border-darkMode-dark">
                  {Math.ceil(judgeDetail.submissionRecord.memory / 1000)} KB
                </Box>
                <Box className="flex justify-center items-center dark:text-darkMode-text">
                  {judgeDetail.submissionRecord.codeSize} B
                </Box>
              </Box>
            </Box>
            <Box className="rounded">
              <table className="w-full border rounded text-gray-800 border-gray-300 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                <thead className="grid w-full border-2 rounded border-gray-300 dark:border-darkMode-dark">
                  <tr className="grid grid-cols-7">
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      ケース
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      ステータス
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      時間
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      メモリー
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      入力
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      出力
                    </th>
                    <th className="flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      ケース名
                    </th>
                  </tr>
                  <tbody className="border-r-2 border-l-2 border-gray-300 dark:bg-darkMode-darkest dark:border-darkMode-dark">
                    <span>
                      {judgeDetail.caseVerdicts.map((caseVerDict) => {
                        return (
                          <tr className="grid">
                            <div className="grid grid-cols-7">
                              <td className="border-r border-b flex items-center justify-center border-gray-200 dark:border-darkMode-dark">
                                <span className="dark:text-darkMode-text">{caseVerDict.label}</span>
                              </td>
                              <td className="border-r border-b flex justify-center items-center p-1 border-gray-200 dark:border-darkMode-dark">
                                {caseVerDict.status ? (
                                  <p
                                    className={`${getClassNameFromShortStatusName(
                                      caseVerDict.status,
                                    )} text-white text-xs w-6 h-6 rounded flex items-center justify-center dark:text-darkMode-text`}
                                  >
                                    {caseVerDict.status}
                                  </p>
                                ) : (
                                  <p className="w-6 h-6 rounded flex items-center justify-center dark:text-darkMode-text">
                                    -
                                  </p>
                                )}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.cpuTime ? `${(caseVerDict.cpuTime / 100).toFixed(2)} sec` : "sec"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.memory ? `${caseVerDict.memory} KB` : "KB"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.inputSize ? `${caseVerDict.inputSize} B` : "B"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.outputSize ? `${caseVerDict.outputSize} B` : "B"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark">
                                <p
                                  className="mx-2 dark:text-darkMode-text"
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    textAlign: "center",
                                  }}
                                >
                                  {caseVerDict.caseName}
                                </p>
                              </td>
                            </div>
                            <div className="border-b border-gray-200 dark:border-darkMode-dark"></div>
                          </tr>
                        );
                      })}
                    </span>
                  </tbody>
                </thead>
              </table>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};

/**
 * 提出ステータスから進行状況のアイコンの要素を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 進行状況のアイコンの要素
 */
const getSubmissionProgressIconElementsFromSubmitStatus = (submissionStatus: SubmissionStatus) => {
  let submissionProgress = getSubmissionProgressFromSubmissionStatus(submissionStatus);

  const elements: ReactElement[] = [];

  for (let i = 0; i < 7; i++) {
    let element: ReactElement;

    if (i < submissionProgress) {
      element = (
        <Box
          className={`relative text-3xl flex justify-center ${i === 0 ? "" : "left-border"} ${
            i === 6 ? "" : "right-border"
          } text-gray-800 dark:text-darkMode-text`}
        >
          <CheckCircleIcon fontSize="large" className="text-accept dark:text-accept-dark" />
        </Box>
      );
    } else if (i === submissionProgress) {
      element = (
        <Box
          className={`relative text-3xl flex justify-center ${i === 0 ? "" : "left-border"} ${
            i === 6 ? "" : "right-border"
          } text-gray-800 dark:text-darkMode-text`}
        >
          <ErrorIcon fontSize="large" className="text-reject dark:text-reject-dark" />
        </Box>
      );
    } else {
      element = (
        <Box
          className={`relative text-3xl flex justify-center ${i === 0 ? "" : "left-border"} ${
            i === 6 ? "" : "right-border"
          } text-gray-800 dark:text-darkMode-text`}
        >
          <RadioButtonUncheckedIcon fontSize="large" />
        </Box>
      );
    }

    elements.push(element);
  }

  return elements;
};

/**
 * 進行状況のテキストの要素を取得します。
 */
const getSubmissionProgressTextElements = (): ReactElement[] => {
  const textList = [
    "Submitted",
    "Sent to Judge",
    "Build",
    "Run",
    "Resource Limit Check",
    "Result Check",
    "Presentation Check",
  ];

  return textList.map((text) => {
    return (
      <Box className="flex justify-center pb-2">
        <Box className="font-bold text-gray-800 text-center mx-1 dark:text-darkMode-text" sx={{ fontSize: "1.5vw" }}>
          {text}
        </Box>
      </Box>
    );
  });
};

export default JudgeDetailModal;
