import { Routes, Route, ScrollRestoration } from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import ProblemPage from "./ProblemPage";
import PreCommentaryPage from "./PreCommentaryPage";
import PostCommentaryPage from "./PostCommentaryPage";
import ProblemListPage from "./ProblemListPage";
import CourseListPage from "./CourseListPage";
import ChallengeListPage from "./ChallengeListPage";
import BookmarkListPage from "./BookmarkListPage";
import CourseDetailPage from "./CourseDetailPage";
import ChallengeDetailPage from "./ChallengeDetailPage";
import SubmissionRecordPage from "./SubmissionRecordPage";
import ModelAnswerPage from "./ModelAnswerPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/problem/list" element={<ProblemListPage />}>
            <Route path="course/list" element={<CourseListPage />} />
            <Route path="course/:courseId" element={<CourseDetailPage />} />
            <Route path="challenge/list" element={<ChallengeListPage />} />
            <Route path="challenge/:largeChallengeId/:middleChallengeId" element={<ChallengeDetailPage />} />
            <Route path="bookmark/list" element={<BookmarkListPage />} />
          </Route>
          <Route path="/problem/:problemId/commentary/pre" element={<PreCommentaryPage />} />
          <Route path="/problem/:problemId/description" element={<ProblemPage />} />
          <Route path="/problem/:problemId/commentary/post" element={<PostCommentaryPage />} />
          <Route path="/problem/:problemId/submission-record" element={<SubmissionRecordPage />} />
          <Route path="/problem/:problemId/model-answer" element={<ModelAnswerPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
