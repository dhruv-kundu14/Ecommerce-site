// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App'; // Adjust according to your file structure

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            dark: '#115293',
        },
        secondary: {
          main: '#1976d2',
          dark: '#115293',
      },
        // You can define other palette options here
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
