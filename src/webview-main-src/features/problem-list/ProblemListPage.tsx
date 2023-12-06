import { Box, Tab, Tabs } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import InboxIcon from "@mui/icons-material/Inbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FlagIcon from "@mui/icons-material/Flag";
import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * タブの種類
 */
const enum TabType {
  COURSE,
  CHALLENGE,
  BOOKMARK,
  ARENA,
}

/**
 * 問題一覧ページ
 * @returns 問題一覧ページ
 *
 * @remarks
 * コース一覧タブ、チャレンジ一覧タブ、ブックマーク一覧タブがある
 */
const ProblemListPage: React.FC = () => {
  // 現在表示中のタブ
  const [currentTab, setCurrentTab] = useState(TabType.COURSE);

  const navigate = useNavigate();

  /**
   * タブの変更をハンドリングします。
   * @param event - タブ変更時のイベント
   * @param newTab 選択されたタブ
   */
  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newTab: TabType) => {
    setCurrentTab(newTab);

    // 選択されたタブによって表示する内容を変更する
    switch (newTab) {
      case TabType.COURSE: {
        navigate("/problem/list/course/list");
        break;
      }
      case TabType.CHALLENGE: {
        navigate("/problem/list/challenge/list");
        break;
      }
      case TabType.BOOKMARK: {
        navigate("/problem/list/bookmark/list");
        break;
      }
      case TabType.ARENA: {
        navigate("/problem/list/arena/list");
        break;
      }
    }
  };

  const { t } = useTranslation();

  return (
    <Box>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        className="min-h-0"
        variant="fullWidth"
        TabIndicatorProps={{
          className: getTabIndicatorClass(currentTab),
        }}
      >
        <Tab
          className={`
          min-h-0
          px-1
          py-3
          text-sm
          ${currentTab === TabType.COURSE ? "text-course dark:text-course-dark" : "dark:text-darkMode-text"}
          `}
          icon={<MapIcon fontSize="small" />}
          iconPosition="start"
          label={t("problemList.tab.course")}
          value={TabType.COURSE}
        />
        <Tab
          className={`
          min-h-0
          px-1
          py-3
          text-sm
          ${currentTab === TabType.CHALLENGE ? "text-challenge dark:text-challenge" : "dark:text-darkMode-text"}
          `}
          icon={<InboxIcon fontSize="small" />}
          iconPosition="start"
          label={t("problemList.tab.challenge")}
          value={TabType.CHALLENGE}
        />
        <Tab
          className={`
          min-h-0
          px-1
          py-3
          text-sm
          ${currentTab === TabType.BOOKMARK ? "text-bookmark dark:text-bookmark-dark" : "dark:text-darkMode-text"}
          `}
          icon={<BookmarkBorderIcon fontSize="small" />}
          iconPosition="start"
          label={t("problemList.tab.bookmark")}
          value={TabType.BOOKMARK}
        />
        <Tab
          className={`
          min-h-0
          px-1
          py-3
          text-sm
          ${currentTab === TabType.ARENA ? "text-arena dark:text-arena-dark" : "dark:text-darkMode-text"}
          `}
          icon={<FlagIcon fontSize="small" />}
          iconPosition="start"
          label={t("problemList.tab.arena")}
          value={TabType.ARENA}
        />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default ProblemListPage;

/**
 * 現在のタブ種類からタブに付与するクラス名を取得します。
 * @param currentTab 現在のタブ
 * @returns タブに付与するクラス名
 */
const getTabIndicatorClass = (currentTab: TabType) => {
  switch (currentTab) {
    case TabType.COURSE: {
      return "bg-course dark:bg-course-dark";
    }
    case TabType.CHALLENGE: {
      return "bg-challenge dark:bg-challenge";
    }
    case TabType.BOOKMARK: {
      return "bg-bookmark dark:bg-bookmark-dark";
    }
    case TabType.ARENA: {
      return "bg-arena dark:bg-arena-dark";
    }
    default: {
      return "";
    }
  }
};
