import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LargeChallengeSection from "../components/LargeChallengeSection";
import { LargeChallenge } from "../../public-src/ApiResponseType";
import { callApi } from "../../webview-public-src/ApiUtil";

const ChallengeListPage: React.FC = () => {
  const [largeChallengeList, setLargeChgallengeList] = useState<null | LargeChallenge[]>(null);

  useEffect(() => {
    const findTopPage = async () => {
      const parameters = {};

      const response = (await callApi("findTopPage", parameters)) as { largeCls: LargeChallenge[] };

      setLargeChgallengeList(response.largeCls);
    };

    findTopPage();
  }, []);

  return (
    <>
      <Box className="mt-4 border-2 rounded">
        <h2 className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200">チャレンジリスト</h2>
        <p className="p-1 pl-4 my-2">コンテストの過去問に挑戦</p>
      </Box>
      <Box>
        {largeChallengeList &&
          largeChallengeList.map((largeChallenge) => {
            return (
              <Box className="my-10">
                <LargeChallengeSection largeChallenge={largeChallenge} />
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default ChallengeListPage;
