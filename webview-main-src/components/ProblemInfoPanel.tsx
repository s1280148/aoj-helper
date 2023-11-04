import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ProblemInfoContext } from "./providers/ProblemInfoProvider";
import { callApi } from "../../webview-public-src/ApiUtil";
import { BookmarkSaveInfo, SessionInfo } from "../../public-src/ApiResponseType";

const ProblemInfoPanel: React.FC = () => {
  const { problemInfo, setProblemInfo } = useContext(ProblemInfoContext);

  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  useEffect(() => {
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
    if (problemInfo?.bookmarks) {
      setIsBookmark(problemInfo.bookmarks.length !== 0);
    }
  }, [problemInfo]);

  const handleBookmarkButtonClick = async () => {
    const parametersForSession = {};
    const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

    const userId = sessionResponse.id;

    if (!isBookmark) {
      const parameterForSaveBookmark = {
        userId: userId,
        problemId: problemInfo!.problem_id,
      };
      const bookmarkSaveResponse = (await callApi("saveBookmark", parameterForSaveBookmark)) as BookmarkSaveInfo;

      setIsBookmark(true);
    } else {
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
        <Box className="flex items-center px-3 py-1 bg-course border-course" sx={{ borderRadius: "2rem" }}>
          <Box className="flex items-center text-2xl rounded-full text-white">
            {problemInfo.isSolved ? <CheckCircleIcon /> : <RemoveCircleOutlineIcon />}
          </Box>
          <span className="text-xl inline-block px-3 whitespace-no-wrap text-white">{problemInfo.problem_id}</span>
          <button
            style={{
              color: isBookmark ? "#f7c327" : "#ffffff",
            }}
            onClick={handleBookmarkButtonClick}
          >
            {isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </button>
        </Box>
      )}
    </>
  );
};

export default ProblemInfoPanel;
