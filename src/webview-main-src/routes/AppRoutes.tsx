import { Route, Routes } from "react-router-dom";
import Layout from "../features/layout/Layout";
import CourseListTab from "../features/problem-list/course/CourseListTab";
import CourseDetailTab from "../features/problem-list/course/CourseDetailTab";
import ChallengeListTab from "../features/problem-list/challenge/ChallengeListTab";
import ChallengeDetailTab from "../features/problem-list/challenge/ChallengeDetailTab";
import BookmarkListTab from "../features/problem-list/bookmark/BookmarkListTab";
import PreCommentaryPage from "../features/commentary/PreCommentaryPage";
import PostCommentaryPage from "../features/commentary/PostCommentaryPage";
import SubmissionRecordPage from "../features/submission-record/SubmissionRecordPage";
import ModelAnswerPage from "../features/model-answer/ModelAnswerPage";
import ProblemListPage from "../features/problem-list/ProblemListPage";
import ProblemDescriptionPage from "../features/problem-description/ProblemDescriptionPage";

/**
 * アプリケーション全体のルーティング
 * @returns URLに対応するコンポーネント
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/problem/list" element={<ProblemListPage />}>
          <Route path="course/list" element={<CourseListTab />} />
          <Route path="course/:courseId" element={<CourseDetailTab />} />
          <Route path="challenge/list" element={<ChallengeListTab />} />
          <Route path="challenge/:largeChallengeId/:middleChallengeId" element={<ChallengeDetailTab />} />
          <Route path="bookmark/list" element={<BookmarkListTab />} />
        </Route>
        <Route path="/problem/:problemId/commentary/pre" element={<PreCommentaryPage />} />
        <Route path="/problem/:problemId/description" element={<ProblemDescriptionPage />} />
        <Route path="/problem/:problemId/commentary/post" element={<PostCommentaryPage />} />
        <Route path="/problem/:problemId/submission-record" element={<SubmissionRecordPage />} />
        <Route path="/problem/:problemId/model-answer" element={<ModelAnswerPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
