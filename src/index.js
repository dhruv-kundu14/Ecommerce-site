// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App'; // Adjust according to your file structure
import { AuthProvider } from './server/AuthContext'; // Adjust the path accordingly
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



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
    <AuthProvider>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    </AuthProvider>,
    document.getElementById('root')
);

// // App.js or index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// ReactDOM.render(
  
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
 
//   document.getElementById('root')
// );

