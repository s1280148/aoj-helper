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

export const ProblemInfoProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [problemInfo, setProblemInfo] = useState<null | ProblemDescription>(null);

  return <ProblemInfoContext.Provider value={{ problemInfo, setProblemInfo }}>{children}</ProblemInfoContext.Provider>;
};
