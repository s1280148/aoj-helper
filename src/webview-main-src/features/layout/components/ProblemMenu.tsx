import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import DescriptionIcon from "@mui/icons-material/Description";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ProblemInfoContext } from "../../../providers/ProblemInfoProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { isChallengeProblem } from "../../../../public-src/utils/ProblemInfoUtil";
import { useTranslation } from "react-i18next";

/**
 * ページ
 */
const enum Page {
  PRE_COMMENTARY,
  PROBLEM_DESCRIPTION,
  POST_COMMENTARY,
  SUBMISSION_RECORD,
  MODEL_ANSWER,
  REVIEW,
  OTHER,
}

/**
 * 問題メニュー
 * @returns 問題メニュー
 */
const ProblemMenu: React.FC = () => {
  // 問題メニューの表示状態のstate
  const [open, setOpen] = useState<boolean>(false);

  /**
   * メニューを開きます。
   */
  const openMenu = () => {
    setOpen(true);
  };

  /**
   * メニューを閉じます。
   */
  const closeMenu = () => {
    setOpen(false);
  };

  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo, arenaSelectInfo } = useContext(ProblemInfoContext);

  const problemId = problemInfo?.problem_id;

  // 現在表示中の問題に、解説（前）が存在するか
  const hasPreCommentary =
    problemInfo && problemInfo.commentaries.filter((commentary) => commentary.pattern === "pre").length > 0;

  // 現在表示中の問題に、解説（後）が存在するか
  const hasPostCommentary =
    problemInfo && problemInfo.commentaries.filter((commentary) => commentary.pattern === "post").length > 0;

  // 現在表示中のページのstate
  const [currentPage, setCurrentPage] = useState<Page>(Page.PROBLEM_DESCRIPTION);

  const navigate = useNavigate();

  /**
   * ページの選択をハンドリングします。
   * @param selectedPage - 選択されたページ
   */
  const handlePageSelect = (selectedPage: Page) => {
    if (currentPage === selectedPage) {
      closeMenu();
      return;
    }

    switch (selectedPage) {
      case Page.PRE_COMMENTARY: {
        // 解説（前）ページに移動
        navigate(`/problem/${problemId}/commentary/pre`);
        break;
      }
      case Page.PROBLEM_DESCRIPTION: {
        // 問題説明ページに移動
        if (arenaSelectInfo.isArena) {
          navigate(
            `/problem/arena/${arenaSelectInfo.arenaId}/${arenaSelectInfo.arenaProblemId}/${problemId}/description`,
          );
        } else {
          navigate(`/problem/${problemId}/description`);
        }

        break;
      }
      case Page.POST_COMMENTARY: {
        // 解説（後）ページに移動
        navigate(`/problem/${problemId}/commentary/post`);
        break;
      }
      case Page.SUBMISSION_RECORD: {
        // 提出履歴ページに移動
        navigate(`/problem/${problemId}/submission-record`);
        break;
      }
      case Page.MODEL_ANSWER: {
        // 模範解答ページに移動
        navigate(`/problem/${problemId}/model-answer`);
        break;
      }
      case Page.REVIEW: {
        // レビューページに移動
        navigate(`/problem/${problemId}/review`);
      }
    }

    closeMenu();
  };

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // locationが変更された場合に、現在表示中のページをセット
    switch (true) {
      case /^\/problem\/.*\/commentary\/pre$/.test(pathname): {
        setCurrentPage(Page.PRE_COMMENTARY);
        break;
      }
      case /^\/problem\/.*\/description$/.test(pathname): {
        setCurrentPage(Page.PROBLEM_DESCRIPTION);
        break;
      }
      case /^\/problem\/.*\/commentary\/post$/.test(pathname): {
        setCurrentPage(Page.POST_COMMENTARY);
        break;
      }
      case /^\/problem\/.*\/submission-record$/.test(pathname): {
        setCurrentPage(Page.SUBMISSION_RECORD);
        break;
      }
      case /^\/problem\/.*\/model-answer$/.test(pathname): {
        setCurrentPage(Page.MODEL_ANSWER);
        break;
      }
      case /^\/problem\/.*\/review$/.test(pathname): {
        setCurrentPage(Page.REVIEW);
        break;
      }
      default: {
        setCurrentPage(Page.OTHER);
        break;
      }
    }
  }, [location]);

  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("problemMenu.tooltip")}>
        <IconButton className="text-black dark:text-darkMode-text" onClick={openMenu}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        open={open}
        onClose={closeMenu}
        anchor="left"
        PaperProps={{
          className: "h-full dark:bg-darkMode-darkest",
        }}
      >
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton disabled={!hasPreCommentary} onClick={() => handlePageSelect(Page.PRE_COMMENTARY)}>
                <ListItemIcon
                  className={
                    currentPage === Page.PRE_COMMENTARY && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                >
                  <LiveHelpIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("problemMenu.page.preCommentary")}
                  className={
                    currentPage === Page.PRE_COMMENTARY && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageSelect(Page.PROBLEM_DESCRIPTION)}>
                <ListItemIcon
                  className={
                    currentPage === Page.PROBLEM_DESCRIPTION && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                >
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("problemMenu.page.problemDescription")}
                  className={
                    currentPage === Page.PROBLEM_DESCRIPTION && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton disabled={!hasPostCommentary} onClick={() => handlePageSelect(Page.POST_COMMENTARY)}>
                <ListItemIcon
                  className={
                    currentPage === Page.POST_COMMENTARY && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                >
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("problemMenu.page.postCommentary")}
                  className={
                    currentPage === Page.POST_COMMENTARY && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageSelect(Page.SUBMISSION_RECORD)}>
                <ListItemIcon
                  className={
                    currentPage === Page.SUBMISSION_RECORD && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                >
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("problemMenu.page.submissionRecord")}
                  className={
                    currentPage === Page.SUBMISSION_RECORD && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageSelect(Page.MODEL_ANSWER)}>
                <ListItemIcon
                  className={
                    currentPage === Page.MODEL_ANSWER && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                >
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("problemMenu.page.modelAnswer")}
                  className={
                    currentPage === Page.MODEL_ANSWER && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageSelect(Page.REVIEW)}>
                <ListItemIcon
                  className={
                    currentPage === Page.REVIEW && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                >
                  <ReviewsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("problemMenu.page.review")}
                  className={
                    currentPage === Page.REVIEW && problemInfo
                      ? getClassNameFromProblemType(problemInfo.problem_id, arenaSelectInfo.isArena)
                      : "text-inherit dark:text-darkMode-text"
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
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
    return "text-arena dark:text-arena-dark";
  } else if (isChallengeProblem(problemId)) {
    return "text-challenge dark:text-challenge";
  } else {
    return "text-course dark:text-course-dark";
  }
};

export default ProblemMenu;
