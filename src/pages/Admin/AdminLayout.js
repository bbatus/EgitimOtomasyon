import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types'; // PropTypes import edildi
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header'; // Header Component'i import edin
import AdminDashboard from './Modules/AdminDashboard';
import AdminMainPage from './Modules/AdminMainPage';
import Notifications from './Modules/NotificationModule/Notifications';
import VideoSolutionModule from './Modules/VideoModule/VideoSolutionModule';
import AttendanceModule from './Modules/AttendanceModule/AttendanceModule';
import AttendanceDetail from './Modules/AttendanceModule/AttendanceDetail';
import AbsentStudents from './Modules/AttendanceModule/AbsentStudents';
import HomeworkTrackingModule from './Modules/HomeworkTrackingModule/HomeworkTrackingModule';
import GuidanceModule from './Modules/GuidanceModule/GuidanceModule';
import RegistrationModule from './Modules/RegistrationModule/RegistrationModule';
import StudentRegistration from './Modules/RegistrationModule/StudentRegistration/StudentRegistration';
import AddStudent from './Modules/RegistrationModule/StudentRegistration/AddStudent';
import AddStudentExcel from './Modules/RegistrationModule/StudentRegistration/AddStudentExcel';
import TeacherRegistration from './Modules/RegistrationModule/TeacherRegistration/TeacherRegistration';
import AddTeacher from './Modules/RegistrationModule/TeacherRegistration/AddTeacher';
import CourseRegistration from './Modules/RegistrationModule/CourseRegistration/CourseRegistration';
import CourseTopics from './Modules/RegistrationModule/CourseRegistration/CourseTopics';
import AddCourse from './Modules/RegistrationModule/CourseRegistration/AddCourse';
import '../../App.css'; // Importing App.css

const AdminLayout = ({ attendanceRecords, setAttendanceRecords }) => {
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

  const [absentStudents, setAbsentStudents] = useState([]); // Yeni eklenen state

  const navigate = useNavigate();

  const addStudent = useCallback((newStudent) => {
    setStudents((prevStudents) => [...prevStudents, { id: Date.now(), ...newStudent }]);
  }, []);

  const updateStudent = useCallback((updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  }, []);

  const deleteStudent = useCallback((studentId) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== studentId)
    );
  }, []);

  const addStudentsFromExcel = useCallback(
    (students) => {
      setStudents((prevStudents) => [...prevStudents, ...students]);
      navigate('/dashboard/registration/student');
    },
    [navigate]
  );

  const addTeacher = useCallback((newTeacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, { id: Date.now(), ...newTeacher }]);
  }, []);

  const updateTeacher = useCallback((updatedTeacher) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
  }, []);

  const addCourse = useCallback((newCourse) => {
    setCourses((prevCourses) => [...prevCourses, { id: Date.now(), ...newCourse }]);
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content">
        <Header username="Admin" /> {/* Header component added with username prop */}
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="adminmainpage" element={<AdminMainPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="video-solution" element={<VideoSolutionModule />} />
          <Route
            path="attendance"
            element={
              <AttendanceModule
                attendanceRecords={attendanceRecords}
                setAttendanceRecords={setAttendanceRecords}
              />
            }
          />
          <Route
            path="attendance/:className/:lesson"
            element={
              <AttendanceDetail
                students={students}
                attendanceRecords={attendanceRecords}
                setAttendanceRecords={setAttendanceRecords}
              />
            }
          />
          <Route
            path="absent-students"
            element={
              <AbsentStudents
                absentStudents={absentStudents}
                setAbsentStudents={setAbsentStudents}
              />
            }
          />
          <Route path="homework-tracking" element={<HomeworkTrackingModule />} />
          <Route path="guidance" element={<GuidanceModule />} />
          <Route path="registration" element={<RegistrationModule />} />
          <Route
            path="registration/student"
            element={
              <StudentRegistration
                addStudent={addStudent}
                editStudent={(student) =>
                  navigate('/dashboard/registration/student/edit', { state: { student } })
                }
                deleteStudent={deleteStudent} // deleteStudent fonksiyonu geçildi
                students={students}
              />
            }
          />
          <Route
            path="registration/student/add"
            element={<AddStudent addStudent={addStudent} updateStudent={updateStudent} />} // Pass updateStudent
          />
          <Route
            path="registration/student/edit"
            element={<AddStudent addStudent={addStudent} updateStudent={updateStudent} />} // Pass updateStudent
          />
          <Route
            path="registration/student/excel"
            element={<AddStudentExcel addStudentsFromExcel={addStudentsFromExcel} />}
          />
          <Route
            path="registration/teacher"
            element={
              <TeacherRegistration
                addTeacher={addTeacher}
                editTeacher={(teacher) =>
                  navigate('/dashboard/registration/teacher/edit', { state: { teacher } })
                }
                teachers={teachers}
              />
            }
          />
          <Route
            path="registration/teacher/add"
            element={<AddTeacher addTeacher={addTeacher} />}
          />
          <Route
            path="registration/teacher/edit"
            element={<AddTeacher updateTeacher={updateTeacher} />}
          />
          <Route
            path="registration/course"
            element={<CourseRegistration courses={courses} addCourse={addCourse} />}
          />
          <Route path="registration/course/topics/:courseId" element={<CourseTopics />} />
          <Route path="registration/course/add" element={<AddCourse addCourse={addCourse} />} />
        </Routes>
      </div>
    </div>
  );
};

// PropTypes tanımlaması
AdminLayout.propTypes = {
  attendanceRecords: PropTypes.object.isRequired,
  setAttendanceRecords: PropTypes.func.isRequired,
};

export default AdminLayout;
