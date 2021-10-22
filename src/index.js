import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { MemoryRouter } from 'react-router-dom'; //SecurityError
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <MemoryRouter> */}
      <App />
      {/* </MemoryRouter> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
