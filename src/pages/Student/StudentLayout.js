// src/pages/Student/StudentLayout.js
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/StudentSidebar';
import Header from '../../components/Header';
import StudentDashboard from './Modules/StudentDashboard';
import StudentMainPage from './Modules/StudentMainPage'; // StudentMainPage import edildi
import StudentVideoSolutionModule from './Modules/StudentVideoModule/StudentVideoSolutionModule';
import StudentAttendanceModule from './Modules/StudentAttendanceModule/StudentAttendanceModule';
import StudentHomeworkTrackingModule from './Modules/StudentHomeworkTrackingModule/StudentHomeworkTrackingModule';
import '../../App.css';

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <Sidebar />
      <div className="content">
        <Header username="Öğrenci" />
        <Routes>
          {/* Öğrencinin Dashboard sayfası */}
          <Route path="/dashboard" element={<StudentDashboard />} />

          {/* Öğrencinin Ana sayfası */}
          <Route path="/studentmainpage" element={<StudentMainPage />} />

          {/* Video çözüm modülü */}
          <Route path="video-solution" element={<StudentVideoSolutionModule />} />

          {/* Devamsızlık modülü */}
          <Route path="attendance" element={<StudentAttendanceModule />} />

          {/* Ödev takip modülü */}
          <Route path="homework-tracking" element={<StudentHomeworkTrackingModule />} />
        </Routes>
      </div>
    </div>
  );
};

StudentLayout.propTypes = {
  attendanceRecords: PropTypes.object,
  setAttendanceRecords: PropTypes.func,
};

export default StudentLayout;
