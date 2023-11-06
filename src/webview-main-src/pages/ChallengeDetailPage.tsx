import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ChallengeContestCard from "../components/ChallengeContestCard";
import { ChallengeDetail } from "../../public-src/ApiResponseType";
import { callApi } from "../../webview-public-src/ApiUtil";

type ParamTypes = {
  largeChallengeId: string;
  middleChallengeId: string;
};

const ChallengeDetailPage: React.FC = () => {
  const { largeChallengeId, middleChallengeId } = useParams<ParamTypes>();

  const [challengeDetail, setChallengeDetail] = useState<null | ChallengeDetail>(null);

  useEffect(() => {
    const findByLargeCLAndMiddleCLPage = async () => {
      const parameters = {
        largeCl: largeChallengeId,
        middleCl: middleChallengeId,
      };

      const response = (await callApi("findByLargeCLAndMiddleCLPage", parameters)) as ChallengeDetail;

      setChallengeDetail(response);
    };

    findByLargeCLAndMiddleCLPage();
  }, []);

  return (
    challengeDetail && (
      <Box>
        <Box className="mt-4 border-2 rounded dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          <h2 className="text-xl font-bold border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
            {challengeDetail.largeCl.title}
          </h2>
        </Box>
        {challengeDetail.contests.map((contest) => {
          return (
            <div className="my-2">
              <ChallengeContestCard contestInfo={contest} />
            </div>
          );
        })}
      </Box>
    )
  );
};

export default ChallengeDetailPage;
