// index.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/talam-notation-pdf">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);