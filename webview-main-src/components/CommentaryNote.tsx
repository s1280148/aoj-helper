import { useEffect, useState } from "react";
import { CommentaryDetail, CommentaryInfo } from "../../public-src/ApiResponseType";
import { callApi } from "../../webview-public-src/ApiUtil";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import FeedbackIcon from '@mui/icons-material/Feedback';
import "../static/css/description.css";

type Props = {
  problemId: string,
  commentaryInfo: CommentaryInfo
}

const CommentaryNote: React.FC<Props> = (props: Props) => {

  const { problemId, commentaryInfo } = props;

  const [commentaryDetail, setCommentaryDetail] = useState<null | CommentaryDetail>(null);

  useEffect(() => {

    const getCommentaryDetail = async () => {

      const parameters = {
        dlang: "ja",
        problemId: problemId,
        pattern: commentaryInfo.pattern,
        type: commentaryInfo.type,
        filter: commentaryInfo.filter[0]
      }

      const response = await callApi('findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter', parameters) as CommentaryDetail;
      
      setCommentaryDetail(response);
    }

    getCommentaryDetail();
  }, [problemId]);

  const handleSelectChange = async (event: SelectChangeEvent) => {
    const filter = event.target.value;
    
    const parameters = {
      dlang: "ja",
      problemId: problemId,
      pattern: commentaryInfo.pattern,
      type: commentaryInfo.type,
      filter: filter
    }

    const response = await callApi('findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter', parameters) as CommentaryDetail;
      
    setCommentaryDetail(response);
  }

  return (
    <>
      { commentaryDetail &&
        <>
          <Box className="border-2 rounded bg-white border-gray-200 mb-7">
            <Box className="bg-gray-200">
              <Box className="flex p-2">
                <Box className="flex items-center mr-auto">
                  <span className="mr-2">{ getCommentaryIcon(commentaryDetail.pattern) }</span>
                  <p className="text-base">{ `${getPatternLabel(commentaryDetail.pattern)}: ${getTypeLabel(commentaryDetail.type)}` }</p>
                </Box>
                <Box>
                  <FormControl sx={{ minWidth: 120 }} size="small" margin="none">
                    <Select onChange={handleSelectChange} value={commentaryDetail.filter}>
                      {
                        commentaryInfo.filter.map(filter => {
                          return <MenuItem value={filter} dense>{filter}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box className="description px-3 pb-4" dangerouslySetInnerHTML={{ __html: commentaryDetail.html }}></Box>
          </Box>
        </>
      }
    </>
  )
}

const getCommentaryIcon = (pattern: string) => {
  return pattern === "pre" ? <LiveHelpIcon /> : <FeedbackIcon />;
}

const getPatternLabel = (pattern: string) => {
  return pattern === "pre" ? "Pre note" : "Post note";
}

const getTypeLabel = (type: string) => {
  return type === "general" ? "一般解説" : "言語解説";
}

export default CommentaryNote;