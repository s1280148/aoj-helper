import { Box } from "@mui/material";
import { ReviewInstruction } from "../../../../public-src/constants/constant";

type Props = {
  reviewInstructionStr: string;
};

/**
 * レビューインストラクションアイコン
 * @param props - props
 * @returns レビューインストラクションアイコン
 */
const ReviewInstructionIcon: React.FC<Props> = (props: Props) => {
  const reviewInstruction = props.reviewInstructionStr as ReviewInstruction;

  return reviewInstruction === ReviewInstruction.ACTIVE ? (
    <Box
      className="
          flex
          items-center
          justify-center
          w-16
          text-sm
          border
          p-0.5
          rounded
          text-white
          bg-red-500
          border-red-500
          dark:bg-red-800
          dark:border-red-800
          dark:text-darkMode-text
          "
    >
      <span>Active</span>
    </Box>
  ) : (
    <Box
      className="
        flex
        items-center
        justify-center
        w-16
        text-sm
        border
        inline-block
        p-0.5
        rounded
        text-white
        bg-green-500
        border-green-500
        dark:bg-green-800
        dark:border-green-800
        dark:text-darkMode-text
        "
    >
      <span>Passive</span>
    </Box>
  );
};

export default ReviewInstructionIcon;
