import { ThemeProvider } from "@emotion/react";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ThemeInfoContextType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

export const ThemeInfoContext = createContext({} as ThemeInfoContextType);

/**
 * テーマ情報プロバイダ
 * @param props - props
 * @returns テーマ情報プロバイダ
 */
export const ThemeInfoProvider: React.FC<Props> = (props) => {
  const { children } = props;

  // ダークモードかのstate
  const [isDarkMode, setIsDarkMode] = useState<boolean>(vscode.getState()?.isDarkMode ?? false);

  useEffect(() => {
    // ダークモードである場合、htmlタグにクラスを付与
    if (isDarkMode) {
      document.querySelector("html")!.classList.add("dark");
    } else {
      document.querySelector("html")!.classList.remove("dark");
    }

    // ダークモードかをvscodeのstateに保存
    vscode.setState({ ...vscode.getState(), isDarkMode: isDarkMode });
  }, [isDarkMode]);

  return <ThemeInfoContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeInfoContext.Provider>;
};
