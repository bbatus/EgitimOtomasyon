import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/styles/Sidebar.css';
import homeIcon from '../assets/images/home.svg';
import videoSolutionIcon from '../assets/images/videosolution.svg';
import attendanceIcon from '../assets/images/attendance.svg';
import homeworkIcon from '../assets/images/homework.svg';
import notificationIcon from '../assets/images/notification.svg';
import guidanceIcon from '../assets/images/guidance.svg';
import studentIcon from '../assets/images/student.svg';
import teacherIcon from '../assets/images/teacher.svg';
import classIcon from '../assets/images/exam.svg';
import exitIcon from '../assets/images/exit.svg';

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <button
          onClick={() => navigate('/student/studentmainpage')}
          className="logo-button"
          aria-label="Ref Kolej Student MainPage"
        >
          <img src="https://app.refkolej.com/RefLogo.svg" alt="Ref Kolej" />
        </button>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink
            to="/student/studentmainpage"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={homeIcon} alt="Home Icon" className="sidebar-icon" />
            <span>Anasayfa</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/video-solution"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={videoSolutionIcon} alt="Video Solution Icon" className="sidebar-icon" />
            <span>Video Çözümleri</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/attendance"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={attendanceIcon} alt="Attendance Icon" className="sidebar-icon" />
            <span>Devamsızlık Takibi</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/homework-tracking"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={homeworkIcon} alt="Homework Icon" className="sidebar-icon" />
            <span>Ödev Takibi</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/student-list"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={studentIcon} alt="Student List Icon" className="sidebar-icon" />
            <span>Öğrenci Listesi</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/teacher-list"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={teacherIcon} alt="Teacher List Icon" className="sidebar-icon" />
            <span>Öğretmen Listesi</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/class-list"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={classIcon} alt="Class List Icon" className="sidebar-icon" />
            <span>Ders Listesi</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/guidance"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={guidanceIcon} alt="Guidance Icon" className="sidebar-icon" />
            <span>Rehberlik</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/student/notifications"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={notificationIcon} alt="Notification Icon" className="sidebar-icon" />
            <span>Bildirimler</span>
          </NavLink>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            <img src={exitIcon} alt="Exit Icon" className="sidebar-icon" />
            <span>Çıkış</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
