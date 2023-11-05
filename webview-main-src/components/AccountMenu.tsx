import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { ThemeInfoContext } from "../providers/ThemeInfoProvider";
import { Box, Button, Dialog, DialogContent, Switch } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

/**
 * アカウントメニュー
 * @returns アカウントメニュー
 */
const AccountMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openAccountMenu = () => {
    setOpen(true);
  };

  const closeAccountMenu = () => {
    setOpen(false);
  };

  const logout = () => {
    vscode.postMessage({
      type: "logout",
    });

    closeAccountMenu();
  };

  const { isDarkMode, setIsDarkMode } = useContext(ThemeInfoContext);

  const handleThemeToggleButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(e.target.checked);
  };

  return (
    <>
      <Tooltip title="メニュー">
        <IconButton onClick={openAccountMenu} className="text-black dark:text-darkMode-text">
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        fullWidth
        onClose={closeAccountMenu}
        PaperProps={{
          className: "dark:bg-darkMode-bg",
        }}
      >
        <DialogContent>
          <Box>
            <h1 className="text-xl dark:text-darkMode-text">ダークモード</h1>
            <Switch checked={isDarkMode} onChange={handleThemeToggleButtonChange} />
          </Box>
          <Box className="mt-7">
            <Button variant={isDarkMode ? "outlined" : "contained"} startIcon={<LogoutIcon />} onClick={logout}>
              ログアウト
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountMenu;
