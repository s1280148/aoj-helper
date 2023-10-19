import { Alert, Button, OutlinedInput, Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 問題検索バー
 * @returns 問題検索バー
 */
const ProblemSearchBar: React.FC = () => {
  // 問題IDのref
  const problemIdRef = useRef<HTMLInputElement>(null);

  // ページ遷移のためのナビゲート
  const navigate = useNavigate();

  // エラートーストの表示のstate
  const [errorToastOpen, setErrorToastOpen] = useState<boolean>(false);

  /**
   * エラートーストを表示します。
   */
  const showErrorToast = () => {
    setErrorToastOpen(true);
  };

  /**
   * エラートーストを非表示にします。
   */
  const hideErrorToast = () => {
    setErrorToastOpen(false);
  };

  /**
   * 問題ページを表示します。
   */
  const showProblemPage = () => {
    // 入力されている問題ID
    const problemId = problemIdRef.current?.value;

    // 問題IDが入力されていない場合、エラートーストを表示
    if (!problemId) {
      showErrorToast();
      return;
    }

    // 問題ページへ遷移
    navigate(`/problem/${problemId}/description`);
  };

  return (
    <>
      <OutlinedInput size="small" className="my-2" placeholder="問題IDを入力" inputRef={problemIdRef} />
      <Button onClick={showProblemPage}>検索</Button>
      <Snackbar
        open={errorToastOpen}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        autoHideDuration={2000}
        onClose={hideErrorToast}
        sx={{ right: "auto" }}
      >
        <Alert severity="error">問題IDを入力してください</Alert>
      </Snackbar>
    </>
  );
};

export default ProblemSearchBar;
