import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  /* </React.StrictMode> */
);

