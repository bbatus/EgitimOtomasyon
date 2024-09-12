import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminLayout from './pages/Admin/AdminLayout';
import StudentLayout from './pages/Student/StudentLayout';

const App = () => {
  const [attendanceRecords, setAttendanceRecords] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/dashboard/*" 
          element={<AdminLayout attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords} />} 
        />
        <Route 
          path="/student/*"  
          element={<StudentLayout />}  
        />
      </Routes>
    </Router>
  );
};

export default App;
