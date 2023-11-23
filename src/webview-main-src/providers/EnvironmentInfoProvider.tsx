import { ThemeProvider } from "@emotion/react";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { ProgrammingLanguage } from "../../public-src/constants/constant";

type Props = {
  children: React.ReactNode;
};

/**
 * 環境情報
 */
interface EnvironmentInfo {
  programmingLanguage: ProgrammingLanguage;
  isDarkMode: boolean;
}

type EnvironmentInfoContextType = {
  environmentInfo: EnvironmentInfo;
  setEnvironmentInfo: Dispatch<SetStateAction<EnvironmentInfo>>;
};

export const EnvironmentInfoContext = createContext({} as EnvironmentInfoContextType);

/**
 * 環境情報プロバイダ
 * @param props - props
 * @returns 環境情報プロバイダ
 */
export const EnvironmentInfoProvider: React.FC<Props> = (props) => {
  const { children } = props;

  // 環境情報のstate
  const [environmentInfo, setEnvironmentInfo] = useState<EnvironmentInfo>({
    // 初期言語はPython3
    programmingLanguage: vscode.getState()?.programmingLanguage ?? ProgrammingLanguage.Python3,
    isDarkMode: vscode.getState()?.isDarkMode ?? false,
  });

  useEffect(() => {
    // ダークモードである場合、htmlタグにクラスを付与
    if (environmentInfo.isDarkMode) {
      document.querySelector("html")!.classList.add("dark");
    } else {
      document.querySelector("html")!.classList.remove("dark");
    }

    // ダークモードかをvscodeのstateに保存
    vscode.setState({
      ...vscode.getState(),
      programmingLanguage: environmentInfo.programmingLanguage,
      isDarkMode: environmentInfo.isDarkMode,
    });
  }, [environmentInfo]);

  return (
    <EnvironmentInfoContext.Provider value={{ environmentInfo, setEnvironmentInfo }}>
      {children}
    </EnvironmentInfoContext.Provider>
  );
};
