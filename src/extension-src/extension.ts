import { submitButton } from "./components/SubmitButton";
import * as vscode from "vscode";
import AOJSessionManager from "./util/AOJSessionManager";
import AOJViewProvider from "./util/AOJViewProvider";
import { createSubmitCommand } from "./components/SubmitCommand";
import SimpleDocumentContentProvider from "./util/SimpleTextDocumentContentProvider";
import { EXTENSION_SCHEME } from "./util/extensionInfo";

/**
 * 拡張機能をactivateします。
 * @param context - コンテキスト
 */
export const activate = (context: vscode.ExtensionContext) => {
  // セッションマネージャーを作成
  AOJSessionManager.createInstance(context.secrets);

  // ViewProviderを作成
  const aojViewProvider = AOJViewProvider.createInstance(context.extensionUri);
  context.subscriptions.push(vscode.window.registerWebviewViewProvider(AOJViewProvider.viewType, aojViewProvider));

  // 提出コマンドを作成
  const submitCommand = createSubmitCommand();
  context.subscriptions.push(submitCommand);

  // 提出ボタンを作成し表示
  context.subscriptions.push(submitButton);
  submitButton.show();

  const simpleDocumentContentProvider = new SimpleDocumentContentProvider();
  vscode.workspace.registerTextDocumentContentProvider(EXTENSION_SCHEME, simpleDocumentContentProvider);
};
