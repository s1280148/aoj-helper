import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React from "react";
import { ProblemInfo } from "../../public-src/ApiResponseType";
import { useNavigate } from "react-router-dom";

type Props = {
  day: number;
  problemInfo: ProblemInfo;
};

const ChallengeProblemCard: React.FC<Props> = (props: Props) => {
  const { day, problemInfo } = props;

  const navigate = useNavigate();

  const handleProblemCardClick = () => {
    navigate(`/problem/${problemInfo.id}/description`);
  };

  return (
    <Box
      className="border rounded flex items-center p-4 hover:shadow transition duration-100 hover:border-challenge"
      onClick={handleProblemCardClick}
    >
      <Box className="mr-4">
        {problemInfo.isSolved ? (
          <CheckCircleIcon className="text-course" />
        ) : (
          <RadioButtonUncheckedIcon className="text-gray-400" />
        )}
      </Box>
      <Box className="border rounded text-xs p-1 mr-4 text-challenge border-challenge">
        <span>{`Day ${day}`}</span>
      </Box>
      <Box>
        <p className="text-lg font-bold">{problemInfo.name}</p>
      </Box>
    </Box>
  );
};

export default ChallengeProblemCard;
