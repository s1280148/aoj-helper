import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ApiErrorCode from "../../public-src/ApiErrorCode";
import AOJViewProvider from "./AOJViewProvider";

/**
 * AOJのAPIクライアント
 */
class AOJApiClient {
  /** judgeApiのクライアント */
  private readonly judgeApiClient: AxiosInstance;

  /**
   * コンストラクタ
   */
  constructor() {
    this.judgeApiClient = this.createJudgeApiClient();
  }

  /**
   * judgeApiのクライアントを作成します。
   * @returns judgeApiのクライアント
   */
  private createJudgeApiClient(): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: "https://judgeapi.u-aizu.ac.jp",
      headers: {
        Cookie: "",
      },
    };

    const judgeApiClient = axios.create(config);

    // インターセプターを定義
    judgeApiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // エラーコードを取得
        const code: number = error.response.data[0].id;

        // viewProviderのインスタンスを取得
        const aojViewProvider = AOJViewProvider.getInstance();

        // エラーコードによって処理を分岐する
        switch (code) {
          case ApiErrorCode.USER_NOT_FOUND_ERROR:
            // 入力内容に該当するユーザーが見つからなかった場合、ログイン画面にエラーを表示
            aojViewProvider.showLoginError();
            break;

          case ApiErrorCode.INVALID_ACCESS_TOKEN_ERROR:
            // 無効なアクセストークンが送信された場合、ログイン画面を表示
            aojViewProvider.showLoginView();
            break;

          case ApiErrorCode.INVALID_REFRESH_TOKEN_ERROR:
            // 無効なリフレッシュトークンが送信された場合、ログイン画面を表示
            aojViewProvider.showLoginView();
            break;
        }
      },
    );

    return judgeApiClient;
  }

  /**
   * セッション情報を適用します。
   * @param cookie cookieの値
   */
  applySession = (cookie: string) => {
    // judgeApiのクライアントにセッション情報を適用
    this.judgeApiClient.interceptors.request.clear();
    this.judgeApiClient.interceptors.request.use((config) => {
      config.headers!["Cookie"] = cookie;
      return config;
    });
  };

  /**
   * セッション情報を削除します。
   */
  removeSession = () => {
    // judgeApiのクライアントからセッション情報を削除
    this.judgeApiClient.interceptors.request.clear();
    this.judgeApiClient.interceptors.request.use((config) => {
      config.headers!["Cookie"] = "";
      return config;
    });
  };

  /**
   * ログインを行います。
   * @param id - ID
   * @param password - パスワード
   * @returns ログイン結果
   */
  login = async (id: string, password: string) => {
    const requestBody = {
      id: id,
      password: password,
    };

    return this.judgeApiClient.post("/session", requestBody);
  };

  /**
   * ログアウトを行います。
   * @returns ログアウト結果
   */
  logout = async () => {
    return this.judgeApiClient.delete("/session");
  };

  /**
   * セッション情報を取得します。
   * @returns セッション情報
   */
  session = async () => {
    return this.judgeApiClient.get("/self");
  };

  /**
   * 言語と問題IDから問題の情報を取得します。
   * @param lang - 言語
   * @param problemId - 問題ID
   * @returns 問題の情報
   */
  findByProblemIdDescription = async (lang: string, problemId: string) => {
    return this.judgeApiClient.get(`/resources/descriptions/${lang}/${problemId}`);
  };

  /**
   * ジャッジIDからジャッジの詳細を取得します。
   * @param judgeId - ジャッジID
   * @returns ジャッジの詳細
   */
  findByJudgeIdVerdict = async (judgeId: string) => {
    return this.judgeApiClient.get(`/verdicts/${judgeId}`);
  };

  /**
   * キューにある提出記録一覧を取得します。
   * @returns 提出記録一覧
   */
  findRecentSubmissionRecords = async () => {
    return this.judgeApiClient.get("/submission_records/recent");
  };

  /**
   * 提出を行います。
   * @param problemId 問題ID
   * @param language プログラミング言語
   * @param sourceCode ソースコード
   * @returns 提出のトークン
   */
  submit = async (problemId: string, language: string, sourceCode: string) => {
    const requestBody = {
      problemId: problemId,
      language: language,
      sourceCode: sourceCode,
    };

    return this.judgeApiClient.post("/submissions", requestBody);
  };

  findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter = async (
    dlang: string,
    problemId: string,
    pattern: string,
    type: string,
    filter: string,
  ) => {
    return this.judgeApiClient.get(`/resources/commentaries/${dlang}/${problemId}/${pattern}/${type}/${filter}`);
  };

  findAvailableFilters = async (language: string, problemId: string) => {
    return this.judgeApiClient.get(`/resources/commentaries/filters/${language}/${problemId}`);
  };

  findAllCoursesPage = async (lang: string) => {
    return this.judgeApiClient.get(`/courses?lang=${lang}`);
  };

  findByCourseIdPage = async (courseId: string, lang: string) => {
    return this.judgeApiClient.get(`/courses/${courseId}?lang=${lang}`);
  };
}

const aojApiClient = new AOJApiClient();
export default aojApiClient;
