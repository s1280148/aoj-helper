import { Box, Dialog } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { getShortStatusNameFromSubmitStatus, SubmissionStatus } from "../util/SubmissionStatus";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import "../static/css/judgeDetail.css"

// ジャッジ詳細
interface JudgeDetail {
  judgeId: number,
  compileError: string,
  runtimeError: string,
  userOutput: string,
  caseVerdicts: CaseVerdict[],
  submissionRecord: SubmissionRecord
}

// 判定結果
interface CaseVerdict {
  serial: number,
  status: string,
  label: string,
  cpuTime: number | null,
  memory: number | null,
  caseName: string,
  inputSize: number,
  outputSize: number
}

// 提出記録
interface SubmissionRecord {
  judgeId: number,
  judgeType: number,
  userId: string,
  problemId: string,
  submissionDate: number,
  language: string,
  status: number,
  cpuTime: number,
  memory: number,
  codeSize: number,
  accuracy: string,
  judgeDate: number;
  score: number,
  problemTitle: string | null,
  token: string | null
}

/**
 * ジャッジ詳細モーダル
 * @returns ジャッジ詳細モーダル
 */
const JudgeDetailModal: React.FC = () => {

  useEffect(() => {

    // 拡張機能からメッセージを受信
    window.addEventListener("message", event => {
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
    })

  }, []);

  // モーダルの開閉のstate
  const [open, setOpen] = useState<boolean>(false);

  /**
   * ジャッジ詳細モーダルを開きます。
   */
  const openJudgeDetailModal = () => {
    setOpen(true);
  }
  
  /**
   * ジャッジ詳細モーダルを閉じます。
   */
  const closeJudgeDetailModal = () => {
    setOpen(false);
  }

  // ジャッジ詳細のstate
  const [judgeDetail, setJudgeDetail] = useState<JudgeDetail | null>(null);

  return (
    <>
    { judgeDetail &&
      <Dialog open={open} onClose={closeJudgeDetailModal} maxWidth="xl" fullWidth>
        <Box className="p-2 w-full h-full">
          <Box className="border-2 rounded mb-3 border-gray-300 bg-white">
            <Box className="px-3 py-2 flex bg-gray-200 text-gray-600">
              <span className="mx-1 flex items-center">結果 :</span>
              <p className={`${getClassNameFromSubmissionStatus(judgeDetail.submissionRecord.status)} text-white text-xs w-6 h-6 rounded flex items-center justify-center`}>
                { getShortStatusNameFromSubmitStatus(judgeDetail.submissionRecord.status) }
              </p>
            </Box>
            <Box className="border-b border-gray-300">
              <Box className="grid grid-cols-7 gap-y-2 pt-2 justify-self-center bg-white">
                <>
                  { getSubmissionProgressIconElementsFromSubmitStatus(judgeDetail.submissionRecord.status) }
                  { getSubmissionProgressTextElements() }
                </>
              </Box>
            </Box>
            <Box className="grid grid-cols-4 border-b h-8 text-base font-bold text-gray-800 bg-white">
              <Box className="border-r flex justify-center items-center bg-gray-200">言語</Box>
              <Box className="border-r flex justify-center items-center bg-gray-200">時間</Box>
              <Box className="border-r flex justify-center items-center bg-gray-200">メモリー</Box>
              <Box className="border-r flex justify-center items-center bg-gray-200">コード長</Box>
            </Box>
            <Box className="grid grid-cols-4 h-8 text-base text-gray-800 bg-white">
              <Box className="border-r flex justify-center items-center">{judgeDetail.submissionRecord.language}</Box>
              <Box className="border-r flex justify-center items-center">{(judgeDetail.submissionRecord.cpuTime / 100).toFixed(2)} sec</Box>
              <Box className="border-r flex justify-center items-center">{Math.ceil(judgeDetail.submissionRecord.memory / 1000)} KB</Box>
              <Box className="flex justify-center items-center">{judgeDetail.submissionRecord.codeSize} B</Box>
            </Box>
          </Box>
          <Box className="rounded">
            <table className="w-full border rounded text-gray-800 border-gray-300">
              <thead className="grid w-full border-2 rounded border-gray-300">
                <tr className="grid grid-cols-7">
                  <th className="border-r flex justify-center items-center bg-gray-200">ケース</th>
                  <th className="border-r flex justify-center items-center bg-gray-200">ステータス</th>
                  <th className="border-r flex justify-center items-center bg-gray-200">時間</th>
                  <th className="border-r flex justify-center items-center bg-gray-200">メモリー</th>
                  <th className="border-r flex justify-center items-center bg-gray-200">入力</th>
                  <th className="border-r flex justify-center items-center bg-gray-200">出力</th>
                  <th className="flex justify-center items-center bg-gray-200">ケース名</th>
                </tr>
                <tbody className="border-r-2 border-l-2 border-gray-300">
                  <span>
                    {
                      judgeDetail.caseVerdicts.map(caseVerDict => {
                        return (
                          <tr className="grid">
                            <div className="grid grid-cols-7">
                              <td className="border-r border-b flex items-center justify-center border-gray-200">
                                <span>{caseVerDict.label}</span>
                              </td>
                              <td className="border-r border-b flex justify-center items-center p-1 border-gray-200">
                                {
                                  caseVerDict.status 
                                      ? 
                                      <p className={`${getClassNameFromShortStatusName(caseVerDict.status)} text-white text-xs w-6 h-6 rounded flex items-center justify-center`}>{caseVerDict.status}</p>
                                      : <p className="w-6 h-6 rounded flex items-center justify-center">-</p>
                                }
                                
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200">
                                {caseVerDict.cpuTime ? `${(caseVerDict.cpuTime / 100).toFixed(2)} sec` : "sec"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200">
                                {caseVerDict.memory ? `${caseVerDict.memory} KB` : "KB"}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200">
                                {`${caseVerDict.inputSize} B`}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200">
                                {`${caseVerDict.outputSize} B`}
                              </td>
                              <td className="border-r border-b flex justify-center items-center text-center p-1 border-gray-200">
                                <p className="mx-2" style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  textAlign: "center"
                                }}>
                                  {caseVerDict.caseName}
                                </p>
                              </td>

                            </div>
                            <div className="border-b border-gray-200"></div>
                          </tr>
                        )
                      })
                    }
                  </span>
                </tbody>
              </thead>
            </table>
          </Box>
        </Box>
      </Dialog>
    }
    </>
  );
}

/**
 * 提出ステータスからクラス名を取得します。
 * @returns クラス名
 */
const getClassNameFromSubmissionStatus = (submissionStatus: number) => {
  if (submissionStatus === SubmissionStatus.STATE_ACCEPTED) {
    return "bg-accept";
  } else {
    return "bg-reject";
  }
}

/**
 * 提出ステータスの省略名からクラス名を取得します。
 * @returns クラス名
 */
 const getClassNameFromShortStatusName = (submissionStatusShortName: string) => {
  if (submissionStatusShortName === getShortStatusNameFromSubmitStatus(SubmissionStatus.STATE_ACCEPTED)) {
    return "bg-accept";
  } else {
    return "bg-reject";
  }
}

/**
 * 提出の進行状況
 */
 enum SubmissionProgress {
  SUBMITTED = 0,
  SENT_TO_JUDGE = 1,
  BUILD = 2,
  RUN = 3,
  RESOURCE_LIMIT_CHECK = 4,
  RESULT_CHECK = 5,
  PRESENTATION_CHECK = 6,
  ACCEPTED = 7
}

/**
 * 提出ステータスから進行状況のアイコンの要素を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 進行状況のアイコンの要素
 */
const getSubmissionProgressIconElementsFromSubmitStatus = (submissionStatus: SubmissionStatus) => {

  let submissionProgress: number;

  switch (submissionStatus) {
    case SubmissionStatus.STATE_COMPILEERROR:
      submissionProgress = SubmissionProgress.BUILD;
      break;
    case SubmissionStatus.STATE_WRONGANSWER:
      submissionProgress = SubmissionProgress.RESULT_CHECK;
      break;
    case SubmissionStatus.STATE_TIMELIMIT:
      submissionProgress = SubmissionProgress.RUN;
      break;
    case SubmissionStatus.STATE_MEMORYLIMIT:
      submissionProgress = SubmissionProgress.RESOURCE_LIMIT_CHECK;
      break;
    case SubmissionStatus.STATE_ACCEPTED:
      submissionProgress = SubmissionProgress.ACCEPTED;
      break;
    case SubmissionStatus.STATE_OUTPUTLIMIT:
      submissionProgress = SubmissionProgress.RESOURCE_LIMIT_CHECK;
      break;
    case SubmissionStatus.STATE_RUNTIMEERROR:
      submissionProgress = SubmissionProgress.RUN;
      break;
    case SubmissionStatus.STATE_PRESENTATIONERROR:
      submissionProgress = SubmissionProgress.PRESENTATION_CHECK;
      break;
    default:
      submissionProgress = SubmissionProgress.SUBMITTED;
      break;
  }

  const elements: ReactElement[] = [];

  for (let i = 0; i < 7; i++) {
    let element: ReactElement;

    if (i < submissionProgress) {
      element = (
        <Box className={`relative text-3xl flex justify-center ${i === 0 ? "" : "left-border"} ${i === 6 ? "" : "right-border"} text-gray-800`}>
          <CheckCircleIcon fontSize="large" style={{ color: "#16a085" }} />
        </Box>
      );
    } else if (i === submissionProgress) {
      element = (
        <Box className={`relative text-3xl flex justify-center ${i === 0 ? "" : "left-border"} ${i === 6 ? "" : "right-border"} text-gray-800`}>
          <ErrorIcon fontSize="large" style={{ color: "#ec6941" }} />
        </Box>
      );
    } else {
      element = (
        <Box className={`relative text-3xl flex justify-center ${i === 0 ? "" : "left-border"} ${i === 6 ? "" : "right-border"} text-gray-800`}>
          <RadioButtonUncheckedIcon fontSize="large" />
        </Box>
      )
    }

    elements.push(element);
  }

  return elements;
}

/**
 * 進行状況のテキストの要素を取得します。
 */
const getSubmissionProgressTextElements = (): ReactElement[] => {
  const textList = ["Submitted", "Sent to Judge","Build", "Run", "Resource Limit Check", "Result Check", "Presentation Check"];

  return textList.map(text => {
    return (
      <Box className="flex justify-center pb-2">
        <Box className="font-bold text-gray-800 text-center mx-1" sx={{ fontSize: "1.5vw" }}>
          { text }
        </Box>
      </Box>
    );
  });
}


export default JudgeDetailModal;