import { getSubmissionStatusMessage } from "../../../public-src/utils/JudgeInfoUtil";
import * as vscode from "vscode";
import AOJViewProvider from "../AOJViewProvider";
import SubmissionManager from "../SubmissionManager";
import aojApiClient from "../AOJApiClient";
import { ProgrammingLanguage, SubmissionStatus } from "../../../public-src/constants/constant";

/**
 * 提出コマンドを作成します。
 * @returns 提出コマンド
 */
export const createSubmitCommand = () => {
  // 提出コマンドを作成
  const submitCommand = vscode.commands.registerTextEditorCommand(
    "AOJ.submit",
    async (textEditor: vscode.TextEditor) => {
      // 言語の選択肢を作成
      const languageItems: vscode.QuickPickItem[] = Object.values(ProgrammingLanguage).map((language) => {
        return {
          label: language,
        };
      });

      // QuickPickのオプションを作成
      const option: vscode.QuickPickOptions = {
        title: "言語を選択",
      };

      // Quickpickを表示し、結果を取得
      const result = await vscode.window.showQuickPick(languageItems, option);

      // 言語が選択されなかった場合return
      if (!result) {
        return;
      }

      // ViewProviderから現在表示中の問題IDを取得
      const aojViewProvider = AOJViewProvider.getInstance();
      const currentProblemId = aojViewProvider.getCurrentProblemId()!;

      // 選択された結果から言語を取得
      const selectedLanguage = result.label;

      // TextEditorからソースコードを取得
      const sourceCode = textEditor.document.getText();

      // 提出マネージャーを作成し提出を行う
      const submissionManager = new SubmissionManager(currentProblemId, selectedLanguage, sourceCode);
      await submissionManager.submit();

      // 提出が失敗した場合、return
      if (!submissionManager.isSubmissionSuccess()) {
        return;
      }

      // 進捗バーを表示
      const progressOption: vscode.ProgressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: "提出",
      };

      await vscode.window.withProgress(progressOption, async (progress) => {
        progress.report({
          message: "実行中...",
        });

        // ジャッジ結果が取得できるまで待つ
        await submissionManager.waitForSubmissionResult();

        // ジャッジのジャッジIDと提出ステータス
        const judgeId = submissionManager.getJudgeId()!;
        const submissionStatus = submissionManager.getSubmissionStatus()!;

        // 提出ステータスに対応するメッセージを取得
        const submissionStatusMessage = getSubmissionStatusMessage(submissionStatus)!;

        if (submissionStatus === SubmissionStatus.STATE_ACCEPTED) {
          // 提出ステータスがACの場合、通常のメッセージを表示
          vscode.window
            .showInformationMessage(submissionStatusMessage, "結果を表示")
            .then((message) => handleMessageBtnSelection(message, judgeId));

          // 現在表示中の問題がACになった場合、webviewにメッセージを送信
          if (aojViewProvider.getCurrentProblemId() === currentProblemId) {
            aojViewProvider.changeCurrentProblemToSolved();
          }
        } else {
          // 提出ステータスがAC以外の場合、エラーメッセージを表示
          vscode.window
            .showErrorMessage(submissionStatusMessage, "結果を表示")
            .then((message) => handleMessageBtnSelection(message, judgeId));
        }
      });
    },
  );

  return submitCommand;
};

/**
 * メッセージのボタンの選択をハンドリングします。
 * @param message - メッセージ
 * @param judgeId - ジャッジID
 */
const handleMessageBtnSelection = async (message: string | undefined, judgeId: string) => {
  if (!message) {
    // ボタンが選択されていない場合、return
    return;
  } else if (message === "結果を表示") {
    // 結果を表示する

    // ジャッジの詳細を取得する
    const judgeDetailResponse = await aojApiClient.findByJudgeIdVerdict(judgeId);

    // エラーが発生した場合、return
    if (!judgeDetailResponse) {
      return;
    }

    const judgeDetail: object = judgeDetailResponse.data;

    // ジャッジの詳細を表示する
    const aojViewProvider: AOJViewProvider = AOJViewProvider.getInstance();
    aojViewProvider.showJudgeDetail(judgeDetail);
  }
};
