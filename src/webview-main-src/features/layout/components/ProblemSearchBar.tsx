import { Alert, Button, OutlinedInput, Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * 問題検索バー
 * @returns 問題検索バー
 */
const ProblemSearchBar: React.FC = () => {
  // 問題IDの入力のref
  const problemIdRef = useRef<HTMLInputElement>(null);

  // エラートーストの表示状態のstate
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

  const navigate = useNavigate();

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

    // 問題説明ページに移動
    navigate(`/problem/${problemId}/description`);
  };

  const { t } = useTranslation();

  return (
    <>
      <OutlinedInput
        size="small"
        className="my-2 focus:outline-none dark:border-darkMode-lighter dark:bg-darkMode-lighter dark:text-darkMode-text"
        placeholder={t("problemSearchBar.input.placeHolder")}
        inputRef={problemIdRef}
        sx={{ width: "130px" }}
      />
      <Button className="dark:text-darkMode-text" onClick={showProblemPage}>
        {t("problemSearchBar.button.text")}
      </Button>
      <Snackbar
        open={errorToastOpen}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        autoHideDuration={2000}
        onClose={hideErrorToast}
        sx={{ right: "auto" }}
      >
        <Alert severity="error" className="dark:bg-red-900 dark:text-darkMode-text">
          {t("problemSearchBar.alert.requireProblemId")}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProblemSearchBar;
