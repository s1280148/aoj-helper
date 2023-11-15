import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { ProblemDescription } from "../../public-src/types/ApiResponseType";

type Props = {
  children: React.ReactNode;
};

type ProblemInfoContextType = {
  problemInfo: null | ProblemDescription;
  setProblemInfo: Dispatch<SetStateAction<null | ProblemDescription>>;
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

  return <ProblemInfoContext.Provider value={{ problemInfo, setProblemInfo }}>{children}</ProblemInfoContext.Provider>;
};
