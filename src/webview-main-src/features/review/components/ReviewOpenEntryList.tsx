import { Box } from "@mui/material";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { useEffect, useState } from "react";
import { SelectedReviewInfo } from "../ReviewPage";
import { ReviewEntry, SessionInfo } from "../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { useTranslation } from "react-i18next";
import ReviewEntryRow from "./ReviewEntryRow";

type Props = {
  problemId: string;
  setSelectedReview: React.Dispatch<React.SetStateAction<null | SelectedReviewInfo>>;
};

/**
 * レビューのオープンエントリー一覧
 * @param props - props
 * @returns レビューのオープンエントリー一覧
 */
const ReviewOpenEntryList: React.FC<Props> = (props: Props) => {
  const { problemId, setSelectedReview } = props;

  // オープンエントリー一覧のstate
  const [openEntryList, setOpenEntryList] = useState<null | ReviewEntry[]>(null);

  useEffect(() => {
    const findByUserIdAndProblemIdOpenEntries = async () => {
      // セッション情報を取得し、ユーザーIDを取得
      const parameterForSession = {};
      const sessionResponse = (await callApi("session", parameterForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      // 模範解答一覧を取得し、stateにセット
      const parameterForReviewEntry = {
        userId: userId,
        problemId: problemId,
      };

      const response = (await callApi("findByUserIdAndProblemIdOpenEntries", parameterForReviewEntry)) as ReviewEntry[];

      setOpenEntryList(response);
    };

    findByUserIdAndProblemIdOpenEntries();
  }, [problemId]);

  const { t } = useTranslation();

  return (
    openEntryList && (
      <Box className="border-2 rounded border-gray-200 dark:border-darkMode-dark dark:bg-darkMode-darkest mb-7">
        <Box className="bg-gray-200 dark:bg-darkMode-dark">
          <Box className="flex p-3">
            <Box className="flex items-center mr-auto">
              <span className="mr-2 dark:text-darkMode-text">
                <SpeakerNotesIcon />
              </span>
              <p className="text-base dark:text-darkMode-text">{t("review.openEntryList")}</p>
            </Box>
          </Box>
        </Box>
        {openEntryList.length === 0 ? (
          <Box className="px-4 py-3 dark:text-darkMode-text">{t("review.entryList.noData")}</Box>
        ) : (
          <>
            <Box className="text-xs text-left grid grid-cols-7 bg-white border-gray-200 text-gray-600 border-b dark:bg-darkMode-dark dark:border-darkMode-dark">
              <Box className="pl-4 pr-2 py-2 dark:text-darkMode-text">{t("review.entryList.header.judgeId")}</Box>
              <Box className="p-2 dark:text-darkMode-text">{t("review.entryList.header.status")}</Box>
              <Box className="p-2 dark:text-darkMode-text">{t("review.entryList.header.programmingLanguage")}</Box>
              <Box className="p-2 col-span-2 dark:text-darkMode-text">{t("review.entryList.header.instruction")}</Box>
              <Box className="p-2 col-span-2 dark:text-darkMode-text">{t("review.entryList.header.entryDate")}</Box>
            </Box>
            {openEntryList.map((reviewEntry) => (
              <ReviewEntryRow reviewEntry={reviewEntry} setSelectedReview={setSelectedReview} />
            ))}
          </>
        )}
      </Box>
    )
  );
};

export default ReviewOpenEntryList;
