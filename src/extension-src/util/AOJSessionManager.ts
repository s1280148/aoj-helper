import { SecretStorage } from "vscode";
import AOJViewProvider from "./AOJViewProvider";
import aojApiClient from "./AOJApiClient";

/**
 * AOJのセッションマネージャー
 * （シングルトン）
 */
class AOJSessionManager {
  /** Cookieを保存するためのキー */
  private static readonly key = "AOJ Session Information";

  /** シークレットストレージ */
  private readonly secretStrage: SecretStorage;

  /** インスタンス */
  private static _instance: AOJSessionManager;

  /**
   * コンストラクタ
   * @param secretStrage シークレットストレージ
   */
  private constructor(secretStrage: SecretStorage) {
    this.secretStrage = secretStrage;
  }

  /**
   * インスタンスを作成します。
   * @param secretStorage シークレットストレージ
   * @returns インスタンス
   */
  static createInstance(secretStorage: SecretStorage) {
    this._instance = new AOJSessionManager(secretStorage);
    return this._instance;
  }

  /**
   * インスタンスを取得します。
   * @returns インスタンス
   */
  static getInstance() {
    // インスタンスが存在しない場合に例外を投げる
    if (!this._instance) {
      throw new Error("Could not create an instance of AOJSessionManager.");
    }

    return this._instance;
  }

  /**
   * セッションを取得します。
   */
  async getSession() {
    // 保存済みのCookieの値を取得
    const savedCookie = await this.secretStrage.get(AOJSessionManager.key);

    if (savedCookie) {
      // Cookieが存在する場合は、セッションを確認
      aojApiClient.applySession(savedCookie);
      await aojApiClient.session();
    } else {
      // Cookieが存在しない場合はログイン画面を表示
      const aojViewProvider: AOJViewProvider = AOJViewProvider.getInstance();
      aojViewProvider.showLoginView();
    }
  }

  /**
   * セッションを作成します。
   */
  async createSession(id: string, password: string) {
    // ログインを行う
    const response = await aojApiClient.login(id, password);

    // エラーが発生した場合return
    if (!response) {
      return;
    }

    // レスポンスからCookieの値を取得する
    const cookie: string = response.headers["set-cookie"]
      ? response.headers["set-cookie"][0]
      : (response.config.headers!["Cookie"] as string);

    // Cookieの値をSecretStrageに保存
    this.secretStrage.store(AOJSessionManager.key, cookie);

    // Cookieをリクエストヘッダーに付与
    aojApiClient.applySession(cookie);

    // ログイン画面を閉じる
    const aojViewProvider: AOJViewProvider = AOJViewProvider.getInstance();
    aojViewProvider.closeLoginView();
  }

  /**
   * セッションを削除します。
   */
  async removeSession() {
    // ログアウトを行う
    const response = await aojApiClient.logout();

    // エラーが発生した場合return
    if (!response) {
      return;
    }

    // SecretStrageからCookieの値を削除
    await this.secretStrage.delete(AOJSessionManager.key);

    // リクエストヘッダーからCookieの値を削除
    aojApiClient.removeSession();

    // ログイン画面を表示する
    const aojViewProvider: AOJViewProvider = AOJViewProvider.getInstance();
    aojViewProvider.showLoginView();
  }
}

export default AOJSessionManager;
