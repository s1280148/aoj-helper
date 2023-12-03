import { ThemeProvider } from "@emotion/react";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { DisplayLanguage, ProgrammingLanguage } from "../../public-src/constants/constant";
import i18next from "i18next";

type Props = {
  children: React.ReactNode;
};

/**
 * 環境情報
 */
interface EnvironmentInfo {
  displayLanguage: DisplayLanguage;
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
    // 初期表示言語は日本語
    displayLanguage: vscode.getState()?.displayLanguage ?? DisplayLanguage.Japanese,
    // 初期プログラミング言語はPython3
    programmingLanguage: vscode.getState()?.programmingLanguage ?? ProgrammingLanguage.Python3,
    isDarkMode: vscode.getState()?.isDarkMode ?? false,
  });

  useEffect(() => {
    // 拡張機能側に、表示言語の切り替えを通知
    vscode.postMessage({
      type: "changeDisplayLanguage",
      content: environmentInfo.displayLanguage,
    });
  }, []);

  useEffect(() => {
    // ダークモードである場合、htmlタグにクラスを付与
    if (environmentInfo.isDarkMode) {
      document.querySelector("html")!.classList.add("dark");
    } else {
      document.querySelector("html")!.classList.remove("dark");
    }

    // 表示言語を切り替え
    i18next.changeLanguage(environmentInfo.displayLanguage);

    // 拡張機能側に、表示言語の切り替えを通知
    vscode.postMessage({
      type: "changeDisplayLanguage",
      content: environmentInfo.displayLanguage,
    });

    // 環境情報をvscodeのstateに保存
    vscode.setState({
      ...vscode.getState(),
      displayLanguage: environmentInfo.displayLanguage,
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
