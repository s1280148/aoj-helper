import { WebSocket } from "ws";
import aojApiClient from "./AOJApiClient";
import { SubmissionStatus } from "../../public-src/constants/constant";
import { ArenaSelectInfo } from "../../public-src/types/Type";

/**
 * 提出マネージャー
 */
class SubmissionManager {
  /** ウェブソケット */
  private webSocket = new WebSocket("wss://dlab.u-aizu.ac.jp/status");

  /** 問題ID */
  private problemId: string;

  /** 言語 */
  private language: string;

  /** ソースコード */
  private sourceCode: string;

  /** アリーナ選択情報 */
  private arenaSelectInfo: ArenaSelectInfo;

  /** 提出が成功したかどうか */
  private submissionSuccess = false;

  /** 提出のジャッジのトークン */
  private submitToken?: string;

  /** ジャッジID */
  private judgeId?: string;

  /** 提出ステータス */
  private submissionStatus?: SubmissionStatus;

  /**
   * コンストラクタ
   * @param problemId - 問題ID
   * @param language - 言語
   * @param sourceCode - ソースコード
   * @param arenaSelectInfo - アリーナ選択情報
   */
  constructor(problemId: string, language: string, sourceCode: string, arenaSelectInfo: ArenaSelectInfo) {
    this.problemId = problemId;
    this.language = language;
    this.sourceCode = sourceCode;
    this.arenaSelectInfo = arenaSelectInfo;

    // ウェブソケットのメッセージ受信イベントの定義
    this.webSocket.onmessage = (e) => {
      const submissionInformation: SubmissionInformation = JSON.parse(e.data.toString());

      // 提出のtokenと受信したデータのtokenが一致する場合にジャッジIDと現在の提出ステータスを設定
      if (submissionInformation.token === this.submitToken) {
        this.judgeId = submissionInformation.runID;
        this.submissionStatus = submissionInformation.status;
      }
    };
  }

  /**
   * 提出を行います。
   */
  async submit() {
    const submitResponse = this.arenaSelectInfo.isArena
      ? await aojApiClient.submitArena(
          this.arenaSelectInfo.arenaId,
          this.arenaSelectInfo.arenaProblemId,
          this.language,
          this.sourceCode,
        )
      : await aojApiClient.submit(this.problemId, this.language, this.sourceCode);

    if (submitResponse) {
      this.submissionSuccess = true;
      this.submitToken = submitResponse.data.token;
    } else {
      // 提出が失敗した場合、ウェブソケットを閉じる
      this.webSocket.close();
    }
  }

  /**
   * 提出結果を取得できるまで待機します。
   */
  async waitForSubmissionResult() {
    // 1秒待つ関数
    const wait = (millisecond: number) => new Promise((resolve) => setTimeout(resolve, millisecond));

    // 1秒毎に提出結果が確定しているかを確認する
    while (
      !this.submissionStatus ||
      this.submissionStatus === SubmissionStatus.STATE_WAITING ||
      this.submissionStatus === SubmissionStatus.STATE_RUNNING
    ) {
      await wait(1000);
    }

    // 提出結果が確定した後、ウェブソケットを閉じる
    this.webSocket.close();
  }

  /**
   * 提出が成功したかどうかを取得します。
   */
  isSubmissionSuccess() {
    return this.submissionSuccess;
  }

  /**
   * ジャッジIDを取得します。
   * @returns ジャッジID
   */
  getJudgeId() {
    return this.judgeId;
  }

  /**
   * 提出ステータスを取得します。
   * @return 提出ステータス
   */
  getSubmissionStatus() {
    return this.submissionStatus;
  }
}

// 提出の情報の型
interface SubmissionInformation {
  runID: string;
  status: SubmissionStatus;
  token: string;
}

export default SubmissionManager;
