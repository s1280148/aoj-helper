import { Box, Dialog } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./assets/css/judgeDetail.css";
import {
  getClassNameFromShortStatusName,
  getClassNameFromSubmissionStatus,
  getShortStatusNameFromSubmissionStatus,
  getSubmissionProgressFromSubmissionStatus,
} from "../../../public-src/utils/JudgeInfoUtil";
import { JudgeDetail } from "../../../public-src/types/ApiResponseType";
import { SubmissionStatus } from "../../../public-src/constants/constant";
import { useTranslation } from "react-i18next";

/**
 * ジャッジ詳細モーダル
 * @returns ジャッジ詳細モーダル
 */
const JudgeDetailModal: React.FC = () => {
  useEffect(() => {
    // 拡張機能側から、ジャッジ詳細モーダルの表示を要求するメッセージを受信
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

  // モーダルの表示状態のstate
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

  const { t } = useTranslation();

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
                <span className="mx-1 flex items-center dark:text-darkMode-text">{t("judgeDetail.result")}</span>
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
                  {t("judgeDetail.language")}
                </Box>
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  {t("judgeDetail.cpuTime")}
                </Box>
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  {t("judgeDetail.memory")}
                </Box>
                <Box className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-darkest dark:border-darkMode-dark">
                  {t("judgeDetail.codeSize")}
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
                      {t("judgeDetail.testCaseId")}
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      {t("judgeDetail.judgeStatus")}
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      {t("judgeDetail.cpuTime")}
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      {t("judgeDetail.memory")}
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      {t("judgeDetail.input")}
                    </th>
                    <th className="border-r flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      {t("judgeDetail.output")}
                    </th>
                    <th className="flex justify-center items-center bg-gray-200 dark:text-darkMode-text dark:bg-darkMode-dark dark:border-darkMode-dark">
                      {t("jugeDetail.testCaseName")}
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
                                {caseVerDict.cpuTime ? `${(caseVerDict.cpuTime / 100).toFixed(2)} sec` : "0.00 sec"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.memory ? `${caseVerDict.memory} KB` : "0 KB"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.inputSize ? `${caseVerDict.inputSize} B` : "0 B"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200 dark:border-darkMode-dark dark:text-darkMode-text">
                                {caseVerDict.outputSize ? `${caseVerDict.outputSize} B` : "0 B"}
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
 * 提出ステータスから進行状況のアイコンの要素一覧を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 進行状況のアイコンの要素一覧
 */
const getSubmissionProgressIconElementsFromSubmitStatus = (submissionStatus: SubmissionStatus) => {
  // 提出ステータスから提出の進行状況を取得
  let submissionProgress = getSubmissionProgressFromSubmissionStatus(submissionStatus);

  // 進行状況のアイコンの要素一覧
  const elements: ReactElement[] = [];

  for (let i = 0; i < 7; i++) {
    let element: ReactElement;

    if (i < submissionProgress) {
      // 完了している要素
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
      // ジャッジが停止した要素
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
      // 行われていない要素
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
 * 進行状況のテキストの要素一覧を取得します。
 * @returns 進行状況のテキストの要素一覧
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
