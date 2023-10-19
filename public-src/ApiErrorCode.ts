/**
 * APIエラーコード
 */
const enum ApiErrorCode {

  // 無効なアクセストークンが送信された
  INVALID_ACCESS_TOKEN_ERROR = 1101,

  // 無効なリフレッシュトークンが送信された
  INVALID_REFRESH_TOKEN_ERROR = 1102,

  // APIの実行権限がない
  ACCESS_DENIED_ERROR = 1301,

  // 送信されたユーザIDとパスワードに一致するユーザが見つからなかった
  USER_NOT_FOUND_ERROR = 1401,

  // 値のバリデーションに失敗した
  VALIDATION_ERROR = 2001,

  // 重複できない項目に重複する値が指定された
  DUPLICATION_ERROR = 2002,

  // 存在しない値が指定された
  DATA_NOT_EXIST_ERROR = 2003,

  // 存在しないリソースが指定された
  RESOURCE_NOT_EXIST_ERROR = 2004,

  // 無効なURIが指定された
  METHOD_NOT_ALLOWED_ERROR = 2005,

  // データベースとの接続に失敗した
  DATABASE_CONNECTION_ERROR = 3001,

  // クエリの実行中にエラーが発生した
  DATABASE_QUERY_ERROR = 3002,

  // APIの実行中に何らかのエラーが発生した
  API_EXECUTION_ERROR = 4001,

  // JudgeまたはJudgeキューがメンテナンス中で使用不可
  JUDGE_QUEUE_ERROR = 4002,

  // API, DBの整合性が正しくない
  INVALID_MANAGEMENT_ERROR = 4003,

  // 不明なエラー
  UNKNOWN_ERROR = 9999
}

export default ApiErrorCode;