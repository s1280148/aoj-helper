import { Box } from "@mui/material";
import React from "react";
import ChallengeCard from "./ChallengeCard";
import { LargeChallenge } from "../../../../../public-src/types/ApiResponseType";

type Props = {
  largeChallenge: LargeChallenge;
};

/**
 * チャレンジ大分類セクション
 * @param props - props
 * @returns チャレンジ大分類セクション
 */
const LargeChallengeSection: React.FC<Props> = (props: Props) => {
  // propsからチャレンジ大分類を取得
  const { largeChallenge } = props;

  return (
    <Box>
      <Box className="mb-2">
        <span className="text-2xl font-bold mr-4 dark:text-darkMode-text">{largeChallenge.id}</span>
        <span className="text-base dark:text-darkMode-text">{largeChallenge.title}</span>
      </Box>
      <Box className="grid grid-cols-3 gap-4">
        {largeChallenge.middleCls.map((middleChallenge) => (
          <ChallengeCard largeChallengeId={largeChallenge.id} midlleChallenge={middleChallenge} />
        ))}
      </Box>
    </Box>
  );
};

export default LargeChallengeSection;
