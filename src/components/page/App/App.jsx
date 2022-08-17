import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import "./App.css";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AppContextProvider} from "../../../contexts/AppContext.jsx";
import {AppRouter} from "../router";


export default function App() {
  const theme = createTheme({});

  return (
    <AppContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box>
            <AppRouter />
          </Box>
        </ThemeProvider>
      </LocalizationProvider>
    </AppContextProvider>
  );
}
