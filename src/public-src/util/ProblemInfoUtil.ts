export const isChallengeProblem = (problemId: string) => {
  return !Number.isNaN(Number(problemId));
};
