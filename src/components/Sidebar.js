import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img
          src="https://app.refkolej.com/RefLogo.svg"
          alt="Ref Kolej"
          onClick={() => navigate('/dashboard')}
        />
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard/adminmainpage" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-home"></i> Anasayfa
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-bell"></i> Bildirimler
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/video-solution" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-video"></i> Video Çözüm Modülü
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/attendance" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-calendar-check"></i> Yoklama Modülü
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/homework-tracking" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-tasks"></i> Ödev Takip Modülü
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/accounting" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-money-bill"></i> Muhasebe Modülü
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/registration" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-user-plus"></i> Kayıt Modülü
          </NavLink>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
