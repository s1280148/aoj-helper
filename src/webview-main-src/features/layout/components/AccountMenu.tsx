import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { EnvironmentInfoContext } from "../../../providers/EnvironmentInfoProvider";
import { DisplayLanguage, ProgrammingLanguage } from "../../../../public-src/constants/constant";
import { useTranslation } from "react-i18next";
import { getDisplayLanguageLabelFromDisplayLanguage } from "../../../../public-src/utils/DisplayLanguageUtil";
import { useNavigate } from "react-router";
import { ProblemInfoContext } from "../../../providers/ProblemInfoProvider";

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

  // 環境情報のstate
  const { environmentInfo, setEnvironmentInfo } = useContext(EnvironmentInfoContext);

  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo } = useContext(ProblemInfoContext);

  const navigate = useNavigate();

  /**
   * 表示言語のセレクトメニューの変更をハンドリングします。
   * @param e - セレクトメニュー変更時のイベント
   */
  const handleDisplayLanguageSelectChange = (e: SelectChangeEvent) => {
    setEnvironmentInfo({
      ...environmentInfo,
      displayLanguage: e.target.value as DisplayLanguage,
    });

    // 問題説明画面に遷移
    navigate(`/problem/${problemInfo?.problem_id}/description`);
  };

  /**
   * プログラミング言語のセレクトメニューの変更をハンドリングします。
   * @param e - セレクトメニュー変更時のイベント
   */
  const handleProgrammingLanguageSelectChange = (e: SelectChangeEvent) => {
    setEnvironmentInfo({
      ...environmentInfo,
      programmingLanguage: e.target.value as ProgrammingLanguage,
    });
  };

  /**
   * テーマボタンの押下をハンドリングします。
   * @param e - ボタン押下時のイベント
   */
  const handleThemeToggleButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnvironmentInfo({
      ...environmentInfo,
      isDarkMode: e.target.checked,
    });
  };

  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("accountMenu.tooltip")}>
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
            <h1 className="text-xl dark:text-darkMode-text mb-3">{t("accountMenu.displayLanguage")}</h1>
            <FormControl sx={{ minWidth: 130 }} size="small" margin="none">
              <Select
                className="dark:bg-darkMode-lightest dark:border-darkMode-lightest dark:text-darkMode-text"
                onChange={handleDisplayLanguageSelectChange}
                value={environmentInfo.displayLanguage}
                inputProps={{
                  className: "py-1",
                }}
                MenuProps={{
                  MenuListProps: {
                    className: "p-0",
                  },
                }}
              >
                {Object.values(DisplayLanguage).map((displayLanguage) => {
                  return (
                    <MenuItem
                      className="dark:bg-darkMode-lightest dark:border-darkMode-lightest dark:text-darkMode-text"
                      value={displayLanguage}
                      dense
                    >
                      {getDisplayLanguageLabelFromDisplayLanguage(displayLanguage)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box className="mt-7">
            <h1 className="text-xl dark:text-darkMode-text mb-3">{t("accountMenu.programmingLanguage")}</h1>
            <FormControl sx={{ minWidth: 130 }} size="small" margin="none">
              <Select
                className="dark:bg-darkMode-lightest dark:border-darkMode-lightest dark:text-darkMode-text"
                onChange={handleProgrammingLanguageSelectChange}
                value={environmentInfo.programmingLanguage}
                inputProps={{
                  className: "py-1",
                }}
                MenuProps={{
                  MenuListProps: {
                    className: "p-0",
                  },
                }}
              >
                {Object.values(ProgrammingLanguage).map((programmingLanguage) => {
                  return (
                    <MenuItem
                      className="dark:bg-darkMode-lightest dark:border-darkMode-lightest dark:text-darkMode-text"
                      value={programmingLanguage}
                      dense
                    >
                      {programmingLanguage}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box className="mt-7">
            <h1 className="text-xl dark:text-darkMode-text">{t("accountMenu.darkMode")}</h1>
            <Switch checked={environmentInfo.isDarkMode} onChange={handleThemeToggleButtonChange} />
          </Box>
          <Box className="mt-7">
            <Button
              variant={environmentInfo.isDarkMode ? "outlined" : "contained"}
              startIcon={<LogoutIcon />}
              onClick={logout}
            >
              {t("accountMenu.logout")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountMenu;
