import styled from "@emotion/styled";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";

type Props = {
  barColor: string;
  progress: number;
};

const BorderLinearProgressWithLabel: React.FC<Props> = (props: Props) => {
  const { barColor, progress } = props;

  const progressPar = Math.round(progress * 100) / 100;

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#cbd5e0",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor,
    },
  }));

  return (
    <Box className="text-xs flex items-center text-gray-600">
      <span className="mr-2 my-3">{progressPar}%</span>
      <Box className="w-full">
        <BorderLinearProgress variant="determinate" value={progressPar} />
      </Box>
    </Box>
  );
};

export default BorderLinearProgressWithLabel;
