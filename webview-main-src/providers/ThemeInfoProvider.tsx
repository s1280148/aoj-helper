import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ThemeInfoContextType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

export const ThemeInfoContext = createContext({} as ThemeInfoContextType);

export const ThemeInfoProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(vscode.getState()?.isDarkMode ?? false);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html")!.classList.add("dark");
    } else {
      document.querySelector("html")!.classList.remove("dark");
    }

    vscode.setState({ ...vscode.getState(), isDarkMode: isDarkMode });
  }, [isDarkMode]);

  return <ThemeInfoContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeInfoContext.Provider>;
};
