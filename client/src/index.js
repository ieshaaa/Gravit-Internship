import React, {Strictmode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import ContextProvider from './Components/Context/ContextProvider';




ReactDOM.render(
  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextProvider>
  , 
  document.getElementById('root')
);


