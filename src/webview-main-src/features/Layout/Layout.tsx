import { Box } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header/Header";
import JudgeDetailModal from "../JudgeDetail/JudgeDetailModal";
import LoginModal from "../Login/LoginModal";
import ScrollTop from "./components/ScrollTop";

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
      <ScrollTop />
    </>
  );
};

export default Layout;
