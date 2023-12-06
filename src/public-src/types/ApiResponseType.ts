/**
 * セッション情報
 */
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

/**
 * 提出ステータス情報
 */
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

/**
 * 解説の情報
 */
export interface CommentaryInfo {
  type: string;
  pattern: string;
  filter: string[];
}

/**
 * 問題の説明
 */
export interface ProblemDescription {
  language: string;
  html: string;
  commentaries: CommentaryInfo[];
  time_limit: number;
  memory_limit: number;
  problem_id: string;
  solvedUser: number;
  successRate: number;
  score: number;
  recommend: boolean;
  recommendations: number;
  bookmarks: null | string[];
  isSolved: boolean;
  created_at: number;
  server_time: number;
}

/**
 * 解説の詳細情報
 */
export interface CommentaryDetail {
  language: string;
  filter: string;
  html: string;
  type: string;
  pattern: string;
  problem_id: string;
  created_at: number;
}

/**
 * コースリスト
 */
export interface CourseInfoList {
  filter: null | string;
  courses: CourseInfo[];
}

/**
 * コース情報
 */
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

/**
 * コース詳細
 */
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

/**
 * コーストピック情報
 */
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

/**
 * 問題情報
 */
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

/**
 * チャレンジの大分類
 */
export interface LargeChallenge {
  id: string;
  title: string;
  middleCls: MiddleChallenge[];
}

/**
 * チャレンジの中分類
 */
export interface MiddleChallenge {
  id: string;
  numberOfProblems: number;
  numberOfSolved: number;
  progress: number;
}

/**
 * チャレンジ詳細
 */
export interface ChallengeDetail {
  largeCl: LargeChallenge;
  contests: ChallengeContestInfo[];
}

/**
 * チャレンジコンテスト情報
 */
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

/**
 * チャレンジ日情報
 */
export interface ChallengeDayInfo {
  id: string;
  day: number;
  title: string;
  progress: 0.0;
  numberOfProblems: number;
  numberOfSolved: number;
  problems: ProblemInfo[];
}

/**
 * ブックマーク情報
 */
export interface BookmarkInfo {
  progress: number;
  numberOfProblems: number;
  numberOfSolved: number;
  problems: ProblemInfo[];
}

/**
 * ジャッジ詳細
 */
export interface JudgeDetail {
  judgeId: number;
  compileError: string;
  runtimeError: string;
  userOutput: string;
  caseVerdicts: CaseVerdict[];
  submissionRecord: SubmissionRecord;
}

/**
 * 判定結果
 */
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

/**
 * 提出記録
 */
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

/**
 * レビュー情報
 */
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

/**
 * 模範解答情報
 */
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

/**
 * ブックマーク保存情報
 */
export interface BookmarkSaveInfo {
  userId: string;
  problemId: string;
  tag: string;
  createTime: number;
}

/**
 * ユーザーがエントリーしているアリーナ情報
 */
export interface ArenaUserEntryInfo {
  userId: string;
  arenaId: string;
  country: string;
  affiliation: null | string;
  entryDate: number;
}

/**
 * アリーナ情報
 */
export interface ArenaInfo {
  id: string;
  no: number;
  coordinator: string;
  type: string;
  judgeType: string;
  policy: string;
  penalty: number;
  title: string;
  startDate: number;
  endDate: number;
  serverTime: number;
  comment: string;
  infoLink: string;
  visible: number;
  state: string;
  validState: string;
  isCoordinator: boolean;
  isManager: boolean;
  isEntered: boolean;
}

/**
 * アリーナ問題情報
 */
export interface ArenaProblemInfo {
  id: string;
  serial: number;
  source: string;
  problemId: string;
  arenaId: string;
  available: number;
  name: string;
  rate: number;
  problemTimeLimit: number;
  problemMemoryLimit: number;
}

/**
 * アリーナ提出情報
 */
export interface ArenaSubmissionInfo {
  judgeId: number;
  source: string;
  judgeType: number;
  arenaId: string;
  userId: string;
  problemId: string;
  submissionDate: number;
  judgeDate: number;
  language: string;
  cpuTime: number;
  memory: number;
  status: number;
  accuracy: string;
}
