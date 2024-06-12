// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Notifications from './pages/Admin/Notifications';
import Students from './pages/Admin/Students';
import Teachers from './pages/Admin/Teachers';
import CreateExam from './pages/Admin/Exams/CreateExam';
import ViewExams from './pages/Admin/Exams/ViewExams';
import Courses from './pages/Admin/Courses';
import PublisherFormats from './pages/Admin/PublisherFormats';
import Sidebar from './components/Sidebar';
import './App.css';

const AdminLayout = () => (
  <div className="admin-layout">
    <Sidebar />
    <div className="content">
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/students" element={<Students />} />
        <Route path="/dashboard/teachers" element={<Teachers />} />
        <Route path="/dashboard/exams/create" element={<CreateExam />} />
        <Route path="/dashboard/exams/view" element={<ViewExams />} />
        <Route path="/dashboard/courses" element={<Courses />} />
        <Route path="/dashboard/formats" element={<PublisherFormats />} />
      </Routes>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
