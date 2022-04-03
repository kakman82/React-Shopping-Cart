import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './context/Context';

//! React v18 defining;
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Context>
    <App />
  </Context>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
