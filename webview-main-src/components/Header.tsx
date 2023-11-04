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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{
          borderBottom: 4,
          borderColor: "#19bcbc",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            paddingX: "10px !important",
          }}
        >
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
