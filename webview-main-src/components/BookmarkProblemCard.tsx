import { Box } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ProblemInfo } from "../../public-src/ApiResponseType";
import { useNavigate } from "react-router-dom";

type Props = {
  problemInfo: ProblemInfo;
};

const BookmarkProblemCard: React.FC<Props> = (props: Props) => {
  const { problemInfo } = props;

  const navigate = useNavigate();

  const handleProblemCardClick = () => {
    navigate(`/problem/${problemInfo.id}/description`);
  };

  return (
    <Box
      className="border rounded flex items-center p-4 hover:shadow transition duration-100 hover:border-bookmark"
      onClick={handleProblemCardClick}
    >
      <Box className="mr-4">
        {problemInfo.isSolved ? (
          <CheckCircleIcon className="text-bookmark" />
        ) : (
          <RadioButtonUncheckedIcon className="text-gray-400" />
        )}
      </Box>
      <Box>
        <p className="text-lg font-bold">{`${problemInfo.id} : ${problemInfo.name}`}</p>
      </Box>
    </Box>
  );
};

export default BookmarkProblemCard;
