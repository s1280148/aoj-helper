import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ProblemInfo } from "../../../../../public-src/types/ApiResponseType";
import { useNavigate } from "react-router-dom";

type Props = {
  problemInfo: ProblemInfo;
};

/**
 * コース問題カード
 * @param props - props
 * @returns コース問題カード
 */
const CourseProblemCard: React.FC<Props> = (props: Props) => {
  // propsから問題情報を取得
  const { problemInfo } = props;

  const navigate = useNavigate();

  /**
   * コース問題カードの押下をハンドリングします。
   */
  const handleProblemCardClick = () => {
    // 問題説明ページに遷移
    navigate(`/problem/${problemInfo.id}/description`);
  };

  return (
    <Box
      className="
        hover-hand
        border
        rounded
        flex
        items-center
        p-4
        hover:shadow
        transition
        duration-100
        hover:border-course
        dark:border-darkMode-dark
        dark:text-darkMode-text 
        dark:bg-darkMode-darkest
        dark:hover:border-course-dark"
      onClick={handleProblemCardClick}
    >
      <Box className="mr-4">
        {problemInfo.isSolved ? (
          <CheckCircleIcon className="text-course dark:text-course-dark" />
        ) : (
          <RadioButtonUncheckedIcon className="text-gray-400 dark:text-darkMode-text" />
        )}
      </Box>
      <Box>
        <p className="text-lg font-bold dark:text-darkMode-text">{`${problemInfo.id} : ${problemInfo.name}`}</p>
      </Box>
    </Box>
  );
};

export default CourseProblemCard;
