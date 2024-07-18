// src/pages/Admin/AdminLayout.js
import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  addStudent as addStudentHelper,
  updateStudent as updateStudentHelper,
  addStudentsFromExcel as addStudentsFromExcelHelper,
  addTeacher as addTeacherHelper,
  updateTeacher as updateTeacherHelper,
  addCourse as addCourseHelper
} from '../../helpers/adminHelpers';
import Sidebar from '../../components/Sidebar';
import AdminDashboard from './Modules/AdminDashboard';
import AdminMainPage from './Modules/AdminMainPage';
import Notifications from './Modules/NotificationModule/Notifications';
import VideoSolutionModule from './Modules/VideoModule/VideoSolutionModule';
import AttendanceModule from './Modules/AttendanceModule/AttendanceModule';
import AttendanceDetail from './Modules/AttendanceModule/AttendanceDetail';
import HomeworkTrackingModule from './Modules/HomeworkTrackingModule/HomeworkTrackingModule';
import AccountingModule from './Modules/AccountingModule/AccountingModule';
import RegistrationModule from './Modules/RegistrationModule/RegistrationModule';
import StudentRegistration from './Modules/RegistrationModule/StudentRegistration/StudentRegistration';
import AddStudent from './Modules/RegistrationModule/StudentRegistration/AddStudent';
import AddStudentExcel from './Modules/RegistrationModule/StudentRegistration/AddStudentExcel';
import TeacherRegistration from './Modules/RegistrationModule/TeacherRegistration/TeacherRegistration';
import AddTeacher from './Modules/RegistrationModule/TeacherRegistration/AddTeacher';
import CourseRegistration from './Modules/RegistrationModule/CourseRegistration/CourseRegistration';
import CourseTopics from './Modules/RegistrationModule/CourseRegistration/CourseTopics';
import AddCourse from './Modules/RegistrationModule/CourseRegistration/AddCourse';
import '../../App.css'; // App.css dosyasını burada import edin

const AdminLayout = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Emre Demir', classroom: '12-A' },
    { id: 2, name: 'Ayşe Su', classroom: '12-A' },
    { id: 3, name: 'Murat Kılıç', classroom: '12-A' },
    { id: 4, name: 'Zeynep Yıldız', classroom: '12-A' },
    { id: 5, name: 'Ali Çelik', classroom: '12-A' },
    { id: 6, name: 'Mehmet Öz', classroom: '12-B' },
    { id: 7, name: 'Elif Aksoy', classroom: '12-B' },
    { id: 8, name: 'Hakan Yılmaz', classroom: '12-B' },
    { id: 9, name: 'Fatma Kaya', classroom: '12-B' },
    { id: 10, name: 'Ahmet Şahin', classroom: '12-B' },
    { id: 11, name: 'Kemal Arslan', classroom: '12-C' },
    { id: 12, name: 'Aylin Güneş', classroom: '12-C' },
    { id: 13, name: 'Serkan Ekinci', classroom: '12-C' },
    { id: 14, name: 'Leyla Yalçın', classroom: '12-C' },
    { id: 15, name: 'Canan Uysal', classroom: '12-C' },
    { id: 16, name: 'Yusuf Ersoy', classroom: '12-D' },
    { id: 17, name: 'Selin Kara', classroom: '12-D' },
    { id: 18, name: 'Osman Tunç', classroom: '12-D' },
    { id: 19, name: 'Merve Akın', classroom: '12-D' },
    { id: 20, name: 'Ozan Çetin', classroom: '12-D' },
    { id: 21, name: 'Gökhan Aydın', classroom: '12-E' },
    { id: 22, name: 'Derya Korkmaz', classroom: '12-E' },
    { id: 23, name: 'Cemre Polat', classroom: '12-E' },
    { id: 24, name: 'Barış Karataş', classroom: '12-E' },
    { id: 25, name: 'Nur Can', classroom: '12-E' },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Örnek Öğretmen 1', department: 'Matematik' },
    { id: 2, name: 'Örnek Öğretmen 2', department: 'Fen Bilimleri' },
    { id: 3, name: 'Örnek Öğretmen 3', department: 'Türkçe' },
    { id: 4, name: 'Örnek Öğretmen 4', department: 'Sosyal Bilgiler' },
    { id: 5, name: 'Örnek Öğretmen 5', department: 'İngilizce' },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, courseName: 'Matematik', courseType: 'TYT' },
    { id: 2, courseName: 'Fizik', courseType: 'AYT' },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState({});

  const navigate = useNavigate();

  const addStudent = useCallback((newStudent) => {
    addStudentHelper(newStudent, setStudents);
  }, []);

  const updateStudent = useCallback((updatedStudent) => {
    updateStudentHelper(updatedStudent, setStudents);
  }, []);

  const addStudentsFromExcel = useCallback((students) => {
    addStudentsFromExcelHelper(students, setStudents, navigate);
  }, [navigate]);

  const addTeacher = useCallback((newTeacher) => {
    addTeacherHelper(newTeacher, setTeachers);
  }, []);

  const updateTeacher = useCallback((updatedTeacher) => {
    updateTeacherHelper(updatedTeacher, setTeachers);
  }, []);

  const addCourse = useCallback((newCourse) => {
    addCourseHelper(newCourse, setCourses);
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="adminmainpage" element={<AdminMainPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="video-solution" element={<VideoSolutionModule />} />
          <Route path="attendance" element={<AttendanceModule attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords} />} />
          <Route path="attendance/:className" element={<AttendanceDetail students={students} attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords} />} />
          <Route path="homework-tracking" element={<HomeworkTrackingModule />} />
          <Route path="accounting" element={<AccountingModule />} />
          <Route path="registration" element={<RegistrationModule />} />
          <Route path="registration/student" element={<StudentRegistration addStudent={addStudent} editStudent={(student) => navigate('/dashboard/registration/student/edit', { state: { student } })} students={students} />} />
          <Route path="registration/student/add" element={<AddStudent addStudent={addStudent} />} />
          <Route path="registration/student/edit" element={<AddStudent updateStudent={updateStudent} />} />
          <Route path="registration/student/excel" element={<AddStudentExcel addStudentsFromExcel={addStudentsFromExcel} />} />
          <Route path="registration/teacher" element={<TeacherRegistration addTeacher={addTeacher} editTeacher={(teacher) => navigate('/dashboard/registration/teacher/edit', { state: { teacher } })} teachers={teachers} />} />
          <Route path="registration/teacher/add" element={<AddTeacher addTeacher={addTeacher} />} />
          <Route path="registration/teacher/edit" element={<AddTeacher updateTeacher={updateTeacher} />} />
          <Route path="registration/course" element={<CourseRegistration courses={courses} addCourse={addCourse} />} />
          <Route path="registration/course/topics/:courseId" element={<CourseTopics />} />
          <Route path="registration/course/add" element={<AddCourse addCourse={addCourse} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
