import React from "react";
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StoreProvider, createStore } from "easy-peasy";
import model from "./model"; 
import Main from "./components/Main";
 
function App() {

  const store = createStore(model);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#4dabf5',
        main: '#2196f3',
        dark: '#1769aa',
        contrastText: '#fff',
      },
      secondary: {
        light: '#637bfe',
        main: '#3d5afe',
        dark: '#2a3eb1',
        contrastText: '#fff',
      },
    },
  });

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Main/>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
