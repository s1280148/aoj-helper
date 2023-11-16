/**
 * タイムスタンプから日付の文字列を取得します。
 * @param msec - ミリ秒
 * @returns yyyy/MM/dd hh:mm:ss 形式の文字列
 */
export const timeStampToDate = (msec: number) => {
  const date = new Date(msec);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};
