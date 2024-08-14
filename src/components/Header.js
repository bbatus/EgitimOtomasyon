import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/Header.css'; // Stil dosyasını içe aktarıyoruz
import calendarIcon from '../assets/images/calendar.svg'; // Takvim ikonu
import timerIcon from '../assets/images/timer.svg'; // Zamanlayıcı ikonu
import defaultUserIcon from '../assets/images/personIcon.svg'; // Varsayılan kullanıcı ikonu

const Header = () => {
  const username = localStorage.getItem('username') || 'Misafir'; // Kullanıcı adını localStorage'dan alıyoruz
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="header-container">
      <div className="user-info">
        <img src={defaultUserIcon} alt="User" className="user-icon" />
        <span className="user-greeting">Hoş geldiniz, {username}</span>
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
