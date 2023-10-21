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
