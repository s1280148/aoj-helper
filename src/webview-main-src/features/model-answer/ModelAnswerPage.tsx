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
import { getMonacoEditorLanguageFromProgrammingLanguage } from "../../../public-src/utils/ProgrammingLanguageUtil";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";
import { SubmissionStatus } from "../../../public-src/constants/constant";
import { EnvironmentInfoContext } from "../../providers/EnvironmentInfoProvider";
import { useTranslation } from "react-i18next";

/**
 * 模範解答ページ
 * @returns 模範解答ページ
 */
const ModelAnswerPage: React.FC = () => {
  // パスパラメータから問題IDを取得
  const { problemId } = useParams<"problemId">();

  // 模範解答情報一覧のstate
  const [modelAnswerInfoList, setModelAnswerInfoList] = useState<null | ModelAnswerInfo[]>(null);

  // 表示中の模範解答一覧のstate
  const [displayingModelAnswerInfoList, setDisplayingModelAnswerInfoList] = useState<null | ModelAnswerInfo[]>(null);

  // 選択された模範解答のジャッジID
  const [selectedJudgeId, setSelectedJudgeId] = useState<null | number>(null);

  // 環境情報のstate
  const { environmentInfo, setEnvironmentInfo } = useContext(EnvironmentInfoContext);

  // 1ページに表示する模範回答の数
  const PAGE_SIZE = 10;

  useEffect(() => {
    const findModelAnswerList = async () => {
      // 模範解答一覧を取得し、stateにセット
      const parameter = {
        problemId: problemId,
        lang: environmentInfo.programmingLanguage,
        page: 0,
        size: 65536,
      };

      const response = (await callApi("findByProblemIdAndLanguageModelAnswers", parameter)) as ModelAnswerInfo[];

      setModelAnswerInfoList(response);
    };

    findModelAnswerList();
  }, [problemId, environmentInfo]);

  useEffect(() => {
    setDisplayingModelAnswerInfoList(modelAnswerInfoList?.slice(0, PAGE_SIZE) ?? null);
  }, [modelAnswerInfoList]);

  /**
   * ページの変更をハンドリングします。
   * @param event - ページ変更時のイベント
   * @param page - 選択されたページ番号
   */
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    // 模範解答一覧から、選択されたページに対応する部分を表示中の模範解答一覧のstateにセット
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + PAGE_SIZE;

    setDisplayingModelAnswerInfoList(modelAnswerInfoList!.slice(startIndex, endIndex));
  };

  /**
   * 模範解答の行の押下をハンドリングします。
   * @param judgeId - 選択された模範解答のジャッジID
   */
  const handleModelAnswerRowClick = (judgeId: number) => {
    setSelectedJudgeId(judgeId);
  };

  // 選択された提出のレビュー情報
  const [targetReviewInfo, setTargetReviewInfo] = useState<null | ReviewInfo>(null);

  useEffect(() => {
    if (selectedJudgeId) {
      const findByJudgeIdReivew = async () => {
        // 選択された提出のレビュー情報を取得し、stateにセット
        const parameters = {
          judgeId: selectedJudgeId,
        };

        const response = (await callApi("findByJudgeIdReivew", parameters)) as ReviewInfo;

        setTargetReviewInfo(response);

        // ウィンドウとモナコエディターの参照位置を一番上に変更
        window.scrollTo(0, 0);
        editorRef.current?.revealLine(1);
      };

      findByJudgeIdReivew();
    }
  }, [selectedJudgeId]);

  // モナコエディターのref
  const editorRef = useRef<null | editor.IStandaloneCodeEditor>(null);

  /**
   * モナコエディターのマウントをハンドリングします。
   * @param editor - モナコエディター
   */
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  /**
   * "閉じる"ボタンの押下をハンドリングします。
   */
  const handleCloseButtonClick = () => {
    setSelectedJudgeId(null);
    setTargetReviewInfo(null);
  };

  // コピー完了トーストの表示状態のstate
  const [isOpenCopyToast, setIsOpenCopyToast] = useState<boolean>(false);

  /**
   * "コピー"ボタンの押下をハンドリングします。
   */
  const handleCopyButtonClick = () => {
    setIsOpenCopyToast(true);
  };

  /**
   * コピー完了トーストを非表示にします。
   */
  const hideCopyToast = () => {
    setIsOpenCopyToast(false);
  };

  /**
   * "diff"ボタンの押下をハンドリングします。
   */
  const handleDiffButtonClick = () => {
    // 拡張機能側に、現在表示中のテキストエディタとの差分表示を要求するメッセージを送信する
    vscode.postMessage({
      type: "showDiff",
      content: targetReviewInfo!.sourceCode,
    });
  };

  const { t } = useTranslation();

  return (
    <Box>
      {selectedJudgeId && targetReviewInfo && (
        <Box className="border-2 rounded border-gray-300 dark:border-darkMode-dark dark:bg-darkMode-darkest">
          <Box className="bg-gray-200 px-4 py-2 dark:bg-darkMode-dark">
            <Box className="text-gray-800 flex dark:text-darkmode-text">
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
              theme={environmentInfo.isDarkMode ? "vs-dark" : "light"}
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
              Diff
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
                {t("monacoEditor.copy")}
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
              {t("monacoEditor.close")}
            </button>
          </Box>
          <Snackbar
            open={isOpenCopyToast}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            autoHideDuration={2000}
            onClose={hideCopyToast}
            sx={{ right: "auto" }}
          >
            <Alert severity="success" className="dark:bg-teal-900 dark:text-darkMode-text">
              {t("monacoEditor.alert.copied")}
            </Alert>
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
                        ? () => handleModelAnswerRowClick(displayingModelAnswerInfo.judgeId)
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
                    <td className="border px-1 py-2 border-gray-300 dark:border-darkMode-dark dark:text-darkMode-text">{`${
                      displayingModelAnswerInfo.cpuTime / 100
                    } sec`}</td>
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
