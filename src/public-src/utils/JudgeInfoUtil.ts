import { SubmissionProgress, SubmissionStatus } from "../constants/constant";

/**
 * 提出ステータスからクラス名を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns クラス名
 */
export const getClassNameFromSubmissionStatus = (submissionStatus: SubmissionStatus) => {
  if (submissionStatus === SubmissionStatus.STATE_ACCEPTED) {
    return "bg-accept dark:bg-accept-dark";
  } else {
    return "bg-reject dark:bg-reject-dark";
  }
};

/**
 * 提出ステータスから提出結果の文字列を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 提出結果の文字列
 */
export const getStatusFromSubmissionStatus = (submissionStatus: SubmissionStatus) => {
  if (submissionStatus === SubmissionStatus.STATE_ACCEPTED) {
    return "accept";
  } else {
    return "reject";
  }
};

/**
 * 提出ステータスの省略名からクラス名を取得します。
 * @returns クラス名
 */
export const getClassNameFromShortStatusName = (submissionStatusShortName: string) => {
  if (submissionStatusShortName === getShortStatusNameFromSubmissionStatus(SubmissionStatus.STATE_ACCEPTED)) {
    return "bg-accept dark:bg-accept-dark";
  } else {
    return "bg-reject dark:bg-reject-dark";
  }
};

/**
 * 提出ステータスから提出の進行状況を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 提出の進行状況
 */
export const getSubmissionProgressFromSubmissionStatus = (submissionStatus: SubmissionStatus) => {
  switch (submissionStatus) {
    case SubmissionStatus.STATE_COMPILEERROR: {
      return SubmissionProgress.BUILD;
    }
    case SubmissionStatus.STATE_WRONGANSWER: {
      return SubmissionProgress.RESULT_CHECK;
    }
    case SubmissionStatus.STATE_TIMELIMIT: {
      return SubmissionProgress.RUN;
    }
    case SubmissionStatus.STATE_MEMORYLIMIT: {
      return SubmissionProgress.RESOURCE_LIMIT_CHECK;
    }
    case SubmissionStatus.STATE_ACCEPTED: {
      return SubmissionProgress.ACCEPTED;
    }
    case SubmissionStatus.STATE_OUTPUTLIMIT: {
      return SubmissionProgress.RESOURCE_LIMIT_CHECK;
    }
    case SubmissionStatus.STATE_RUNTIMEERROR: {
      return SubmissionProgress.RUN;
    }
    case SubmissionStatus.STATE_PRESENTATIONERROR: {
      return SubmissionProgress.PRESENTATION_CHECK;
    }
    default: {
      return SubmissionProgress.SUBMITTED;
    }
  }
};

/**
 * 提出ステータスから提出ステータスの省略名を取得します。
 * @param submissionStatus - 提出ステータス
 * @returns 提出ステータスの省略名
 */
export const getShortStatusNameFromSubmissionStatus = (submissionStatus: SubmissionStatus) => {
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
};
