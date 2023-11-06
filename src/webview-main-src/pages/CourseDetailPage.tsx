import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import BorderLinearProgressWithLabel from "../components/BorderLinearProgressWithLabel";
import CourseTopicCard from "../components/CourseTopicCard";
import { CourseDetail } from "../../public-src/types/ApiResponseType";
import { callApi } from "../../webview-public-src/ApiUtil";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<"courseId">();

  const [courseDetail, setCourseDetail] = useState<null | CourseDetail>(null);
  useEffect(() => {
    const findByCourseIdPage = async () => {
      const parameters = {
        courseId: courseId,
        lang: "ja",
      };

      const response = (await callApi("findByCourseIdPage", parameters)) as { course: CourseDetail };

      setCourseDetail(response.course);
    };

    findByCourseIdPage();
  }, []);

  return (
    courseDetail && (
      <Box>
        <Box className="mt-4 border-2 rounded dark:bg-darkMode-darkest dark:border-darkMode-dark">
          <h2 className="text-xl font-bold mb-2 border pl-4 py-2 bg-gray-200 dark:bg-darkMode-dark dark:border-darkMode-dark dark:text-darkMode-text">
            {courseDetail.name}
          </h2>
          <p className="p-1 pl-4 dark:text-darkMode-text">{courseDetail.description}</p>
          <Box className="px-4">
            <BorderLinearProgressWithLabel barClass="bg-course dark:bg-course-dark" progress={courseDetail.progress} />
          </Box>
        </Box>
        {courseDetail.topics.map((topic) => {
          return (
            <div className="my-2">
              <CourseTopicCard topicInfo={topic} />
            </div>
          );
        })}
      </Box>
    )
  );
};

export default CourseDetailPage;
