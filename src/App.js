import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminLayout from './pages/Admin/AdminLayout';
import StudentLayout from './pages/Student/StudentLayout';
import NotificationDialog from './components/NotificationDialog';

const App = () => {
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

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
      
      {notification.message && (
        <NotificationDialog
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </Router>
  );
};

export default App;
