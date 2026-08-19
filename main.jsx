import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.jsx';
import { PortfolioProvider } from './src/context/PortfolioContext.jsx';
import './src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);
