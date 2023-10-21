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
  id: 2;
  serial: 1;
  shortName: "ITP1";
  name: "プログラミング入門";
  type: "lesson";
  userScore: 0;
  maxScore: 4400;
  progress: 0.0;
  image: "";
  numberOfTopics: 11;
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
