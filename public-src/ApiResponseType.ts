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
