import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import './App.css'
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Homepage from './pages/home.tsx'; // Import homepage!
import Destinations from './pages/Destinations.tsx';
import Packages from './pages/Packages.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Cart from './pages/Cart.tsx';
import TravelBlog from './pages/TravelBlog.tsx';
import PackageDetail from './pages/packageDetail.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} /> {/* Homepage at root */}
          <Route path="destinations" element={<Destinations />} />
          <Route path="packages" element={<Packages />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="travel-blog" element={<TravelBlog />} />
          <Route path="packages/:id" element={<PackageDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);