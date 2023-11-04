import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

const ProblemListButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPageOpen, setIsPageOpen] = useState(false);

  useEffect(() => {
    setIsPageOpen(/^\/problem\/list\/.*/.test(location.pathname));
  }, [location]);

  const handleProblemListButton = () => {
    if (!isPageOpen) {
      navigate("/problem/list/course/list");
    }
  };

  return (
    <Tooltip title="問題集">
      <IconButton
        className={isPageOpen ? "text-course dark:text-course-dark" : "text-black dark:text-darkMode-text"}
        onClick={handleProblemListButton}
      >
        <QuizOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ProblemListButton;
