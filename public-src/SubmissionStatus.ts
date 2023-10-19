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
  STATE_RUNNING = 9
}

/**
 * 提出ステータスから提出ステータスメッセージを取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 提出ステータスメッセージ
 */
export const getSubmissionStatusMessage = (submissionStatus: SubmissionStatus) => {
  switch (submissionStatus) {
    case SubmissionStatus.STATE_COMPILEERROR:
      return "Compile Error";
    case SubmissionStatus.STATE_WRONGANSWER:
      return "Wrong Answer";
    case SubmissionStatus.STATE_TIMELIMIT:
      return "Time Limit Exceeded";
    case SubmissionStatus.STATE_MEMORYLIMIT:
      return "Memory Limit Exceeded";
    case SubmissionStatus.STATE_ACCEPTED:
      return "Accepted";
    case SubmissionStatus.STATE_OUTPUTLIMIT:
      return "Output Limit Exceeded";
    case SubmissionStatus.STATE_RUNTIMEERROR:
      return "Runtime Error";
    case SubmissionStatus.STATE_PRESENTATIONERROR:
      return "Presentation Error";
  }
}