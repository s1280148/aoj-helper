/**
 * 提出の進行状況
 */
export const enum SubmissionProgress {
  SUBMITTED = 0,
  SENT_TO_JUDGE = 1,
  BUILD = 2,
  RUN = 3,
  RESOURCE_LIMIT_CHECK = 4,
  RESULT_CHECK = 5,
  PRESENTATION_CHECK = 6,
  ACCEPTED = 7,
}

/**
 * 提出ステータス
 */
export const enum SubmissionStatus {
  STATE_COMPILEERROR = 0,
  STATE_WRONGANSWER = 1,
  STATE_TIMELIMIT = 2,
  STATE_MEMORYLIMIT = 3,
  STATE_ACCEPTED = 4,
  STATE_WAITING = 5,
  STATE_OUTPUTLIMIT = 6,
  STATE_RUNTIMEERROR = 7,
  STATE_PRESENTATIONERROR = 8,
  STATE_RUNNING = 9,
}

export enum ProgrammingLanguage {
  C = "C",
  Cpp = "C++",
  Java = "JAVA",
  Cpp11 = "C++11",
  Cpp14 = "C++14",
  Cpp17 = "C++17",
  CS = "C#",
  D = "D",
  Go = "Go",
  Ruby = "Ruby",
  Rust = "Rust",
  Python = "Python",
  Python3 = "Python3",
  PyPy3 = "PyPy3",
  JavaScript = "JavaScript",
  Scala = "Scala",
  Haskell = "Haskell",
  OCaml = "OCaml",
  PHP = "PHP",
  Kotlin = "Kotlin",
}

/**
 * APIエラーコード
 */
export const enum ApiErrorCode {
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
  UNKNOWN_ERROR = 9999,
}
