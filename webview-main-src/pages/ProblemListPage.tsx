import { Box, Tab, Tabs } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import InboxIcon from "@mui/icons-material/Inbox";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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
        sx={{
          ".MuiTab-root": {
            minHeight: "",
          },
          ".Mui-selected": {
            color: `${getCurrentTabColor(currentTab)}!important`,
          },
        }}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            backgroundColor: getCurrentTabColor(currentTab),
          },
        }}
      >
        <Tab icon={<MapIcon />} iconPosition="start" label="コース" value={TabType.COURSE} />
        <Tab icon={<InboxIcon />} iconPosition="start" label="チャレンジ" value={TabType.CHALLENGE} />
        <Tab icon={<BookmarkIcon />} iconPosition="start" label="ブックマーク" value={TabType.BOOKMARK} />
      </Tabs>
      <Outlet />
    </Box>
  );
};

export default ProblemListPage;

const getCurrentTabColor = (currentTab: TabType) => {
  switch (currentTab) {
    case TabType.COURSE: {
      return "#1abcbc";
    }
    case TabType.CHALLENGE: {
      return "#777ef2";
    }
    case TabType.BOOKMARK: {
      return "#c6a57b";
    }
    default: {
      return "inherit";
    }
  }
};
