import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  ArenaUserEntryInfo,
  CourseInfo,
  CourseInfoList,
  SessionInfo,
} from "../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { EnvironmentInfoContext } from "../../../providers/EnvironmentInfoProvider";
import { useTranslation } from "react-i18next";
import ArenaCard from "./components/ArenaCard";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

/**
 * アリーナ一覧タブ
 * @returns アリーナ一覧タブ
 */
const ArenaListTab: React.FC = () => {
  // ユーザーのアリーナエントリー情報一覧のstate
  const [arenaUserEntryInfoList, setArenaUserEntryInfoList] = useState<null | ArenaUserEntryInfo[]>(null);

  useEffect(() => {
    const findByUserIdEntries = async () => {
      // セッション情報を取得し、ユーザーIDを取得
      const parametersForSession = {};
      const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      // ユーザーのアリーナエントリー情報一覧を取得し、stateにセット
      const parameterForArena = {
        userId: userId,
      };
      const arenaResponse = (await callApi("findByUserIdEntries", parameterForArena)) as ArenaUserEntryInfo[];

      // エントリー日時の降順にソート
      arenaResponse.sort((firstEntry, secondEntry) => {
        return firstEntry.entryDate > secondEntry.entryDate ? -1 : 1;
      });

      setArenaUserEntryInfoList(arenaResponse);
    };

    findByUserIdEntries();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark dark:text-darkMode-text">
        <Box className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200 flex dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          <Box className="flex items-center">
            <h2>{t("arenaList.title")}</h2>
          </Box>
          <Box className="flex-grow"></Box>
          <Box>
            <a
              href="https://onlinejudge.u-aizu.ac.jp/services/arena.html"
              target="_blank"
              rel="noopener"
              className="text-white bg-aoj-click hover:text-white hover:bg-aoj px-3 py-1 rounded mr-3 focus:outline-none flex"
            >
              <Box className="flex items-center">
                <p className="mr-2">{t("arenaList.pageOpenButton.text")}</p>
                <OpenInNewIcon fontSize="small" />
              </Box>
            </a>
          </Box>
        </Box>
        <p className="p-1 pl-4 my-2 dark:text-darkMode-text">{t("arenaList.description")}</p>
      </Box>
      <Box className="mt-4">
        {arenaUserEntryInfoList &&
          arenaUserEntryInfoList.map((arenaUserEntryInfo) => {
            return (
              <Box className="my-2">
                <ArenaCard arenaUserEntryInfo={arenaUserEntryInfo} />
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default ArenaListTab;
