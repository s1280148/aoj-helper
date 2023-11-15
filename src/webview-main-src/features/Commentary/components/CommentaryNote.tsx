import { useContext, useEffect, useState } from "react";
import { CommentaryDetail, CommentaryInfo } from "../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import FeedbackIcon from "@mui/icons-material/Feedback";
import "../../../assets/css/description.css";
import { MathJax } from "better-react-mathjax";
import { ThemeInfoContext } from "../../../providers/ThemeInfoProvider";

type Props = {
  problemId: string;
  commentaryInfo: CommentaryInfo;
};

/**
 * 解説ノート
 * @param props - props
 * @returns 解説ノート
 */
const CommentaryNote: React.FC<Props> = (props: Props) => {
  // propsから問題IDと解説情報を取得
  const { problemId, commentaryInfo } = props;

  // 解説の詳細情報のstate
  const [commentaryDetail, setCommentaryDetail] = useState<null | CommentaryDetail>(null);

  useEffect(() => {
    /**
     * 解説の詳細情報を取得します。
     */
    const getCommentaryDetail = async () => {
      // 解説の詳細情報を取得し、stateにセット
      const parameters = {
        dlang: "ja",
        problemId: problemId,
        pattern: commentaryInfo.pattern,
        type: commentaryInfo.type,
        filter: commentaryInfo.filter[0],
      };

      const response = (await callApi(
        "findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter",
        parameters,
      )) as CommentaryDetail;

      setCommentaryDetail(response);
    };

    getCommentaryDetail();
  }, [problemId]);

  /**
   * 解説の言語タブの変更をハンドリングします。
   * @param event - 言語タブ変更時のイベント
   */
  const handleSelectChange = async (event: SelectChangeEvent) => {
    const filter = event.target.value;

    const parameters = {
      dlang: "ja",
      problemId: problemId,
      pattern: commentaryInfo.pattern,
      type: commentaryInfo.type,
      filter: filter,
    };

    // 解説の詳細情報を取得し、stateにセット
    const response = (await callApi(
      "findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter",
      parameters,
    )) as CommentaryDetail;

    setCommentaryDetail(response);
  };

  // ダークモードかのstate
  const { isDarkMode, setIsDarkMode } = useContext(ThemeInfoContext);

  return (
    <>
      {commentaryDetail && (
        <>
          <Box className="border-2 rounded border-gray-200 dark:border-darkMode-dark dark:bg-darkMode-darkest mb-7">
            <Box className="bg-gray-200 dark:bg-darkMode-dark">
              <Box className="flex p-2">
                <Box className="flex items-center mr-auto">
                  <span className="mr-2 dark:text-darkMode-text">
                    {commentaryDetail.pattern === "pre" ? <LiveHelpIcon /> : <FeedbackIcon />}
                  </span>
                  <p className="text-base dark:text-darkMode-text">{`${
                    commentaryDetail.pattern === "pre" ? "Pre note" : "Post note"
                  }: ${commentaryDetail.type === "general" ? "一般解説" : "言語解説"}`}</p>
                </Box>
                <Box>
                  <FormControl sx={{ minWidth: 130 }} size="small" margin="none">
                    <Select
                      className="dark:bg-darkMode-lightest dark:border-darkMode-lightest dark:text-darkMode-text"
                      onChange={handleSelectChange}
                      value={commentaryDetail.filter}
                      inputProps={{
                        className: "py-1",
                      }}
                      MenuProps={{
                        MenuListProps: {
                          className: "p-0",
                        },
                      }}
                    >
                      {commentaryInfo.filter.map((filter) => {
                        return (
                          <MenuItem
                            className="dark:bg-darkMode-lightest dark:border-darkMode-lightest dark:text-darkMode-text"
                            value={filter}
                            dense
                          >
                            {filter}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <MathJax dynamic>
              <Box
                className={`${isDarkMode ? "description-dark" : "description"} px-3 pt-2 pb-4`}
                dangerouslySetInnerHTML={{ __html: commentaryDetail.html }}
              ></Box>
            </MathJax>
          </Box>
        </>
      )}
    </>
  );
};

export default CommentaryNote;
