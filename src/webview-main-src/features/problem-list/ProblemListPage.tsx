import { Box, Tab, Tabs } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import InboxIcon from "@mui/icons-material/Inbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";

const enum TabType {
  COURSE,
  CHALLENGE,
  BOOKMARK,
}

const ProblemListPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(TabType.COURSE);

  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newTab: TabType) => {
    setCurrentTab(newTab);

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
    }
  };

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
          py-3
          ${currentTab === TabType.COURSE ? "text-course dark:text-course-dark" : "dark:text-darkMode-text"}
          `}
          icon={<MapIcon />}
          iconPosition="start"
          label="コース"
          value={TabType.COURSE}
        />
        <Tab
          className={`
          min-h-0
          py-3
          ${currentTab === TabType.CHALLENGE ? "text-challenge dark:text-challenge" : "dark:text-darkMode-text"}
          `}
          icon={<InboxIcon />}
          iconPosition="start"
          label="チャレンジ"
          value={TabType.CHALLENGE}
        />
        <Tab
          className={`
          min-h-0
          py-3
          ${currentTab === TabType.BOOKMARK ? "text-bookmark dark:text-bookmark-dark" : "dark:text-darkMode-text"}
          `}
          icon={<BookmarkBorderIcon />}
          iconPosition="start"
          label="ブックマーク"
          value={TabType.BOOKMARK}
        />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default ProblemListPage;

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
    default: {
      return "";
    }
  }
};