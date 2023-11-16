import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import { ThemeInfoContext } from "../../../providers/ThemeInfoProvider";
import { Box, Button, Dialog, DialogContent, Switch } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

/**
 * アカウントメニュー
 * @returns アカウントメニュー
 */
const AccountMenu: React.FC = () => {
  // アカウントメニューの表示状態のstate
  const [open, setOpen] = useState<boolean>(false);

  /**
   * アカウントメニューを開きます。
   * @param e - ボタン押下時のイベント
   */
  const openAccountMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 押下されたボタンにフォーカスが残るので、明示的に外す
    e.currentTarget.blur();
    setOpen(true);
  };

  /**
   * アカウントメニューを閉じます。
   */
  const closeAccountMenu = () => {
    setOpen(false);
  };

  /**
   * ログアウトを行います。
   */
  const logout = () => {
    // 拡張機能側に、ログアウトを要求するメッセージを送信
    vscode.postMessage({
      type: "logout",
    });

    closeAccountMenu();
  };

  // ダークモードかのstate
  const { isDarkMode, setIsDarkMode } = useContext(ThemeInfoContext);

  /**
   * テーマボタンの押下をハンドリングします。
   * @param e - ボタン押下時のイベント
   */
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
