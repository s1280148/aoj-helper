import { Box } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { ArenaProblemInfo, ProblemInfo } from "../../../../../public-src/types/ApiResponseType";

type Props = {
  arenaProblemInfo: ArenaProblemInfo;
  isSolved: boolean;
};

/**
 * アリーナ問題カード
 * @param props - props
 * @returns アリーナ問題カード
 */
const ArenaProblemCard: React.FC<Props> = (props: Props) => {
  // propsから問題情報を取得
  const { arenaProblemInfo, isSolved } = props;

  const navigate = useNavigate();

  /**
   * アリーナ問題カードの押下をハンドリングします。
   */
  const handleProblemCardClick = () => {
    // 問題説明ページに移動
    navigate(
      `/problem/arena/${arenaProblemInfo.arenaId}/${arenaProblemInfo.id}/${arenaProblemInfo.problemId}/description`,
    );
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
        hover:border-arena
        dark:border-darkMode-dark
        dark:text-darkMode-text
        dark:bg-darkMode-darkest
        dark:hover:border-arena-dark"
      onClick={handleProblemCardClick}
    >
      <Box className="mr-4">
        {isSolved ? (
          <CheckCircleIcon className="text-arena dark:text-arena-dark" />
        ) : (
          <RadioButtonUncheckedIcon className="text-gray-400 dark:text-darkMode-text" />
        )}
      </Box>
      <Box>
        <p className="text-lg font-bold dark:text-darkMode-text">{`${arenaProblemInfo.problemId} : ${arenaProblemInfo.name}`}</p>
      </Box>
    </Box>
  );
};

export default ArenaProblemCard;
