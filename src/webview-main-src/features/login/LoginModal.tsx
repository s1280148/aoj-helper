import { useContext, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Alert, Box, Button, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ProblemInfoContext } from "../../providers/ProblemInfoProvider";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";
import { EnvironmentInfoContext } from "../../providers/EnvironmentInfoProvider";
import { ProblemDescription } from "../../../public-src/types/ApiResponseType";

/**
 * ログインモーダル
 * @returns ログインモーダル
 */
const LoginModal = () => {
  // ログインモーダルの表示状態のstate
  const [open, setOpen] = useState<boolean>(false);

  /**
   * ログインモーダルを開きます。
   */
  const openLoginModal = () => {
    setOpen(true);
  };

  /**
   * ログインモーダルを閉じます。
   */
  const closeLoginModal = () => {
    setOpen(false);
  };

  /**
   * ログインモーダルのクリーンアップを行います。
   */
  const cleanupLoginModal = () => {
    hideIdError();
    hidePasswordError();
    hideAlert();
  };

  // IDのエラーの表示状態のstate
  const [idError, setIdError] = useState<boolean>(false);

  // パスワードのエラーの表示状態のstate
  const [passwordError, setPasswordError] = useState<boolean>(false);

  /**
   * IDのエラーを表示します。
   */
  const showIdError = () => {
    setIdError(true);
  };

  /**
   * IDのエラーを非表示にします。
   */
  const hideIdError = () => {
    setIdError(false);
  };

  /**
   * パスワードのエラーを表示します。
   */
  const showPasswordError = () => {
    setPasswordError(true);
  };

  /**
   * パスワードのエラーを非表示にします。
   */
  const hidePasswordError = () => {
    setPasswordError(false);
  };

  // ログイン失敗アラートの表示状態のstate
  const [alert, setAlert] = useState<boolean>(false);

  /**
   * アラートを表示します。
   */
  const showAlert = () => {
    setAlert(true);
  };

  /**
   * アラートを非表示にします。
   */
  const hideAlert = () => {
    setAlert(false);
  };

  // IDの入力のref
  const idRef = useRef<HTMLInputElement>(null);

  // パスワードの入力のref
  const passwordRef = useRef<HTMLInputElement>(null);

  /**
   * ログインを行います。
   * @param e - フォームのsubmit時のイベント
   */
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力されたIDとパスワードを取得
    const id = idRef.current?.value;
    const password = passwordRef.current?.value;

    // 入力が有効かをチェック
    const isInputValid = checkInputContents(id, password);

    // 入力が有効でない場合、return
    if (!isInputValid) {
      return;
    }

    // 拡張機能側に、ログインを要求するメッセージを送信
    vscode.postMessage({
      type: "login",
      contents: {
        id: id,
        password: password,
      },
    });
  };

  /**
   * 入力されたログイン情報をチェックします。
   * @param id - ID
   * @param password - パスワード
   * @returns 入力されたログイン情報が有効か
   */
  const checkInputContents = (id: undefined | string, password: undefined | string) => {
    let isInputValid = true;

    // IDのチェック
    if (!id) {
      showIdError();
      isInputValid = false;
    } else {
      hideIdError();
    }

    // パスワードのチェック
    if (!password) {
      showPasswordError();
      isInputValid = false;
    } else {
      hidePasswordError();
    }

    return isInputValid;
  };

  // 拡張機能側から、ログインに関するメッセージを受信
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;

      switch (message.type) {
        case "login":
          switch (message.command) {
            case "show":
              openLoginModal();
              break;
            case "error":
              showAlert();
              break;
            case "close":
              closeLoginModal();
              cleanupLoginModal();
              resetSelectedProblem();
              break;
          }
          break;
      }
    });
  }, []);

  // 現在表示中の問題の情報のstate
  const { problemInfo, setProblemInfo } = useContext(ProblemInfoContext);

  // 環境情報のstate
  const { environmentInfo, setEnvironmentInfo } = useContext(EnvironmentInfoContext);

  const navigate = useNavigate();

  /**
   * ログイン時に問題をリセットします。
   */
  const resetSelectedProblem = async () => {
    // 問題をITP1_1_Aに変更
    navigate("/refresh");
    navigate("/problem/ITP1_1_A/description");
  };

  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      PaperProps={{
        className: "dark:bg-darkMode-bg",
      }}
    >
      <DialogTitle className="dark:text-darkMode-text">{t("loginModal.login")}</DialogTitle>
      <DialogContent>
        <form onSubmit={login}>
          <Alert
            severity="error"
            className={`
            m-2
            dark:bg-red-900
            dark:text-darkMode-text
            ${alert ? "" : "hidden"}
            `}
          >
            {t("loginModal.alert.failedLogin")}
          </Alert>
          <TextField
            id="id"
            label="ID"
            type="text"
            margin="dense"
            fullWidth
            variant="outlined"
            className="mx-1 my-2"
            inputRef={idRef}
            error={idError}
            helperText={idError ? t("loginModal.error.empty") : ""}
          />
          <TextField
            id="password"
            label={t("loginModal.password")}
            type="password"
            margin="dense"
            fullWidth
            variant="outlined"
            className="mx-1 my-2"
            inputRef={passwordRef}
            error={passwordError}
            helperText={passwordError ? t("loginModal.error.empty") : ""}
          />
          <Grid container justifyContent="flex-end" className="mt-2">
            <Button
              variant="contained"
              type="submit"
              className="dark:bg-darkMode dark:bg-darkMode-lighter dark:text-darkMode-text"
            >
              {t("loginModal.login")}
            </Button>
          </Grid>
        </form>
        <Box className="text-center mt-3">
          <a
            href="https://onlinejudge.u-aizu.ac.jp/signup"
            target="_blank"
            rel="noopener"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("loginModal.createAccount")}
          </a>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
