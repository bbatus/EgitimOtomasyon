import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminLayout from './pages/Admin/AdminLayout';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/*" element={<AdminLayout />} />
    </Routes>
  </Router>
);

export default App;
