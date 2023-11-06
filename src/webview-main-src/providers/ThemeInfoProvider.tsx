import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

const lightTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  palette: {
    mode: "dark",
  },
});

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

  return (
    <ThemeInfoContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>
    </ThemeInfoContext.Provider>
  );
};
