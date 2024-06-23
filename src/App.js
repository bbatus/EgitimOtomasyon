import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminMainPage from './pages/Admin/AdminMainPage';
import Notifications from './pages/Admin/Notifications';
import VideoSolutionModule from './pages/Admin/VideoSolutionModule';
import AttendanceModule from './pages/Admin/AttendanceModule';
import HomeworkTrackingModule from './pages/Admin/HomeworkTrackingModule';
import AccountingModule from './pages/Admin/AccountingModule';
import RegistrationModule from './pages/Admin/RegistrationModule';
import StudentRegistration from './pages/Admin/Registration/StudentRegistration';
import AddStudent from './pages/Admin/Registration/AddStudent';
import AddStudentExcel from './pages/Admin/Registration/AddStudentExcel';
import TeacherRegistration from './pages/Admin/Registration/TeacherRegistration';
import CourseRegistration from './pages/Admin/Registration/CourseRegistration';
import Sidebar from './components/Sidebar';
import './App.css';

const AdminLayout = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Örnek Öğrenci 1', classroom: '9-A' },
    { id: 2, name: 'Örnek Öğrenci 2', classroom: '10-B' },
    { id: 3, name: 'Örnek Öğrenci 3', classroom: '11-C' },
    { id: 4, name: 'Örnek Öğrenci 4', classroom: '12-D' },
    { id: 5, name: 'Örnek Öğrenci 5', classroom: '9-B' },
    { id: 6, name: 'Örnek Öğrenci 6', classroom: '10-C' },
  ]);
  const navigate = useNavigate();

  const addStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, { ...newStudent, id: prevStudents.length + 1 }]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const addStudentsFromExcel = (file) => {
    // Excel dosyasını okuma ve öğrenci listesine ekleme işlemlerini burada gerçekleştirin.
    alert('Excel dosyasından öğrenciler eklendi!');
    navigate('/dashboard/registration/student');
  };

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
          <Route path="registration/teacher" element={<TeacherRegistration />} />
          <Route path="registration/course" element={<CourseRegistration />} />
        </Routes>
      </div>
    </div>
  );
};

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
