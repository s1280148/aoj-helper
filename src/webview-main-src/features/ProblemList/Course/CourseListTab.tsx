import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CourseInfo, CourseInfoList } from "../../../../public-src/types/ApiResponseType";
import CourseCard from "./components/CourseCard";
import { callApi } from "../../../../webview-public-src/ApiUtil";

const CourseListTab: React.FC = () => {
  const [courseInfoList, setCourseInfoList] = useState<null | CourseInfo[]>(null);

  useEffect(() => {
    const findAllCoursesPage = async () => {
      const parameters = {
        lang: "ja",
      };

      const response = (await callApi("findAllCoursesPage", parameters)) as CourseInfoList;

      setCourseInfoList(response.courses);
    };

    findAllCoursesPage();
  }, []);

  return (
    <>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark dark:text-darkMode-text">
        <h2 className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          コースリスト
        </h2>
        <p className="p-1 pl-4 my-2 dark:text-darkMode-text">プログラムの基礎を学ぼう</p>
      </Box>
      <Box className="mt-4 grid grid-cols-3 gap-4">
        {courseInfoList &&
          courseInfoList.map((courseInfo) => {
            return <CourseCard courseInfo={courseInfo} />;
          })}
      </Box>
    </>
  );
};

export default CourseListTab;
