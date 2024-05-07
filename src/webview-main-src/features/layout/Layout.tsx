import { Box } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import JudgeDetailModal from "../judge-detail/JudgeDetailModal";
import LoginModal from "../login/LoginModal";
import ScrollTop from "./components/ScrollTop";
import CustomToaster from "../../components/toast/CustomToaster";

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
      <CustomToaster />
    </>
  );
};

export default Layout;
