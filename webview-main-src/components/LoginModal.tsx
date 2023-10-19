import { useRef, useState } from "react";
import Dialog from '@mui/material/Dialog';
import { Alert, Button, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";

/**
 * ログイン画面のモーダル
 * @returns ログイン画面のモーダル
 */
const LoginModal = () => {

  /** モーダルの開閉のstate */
  const [open, setOpen] = useState<boolean>(false);

  /**
   * ログインモーダルを開きます。
   */
  const openLoginModal = () => {
    setOpen(true);
  }

  /**
   * ログインモーダルを閉じます。
   */
  const closeLoginModal = () => {
    setOpen(false)
    cleanupLoginModal();
  }

  /**
   * ログインモーダルのクリーンアップを行います。
   */
  const cleanupLoginModal = () => {
    hideIdError();
    hidePasswordError();
    hideAlert();
  }

  /** IDとパスワードのエラーのstate */
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  /**
   * IDのエラーを表示します。
   */
  const showIdError = () => {
    setIdError(true);
  }

  /**
   * IDのエラーを非表示にします。
   */
  const hideIdError = () => {
    setIdError(false);
  }

  /**
   * パスワードのエラーを表示します。
   */
  const showPasswordError = () => {
    setPasswordError(true);
  }

  /**
   * パスワードのエラーを非表示にします。
   */
  const hidePasswordError = () => {
    setPasswordError(false);
  }

  /** アラートのstate */
  const [alert, setAlert] = useState<boolean>(false);

  /**
   * アラートを表示します。
   */
  const showAlert = () => {
    setAlert(true);
  }

  /**
   * アラートを非表示にします。
   */
  const hideAlert = () => {
    setAlert(false);
  }

  /** IDとパスワードのref */
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  /**
   * ログインを行います。
   * @param e イベント
   */
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力されたIDとパスワードを取得
    const id = idRef.current?.value;
    const password = passwordRef.current?.value;

    // 入力をチェックする
    const isInputValid = checkInputContents(id, password);

    // 入力が有効でない場合return
    if (!isInputValid) {
      return;
    }

    // 拡張機能にログインを要求するメッセージを送信
    vscode.postMessage({
      type: "login",
      contents: {
        id: id,
        password: password
      }
    });
  }

  /**
   * 入力された内容をチェックします。
   */
  const checkInputContents = (id: string | undefined, password: string | undefined) => {
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
  }

  // 拡張機能からメッセージを受け取る
  window.addEventListener("message", event => {
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
            break;
        }
        break;
    }
  });

  return (
    <Dialog open={open}>
      <DialogTitle>ログイン</DialogTitle>
        <DialogContent>
          <form onSubmit={login}>          
            <Alert 
              severity="error" 
              className="m-2" 
              sx={{ display: alert ? "" : "none" }}
            >
            ログインに失敗しました。
            </Alert>
            <TextField
              id="id"
              label="ID"
              type="text"
              margin="dense"
              fullWidth
              variant="outlined"
              className="m-1"
              inputRef={idRef}
              error={idError}
              helperText={idError ? "入力してください" : ""}
            />
            <TextField
              id="password"
              label="パスワード"
              type="password"
              margin="dense"
              fullWidth
              variant="outlined"
              className="m-1"
              inputRef={passwordRef}
              error={passwordError}
              helperText={passwordError ? "入力してください" : ""}
            />
            <Grid container justifyContent="flex-end" className="mt-2">
              <Button variant="contained" type="submit">ログイン</Button>
            </Grid>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default LoginModal;