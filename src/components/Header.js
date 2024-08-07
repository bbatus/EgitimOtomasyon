// src/components/Header.js
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/Header.css'; // Import the CSS file for styling
import calendarIcon from '../assets/images/calendar.svg'; // Calendar icon
import timerIcon from '../assets/images/timer.svg'; // Timer icon
import defaultUserIcon from '../assets/images/personIcon.svg'; // Default user icon

const Header = () => {
  const username = localStorage.getItem('username') || 'Misafir'; // Kullanıcı adını localStorage'dan al
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="header-container">
      <div className="user-info">
        <img src={defaultUserIcon} alt="User" className="user-icon" />
        <span className="user-greeting">Hoşgeldiniz, {username}</span>
      </div>
      <div className="date-time">
        <img src={calendarIcon} alt="Calendar Icon" className="icon" />
        <span>{currentDate}</span>
        <img src={timerIcon} alt="Timer Icon" className="icon" />
        <span>{currentTime}</span>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
