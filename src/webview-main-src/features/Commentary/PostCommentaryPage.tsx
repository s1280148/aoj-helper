import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";
import { CommentaryInfo } from "../../../public-src/types/ApiResponseType";
import CommentaryNote from "./components/CommentaryNote";
import { Box } from "@mui/material";

/**
 * 解説（後）ページ
 * @returns 解説（後）ページ
 */
const PostCommentaryPage: React.FC = () => {
  // パスパラメータから問題IDを取得
  const { problemId } = useParams<"problemId">();

  // 解説（後）の情報のstate
  const [postCommentaryInfoList, setPostCommentaryInfoList] = useState<null | CommentaryInfo[]>(null);

  useEffect(() => {
    /**
     * 解説（後）の情報を取得します。
     */
    const getAvailableFilters = async () => {
      // 解説（後）の情報を取得し、stateにセット
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
