import { Box } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { SelectedReviewInfo } from "../ReviewPage";
import { Review } from "../../../../public-src/types/ApiResponseType";
import { ReviewEntryState } from "../../../../public-src/constants/constant";
import { timeStampToDate } from "../../../../public-src/utils/DateUtil";

type Props = {
  review: Review;
  reviewEntryState: ReviewEntryState;
  setSelectedReview: React.Dispatch<React.SetStateAction<null | SelectedReviewInfo>>;
};

/**
 * レビュー行
 * @param props - props
 * @returns レビュー行
 */
const ReviewRow: React.FC<Props> = (props: Props) => {
  const { review, reviewEntryState, setSelectedReview } = props;

  /**
   * レビュー行の押下をハンドリングします。
   */
  const handleReviewRowClick = () => {
    const selectedReview: SelectedReviewInfo = {
      reviewEntryState: reviewEntryState,
      review: review,
    };

    // 選択したレビューの情報を選択中のレビューにセット
    setSelectedReview(selectedReview);
  };

  return (
    <Box className="flex cursor-pointer hover:bg-gray-200 dark:hover:bg-darkMode" onClick={handleReviewRowClick}>
      <Box className="px-2 py-3 w-12 dark:text-darkMode-text">
        <SubdirectoryArrowRightIcon />
      </Box>
      <Box className="w-full grid grid-cols-3">
        <Box className="px-2 py-3 flex items-center">
          <span className="dark:text-darkMode-text">{review.reviewerId}</span>
        </Box>
        <Box className="px-2 py-3 col-span-2 flex items-center">
          <span className="dark:text-darkMode-text">{timeStampToDate(review.reviewDate)}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewRow;
