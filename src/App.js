// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminLayout from './pages/Admin/AdminLayout';

const App = () => {
  const [attendanceRecords, setAttendanceRecords] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<AdminLayout attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords} />} />
      </Routes>
    </Router>
  );
};

export default App;
