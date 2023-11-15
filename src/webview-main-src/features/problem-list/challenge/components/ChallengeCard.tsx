import React from "react";
import { Box } from "@mui/material";
import BorderLinearProgressWithLabel from "../../../../components/Element/BorderLinearProgressWithLabel";
import { useNavigate } from "react-router-dom";
import { MiddleChallenge } from "../../../../../public-src/types/ApiResponseType";

type Props = {
  largeChallengeId: string;
  midlleChallenge: MiddleChallenge;
};

/**
 * チャレンジカード
 * @param props - props
 * @returns チャレンジカード
 */
const ChallengeCard: React.FC<Props> = (props: Props) => {
  // propsからチャレンジ大分類IDとチャレンジ中分類を取得
  const { largeChallengeId, midlleChallenge } = props;

  const navigate = useNavigate();

  /**
   * チャレンジカードの押下をハンドリングします。
   */
  const handleChallengeCardClick = () => {
    // チャレンジ詳細タブを表示
    navigate(`/problem/list/challenge/${largeChallengeId}/${midlleChallenge.id}`);
  };

  return (
    <Box
      className="
      border
      rounded
      p-4
      hover:shadow-lg
      transition
      duration-150
      hover:border-challenge
      text-gray-900
      dark:bg-darkMode-darkest
      dark:border-darkMode-dark
      dark:hover:border-challenge
      dark:text-darkMode-text
      dark:hover:border-challenge
      "
      onClick={handleChallengeCardClick}
    >
      <p className="text-lg dark:text-darkMode-text">{midlleChallenge.id}</p>
      <p className="text-xs text-gray-600 dark:text-darkMode-text">{`${midlleChallenge.numberOfProblems} problems`}</p>
      <BorderLinearProgressWithLabel barClass="bg-challenge dark:bg-challenge" progress={midlleChallenge.progress} />
    </Box>
  );
};

export default ChallengeCard;
