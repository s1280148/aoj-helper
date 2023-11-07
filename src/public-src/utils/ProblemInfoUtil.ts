/**
 * 問題がチャレンジかを判定します。
 * @param problemId - 問題ID
 * @returns 問題がチャレンジか
 */
export const isChallengeProblem = (problemId: string) => {
  // 問題IDが数値に変換できる場合はチャレンジの問題
  return !Number.isNaN(Number(problemId));
};
