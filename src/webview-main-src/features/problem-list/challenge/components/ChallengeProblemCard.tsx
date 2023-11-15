import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React from "react";
import { ProblemInfo } from "../../../../../public-src/types/ApiResponseType";
import { useNavigate } from "react-router-dom";

type Props = {
  day: number;
  problemInfo: ProblemInfo;
};

/**
 * チャレンジ問題カード
 * @param props - props
 * @returns チャレンジ問題カード
 */
const ChallengeProblemCard: React.FC<Props> = (props: Props) => {
  // propsから日付と問題情報を取得
  const { day, problemInfo } = props;

  const navigate = useNavigate();

  /**
   * チャレンジ問題カードの押下をハンドリングします。
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
        p-4
        hover:shadow
        transition
        duration-100
        hover:border-challenge
        dark:border-darkMode-dark
        dark:text-darkMode-text
        dark:bg-darkMode-darkest
        dark:hover:border-challenge"
      onClick={handleProblemCardClick}
    >
      <Box className="mr-4">
        {problemInfo.isSolved ? (
          <CheckCircleIcon className="text-challenge dark:text-challenge" />
        ) : (
          <RadioButtonUncheckedIcon className="text-gray-400 dark:text-darkMode-text" />
        )}
      </Box>
      <Box className="border rounded text-xs p-1 mr-4 text-challenge border-challenge dark:text-challenge dark:border-challenge">
        <span>{`Day ${day}`}</span>
      </Box>
      <Box>
        <p className="text-lg font-bold dark:text-darkMode-text">{problemInfo.name}</p>
      </Box>
    </Box>
  );
};

export default ChallengeProblemCard;
