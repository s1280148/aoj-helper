import styled from "@emotion/styled";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

type Props = {
  barClass: string;
  progress: number;
};

const BorderLinearProgressWithLabel: React.FC<Props> = (props: Props) => {
  const { barClass, progress } = props;

  const progressPar = Math.round(progress * 100) / 100;

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
