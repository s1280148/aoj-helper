import { Box } from "@mui/material";
import BorderLinearProgressWithLabel from "./BorderLinearProgressWithLabel";
import { CourseInfo } from "../../public-src/ApiResponseType";
import { useNavigate } from "react-router-dom";

type Props = {
  courseInfo: CourseInfo;
};

const CourseCard: React.FC<Props> = (props: Props) => {
  const { courseInfo } = props;

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/problem/list/course/${courseInfo.id}`);
  };

  return (
    <Box
      className="
      border
      rounded
      p-4
      w-full
      hover:shadow-lg
      transition-shadow
      duration-200
      hover:border-course text-gray-900"
      onClick={handleCardClick}
    >
      <Box className="text-sm flex items-center">
        <Box className="border rounded px-1 text-course border-course">{courseInfo.type}</Box>
        <Box className="ml-3 text-gray-800">{courseInfo.shortName}</Box>
      </Box>
      <Box className="text-sm font-bold mt-2 text-gray-800">{courseInfo.name}</Box>
      <BorderLinearProgressWithLabel barColor="#1abcbc" progress={courseInfo.progress} />
    </Box>
  );
};

export default CourseCard;