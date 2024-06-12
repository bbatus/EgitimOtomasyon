// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Notifications from './pages/Admin/Notifications';
import VideoSolutionModule from './pages/Admin/VideoSolutionModule';
import AttendanceModule from './pages/Admin/AttendanceModule';
import HomeworkTrackingModule from './pages/Admin/HomeworkTrackingModule';
import AccountingModule from './pages/Admin/AccountingModule';
import RegistrationModule from './pages/Admin/RegistrationModule';
import Sidebar from './components/Sidebar';
import './App.css';

const AdminLayout = () => (
  <div className="admin-layout">
    <Sidebar />
    <div className="content">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="video-solution" element={<VideoSolutionModule />} />
        <Route path="attendance" element={<AttendanceModule />} />
        <Route path="homework-tracking" element={<HomeworkTrackingModule />} />
        <Route path="accounting" element={<AccountingModule />} />
        <Route path="registration" element={<RegistrationModule />} />
      </Routes>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
