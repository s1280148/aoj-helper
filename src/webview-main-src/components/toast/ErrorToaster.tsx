import { Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  title: string;
  content?: string | JSX.Element;
};

/**
 * エラートースター
 * @param props - props
 * @returns エラートースター
 */
const ErrorToaster: React.FC<Props> = (props: Props) => {
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
        <CancelIcon className="text-red-500 dark:text-red-600" />
      </Box>
      <Box className="col-span-5 flex items-center">
        <p className="text-red-500 text-base dark:text-red-600">{title}</p>
      </Box>
      {content !== undefined && (
        <>
          <Box></Box>
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

export default ErrorToaster;
