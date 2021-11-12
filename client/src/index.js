import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, createTheme} from '@mui/material'

// integrating react-router
import {BrowserRouter} from 'react-router-dom'

// integrating REDUX 
import {Provider} from 'react-redux'
import {store} from './store'

const mdTheme = createTheme({
  typography: {
    fontFamily: "Proxima Nova Alt",
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>  
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
