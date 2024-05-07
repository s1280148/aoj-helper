import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/Info";

type Props = {
  title: string;
  content?: string | JSX.Element;
};

/**
 * 成功トースター
 * @param props - props
 * @returns 成功トースター
 */
const SuccessToaster: React.FC<Props> = (props: Props) => {
  const { title, content } = props;

  return (
    <Box
      className={`
      grid
      grid-cols-6
      ${content !== undefined && "gap-3"}
     `}
    >
      <Box className="flex items-center">
        <CheckCircleIcon className="text-green-500 dark:text-green-600" />
      </Box>
      <Box className="col-span-5 flex items-center">
        <p className="text-green-500 text-lg dark:text-green-600">{title}</p>
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

export default SuccessToaster;
