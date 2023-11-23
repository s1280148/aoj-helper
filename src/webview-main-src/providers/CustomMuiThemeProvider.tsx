import { ThemeProvider, createTheme } from "@mui/material";
import { EnvironmentInfoContext } from "./EnvironmentInfoProvider";
import { useContext } from "react";

// ライトモードのテーマ
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

// ダークモードのテーマ
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

/**
 * Material UIのテーマプロバイダ
 * @param props - props
 * @returns Material UIのテーマプロバイダ
 */
const CustomMuiThemeProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  // 環境情報のstate
  const { environmentInfo, setEnvironmentInfo } = useContext(EnvironmentInfoContext);

  return <ThemeProvider theme={environmentInfo.isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};

export default CustomMuiThemeProvider;
