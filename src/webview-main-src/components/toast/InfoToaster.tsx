import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  title: string;
  content?: string | JSX.Element;
};

/**
 * 情報トースター
 * @param props - props
 * @returns 情報トースター
 */
const InfoToaster: React.FC<Props> = (props: Props) => {
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
        <InfoIcon className="text-cyan-500 dark:text-cyan-600" />
      </Box>
      <Box className="col-span-5 flex items-center">
        <p className="text-cyan-500 text-lg dark:text-cyan-600">{title}</p>
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

export default InfoToaster;
