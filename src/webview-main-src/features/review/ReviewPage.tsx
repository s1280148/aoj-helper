import { useState } from "react";
import { ReviewEntryState } from "../../../public-src/constants/constant";
import { Review } from "../../../public-src/types/ApiResponseType";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ReviewOpenEntryList from "./components/ReviewOpenEntryList";
import ReviewCloseEntryList from "./components/ReviewCloseEntryList";
import SelectedReviewCard from "./components/SelectedReviewCard";

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
    <Box className="px-2 py-3">
      <SelectedReviewCard selectedReview={selectedReview} setSelectedReview={setSelectedReview} />
      <ReviewOpenEntryList problemId={problemId!} setSelectedReview={setSelectedReview} />
      <Box className="mb-6" />
      <ReviewCloseEntryList problemId={problemId!} setSelectedReview={setSelectedReview} />
    </Box>
  );
};

export default ReviewPage;
