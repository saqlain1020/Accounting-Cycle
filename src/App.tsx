import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "src/config/theme/theme";
import Body from "./Body";
import useSettings from "./hooks/useSettings";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { themeMode } = useSettings();

  const customTheme = React.useMemo(() => (themeMode === "dark" ? darkTheme : lightTheme), [themeMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <CssBaseline enableColorScheme />
        <ToastContainer newestOnTop theme={themeMode} toastClassName={(themeMode === "dark" && "darkToast") || ""} />
        <Body />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

