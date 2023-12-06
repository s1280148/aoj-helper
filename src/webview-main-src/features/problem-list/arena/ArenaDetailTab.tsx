import { useLocation } from "react-router-dom";
import {
  ArenaInfo,
  ArenaProblemInfo,
  ArenaSubmissionInfo,
  SessionInfo,
} from "../../../../public-src/types/ApiResponseType";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { SubmissionStatus } from "../../../../public-src/constants/constant";
import ArenaProblemCard from "./components/ArenaProblemCard";

/**
 * アリーナ詳細タブ
 * @returns アリーナ詳細タブ
 */
const ArenaDetailTab: React.FC = () => {
  const location = useLocation();
  const arenaInfo = location.state as ArenaInfo;

  // アリーナ問題情報一覧
  const [arenaProblemInfoList, setArenaProblemInfoList] = useState<null | ArenaProblemInfo[]>(null);

  // アリーナへの提出一覧
  const [arenaSubmissionInfoList, setArenaSubmissionInfoList] = useState<null | ArenaSubmissionInfo[]>(null);

  useEffect(() => {
    const findByArenaIdProblems = async () => {
      // アリーナ問題情報一覧を取得し、stateにセット
      const parameter = {
        arenaId: arenaInfo.id,
      };
      const response = (await callApi("findByArenaIdProblems", parameter)) as ArenaProblemInfo[];

      setArenaProblemInfoList(response);
    };

    const findByArenaIdAndUserIdSubmissions = async () => {
      // セッション情報を取得し、ユーザーIDを取得
      const parametersForSession = {};
      const sessionResponse = (await callApi("session", parametersForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      // ユーザーのアリーナ提出情報一覧を取得し、stateにセット
      const parameterForArenaSubmission = {
        arenaId: arenaInfo.id,
        userId: userId,
      };
      const arenaSubmissionResponse = (await callApi(
        "findByArenaIdAndUserIdSubmissions",
        parameterForArenaSubmission,
      )) as ArenaSubmissionInfo[];

      setArenaSubmissionInfoList(arenaSubmissionResponse);
    };

    findByArenaIdProblems();
    findByArenaIdAndUserIdSubmissions();
  }, [arenaInfo]);

  return (
    <Box>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
        <h2 className="text-xl font-bold border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          {arenaInfo.title}
        </h2>
      </Box>
      {arenaProblemInfoList &&
        arenaSubmissionInfoList &&
        arenaProblemInfoList.map((arenaProblemInfo) => {
          return (
            <Box className="my-2">
              <ArenaProblemCard
                arenaProblemInfo={arenaProblemInfo}
                isSolved={isSolvedProblem(arenaSubmissionInfoList, arenaProblemInfo.id)}
              />
            </Box>
          );
        })}
    </Box>
  );
};

/**
 * 対象の問題が正解済みであるかを判定します。
 * @param arenaSubmissionInfoList - アリーナ提出情報一覧
 * @param arenaProblemId - アリーナ問題ID
 * @returns 対象の問題が正解済みであるか
 */
const isSolvedProblem = (arenaSubmissionInfoList: ArenaSubmissionInfo[], arenaProblemId: string) => {
  return (
    // アリーナ提出情報一覧から
    // 対象の問題の提出情報一覧を取得し
    // 正解の提出があるかを判定
    arenaSubmissionInfoList.filter(
      (arenaSubmissionInfo) =>
        arenaSubmissionInfo.problemId === arenaProblemId &&
        arenaSubmissionInfo.status === SubmissionStatus.STATE_ACCEPTED,
    ).length > 0
  );
};

export default ArenaDetailTab;
