import { Box, Fade } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { SelectedReviewInfo } from "../ReviewPage";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import InfoToaster from "../../../components/toast/InfoToaster";
import { AIReviewer, ReviewEntryState } from "../../../../public-src/constants/constant";
import { formatReviewMessage } from "../../../../public-src/utils/StringUtil";
import { useTranslation } from "react-i18next";
import { callApi } from "../../../../webview-public-src/utils/ApiUtil";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  selectedReview: null | SelectedReviewInfo;
  setSelectedReview: React.Dispatch<React.SetStateAction<null | SelectedReviewInfo>>;
};

/**
 * 選択中のレビューカード
 * @param props - props
 * @returns 選択中のレビューカード
 */
const SelectedReviewCard: React.FC<Props> = (props: Props) => {
  const { selectedReview, setSelectedReview } = props;

  /**
   * 閉じるボタンの押下をハンドリングします。
   */
  const handleCloseButtonClick = () => {
    setSelectedReview(null);
  };

  const { t } = useTranslation();

  /**
   * 評価ボタンの押下をハンドリングします。
   * @param score - スコア
   */
  const handleEvaluationButtonClick = async (score: number) => {
    const parameter = {
      reviewId: selectedReview!.review.reviewId,
      score: score,
    };

    await callApi("registerEvaluation", parameter);

    toast(
      <InfoToaster
        title={t("review.selectedReview.evaluation.toast.title")}
        content={`${t("review.selectedReview.evaluation.toast.score")} : ${score}`}
      />,
    );
  };

  /**
   * 「エントリーをクローズ」ボタンの押下をハンドリングします。
   */
  const handleEntryCloseButtonClick = async () => {
    const parameter = {
      entryId: selectedReview!.review.entryId,
    };

    await callApi("closeEntry", parameter);

    toast(<InfoToaster title={t("review.selectedReview.closeEntry.toast.title")} />);

    setSelectedReview(null);
  };

  return (
    <>
      <Fade in={selectedReview !== null}>
        <Box>
          {selectedReview && (
            <Box className="border-2 rounded border-gray-200 dark:border-darkMode-dark dark:bg-darkMode-darkest mb-7">
              <Box className="bg-gray-200 dark:bg-darkMode-dark">
                <Box className="flex p-2">
                  <Box className="flex items-center mr-auto">
                    <span className="mr-2 dark:text-darkMode-text">
                      <ReviewsIcon />
                    </span>
                    <p className="text-base dark:text-darkMode-text">{t("review.selectedReview.review")}</p>
                  </Box>
                  <Box>
                    <span className="mr-2 dark:text-darkMode-text cursor-pointer" onClick={handleCloseButtonClick}>
                      <HighlightOffIcon fontSize="large" />
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="flex p-2 border-b bg-white border-gray-300 dark:bg-darkMode-darkest dark:border-darkMode-dark">
                <Box className="text-gray-800 flex dark:text-darkmode-text">
                  <Box className="mr-2">
                    <span className="dark:text-darkMode-text">Review ID : </span>
                    <span
                      className={`
                      text-xs
                      border
                      inline-block
                      p-0.5
                      rounded
                      text-white
                      bg-accept
                      border-accept
                      dark:bg-accept-dark
                      dark:border-accept-dark
                      dark:text-darkMode-text
                      `}
                    >
                      {selectedReview.review.reviewId}
                    </span>
                  </Box>
                  <Box>
                    <span className="dark:text-darkMode-text">By : </span>
                    <span
                      className={`
                      text-xs
                      border
                      inline-block
                      p-0.5
                      rounded
                      text-white
                      bg-accept
                      border-accept
                      dark:bg-accept-dark
                      dark:border-accept-dark
                      dark:text-darkMode-text
                      `}
                    >
                      {selectedReview.review.reviewerId}
                    </span>
                  </Box>
                </Box>
              </Box>
              {(Object.values(AIReviewer) as String[]).includes(selectedReview.review.reviewerId) && (
                <Box className="border rounded-lg px-3 py-3 mx-6 my-3 border-red-400 bg-red-100 dark:border-red-900 dark:bg-red-900">
                  <p className="text-red-600 dark:text-darkMode-text">{t("review.selectedReview.byAI")}</p>
                </Box>
              )}
              <Box
                className="p-6 text-gray-800 dark:text-darkMode-text"
                dangerouslySetInnerHTML={{ __html: formatReviewMessage(selectedReview.review.message) }}
              ></Box>
              {selectedReview.reviewEntryState === ReviewEntryState.OPEN && (
                <Box>
                  <Box className="flex items-center justify-center mb-6">
                    <Box
                      className="
                        border-2
                        rounded-full
                        flex 
                        border-gray-700
                        text-gray-700
                        mx-1
                        p-1
                        hover:border-gray-600
                        hover:text-gray-600
                        dark:bg-darkMode
                        dark:border-darkMode
                        dark:text-darkMode-text
                        dark:hover:border-darkMode-lightest
                        dark:hover:bg-darkMode-lightest
                        "
                      onClick={() => handleEvaluationButtonClick(5)}
                    >
                      <Box className="flex items-center px-1">
                        <ThumbUpAltIcon className="text-green-500" fontSize="small" />
                      </Box>
                      <Box>
                        <span className="pr-2 my-auto">5</span>
                      </Box>
                    </Box>
                    <Box
                      className="
                        border-2
                        rounded-full
                        flex 
                        border-gray-700
                        text-gray-700
                        mx-1
                        p-1
                        hover:border-gray-600
                        hover:text-gray-600
                        dark:bg-darkMode
                        dark:border-darkMode
                        dark:text-darkMode-text
                        dark:hover:border-darkMode-lightest
                        dark:hover:bg-darkMode-lightest
                        "
                      onClick={() => handleEvaluationButtonClick(4)}
                    >
                      <Box className="flex items-center px-1">
                        <ThumbUpAltIcon fontSize="small" />
                      </Box>
                      <Box>
                        <span className="pr-2 my-auto">4</span>
                      </Box>
                    </Box>
                    <Box
                      className="
                        border-2
                        rounded-full
                        flex 
                        border-gray-700
                        text-gray-700
                        mx-1
                        p-1
                        hover:border-gray-600
                        hover:text-gray-600
                        dark:bg-darkMode
                        dark:border-darkMode
                        dark:text-darkMode-text
                        dark:hover:border-darkMode-lightest
                        dark:hover:bg-darkMode-lightest
                        "
                      onClick={() => handleEvaluationButtonClick(3)}
                    >
                      <Box className="flex items-center px-1">
                        <ThumbsUpDownIcon fontSize="small" />
                      </Box>
                      <Box>
                        <span className="pr-2 my-auto">3</span>
                      </Box>
                    </Box>
                    <Box
                      className="
                        border-2
                        rounded-full
                        flex 
                        border-gray-700
                        text-gray-700
                        mx-1
                        p-1
                        hover:border-gray-600
                        hover:text-gray-600
                        dark:bg-darkMode
                        dark:border-darkMode
                        dark:text-darkMode-text
                        dark:hover:border-darkMode-lightest
                        dark:hover:bg-darkMode-lightest
                        "
                      onClick={() => handleEvaluationButtonClick(2)}
                    >
                      <Box className="flex items-center px-1">
                        <ThumbDownAltIcon fontSize="small" />
                      </Box>
                      <Box>
                        <span className="pr-2 my-auto">2</span>
                      </Box>
                    </Box>
                    <Box
                      className="
                        border-2
                        rounded-full
                        flex 
                        border-gray-700
                        text-gray-700
                        mx-1
                        p-1
                        hover:border-gray-600
                        hover:text-gray-600
                        dark:bg-darkMode
                        dark:border-darkMode
                        dark:text-darkMode-text
                        dark:hover:border-darkMode-lightest
                        dark:hover:bg-darkMode-lightest
                        "
                      onClick={() => handleEvaluationButtonClick(1)}
                    >
                      <Box className="flex items-center px-1">
                        <ThumbDownAltIcon className="text-red-500" fontSize="small" />
                      </Box>
                      <Box>
                        <span className="pr-2 my-auto">1</span>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="flex justify-center mb-4">
                    <Box
                      className="
                        border-2
                        rounded-full
                        flex
                        mx-1
                        p-1
                        focus:outline-none
                        select-none 
                        hover:border-gray-600
                        hover:text-gray-600
                        border-gray-700
                        text-gray-700
                        dark:bg-darkMode
                        dark:border-darkMode
                        dark:text-darkMode-text
                        dark:hover:border-darkMode-lightest
                        dark:hover:bg-darkMode-lightest
                        "
                      onClick={handleEntryCloseButtonClick}
                    >
                      <Box className="flex items-center px-1">
                        <CancelIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Box className="pr-2 my-auto">{t("review.selectedReview.closeEntry.button")}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Fade>
    </>
  );
};

export default SelectedReviewCard;
