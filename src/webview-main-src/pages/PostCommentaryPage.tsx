import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../../webview-public-src/ApiUtil";
import { CommentaryInfo } from "../../public-src/ApiResponseType";
import CommentaryNote from "../components/CommentaryNote";
import { Box } from "@mui/material";

const PostCommentaryPage: React.FC = () => {
  const { problemId } = useParams<"problemId">();

  const [postCommentaryInfoList, setPostCommentaryInfoList] = useState<null | CommentaryInfo[]>(null);

  useEffect(() => {
    const getAvailableFilters = async () => {
      const parameters = {
        language: "ja",
        problemId: problemId,
      };

      const response = (await callApi("findAvailableFilters", parameters)) as CommentaryInfo[];

      setPostCommentaryInfoList(response.filter((commentaryInfo) => commentaryInfo.pattern === "post"));
    };

    getAvailableFilters();
  }, [problemId]);

  return (
    <>
      {postCommentaryInfoList && (
        <Box className="mx-2 mt-4 px-4 py-2">
          {postCommentaryInfoList.map((postCommentaryInfo) => {
            return <CommentaryNote problemId={problemId!} commentaryInfo={postCommentaryInfo} />;
          })}
        </Box>
      )}
    </>
  );
};

export default PostCommentaryPage;
