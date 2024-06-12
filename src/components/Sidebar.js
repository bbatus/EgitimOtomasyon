// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <NavLink to="/dashboard">
          <img src="https://app.refkolej.com/RefLogo.svg" alt="Ref Kolej" />
        </NavLink>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-home"></i> Anasayfa
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-bell"></i> Bildirimler
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/students" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-user-graduate"></i> Öğrenciler
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/teachers" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-chalkboard-teacher"></i> Öğretmenler
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/exams" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-file-alt"></i> Deneme Sınavları
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/courses" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-book"></i> Dersler
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/formats" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-file"></i> Yayın Evi Formatları
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
