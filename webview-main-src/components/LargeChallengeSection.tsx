import { Box } from "@mui/material";
import React from "react";
import ChallengeCard from "./ChallengeCard";
import { LargeChallenge } from "../../public-src/ApiResponseType";

type Props = {
  largeChallenge: LargeChallenge;
};

const LargeChallengeSection: React.FC<Props> = (props: Props) => {
  const { largeChallenge } = props;

  return (
    <Box>
      <Box className="mb-2">
        <span className="text-2xl font-bold mr-4">{largeChallenge.id}</span>
        <span className="text-base">{largeChallenge.title}</span>
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
