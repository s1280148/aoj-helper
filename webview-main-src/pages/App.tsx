import { Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import ProblemPage from "./ProblemPage";
import PreCommentaryPage from "./PreCommentaryPage";
import PostCommentaryPage from "./PostCommentaryPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/problem/:problemId/commentary/pre" element={<PreCommentaryPage />} />
          <Route path="/problem/:problemId/description" element={<ProblemPage />} />
          <Route path="/problem/:problemId/commentary/post" element={<PostCommentaryPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
