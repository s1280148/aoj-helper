import { useEffect, useState } from "react";
import { ReviewEntryState } from "../../../public-src/constants/constant";
import { Review, ReviewEntry, SessionInfo } from "../../../public-src/types/ApiResponseType";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ReviewOpenEntryList from "./components/ReviewOpenEntryList";
import ReviewCloseEntryList from "./components/ReviewCloseEntryList";
import SelectedReviewCard from "./components/SelectedReviewCard";
import { callApi } from "../../../webview-public-src/utils/ApiUtil";

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

  // オープンエントリー一覧のstate
  const [openEntryList, setOpenEntryList] = useState<null | ReviewEntry[]>(null);

  // クローズエントリー一覧のstate
  const [closeEntryList, setCloseEntryList] = useState<null | ReviewEntry[]>(null);

  useEffect(() => {
    const findByUserIdAndProblemIdEntries = async () => {
      // セッション情報を取得し、ユーザーIDを取得
      const parameterForSession = {};
      const sessionResponse = (await callApi("session", parameterForSession)) as SessionInfo;

      const userId = sessionResponse.id;

      // オープンエントリー一覧を取得し、stateにセット
      const parameterForReviewEntry = {
        userId: userId,
        problemId: problemId,
      };

      const openEntryResponse = (await callApi(
        "findByUserIdAndProblemIdOpenEntries",
        parameterForReviewEntry,
      )) as ReviewEntry[];

      setOpenEntryList(openEntryResponse);

      // クローズエントリー一覧を取得し、stateにセット
      const closeEntryResponse = (await callApi(
        "findByUserIdAndProblemIdCloseEntries",
        parameterForReviewEntry,
      )) as ReviewEntry[];

      setCloseEntryList(closeEntryResponse);
    };
    findByUserIdAndProblemIdEntries();
  }, [problemId]);

  return (
    <Box className="px-2 py-3">
      <SelectedReviewCard
        problemId={problemId!}
        setOpenEntryList={setOpenEntryList}
        setCloseEntryList={setCloseEntryList}
        selectedReview={selectedReview}
        setSelectedReview={setSelectedReview}
      />
      {openEntryList && <ReviewOpenEntryList openEntryList={openEntryList} setSelectedReview={setSelectedReview} />}
      <Box className="mb-6" />
      {closeEntryList && <ReviewCloseEntryList closeEntryList={closeEntryList} setSelectedReview={setSelectedReview} />}
    </Box>
  );
};

export default ReviewPage;
