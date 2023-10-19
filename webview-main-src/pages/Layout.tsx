import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import JudgeDetailModal from "../components/JudgeDetailModal";
import LoginModal from "../components/LoginModal";

/**
 * レイアウトの共通部分
 * @returns レイアウトの共通部分
 */
const Layout: React.FC = () => {
  return (
    <>
      <LoginModal />
      <JudgeDetailModal />
      <Header />
      <Box className="mx-2 py-2 w-auto">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
