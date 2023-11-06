import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";
import { CommentaryInfo } from "../../../public-src/types/ApiResponseType";
import CommentaryNote from "./components/CommentaryNote";
import { Box } from "@mui/material";

const PreCommentaryPage: React.FC = () => {
  const { problemId } = useParams<"problemId">();

  const [preCommentaryInfoList, setPreCommentaryInfoList] = useState<null | CommentaryInfo[]>(null);

  useEffect(() => {
    const getAvailableFilters = async () => {
      const parameters = {
        language: "ja",
        problemId: problemId,
      };

      const response = (await callApi("findAvailableFilters", parameters)) as CommentaryInfo[];

      setPreCommentaryInfoList(response.filter((commentaryInfo) => commentaryInfo.pattern === "pre"));
    };

    getAvailableFilters();
  }, [problemId]);

  return (
    <>
      {preCommentaryInfoList && (
        <Box className="mx-2 mt-4 px-4 py-2">
          {preCommentaryInfoList.map((preCommentaryInfo) => {
            return <CommentaryNote problemId={problemId!} commentaryInfo={preCommentaryInfo} />;
          })}
        </Box>
      )}
    </>
  );
};

export default PreCommentaryPage;
