import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ProblemInfoContext } from "../../../providers/ProblemInfoProvider";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { BookmarkSaveInfo, SessionInfo } from "../../../../public-src/types/ApiResponseType";
import { isChallengeProblem } from "../../../../public-src/utils/ProblemInfoUtil";

/**
 * 問題情報パネル
 * @returns 問題情報パネル
 */
const ProblemInfoPanel: React.FC = () => {
  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo, arenaSelectInfo } = useContext(ProblemInfoContext);

  // ブックマークしているかのstate
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  useEffect(() => {
    // 拡張機能側から、現在の問題を解答隅に変更することを要求するメッセージを受信
    window.addEventListener("message", (event) => {
      const message = event.data;

      switch (message.type) {
        case "changeCurrentProblemToSolved":
          setProblemInfo((beforeProblemInfo) => {
            return {
              ...beforeProblemInfo!,
              isSolved: true,
            };
          });
          break;
      }
    });
  }, []);

  useEffect(() => {
    // 表示中の問題がブックマークされているかをセット
    if (problemInfo?.bookmarks) {
      setIsBookmark(problemInfo.bookmarks.length !== 0);
    }
  }, [problemInfo?.bookmarks]);

  /**
   * ブックマークボタンの押下をハンドリングします。
   */
  const handleBookmarkButtonClick = async () => {
    // セッション情報を取得し、ユーザーIDを取得
    const parametersForSession = {};
    const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

    const userId = sessionResponse.id;

    if (!isBookmark) {
      // ブックマークをしていない状態でボタンを押下した場合、ブックマークしている状態に変更
      const parameterForSaveBookmark = {
        userId: userId,
        problemId: problemInfo!.problem_id,
      };
      const bookmarkSaveResponse = (await callApi("saveBookmark", parameterForSaveBookmark)) as BookmarkSaveInfo;

      setIsBookmark(true);
    } else {
      // ブックマークをしている状態でボタンを押下した場合、ブックマークしていない状態に変更
      const parameterForDeleteBookmark = {
        userId: userId,
        problemId: problemInfo!.problem_id,
      };
      await callApi("deleteBookmark", parameterForDeleteBookmark);

      setIsBookmark(false);
    }
  };

  return (
    <>
      {problemInfo && (
        <Box
          className={`
            flex
            items-center
            px-3
            py-1
            ${getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)}
          `}
          sx={{ borderRadius: "2rem" }}
        >
          <Box className="flex items-center text-2xl rounded-full text-white dark:text-darkMode-text">
            {problemInfo.isSolved ? <CheckCircleIcon /> : <RemoveCircleOutlineIcon />}
          </Box>
          <span className="text-xl inline-block px-3 whitespace-no-wrap text-white dark:text-darkMode-text">
            {problemInfo.problem_id}
          </span>
          <button
            className={isBookmark ? "text-bookmark-lighter" : "text-white dark:text-darkMode-text"}
            onClick={handleBookmarkButtonClick}
          >
            {isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </button>
        </Box>
      )}
    </>
  );
};

/**
 * 問題タイプからクラス名を取得します。
 * @param problemId - 問題ID
 * @param isArena - アリーナか
 * @returns クラス名
 */
const getClassNameFromProblemType = (problemId: string, isArena: boolean) => {
  if (isArena) {
    return "bg-arena border-arena dark:bg-arena-dark dark:border-arena-dark";
  } else if (isChallengeProblem(problemId)) {
    return "bg-challenge border-challenge dark:bg-challenge dark:border-challenge";
  } else {
    return "bg-course border-course dark:bg-course-dark dark:border-course-dark";
  }
};

export default ProblemInfoPanel;
