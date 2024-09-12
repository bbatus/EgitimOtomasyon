import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import calendarIcon from '../assets/images/calendar.svg'; 
import timerIcon from '../assets/images/timer.svg';
import defaultUserIcon from '../assets/images/personIcon.svg';
import notificationIcon from '../assets/images/notification.svg';
import '../assets/styles/StudentHeader.css';

const StudentHeader = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const tc = localStorage.getItem('tc') || 'Misafir';
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);

    const sampleNotifications = [
      { id: 1, title: 'Sınav Tarihleri', message: '9. sınıf sınav tarihleri açıklandı.' },
      { id: 2, title: 'Okul Etkinliği', message: 'Okul gezisi kayıtları başladı.' },
      { id: 3, title: 'Yeni Duyuru', message: 'Yeni dönem ders programları açıklandı.' },
    ];

    setNotifications(sampleNotifications);

    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNotificationClick = (notificationId) => {
    navigate('/student/notifications');
    setDropdownOpen(false);
  };

  const displayedNotifications = notifications.slice(0, 3);

  return (
    <div className="header-container">
      <div className="user-info">
        <img src={defaultUserIcon} alt="User" className="user-icon" />
        <span className="user-greeting">Hoş geldiniz, {tc}</span>
      </div>
      <div className="date-time">
        <img src={calendarIcon} alt="Calendar Icon" className="icon" />
        <span>{currentDate}</span>
        <img src={timerIcon} alt="Timer Icon" className="icon" />
        <span>{currentTime}</span>
      </div>
      <div className="notifications">
        <button className="notification-button" onClick={toggleDropdown}>
          <img src={notificationIcon} alt="Notification" />
        </button>
        {dropdownOpen && (
          <ul className="notification-dropdown">
            {displayedNotifications.length === 0 ? (
              <li>Henüz bir bildirim yok</li>
            ) : (
              displayedNotifications.map((notif) => (
                <li key={notif.id} onClick={() => handleNotificationClick(notif.id)}>
                  {notif.title}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentHeader;
