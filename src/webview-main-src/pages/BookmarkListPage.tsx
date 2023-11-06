import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BookmarkProblemCard from "../components/BookmarkProblemCard";
import { BookmarkInfo, SessionInfo } from "../../public-src/types/ApiResponseType";
import { callApi } from "../../webview-public-src/ApiUtil";

const BookmarkListPage: React.FC = () => {
  const [bookmarkInfo, setBookmarkInfo] = useState<null | BookmarkInfo>(null);

  useEffect(() => {
    const findBookmarkProblemList = async () => {
      const parametersForSession = {};
      const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      const parameterForBookmark = {
        userId: userId,
      };
      const bookmarkResponse = (await callApi("findByUserIdBookMarkDetail", parameterForBookmark)) as BookmarkInfo;

      setBookmarkInfo(bookmarkResponse);
    };

    findBookmarkProblemList();
  }, []);
  return (
    <>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark dark:text-darkMode-text">
        <h2 className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          ブックマークリスト
        </h2>
        <p className="p-1 pl-4 my-2 dark:text-darkMode-text">ブックマークに追加した問題に挑戦</p>
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
export default BookmarkListPage;
