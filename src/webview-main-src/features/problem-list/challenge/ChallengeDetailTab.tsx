import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ChallengeContestCard from "./components/ChallengeContestCard";
import { ChallengeDetail } from "../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";

type ParamTypes = {
  largeChallengeId: string;
  middleChallengeId: string;
};

/**
 * チャレンジ詳細タブ
 * @returns チャレンジ詳細タブ
 */
const ChallengeDetailTab: React.FC = () => {
  // パスパラメータからチャレンジ大分類IDとチャレンジ中分類IDを取得
  const { largeChallengeId, middleChallengeId } = useParams<ParamTypes>();

  // チャレンジ詳細のstate
  const [challengeDetail, setChallengeDetail] = useState<null | ChallengeDetail>(null);

  useEffect(() => {
    const findByLargeCLAndMiddleCLPage = async () => {
      // チャレンジ詳細を取得し、stateにセット
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

export default ChallengeDetailTab;
