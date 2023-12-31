import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BookmarkProblemCard from "./components/BookmarkProblemCard";
import { BookmarkInfo, SessionInfo } from "../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { useTranslation } from "react-i18next";

/**
 * ブックマーク一覧タブ
 * @returns ブックマーク一覧タブ
 */
const BookmarkListTab: React.FC = () => {
  // ブックマーク情報のstate
  const [bookmarkInfo, setBookmarkInfo] = useState<null | BookmarkInfo>(null);

  useEffect(() => {
    const findBookmarkProblemList = async () => {
      // セッション情報を取得し、ユーザーIDを取得
      const parametersForSession = {};
      const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      // ブックマーク情報を取得し、stateにセット
      const parameterForBookmark = {
        userId: userId,
      };
      const bookmarkResponse = (await callApi("findByUserIdBookMarkDetail", parameterForBookmark)) as BookmarkInfo;

      setBookmarkInfo(bookmarkResponse);
    };

    findBookmarkProblemList();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark dark:text-darkMode-text">
        <h2 className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          {t("bookmarkList.title")}
        </h2>
        <p className="p-1 pl-4 my-2 dark:text-darkMode-text">{t("bookmarkList.description")}</p>
      </Box>
      <Box className="mt-4">
        {bookmarkInfo &&
          bookmarkInfo.problems.map((problem) => {
            return (
              <Box className="my-2">
                <BookmarkProblemCard problemInfo={problem} />
              </Box>
            );
          })}
      </Box>
    </>
  );
};
export default BookmarkListTab;
