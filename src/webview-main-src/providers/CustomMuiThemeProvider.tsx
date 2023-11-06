import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeInfoContext } from "./ThemeInfoProvider";
import { useContext } from "react";

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

const CustomMuiThemeProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const { isDarkMode, setIsDarkMode } = useContext(ThemeInfoContext);

  return <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};

export default CustomMuiThemeProvider;
