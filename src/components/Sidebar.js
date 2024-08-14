import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/styles/Sidebar.css';
import homeIcon from '../assets/images/home.svg'; // Anasayfa için simge
import notificationIcon from '../assets/images/notification.svg'; // Bildirimler için simge
import videoSolutionIcon from '../assets/images/videosolution.svg'; // Video Çözüm için simge
import attendanceIcon from '../assets/images/attendance.svg'; // Yoklama için simge
import homeworkIcon from '../assets/images/homework.svg'; // Ödev Takip için simge
import guidanceIcon from '../assets/images/guidance.svg'; // Rehberlik için simge
import registrationIcon from '../assets/images/registration.svg'; // Kayıt için simge
import exitIcon from '../assets/images/exit.svg'; // Çıkış için simge

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <button
          onClick={() => navigate('/dashboard')}
          className="logo-button"
          aria-label="Ref Kolej Dashboard"
        >
          <img src="https://app.refkolej.com/RefLogo.svg" alt="Ref Kolej" />
        </button>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink
            to="/dashboard/adminmainpage"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={homeIcon} alt="Home Icon" className="sidebar-icon" />
            <span>Anasayfa</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/notifications"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={notificationIcon} alt="Notification Icon" className="sidebar-icon" />
            <span>Bildirimler</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/registration"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={registrationIcon} alt="Registration Icon" className="sidebar-icon" />
            <span>Kayıt Modülü</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/attendance"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={attendanceIcon} alt="Attendance Icon" className="sidebar-icon" />
            <span>Yoklama Modülü</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/video-solution"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={videoSolutionIcon} alt="Video Solution Icon" className="sidebar-icon" />
            <span>Video Çözüm Modülü</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/guidance"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={guidanceIcon} alt="Guidance Icon" className="sidebar-icon" />
            <span>Rehberlik Modülü</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/homework-tracking"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <img src={homeworkIcon} alt="Homework Icon" className="sidebar-icon" />
            <span>Ödev Takip Modülü</span>
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

export default Sidebar;
