import { Box, Card, CardContent, Collapse, TabProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BorderLinearProgressWithLabel from "./BorderLinearProgressWithLabel";
import { useState } from "react";
import CourseProblemCard from "./CourseProblemCard";
import { TopicInfo } from "../../public-src/ApiResponseType";

type Props = {
  topicInfo: TopicInfo;
};

const CourseTopicCard: React.FC<Props> = (props: Props) => {
  const { topicInfo } = props;

  const [isProblemOpen, setIsProblemOpen] = useState<boolean>(false);

  const handleTopicCardClick = () => {
    setIsProblemOpen(!isProblemOpen);
  };

  return (
    <Box>
      <Box className="border rounded hover:border-course flex px-4 pt-2" onClick={handleTopicCardClick}>
        <Box className="flex items-center mr-3">{isProblemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Box>
        <Box className="flex-1">
          <Box className="text-lg">
            <span>{topicInfo.shortName}</span>
            <span className="font-bold ml-4">{topicInfo.name}</span>
          </Box>
          <BorderLinearProgressWithLabel barColor="#1abcbc" progress={topicInfo.progress} />
        </Box>
      </Box>
      <Collapse in={isProblemOpen}>
        {topicInfo.problems.map((problemInfo) => {
          return (
            <Box className="my-2">
              <CourseProblemCard problemInfo={problemInfo} />
            </Box>
          );
        })}
      </Collapse>
    </Box>
  );
};

export default CourseTopicCard;
