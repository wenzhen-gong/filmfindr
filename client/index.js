import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// import _ from 'lodash';
// function component() {
//   const element = document.createElement('div');
//   element.innerHTML = 'Hello, webpack';
//   return element;
// }

// document.body.appendChild(component());