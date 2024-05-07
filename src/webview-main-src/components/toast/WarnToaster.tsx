import { Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

type Props = {
  title: string;
  content?: string | JSX.Element;
};

/**
 * 警告トースター
 * @param props - props
 * @returns 警告トースター
 */
const WarnToaster: React.FC<Props> = (props: Props) => {
  const { title, content } = props;

  return (
    <Box
      className={`
      grid
      grid-cols-6
      ${content === undefined ? "gap-x-3" : "gap-3"}
    `}
    >
      <Box className="flex items-center">
        <WarningIcon className="text-yellow-500 dark:text-yellow-600" />
      </Box>
      <Box className="col-span-5 flex items-center">
        <p className="text-yellow-500 text-base dark:text-yellow-600">{title}</p>
      </Box>
      {content !== undefined && (
        <>
          <Box className="mt-4"></Box>
          {typeof content === "string" ? (
            <Box className="col-span-5">
              <p className="dark:text-darkMode-text">{content}</p>
            </Box>
          ) : (
            content
          )}
        </>
      )}
    </Box>
  );
};

export default WarnToaster;
