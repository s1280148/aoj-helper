import React from "react";
import { Box } from "@mui/material";
import BorderLinearProgressWithLabel from "./BorderLinearProgressWithLabel";
import { useNavigate } from "react-router-dom";
import { MiddleChallenge } from "../../public-src/ApiResponseType";

type Props = {
  largeChallengeId: string;
  midlleChallenge: MiddleChallenge;
};

const ChallengeCard: React.FC<Props> = (props: Props) => {
  const { largeChallengeId, midlleChallenge } = props;

  const navigate = useNavigate();

  const handleChallengeCardClick = () => {
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
      hover:border-challenge text-gray-900"
      onClick={handleChallengeCardClick}
    >
      <p className="text-lg">{midlleChallenge.id}</p>
      <p className="text-xs text-gray-600">{`${midlleChallenge.numberOfProblems} problems`}</p>
      <BorderLinearProgressWithLabel
        barClass="bg-challenge dark:bg-challenge-dark"
        progress={midlleChallenge.progress}
      />
    </Box>
  );
};

export default ChallengeCard;
