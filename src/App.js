import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./model";
import theme from "./theme";
import Main from "./components/Main";

const store = createStore(model);

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
