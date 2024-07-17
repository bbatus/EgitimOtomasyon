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
} from '../../helpers/adminHelpers';  // Bu yolu kontrol edin
import Sidebar from '../../components/Sidebar';
import AdminDashboard from './Modules/AdminDashboard';
import AdminMainPage from './Modules/AdminMainPage';
import Notifications from './Modules/NotificationModule/Notifications';
import VideoSolutionModule from './Modules/VideoModule/VideoSolutionModule';
import AttendanceModule from './Modules/AttendanceModule/AttendanceModule';
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
    { id: 1, name: 'Örnek Öğrenci 1', classroom: '9-A' },
    { id: 2, name: 'Örnek Öğrenci 2', classroom: '10-B' },
    { id: 3, name: 'Örnek Öğrenci 3', classroom: '11-C' },
    { id: 4, name: 'Örnek Öğrenci 4', classroom: '12-D' },
    { id: 5, name: 'Örnek Öğrenci 5', classroom: '9-B' },
    { id: 6, name: 'Örnek Öğrenci 6', classroom: '10-C' },
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
          <Route path="attendance" element={<AttendanceModule />} />
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
