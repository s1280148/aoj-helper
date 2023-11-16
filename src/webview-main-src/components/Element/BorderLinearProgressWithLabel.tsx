import styled from "@emotion/styled";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

type Props = {
  barClass: string;
  progress: number;
};

/**
 * ラベル付きプログレスバー
 * @param props - props
 * @returns ラベル付きプログレスバー
 */
const BorderLinearProgressWithLabel: React.FC<Props> = (props: Props) => {
  // バーに付与するクラスと進捗をpropsから取得
  const { barClass, progress } = props;

  // 進捗を小数点以下2桁まで表示（以降切り捨て）
  const progressPar = Math.round(progress * 100) / 100;

  // 角が丸いプログレスバーを定義
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 8,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    },
  }));

  return (
    <Box className="text-xs flex items-center text-gray-600 dark:text-darkMode-text">
      <span className="mr-2 my-3">{progressPar}%</span>
      <Box className="w-full">
        <BorderLinearProgress
          variant="determinate"
          classes={{
            colorPrimary: "bg-gray-200 dark:bg-darkMode-lighter",
            barColorPrimary: barClass,
          }}
          value={progressPar}
        />
      </Box>
    </Box>
  );
};

export default BorderLinearProgressWithLabel;
