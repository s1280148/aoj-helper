import { AppBar, Box, Toolbar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import ProblemSearchBar from "./ProblemSearchBar";
import ProblemMenu from "./ProblemMenu";

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
        <Toolbar variant="dense">
          <Box>
            <ProblemMenu />
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box className="mr-4">
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
