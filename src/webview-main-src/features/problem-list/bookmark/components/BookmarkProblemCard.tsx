import { Box } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { ProblemInfo } from "../../../../../public-src/types/ApiResponseType";

type Props = {
  problemInfo: ProblemInfo;
};

/**
 * ブックマーク問題カード
 * @param props - props
 * @returns ブックマーク問題カード
 */
const BookmarkProblemCard: React.FC<Props> = (props: Props) => {
  // propsから問題情報を取得
  const { problemInfo } = props;

  const navigate = useNavigate();

  /**
   * ブックマーク問題カードの押下をハンドリングします。
   */
  const handleProblemCardClick = () => {
    // 問題説明ページに移動
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
