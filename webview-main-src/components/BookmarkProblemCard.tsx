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
      className="
        border
        rounded
        flex 
        items-center 
        p-4 hover:shadow 
        transition 
        duration-100 
        hover:border-bookmark
        dark:border-darkMode-dark
        dark:text-darkMode-text
        dark:bg-darkMode-darkest
        dark:hover:border-bookmark-dark"
      onClick={handleProblemCardClick}
    >
      <Box className="mr-4">
        {problemInfo.isSolved ? (
          <CheckCircleIcon className="text-bookmark dark:text-bookmark-dark" />
        ) : (
          <RadioButtonUncheckedIcon className="text-gray-400 dark:text-darkMode-text" />
        )}
      </Box>
      <Box>
        <p className="text-lg font-bold dark:text-darkMode-text">{`${problemInfo.id} : ${problemInfo.name}`}</p>
      </Box>
    </Box>
  );
};

export default BookmarkProblemCard;
