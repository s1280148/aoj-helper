import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import DescriptionIcon from '@mui/icons-material/Description';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ProblemInfoContext } from './providers/ProblemInfoProvider';
import '../static/css/problemMenu.css';
import { useLocation, useNavigate } from 'react-router-dom';

const enum Page {
  PRE_COMMENTARY,
  PROBLEM,
  POST_COMMENTARY,
  OTHER
}

/**
 * 問題メニュー
 * @returns 問題メニュー
 */
const ProblemMenu: React.FC = () => {

  // メニューの表示状態のstate
  const [open, setOpen] = useState<boolean>(false);

  /**
   * メニューを開きます。
   */
  const openMenu = () => {
    setOpen(true);
  }

  /**
   * メニューを閉じます。
   */
  const closeMenu = () => {
    setOpen(false);
  }

  const { problemInfo, setProblemInfo } = useContext(ProblemInfoContext);

  const problemId = problemInfo?.problem_id;

  const hasPreCommentary = problemInfo && problemInfo.commentaries.filter(commentary => commentary.pattern === 'pre').length > 0;

  const hasPostCommentary = problemInfo && problemInfo.commentaries.filter(commentary => commentary.pattern === 'post').length > 0;

  const [currentPage, setCurrentPage] = useState<Page>(Page.PROBLEM);

  const navigate = useNavigate();

  const handlePageSelect = (selectedPage: Page) => {
    if (currentPage === selectedPage) {
      closeMenu();
      return;
    }

    switch (selectedPage) {
      case Page.PRE_COMMENTARY: {
        navigate(`/problem/${problemId}/commentary/pre`);
        break;
      }
      case Page.PROBLEM: {
        navigate(`/problem/${problemId}/description`);
        break;
      }
      case Page.POST_COMMENTARY: {
        navigate(`/problem/${problemId}/commentary/post`);
        break;
      }
    }

    closeMenu();
  }

  const location = useLocation(); 

  useEffect(() => {

    const pathname = location.pathname;

    switch (pathname) {
      case `/problem/${problemId}/commentary/pre`: {
        setCurrentPage(Page.PRE_COMMENTARY);
        break;
      }
      case `/problem/${problemId}/description`: {
        setCurrentPage(Page.PROBLEM);
        break;
      }
      case `/problem/${problemId}/commentary/post`: {
        setCurrentPage(Page.POST_COMMENTARY);
        break;
      }
      default: {
        setCurrentPage(Page.OTHER);
        break;
      }
    }
  }, [location, problemInfo]);

  return (
    <>
     <Tooltip title="問題メニュー">
        <IconButton color="inherit" onClick={openMenu}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Drawer open={open} onClose={closeMenu} anchor="left">
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton disabled={!hasPreCommentary} onClick={() => handlePageSelect(Page.PRE_COMMENTARY)}>
                <ListItemIcon sx={{ color: currentPage === Page.PRE_COMMENTARY ? '#19bcbc' : 'inherit' }}>
                  <LiveHelpIcon />
                </ListItemIcon>
                <ListItemText primary="解説（前）" sx={{ color: currentPage === Page.PRE_COMMENTARY ? '#19bcbc' : 'inherit' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageSelect(Page.PROBLEM)}>
                <ListItemIcon sx={{ color: currentPage === Page.PROBLEM ? '#19bcbc' : 'inherit' }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="問題文" sx={{ color: currentPage === Page.PROBLEM ? '#19bcbc' : 'inherit' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton disabled={!hasPostCommentary} onClick={() => handlePageSelect(Page.POST_COMMENTARY)}>
                <ListItemIcon sx={{ color: currentPage === Page.POST_COMMENTARY ? '#19bcbc' : 'inherit' }}>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="解説（後）" sx={{ color: currentPage === Page.POST_COMMENTARY ? '#19bcbc' : 'inherit' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default ProblemMenu;