export interface SessionInfo {
  id: string;
  name: string;
  affiliation: string;
  registerDate: number;
  lastSubmitDate: number;
  policy: string;
  country: string;
  birthYear: number;
  displayLanguage: string;
  defaultProgrammingLanguage: string;
  status: SubmissionStatusInfo;
}

export interface SubmissionStatusInfo {
  submissions: number;
  solved: number;
  accepted: number;
  wrongAnswer: number;
  timeLimit: number;
  memoryLimit: number;
  outputLimit: number;
  compileError: number;
  runtimeError: number;
}

// 解説の情報
export interface CommentaryInfo {
  type: string;
  pattern: string;
  filter: string[];
}

// 問題の情報
export interface ProblemDescription {
  language: string;
  html: string;
  commentaries: CommentaryInfo[];
  time_limit: number;
  memory_limit: number;
  problem_id: string;
}

export interface CommentaryDetail {
  language: string;
  filter: string;
  html: string;
  type: string;
  pattern: string;
  problem_id: string;
  created_at: number;
}

export interface CourseInfoList {
  filter: null | string;
  courses: CourseInfo[];
}

export interface CourseInfo {
  id: number;
  serial: number;
  shortName: string;
  name: string;
  type: string;
  userScore: number;
  maxScore: number;
  progress: number;
  image: string;
  description: string;
}

export interface CourseDetail {
  id: number;
  serial: number;
  shortName: string;
  name: string;
  type: string;
  userScore: number;
  maxScore: number;
  progress: number;
  image: string;
  numberOfTopics: number;
  topics: TopicInfo[];
  description: string;
}

export interface TopicInfo {
  id: number;
  serial: number;
  name: string;
  shortName: string;
  maxScore: number;
  numberOfProblems: number;
  userScore: number;
  progress: number;
  courseId: number;
  problems: ProblemInfo[];
  description: string;
}

export interface ProblemInfo {
  id: string;
  available: number;
  doctype: number;
  name: string;
  problemTimeLimit: number;
  problemMemoryLimit: number;
  maxScore: number;
  solvedUser: number;
  submissions: number;
  recommendations: number;
  isSolved: boolean;
  bookmark: boolean;
  recommend: boolean;
  successRate: number;
  score: number;
  userScore: number;
}

export interface LargeChallenge {
  id: string;
  title: string;
  middleCls: MiddleChallenge[];
}

export interface MiddleChallenge {
  id: string;
  numberOfProblems: number;
  numberOfSolved: number;
  progress: number;
}

export interface ChallengeDetail {
  largeCl: LargeChallenge;
  contests: ChallengeContestInfo[];
}

export interface ChallengeContestInfo {
  abbr: string;
  largeCl: string;
  middleCl: string;
  year: number;
  progress: number;
  numberOfProblems: number;
  numberOfSolved: number;
  days: ChallengeDayInfo[];
}

export interface ChallengeDayInfo {
  id: string;
  day: number;
  title: string;
  progress: 0.0;
  numberOfProblems: number;
  numberOfSolved: number;
  problems: ProblemInfo[];
}

export interface BookmarkInfo {
  progress: number;
  numberOfProblems: number;
  numberOfSolved: number;
  problems: ProblemInfo[];
}

// ジャッジ詳細
export interface JudgeDetail {
  judgeId: number;
  compileError: string;
  runtimeError: string;
  userOutput: string;
  caseVerdicts: CaseVerdict[];
  submissionRecord: SubmissionRecord;
}

// 判定結果
export interface CaseVerdict {
  serial: number;
  status: string;
  label: string;
  cpuTime: number | null;
  memory: number | null;
  caseName: string;
  inputSize: number;
  outputSize: number;
}

// 提出記録
export interface SubmissionRecord {
  judgeId: number;
  judgeType: number;
  userId: string;
  problemId: string;
  submissionDate: number;
  language: string;
  status: number;
  cpuTime: number;
  memory: number;
  codeSize: number;
  accuracy: string;
  judgeDate: number;
  score: number;
  problemTitle: string | null;
  token: string | null;
}

export interface ReviewInfo {
  judgeId: number;
  userId: string;
  problemId: string;
  language: string;
  cpuTime: number;
  memory: number;
  submissionDate: number;
  policy: string;
  sourceCode: string;
  reviewed: number;
}

export interface ModelAnswerInfo {
  judgeId: number;
  userId: string;
  problemId: string;
  language: string;
  version: string;
  submissionDate: number;
  cpuTime: number;
  memory: number;
  codeSize: number;
  server: number;
  policy: "public" | "private";
  rating: number;
  review: number;
}
