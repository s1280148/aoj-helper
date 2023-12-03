import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LargeChallengeSection from "./components/LargeChallengeSection";
import { LargeChallenge } from "../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { useTranslation } from "react-i18next";

/**
 * チャレンジ一覧タブ
 * @returns チャレンジ一覧タブ
 */
const ChallengeListTab: React.FC = () => {
  // チャレンジ大分類一覧のstate
  const [largeChallengeList, setLargeChgallengeList] = useState<null | LargeChallenge[]>(null);

  useEffect(() => {
    const findTopPage = async () => {
      // チャレンジ大分類一覧を取得し、stateにセット
      const parameters = {};

      const response = (await callApi("findTopPage", parameters)) as { largeCls: LargeChallenge[] };

      setLargeChgallengeList(response.largeCls);
    };

    findTopPage();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark dark:text-darkMode-text">
        <h2
          className="
            text-xl
            font-bold
            mb-2
            border
            pl-4
            py-2
            bg-gray-200
            dark:bg-darkMode-dark
            dark:border-darkMode-dark
            dark:text-darkMode-text"
        >
          {t("challengeList.title")}
        </h2>
        <p className="p-1 pl-4 my-2 dark:text-darkMode-text">{t("challengeList.description")}</p>
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

export default ChallengeListTab;
