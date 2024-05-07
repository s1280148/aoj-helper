import { useEffect, useState } from "react";
import ReviewRow from "./ReviewRow";
import { SelectedReviewInfo } from "../ReviewPage";
import { Review, ReviewEntry } from "../../../../public-src/types/ApiResponseType";
import { Box, Collapse } from "@mui/material";
import JudgeStatusIcon from "../../../components/Element/JudgeStatusIcon";
import { getSubmissionStatusFromStatusShortName } from "../../../../public-src/utils/JudgeInfoUtil";
import ReviewInstructionIcon from "./ReviewInstructionIcon";
import { timeStampToDate } from "../../../../public-src/utils/DateUtil";
import { ReviewEntryState } from "../../../../public-src/constants/constant";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { useTranslation } from "react-i18next";

type Props = {
  reviewEntry: ReviewEntry;
  setSelectedReview: React.Dispatch<React.SetStateAction<null | SelectedReviewInfo>>;
};

/**
 * レビューエントリー行
 * @param props - props
 * @returns レビューエントリー行
 */
const ReviewEntryRow: React.FC<Props> = (props: Props) => {
  const { reviewEntry, setSelectedReview } = props;

  // レビュー一覧のstate
  const [reviewList, setReviewList] = useState<null | Review[]>(null);

  useEffect(() => {
    const findByEntryIdReviews = async () => {
      // レビュー一覧を取得し、stateにセット
      const parameter = {
        entryId: reviewEntry.entryId,
      };

      const response = (await callApi("findByEntryIdReviews", parameter)) as Review[];

      setReviewList(response);
    };

    findByEntryIdReviews();
  }, [reviewEntry]);

  // レビュー一覧の開閉状態のstate
  const [isReviewListOpen, setIsReviewListOpen] = useState<boolean>(false);

  /**
   * レビューエントリー行の押下をハンドリングします。
   */
  const handleReviewEntryRowClick = () => {
    setIsReviewListOpen(!isReviewListOpen);
  };

  const { t } = useTranslation();

  return (
    reviewList && (
      <Box className="text-sm border-b border-gray-200 dark:border-darkMode-dark">
        <Box
          className="grid grid-cols-7 cursor-pointer hover:bg-gray-200 dark:hover:bg-darkMode"
          onClick={handleReviewEntryRowClick}
        >
          <Box className="pl-4 pr-2 py-3 flex items-center">
            <span className="dark:text-darkMode-text">{reviewEntry.judgeId}</span>
          </Box>
          <Box className="flex items-center px-2 py-3">
            <JudgeStatusIcon submissionStatus={getSubmissionStatusFromStatusShortName(reviewEntry.status)} />
          </Box>
          <Box className="px-2 py-3 flex items-center">
            <span className="dark:text-darkMode-text">{reviewEntry.language}</span>
          </Box>
          <Box className="flex items-center px-2 py-3 col-span-2">
            <ReviewInstructionIcon reviewInstructionStr={reviewEntry.instruction} />
          </Box>
          <Box className="px-2 py-3 col-span-2 flex items-center">
            <span className="dark:text-darkMode-text">{timeStampToDate(reviewEntry.entryDate)}</span>
          </Box>
        </Box>
        <Collapse in={isReviewListOpen}>
          <Box className="w-full text-xs text-left flex bg-white border-gray-300 text-gray-600 border-b dark:bg-darkMode-dark dark:border-darkMode-dark">
            <Box className="px-2 py-2 w-12"></Box>
            <Box className="w-full grid grid-cols-3">
              <Box className="p-2 dark:text-darkMode-text">{t("review.reviewList.header.reviewer")}</Box>
              <Box className="p-2 col-span-2 dark:text-darkMode-text">{t("review.reviewList.header.reviewDate")}</Box>
            </Box>
          </Box>
          {reviewList.length === 0 ? (
            <Box className="px-4 py-3 dark:text-darkMode-text">{t("review.reviewList.noData")}</Box>
          ) : (
            reviewList.map((review) => (
              <ReviewRow
                review={review}
                reviewEntryState={reviewEntry.state as ReviewEntryState}
                setSelectedReview={setSelectedReview}
              />
            ))
          )}
        </Collapse>
      </Box>
    )
  );
};

export default ReviewEntryRow;
