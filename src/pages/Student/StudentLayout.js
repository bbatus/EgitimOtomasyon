import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/StudentSidebar';
import Header from '../../components/StudentHeader'; // StudentHeader eklendi
import StudentDashboard from './Modules/StudentDashboard';
import StudentMainPage from './Modules/StudentMainPage';
import StudentVideoSolutionModule from './Modules/StudentVideoModule/StudentVideoSolutionModule';
import StudentAttendanceModule from './Modules/StudentAttendanceModule/StudentAttendanceModule';
import StudentHomeworkTrackingModule from './Modules/StudentHomeworkTrackingModule/StudentHomeworkTrackingModule';
import StudentGuidanceModule from './Modules/StudentGuidanceModule/StudentGuidanceModule';
import StudentList from './Modules/StudentList/StudentList';
import StudentTeacherList from './Modules/StudentTeacherList/StudentTeacherList';
import StudentClassList from './Modules/StudentClassList/StudentClassList';
import StudentNotification from './Modules/StudentNotification/StudentNotification';  // Bildirimler bileşeni eklendi
import '../../App.css';

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <Sidebar />
      <div className="content">
        <Header username="Öğrenci" /> {/* Header bileşeni kullanıldı */}
        <Routes>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/studentmainpage" element={<StudentMainPage />} />
          <Route path="video-solution" element={<StudentVideoSolutionModule />} />
          <Route path="attendance" element={<StudentAttendanceModule />} />
          <Route path="homework-tracking" element={<StudentHomeworkTrackingModule />} />
          <Route path="guidance" element={<StudentGuidanceModule />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path="teacher-list" element={<StudentTeacherList />} />
          <Route path="class-list" element={<StudentClassList />} />
          <Route path="notifications" element={<StudentNotification />} /> {/* Bildirim bileşeni */}
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
