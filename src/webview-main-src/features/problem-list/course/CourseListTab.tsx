import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CourseInfo, CourseInfoList } from "../../../../public-src/types/ApiResponseType";
import CourseCard from "./components/CourseCard";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { EnvironmentInfoContext } from "../../../providers/EnvironmentInfoProvider";
import { useTranslation } from "react-i18next";

/**
 * コース一覧タブ
 * @returns コース一覧タブ
 */
const CourseListTab: React.FC = () => {
  // コース情報一覧のstate
  const [courseInfoList, setCourseInfoList] = useState<null | CourseInfo[]>(null);

  // 環境情報のstate
  const { environmentInfo, setEnvironmentInfo } = useContext(EnvironmentInfoContext);

  useEffect(() => {
    const findAllCoursesPage = async () => {
      // コース情報一覧を取得し、stateにセット
      const parameters = {
        lang: environmentInfo.displayLanguage,
      };

      const response = (await callApi("findAllCoursesPage", parameters)) as CourseInfoList;

      setCourseInfoList(response.courses);
    };

    findAllCoursesPage();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark dark:text-darkMode-text">
        <h2 className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
          {t("courseList.title")}
        </h2>
        <p className="p-1 pl-4 my-2 dark:text-darkMode-text">{t("courseList.description")}</p>
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
