import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/StudentSidebar';
import Header from '../../components/StudentHeader';
import StudentDashboard from './Modules/StudentDashboard';
import StudentMainPage from './Modules/StudentMainPage';
import StudentVideoSolutionModule from './Modules/StudentVideoModule/StudentVideoSolutionModule';
import StudentAttendanceModule from './Modules/StudentAttendanceModule/StudentAttendanceModule';
import StudentHomeworkTrackingModule from './Modules/StudentHomeworkTrackingModule/StudentHomeworkTrackingModule';
import StudentGuidanceModule from './Modules/StudentGuidanceModule/StudentGuidanceModule';
import StudentList from './Modules/StudentList/StudentList';
import StudentTeacherList from './Modules/StudentTeacherList/StudentTeacherList';
import StudentClassList from './Modules/StudentClassList/StudentClassList';
import StudentTopics from './Modules/StudentClassList/StudentTopics'; // Ders konuları görüntüleme modülü eklendi
import StudentNotification from './Modules/StudentNotification/StudentNotification';
import '../../App.css';

// Test için öğrenci verileri
const students = [
  { id: 1, name: 'Ali Yılmaz', classroom: '10-A' },
  { id: 2, name: 'Ayşe Demir', classroom: '11-B' },
  { id: 3, name: 'Mehmet Can', classroom: '12-C' },
  { id: 4, name: 'Zeynep Karaca', classroom: '9-D' },
  { id: 5, name: 'Fatma Güneş', classroom: '10-B' },
  { id: 6, name: 'Ahmet Kılıç', classroom: '11-C' }
];

const teachers = [
  { id: 1, name: 'Veli Bayrak', department: 'Matematik' },
  { id: 2, name: 'Ayşe Yılmaz', department: 'Fen Bilimleri' },
  { id: 3, name: 'Ali Kaya', department: 'Türkçe' },
  { id: 4, name: 'Fatma Demir', department: 'Sosyal Bilgiler' },
  { id: 5, name: 'Mehmet Ak', department: 'İngilizce' },
  { id: 6, name: 'Elif Koç', department: 'Matematik' }
];

// Test için ders verileri
const courses = [
  { id: 1, courseName: 'Matematik', courseType: 'TYT' },
  { id: 2, courseName: 'Türkçe', courseType: 'TYT' },
  { id: 3, courseName: 'Fizik', courseType: 'AYT' },
  { id: 4, courseName: 'Kimya', courseType: 'AYT' },
  { id: 5, courseName: 'Biyoloji', courseType: 'AYT' },
];

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <Sidebar />
      <div className="content">
        <Header username="Öğrenci" />
        <Routes>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/studentmainpage" element={<StudentMainPage />} />
          <Route path="/video-solution" element={<StudentVideoSolutionModule />} />
          <Route path="/attendance" element={<StudentAttendanceModule />} />
          <Route path="/homework-tracking" element={<StudentHomeworkTrackingModule />} />
          <Route path="/guidance" element={<StudentGuidanceModule />} />
          {/* Öğrenci Listesi bileşeni, students prop'u ile birlikte kullanılıyor */}
          <Route path="/student-list" element={<StudentList students={students} />} />
          <Route path="/teacher-list" element={<StudentTeacherList teachers={teachers} />} />
          {/* Ders Listesi bileşeni, courses prop'u ile birlikte kullanılıyor */}
          <Route path="/class-list" element={<StudentClassList courses={courses} />} />
          {/* Ders konuları bileşeni, courses prop'u ile birlikte kullanılıyor */}
          <Route path="/class/topics/:courseId" element={<StudentTopics courses={courses} />} />
          <Route path="/notifications" element={<StudentNotification />} />
        </Routes>
      </div>
    </div>
  );
};

// PropTypes ile students, teachers ve courses verilerinin zorunlu olup olmadığını ve türünü kontrol ediyoruz
StudentLayout.propTypes = {
  students: PropTypes.array,
  teachers: PropTypes.array,
  courses: PropTypes.array
};

export default StudentLayout;
