import { useState } from "react";
import { ReviewEntryState } from "../../../public-src/constants/constant";
import { Review } from "../../../public-src/types/ApiResponseType";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ReviewOpenEntryList from "./components/ReviewOpenEntryList";

/**
 * 選択中のレビューの情報
 */
export interface SelectedReviewInfo {
  reviewEntryState: ReviewEntryState;
  review: Review;
}

/**
 * レビューページ
 * @returns レビューページ
 */
const ReviewPage: React.FC = () => {
  // パスパラメータから問題IDを取得
  const { problemId } = useParams<"problemId">();

  // 選択中のレビューのstate
  const [selectedReview, setSelectedReview] = useState<null | SelectedReviewInfo>(null);

  return (
    <Box>
      <ReviewOpenEntryList problemId={problemId!} setSelectedReview={setSelectedReview} />
    </Box>
  );
};

export default ReviewPage;
