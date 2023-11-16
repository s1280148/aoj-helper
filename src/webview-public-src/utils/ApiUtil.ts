import { Mutex } from "async-mutex";

// API呼び出し用のmutex
// 同一APIを同時に呼ぶとイベントが重複してしまうため、排他制御を行う
const apiCallMutex = new Mutex();

/**
 * APIを呼び出します。
 * @param name - API名
 * @param parameters - パラメータ一覧
 * @returns レスポンス
 */
export const callApi = async (name: string, parameters: object) => {
  // mutexを取得
  const release = await apiCallMutex.acquire();

  return new Promise((resolve, reject) => {
    /**
     * APIのレスポンスを取得します。
     * @param event - イベント
     * @returns APIのレスポンス
     */
    const apiListener = (event: MessageEvent) => {
      const message = event.data;

      // 対象の呼び出しに対するレスポンスではない場合、return
      if (message.type !== name) {
        return;
      }

      // イベントリスナーを削除
      window.removeEventListener("message", apiListener);

      // mutexを開放
      release();

      // レスポンスを作成
      switch (message.status) {
        case "success": {
          resolve(message.response);
          break;
        }
        case "error": {
          reject();
          break;
        }
      }
    };

    // APIのレスポンス取得用のイベントリスナーを登録する
    window.addEventListener("message", apiListener);

    // APIを呼び出す
    vscode.postMessage({
      type: name,
      parameters: parameters,
    });
  });
};
