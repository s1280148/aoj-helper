import { IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { ProblemInfoContext } from "../../../providers/ProblemInfoProvider";
import { isChallengeProblem } from "../../../../public-src/utils/ProblemInfoUtil";
import { useTranslation } from "react-i18next";

/**
 * 問題集ボタン
 * @returns 問題集ボタン
 */
const ProblemListButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 問題集ページの表示状態のstate
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);

  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo } = useContext(ProblemInfoContext);

  useEffect(() => {
    // locationに変更があった場合に、問題ページの表示状態をセット
    setIsPageOpen(/^\/problem\/list\/.*/.test(location.pathname));
  }, [location]);

  /**
   * 問題集ボタンの押下をハンドリングします。
   */
  const handleProblemListButton = () => {
    // 問題集ページを開いていない場合に開く
    if (!isPageOpen) {
      navigate("/problem/list/course/list");
    }
  };

  const { t } = useTranslation();

  return (
    <Tooltip title={t("problemListButton.tooltip")}>
      <IconButton
        className={
          isPageOpen
            ? problemInfo && isChallengeProblem(problemInfo.problem_id)
              ? "text-challenge dark:text-challenge"
              : "text-course dark:text-course-dark"
            : "text-black dark:text-darkMode-text"
        }
        onClick={handleProblemListButton}
      >
        <QuizOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ProblemListButton;
