/**
 * 真偽値を表す文字列を真偽値に変換します。
 * @param targetStr - 対象の文字列
 * @returns 真偽値
 */
export const convertStringToBoolean = (targetStr: string) => {
  return targetStr.toLowerCase() === "true";
};
