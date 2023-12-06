import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { ArenaInfo, ArenaUserEntryInfo, ProblemInfo } from "../../../../../public-src/types/ApiResponseType";
import { callApi } from "../../../../../webview-public-src/utils/ApiUtil";
import { timeStampToDate } from "../../../../../public-src/utils/DateUtil";

type Props = {
  arenaUserEntryInfo: ArenaUserEntryInfo;
};

/**
 * アリーナカード
 * @param props - props
 * @returns アリーナカード
 */
const ArenaCard: React.FC<Props> = (props: Props) => {
  // propsから問題情報を取得
  const { arenaUserEntryInfo } = props;

  // アリーナ情報のstate
  const [arenaInfo, setArenaInfo] = useState<null | ArenaInfo>(null);

  useEffect(() => {
    const findByIdArena = async () => {
      // アリーナ情報を取得し、stateにセット
      const parameter = {
        arenaId: arenaUserEntryInfo.arenaId,
      };
      const response = (await callApi("findByIdArena", parameter)) as ArenaInfo;

      setArenaInfo(response);
    };

    findByIdArena();
  }, [arenaUserEntryInfo]);

  const navigate = useNavigate();

  /**
   * アリーナカードの押下をハンドリングします。
   */
  const handleArenaCardClick = () => {
    // アリーナ詳細タブを表示
    navigate(`/problem/list/arena/${arenaUserEntryInfo.arenaId}`, { state: arenaInfo });
  };

  return (
    <>
      {arenaInfo && (
        <Box
          className="
        border
        rounded
        flex 
        items-center 
        p-4 hover:shadow 
        transition 
        duration-100 
        hover:border-arena
        dark:border-darkMode-dark
        dark:text-darkMode-text
        dark:bg-darkMode-darkest
        dark:hover:border-arena-dark"
          onClick={handleArenaCardClick}
        >
          <Box>
            <Box>
              <p className="text-lg font-bold dark:text-darkMode-text">{arenaInfo.id}</p>
            </Box>
            <Box className="mt-2">
              <p className="text-gray-600 dark:text-darkMode-text">{`${timeStampToDate(
                arenaInfo.startDate,
              )} 〜 ${timeStampToDate(arenaInfo.endDate)}`}</p>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ArenaCard;
