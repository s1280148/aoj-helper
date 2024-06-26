import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AOJViewProvider from "./AOJViewProvider";
import { ApiErrorCode, ProgrammingLanguage } from "../../public-src/constants/constant";

/**
 * AOJのAPIクライアント
 */
class AOJApiClient {
  /** judgeApiのクライアント */
  private readonly judgeApiClient: AxiosInstance;

  /** reviewApiのクライアント */
  private readonly reviewApiClient: AxiosInstance;

  /**
   * コンストラクタ
   */
  constructor() {
    this.judgeApiClient = this.createJudgeApiClient();
    this.reviewApiClient = this.createReviewApiClient();
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
   * reviewApiのクライアントを作成します。
   * @returns reviewApiのクライアント
   */
  private createReviewApiClient(): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: "https://rose.u-aizu.ac.jp",
      headers: {
        Cookie: "",
      },
    };

    const reviewApiClient = axios.create(config);

    // インターセプターを定義
    reviewApiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // エラーコードを取得
        const code: number = error.response.data[0].id;

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

    return reviewApiClient;
  }

  /**
   * セッション情報を適用します。
   * @param cookie - cookieの値
   */
  applySession = (cookie: string) => {
    // judgeApiのクライアントにセッション情報を適用
    this.judgeApiClient.interceptors.request.clear();
    this.judgeApiClient.interceptors.request.use((config) => {
      config.headers!["Cookie"] = cookie;
      return config;
    });

    // reviewApiのクライアントにセッション情報を適用
    this.reviewApiClient.interceptors.request.clear();
    this.reviewApiClient.interceptors.request.use((config) => {
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

    // reviewApiのクライアントからセッション情報を削除
    this.reviewApiClient.interceptors.request.clear();
    this.reviewApiClient.interceptors.request.use((config) => {
      config.headers!["Cookie"] = "";
      return config;
    });
  };

  /**
   * ログインを行います。
   * @param id - ID
   * @param password - パスワード
   * @returns レスポンス
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
   * @returns レスポンス
   */
  logout = async () => {
    return this.judgeApiClient.delete("/session");
  };

  /**
   * セッション情報を取得します。
   * @returns レスポンス
   */
  session = async () => {
    return this.judgeApiClient.get("/self");
  };

  /**
   * 問題の情報を取得します。
   * @param lang - 表示言語
   * @param problemId - 問題ID
   * @returns レスポンス
   */
  findByProblemIdDescription = async (lang: string, problemId: string) => {
    return this.judgeApiClient.get(`/resources/descriptions/${lang}/${problemId}`);
  };

  /**
   * ジャッジの詳細を取得します。
   * @param judgeId - ジャッジID
   * @returns レスポンス
   */
  findByJudgeIdVerdict = async (judgeId: string) => {
    return this.judgeApiClient.get(`/verdicts/${judgeId}`);
  };

  /**
   * キューにある提出記録一覧を取得します。
   * @returns レスポンス
   */
  findRecentSubmissionRecords = async () => {
    return this.judgeApiClient.get("/submission_records/recent");
  };

  /**
   * 提出を行います。
   * @param problemId - 問題ID
   * @param language - プログラミング言語
   * @param sourceCode - ソースコード
   * @returns レスポンス
   */
  submit = async (problemId: string, language: string, sourceCode: string) => {
    const requestBody = {
      problemId: problemId,
      language: language,
      sourceCode: sourceCode,
    };

    return this.judgeApiClient.post("/submissions", requestBody);
  };

  /**
   * 解説のHTMLを取得します。
   * @param dlang - 表示言語
   * @param problemId - 問題ID
   * @param pattern - パターン
   * @param type - タイプ
   * @param filter - フィルター
   * @returns レスポンス
   */
  findHtmlByLanguageAndProblemIdAndPatternAndTypeAndFilter = async (
    dlang: string,
    problemId: string,
    pattern: string,
    type: string,
    filter: string,
  ) => {
    return this.judgeApiClient.get(`/resources/commentaries/${dlang}/${problemId}/${pattern}/${type}/${filter}`);
  };

  /**
   * 解説で利用可能なフィルターを取得します。
   * @param language - 表示言語
   * @param problemId - 問題ID
   * @returns レスポンス
   */
  findAvailableFilters = async (language: string, problemId: string) => {
    return this.judgeApiClient.get(`/resources/commentaries/filters/${language}/${problemId}`);
  };

  /**
   * コース一覧を取得します。
   * @param lang - 表示言語
   * @returns レスポンス
   */
  findAllCoursesPage = async (lang: string) => {
    return this.judgeApiClient.get(`/courses?lang=${lang}`);
  };

  /**
   * コースのトピック一覧を取得します。
   * @param courseId - コースID
   * @param lang - 表示言語
   * @returns レスポンス
   */
  findByCourseIdPage = async (courseId: string, lang: string) => {
    return this.judgeApiClient.get(`/courses/${courseId}?lang=${lang}`);
  };

  /**
   * チャレンジの大分類一覧を取得します。
   * @returns レスポンス
   */
  findTopPage = async () => {
    return this.judgeApiClient.get("/challenges");
  };

  /**
   * チャレンジ一覧を取得します。
   * @param largeCl - チャレンジの大分類
   * @param middleCl - チャレンジの中分類
   * @returns レスポンス
   */
  findByLargeCLAndMiddleCLPage = async (largeCl: string, middleCl: string) => {
    return this.judgeApiClient.get(`/challenges/cl/${largeCl}/${middleCl}`);
  };

  /**
   * ユーザーのブックマーク一覧を取得します。
   * @param userId - ユーザーID
   * @returns レスポンス
   */
  findByUserIdBookMarkDetail = async (userId: string) => {
    return this.judgeApiClient.get(`/problems/bookmarks/users/${userId}`);
  };

  /**
   * ユーザーIDと問題IDから提出記録一覧を取得します。
   * @param userId - ユーザーID
   * @param problemId - 問題ID
   * @param page - ページ番号
   * @param size - 1ページあたりのサイズ
   * @returns レスポンス
   */
  findByUserIdAndProblemIdSubmissionRecords = async (userId: string, problemId: string, page: number, size: number) => {
    return this.judgeApiClient.get(
      `/submission_records/users/${userId}/problems/${problemId}?page=${page}&size=${size}`,
    );
  };

  /**
   * 提出されたソースコードを取得します。
   * @param judgeId - ジャッジID
   * @returns レスポンス
   */
  findByJudgeIdReivew = async (judgeId: number) => {
    return this.judgeApiClient.get(`/reviews/${judgeId}`);
  };

  /**
   * 模範解答一覧を取得します。
   * @param problemId - 問題ID
   * @param lang - プログラミング言語
   * @param page - ページ番号
   * @param size - 1ページあたりのサイズ
   * @returns レスポンス
   */
  findByProblemIdAndLanguageModelAnswers = async (problemId: string, lang: string, page: number, size: number) => {
    return this.judgeApiClient.get(`/solutions/problems/${problemId}/lang/${lang}/rating?page=${page}&size=${size}`);
  };

  /**
   * ブックマークを登録します。
   * @param userId - ユーザーID
   * @param problemId - 問題ID
   * @returns レスポンス
   */
  saveBookmark = async (userId: string, problemId: string) => {
    const requestBody = {
      userId: userId,
      problemId: problemId,
    };

    return this.judgeApiClient.post("/bookmarks", requestBody);
  };

  /**
   * ブックマークを削除します。
   * @param userId - ユーザーID
   * @param problemId - 問題ID
   * @returns レスポンス
   */
  deleteBookmark = async (userId: string, problemId: string) => {
    const requestBody = {
      userId: userId,
      problemId: problemId,
    };

    return this.judgeApiClient.delete("/bookmarks", { data: requestBody });
  };

  /**
   * ユーザーがエントリーしているアリーナ一覧を取得します。
   * @param userId - ユーザーID
   * @returns レスポンス
   */
  findByUserIdEntries = async (userId: string) => {
    return this.judgeApiClient.get(`/arenas/entries/users/${userId}`);
  };

  /**
   * アリーナの情報を取得します。
   * @param arenaId - アリーナID
   * @returns レスポンス
   */
  findByIdArena = async (arenaId: string) => {
    return this.judgeApiClient.get(`/arenas/${arenaId}`);
  };

  /**
   * アリーナの問題一覧を取得します。
   * @param arenaId - アリーナID
   * @returns レスポンス
   */
  findByArenaIdProblems = async (arenaId: string) => {
    return this.judgeApiClient.get(`/arenas/${arenaId}/problems`);
  };

  /**
   * アリーナへの提出一覧を取得します。
   * @param arenaId - アリーナID
   * @param userId - ユーザーID
   * @returns レスポンス
   */
  findByArenaIdAndUserIdSubmissions = async (arenaId: string, userId: string) => {
    return this.judgeApiClient.get(`/arenas/${arenaId}/submissions/users/${userId}`);
  };

  /**
   * アリーナへ提出を行います。
   * @param arenaId - アリーナID
   * @param arenaProblemId - アリーナ問題ID
   * @param programmingLanguage - プログラミング言語
   * @param sourceCode - ソースコード
   * @returns レスポンス
   */
  submitArena = async (arenaId: string, arenaProblemId: string, programmingLanguage: string, sourceCode: string) => {
    const requestBody = {
      arenaId: arenaId,
      id: arenaProblemId,
      language: programmingLanguage,
      sourceCode: sourceCode,
    };

    return this.judgeApiClient.post("/arenas/${arenaId}/submissions", requestBody);
  };

  /**
   * ユーザーIDと問題IDからオープンエントリー一覧を取得します。
   * @param userId - ユーザーID
   * @param problemId - 問題ID
   * @returns レスポンス
   */
  findByUserIdAndProblemIdOpenEntries = async (userId: string, problemId: string) => {
    return this.reviewApiClient.get(`/review/entries/users/${userId}/problems/${problemId}`);
  };

  /**
   * ユーザーIDと問題IDからクローズエントリー一覧を取得します。
   * @param userId - ユーザーID
   * @param problemId - 問題ID
   * @returns レスポンス
   */
  findByUserIdAndProblemIdCloseEntries = async (userId: string, problemId: string) => {
    return this.reviewApiClient.get(`/review/close_entries/users/${userId}/problems/${problemId}`);
  };

  /**
   * レビューのエントリーIDからレビュー一覧を取得します。
   * @param entryId - レビューのエントリーID
   * @returns レスポンス
   */
  findByEntryIdReviews = async (entryId: string) => {
    return this.reviewApiClient.get(`/review/reviews/entries/${entryId}`);
  };

  /**
   * レビューの評価を行います。
   * @param reviewId - レビューID
   * @param score - スコア
   * @returns レスポンス
   */
  registerEvaluation = async (reviewId: string, score: number) => {
    const requestBody = {
      reviewId: reviewId,
      score: score,
      userId: "",
    };

    return this.judgeApiClient.post("/review_proxy/evaluation", requestBody);
  };

  /**
   * レビューエントリーを登録します。
   * @param displayLanguage - 表示言語
   * @param instruction - レビューのインストラクション
   * @param judgeId - ジャッジID
   * @returns レスポンス
   */
  registerEntry = async (displayLanguage: string, instruction: string, judgeId: string) => {
    const requestBody = {
      apiKey: "",
      displayLanguage: displayLanguage,
      instruction: instruction,
      judgeId: judgeId,
    };

    return this.judgeApiClient.post("/review_proxy/entry", requestBody);
  };

  /**
   * レビューエントリーをクローズします。
   * @param entryId - エントリーID
   * @returns レスポンス
   */
  closeEntry = async (entryId: string) => {
    const requestBody = {
      apiKey: "",
      entryId: entryId,
      userId: "",
    };

    return this.judgeApiClient.post("/review_proxy/close", requestBody);
  };
}

const aojApiClient = new AOJApiClient();
export default aojApiClient;
