import { AppBar, Box, Toolbar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import ProblemSearchBar from "./ProblemSearchBar";
import ProblemMenu from "./ProblemMenu";
import ProblemListButton from "./ProblemListButton";
import ProblemInfoPanel from "./ProblemInfoPanel";
import { useContext } from "react";
import { ProblemInfoContext } from "../../../providers/ProblemInfoProvider";
import { isChallengeProblem } from "../../../../public-src/utils/ProblemInfoUtil";

/**
 * ヘッダー
 * @returns ヘッダー
 */
const Header: React.FC = () => {
  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo, arenaSelectInfo } = useContext(ProblemInfoContext);

  return (
    <Box>
      <AppBar
        position="static"
        className={`
          border-b-4
          bg-white
          dark:bg-darkMode-bg
          ${problemInfo && getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)}
          `}
      >
        <Toolbar variant="dense" className="px-1">
          <Box>
            <ProblemMenu />
          </Box>
          <Box>
            <ProblemListButton />
          </Box>
          <Box className="grow flex items-center justify-center">
            <ProblemInfoPanel />
          </Box>
          <Box>
            <ProblemSearchBar />
          </Box>
          <Box>
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

/**
 * 問題タイプからクラス名を取得します。
 * @param problemId - 問題ID
 * @param isArena - アリーナか
 * @returns クラス名
 */
const getClassNameFromProblemType = (problemId: string, isArena: boolean) => {
  if (isArena) {
    return "border-arena dark:border-arena-dark";
  } else if (isChallengeProblem(problemId)) {
    return "border-challenge dark:border-challenge";
  } else {
    return "border-course dark:border-course-dark";
  }
};

export default Header;
