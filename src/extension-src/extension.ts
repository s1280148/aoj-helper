import { createSubmitCommand } from "./components/submit/SubmitCommand";
import * as vscode from "vscode";
import AOJSessionManager from "./components/AOJSessionManager";
import AOJViewProvider from "./components/AOJViewProvider";
import SimpleDocumentContentProvider from "./components/SimpleTextDocumentContentProvider";
import { submitButton } from "./components/submit/SubmitButton";
import { EXTENSION_SCHEME } from "./settings/extensionScheme";

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
