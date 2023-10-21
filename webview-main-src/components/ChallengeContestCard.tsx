import React, { useState } from "react";
import { Box, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import BorderLinearProgressWithLabel from "./BorderLinearProgressWithLabel";
import ChallengeProblemCard from "./ChallengeProblemCard";
import { ChallengeContestInfo } from "../../public-src/ApiResponseType";

type Props = {
  contestInfo: ChallengeContestInfo;
};

const ChallengeContestCard: React.FC<Props> = (props: Props) => {
  const { contestInfo } = props;

  const [isProblemOpen, setIsProblemOpen] = useState<boolean>(false);

  const handleContestCardClick = () => {
    setIsProblemOpen(!isProblemOpen);
  };

  return (
    <Box>
      <Box className="border rounded hover:border-challenge flex px-4 pt-2" onClick={handleContestCardClick}>
        <Box className="flex items-center mr-3">{isProblemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Box>
        <Box className="flex-1">
          <Box className="text-lg">
            <span className="text-2xl font-bold mr-2">{contestInfo.abbr}</span>
            <span className="text-base text-gray-500">{`${contestInfo.numberOfProblems} problems`}</span>
          </Box>
          <BorderLinearProgressWithLabel barColor="#777EF2" progress={contestInfo.progress} />
        </Box>
      </Box>
      <Collapse in={isProblemOpen}>
        {contestInfo.days.map((dayInfo) => {
          return dayInfo.problems.map((problem) => {
            return (
              <Box className="my-2">
                <ChallengeProblemCard day={dayInfo.day} problemInfo={problem} />
              </Box>
            );
          });
        })}
      </Collapse>
    </Box>
  );
};

export default ChallengeContestCard;
