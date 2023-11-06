import { Route, Routes } from "react-router-dom";
import Layout from "../features/Layout/Layout";
import CourseListTab from "../features/ProblemList/Course/CourseListTab";
import CourseDetailTab from "../features/ProblemList/Course/CourseDetailTab";
import ChallengeListTab from "../features/ProblemList/Challenge/ChallengeListTab";
import ChallengeDetailTab from "../features/ProblemList/Challenge/ChallengeDetailTab";
import BookmarkListTab from "../features/ProblemList/Bookmark/BookmarkListTab";
import PreCommentaryPage from "../features/Commentary/PreCommentaryPage";
import PostCommentaryPage from "../features/Commentary/PostCommentaryPage";
import SubmissionRecordPage from "../features/SubmissionRecord/SubmissionRecordPage";
import ModelAnswerPage from "../features/ModelAnswer/ModelAnswerPage";
import ProblemListPage from "../features/ProblemList/ProblemListPage";
import ProblemDescriptionPage from "../features/ProblemDescription/ProblemDescriptionPage";

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
