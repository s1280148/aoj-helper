import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { ProblemDescription } from "../../public-src/types/ApiResponseType";
import { ArenaSelectInfo } from "../../public-src/types/Type";

type Props = {
  children: React.ReactNode;
};

type ProblemInfoContextType = {
  problemInfo: null | ProblemDescription;
  setProblemInfo: Dispatch<SetStateAction<null | ProblemDescription>>;
  arenaSelectInfo: ArenaSelectInfo;
  setArenaSelectInfo: Dispatch<SetStateAction<ArenaSelectInfo>>;
};

export const ProblemInfoContext = createContext({} as ProblemInfoContextType);

/**
 * 問題情報プロバイダ
 * @param props - props
 * @returns 問題情報プロバイダ
 *
 * @remarks
 * 現在表示中の問題情報を提供する
 */
export const ProblemInfoProvider: React.FC<Props> = (props) => {
  const { children } = props;

  // 現在表示中の問題情報のstate
  const [problemInfo, setProblemInfo] = useState<null | ProblemDescription>(null);

  // アリーナ選択情報のstate
  const [arenaSelectInfo, setArenaSelectInfo] = useState<ArenaSelectInfo>({
    isArena: false,
    arenaId: "",
    arenaProblemId: "",
  });

  return (
    <ProblemInfoContext.Provider value={{ problemInfo, setProblemInfo, arenaSelectInfo, setArenaSelectInfo }}>
      {children}
    </ProblemInfoContext.Provider>
  );
};
