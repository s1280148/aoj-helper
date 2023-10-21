import { submitButton } from "../components/SubmitButton";
import * as path from "path";
import * as vscode from "vscode";
import AOJSessionManager from "./AOJSessionManager";
import aojApiClient from "./AOJApiClient";

/**
 * AOJViewProvider
 * （シングルトン）
 */
class AOJViewProvider implements vscode.WebviewViewProvider {
  /** viewType */
  public static readonly viewType = "AOJ.AOJView";

  /** view */
  private _view?: vscode.WebviewView;

  /** extension Uri */
  private readonly _extensionUri: vscode.Uri;

  /** 現在表示中の問題ID */
  private currentProblemId?: string;

  /** インスタンス */
  private static _instance: AOJViewProvider;

  /**
   * コンストラクタ
   * @param extensionUri extension Uri
   */
  private constructor(extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
  }

  /**
   * インスタンスを作成します。
   * @param extensionUri extension Uri
   * @returns インスタンス
   */
  static createInstance(extensionUri: vscode.Uri) {
    this._instance = new AOJViewProvider(extensionUri);
    return this._instance;
  }

  /**
   * インスタンスを取得します。
   * @returns インスタンス
   */
  static getInstance() {
    // インスタンスが存在しない場合に例外を投げる
    if (!this._instance) {
      throw new Error("Could not create an instance of AOJViewProvider.");
    }

    return this._instance;
  }

  /**
   * 現在表示中の問題IDを取得します。
   * @returns 現在表示中の問題ID
   */
  public getCurrentProblemId() {
    return this.currentProblemId;
  }

  /**
   * Webviewのviewをresolveします。
   * @param webviewView webviewView
   * @param context コンテキスト
   * @param _token トークン
   */
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    this._view.webview.options = {
      // jsを有効にする
      enableScripts: true,
    };

    // webviewにhtmlをセットする
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // webviewからのメッセージをハンドリングする
    this.handleMessageFromWebView(webviewView.webview);

    // webviewViewの表示状態が変化した時の処理を定義する
    this.defineOnDidChangeVisibility();
  }

  /**
   * htmlを取得します。
   * @param webview webview
   * @returns html
   */
  private _getHtmlForWebview(webview: vscode.Webview) {
    const cssFileName = "webview-main.css";
    const scriptFileName = "webView-main.js";

    // webViewのUriに変換
    const cssUri = this._view?.webview.asWebviewUri(
      vscode.Uri.file(path.join(this._extensionUri.path, "dist", "webview-main-src", cssFileName)),
    );
    const scriptUri = this._view?.webview.asWebviewUri(
      vscode.Uri.file(path.join(this._extensionUri.path, "dist", "webview-main-src", scriptFileName)),
    );

    return `
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="stylesheet" href=${cssUri}>
          <title>React App</title>
        </head>
        <body style="padding: 0; background-color: white; color: black;">
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <script>
            const vscode = acquireVsCodeApi();

            // セッションを取得
            vscode.postMessage({
              type: "session"
            });
          </script>

          <div id="root"></div>

          <script src="${scriptUri}"></script>

        </body>
      </html>
    `;
  }

  /**
   * webviewからのメッセージをハンドリングします
   */
  private handleMessageFromWebView(webview: vscode.Webview) {
    webview.onDidReceiveMessage(async (message) => {
      const aojSessionManager: AOJSessionManager = AOJSessionManager.getInstance();
      switch (message.type) {
        case "login": {
          // ログインを行う
          const { id, password } = message.contents;
          aojSessionManager.createSession(id, password);
          break;
        }
        case "logout": {
          // ログアウトを行う
          aojSessionManager.removeSession();
          break;
        }
        case "session": {
          // セッションを取得する
          aojSessionManager.getSession();
          break;
        }
        case "findByProblemIdDescription": {
          const { lang, problemId } = message.parameters;
          const response = await aojApiClient.findByProblemIdDescription(lang, problemId);

          if (response) {
            this._view?.webview.postMessage({
              type: "findByProblemIdDescription",
              status: "success",
              response: response.data,
            });

            this.currentProblemId = problemId;
          } else {
            this._view?.webview.postMessage({
              type: "findByProblemIdDescription",
              status: "error",
            });
          }
          break;
        }
        case "findAvailableFilters": {
          const { language, problemId } = message.parameters;

          const response = await aojApiClient.findAvailableFilters(language, problemId);

          if (response) {
            this._view?.webview.postMessage({
              type: "findAvailableFilters",
              status: "success",
              response: response.data,
            });
          } else {
            this._view?.webview.postMessage({
              type: "findAvailableFilters",
              status: "error",
            });
          }
          break;
        }
        case "findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter": {
          const { dlang, problemId, pattern, type, filter } = message.parameters;

          const response = await aojApiClient.findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter(
            dlang,
            problemId,
            pattern,
            type,
            filter,
          );

          if (response) {
            this._view?.webview.postMessage({
              type: "findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter",
              status: "success",
              response: response.data,
            });
          } else {
            this._view?.webview.postMessage({
              type: "findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter",
              status: "error",
            });
          }
          break;
        }
        case "findAllCoursesPage": {
          const { lang } = message.parameters;

          const response = await aojApiClient.findAllCoursesPage(lang);

          if (response) {
            this._view?.webview.postMessage({
              type: "findAllCoursesPage",
              status: "success",
              response: response.data,
            });
          } else {
            this._view?.webview.postMessage({
              type: "findAllCoursesPage",
              status: "error",
            });
          }
          break;
        }
        case "findByCourseIdPage": {
          const { courseId, lang } = message.parameters;

          const response = await aojApiClient.findByCourseIdPage(courseId, lang);

          if (response) {
            this._view?.webview.postMessage({
              type: "findByCourseIdPage",
              status: "success",
              response: response.data,
            });
          } else {
            this._view?.webview.postMessage({
              type: "findByCourseIdPage",
              status: "error",
            });
          }
          break;
        }
      }
    });
  }

  /**
   * webviewViewの表示状態が変化した時の処理を定義します。
   */
  private defineOnDidChangeVisibility() {
    this._view?.onDidChangeVisibility((e) => {
      // webviewViewが表示状態の時に提出ボタンを表示
      this._view?.visible ? submitButton.show() : submitButton.hide();
    });
  }

  /**
   * webviewViewの表示状態を取得します。
   * @returns webviewViewの表示状態
   */
  public isVisible() {
    return this._view?.visible ?? false;
  }

  /**
   * ログイン画面を表示します。
   */
  public showLoginView() {
    this._view?.webview.postMessage({
      type: "login",
      command: "show",
    });
  }

  /**
   * ログイン画面でエラーを表示します。
   */
  public showLoginError() {
    this._view?.webview.postMessage({
      type: "login",
      command: "error",
    });
  }

  /**
   * ログイン画面を閉じます。
   */
  public closeLoginView() {
    this._view?.webview.postMessage({
      type: "login",
      command: "close",
    });
  }

  /**
   * ジャッジの詳細を表示します。
   */
  public showJudgeDetail(judgeDetail: object) {
    this._view?.webview.postMessage({
      type: "judgeDetail",
      command: "show",
      contents: judgeDetail,
    });
  }
}

export default AOJViewProvider;
