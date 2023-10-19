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

/**
 * 提出ステータスから提出ステータスの省略名を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 提出ステータスの省略名
 */
export const getShortStatusNameFromSubmitStatus = (submissionStatus: SubmissionStatus) => {
  switch (submissionStatus) {
    case SubmissionStatus.STATE_COMPILEERROR:
      return "CE";
    case SubmissionStatus.STATE_WRONGANSWER:
      return "WA";
    case SubmissionStatus.STATE_TIMELIMIT:
      return "TLE";
    case SubmissionStatus.STATE_MEMORYLIMIT:
      return "MLE";
    case SubmissionStatus.STATE_ACCEPTED:
      return "AC";
    case SubmissionStatus.STATE_OUTPUTLIMIT:
      return "OLE";
    case SubmissionStatus.STATE_RUNTIMEERROR:
      return "RE";
    case SubmissionStatus.STATE_PRESENTATIONERROR:
      return "PE";
    default:
      return "？";
  }
};
