import { AppBar, Box, Toolbar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import ProblemSearchBar from "./ProblemSearchBar";
import ProblemMenu from "./ProblemMenu";
import ProblemListButton from "./ProblemListButton";
import ProblemInfoPanel from "./ProblemInfoPanel";

/**
 * ヘッダー
 * @returns ヘッダー
 */
const Header: React.FC = () => {
  return (
    <Box>
      <AppBar
        position="static"
        className="border-b-4 border-course dark:border-course-dark bg-white dark:bg-darkMode-bg"
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

export default Header;
