import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import './App.css'
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Homepage from './pages/home.tsx'; // Import homepage!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} /> {/* Homepage at root */}

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);