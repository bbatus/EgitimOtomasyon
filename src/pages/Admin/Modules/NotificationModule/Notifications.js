import React, { useState, useCallback, useEffect } from 'react';
import '../../../../assets/styles/Admin/Modules/NotificationModule/Notifications.css';
import NoNotificationImage from '../../../../assets/images/no notification.svg';

const Notifications = () => {
  const [isSending, setIsSending] = useState(false);
  const [from, setFrom] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleSendNotificationClick = useCallback(() => {
    setIsSending(true);
  }, []);

  const handleBackClick = useCallback(() => {
    setIsSending(false);
    setFrom('');
    setTitle('');
    setMessage('');
    setRole('');
  }, []);

  const handleFromChange = useCallback((e) => {
    setFrom(e.target.value);
  }, []);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!from || !title || !message || !role) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const newNotification = {
      id: Date.now(),
      from,
      title,
      message,
      role,
      date: new Date().toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    };
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    handleBackClick();
  }, [from, title, message, role, handleBackClick]);

  return (
    <div className="notification-container">
      {isSending ? (
        <div className="textbox-container">
          <div className="top-controls">
            <button className="back-button" onClick={handleBackClick}>
              Geri
            </button>
            <select className="dropdown" value={role} onChange={handleRoleChange}>
              <option value="">Rol seçin</option>
              <option value="Öğrenci">Öğrenci</option>
              <option value="Öğretmen">Öğretmen</option>
              <option value="Veli">Veli</option>
            </select>
            <button className="submit-button" onClick={handleSubmit}>
              Gönder
            </button>
          </div>
          <input
            type="text"
            className="input-field"
            value={from}
            onChange={handleFromChange}
            placeholder="Kimden..."
          />
          <input
            type="text"
            className="input-field"
            value={title}
            onChange={handleTitleChange}
            placeholder="Duyuru Başlığı..."
          />
          <textarea
            className="textbox"
            value={message}
            onChange={handleMessageChange}
            placeholder="Duyuru İçeriği..."
          ></textarea>
        </div>
      ) : (
        <>
          <button className="send-notification-button" onClick={handleSendNotificationClick}>
            Bildirim Gönder
          </button>
          {notifications.length === 0 ? (
            <>
              <p className="notification-message">Henüz hiçbir bildirim yok. Bildirim geldiği zaman size haber vereceğiz.</p>
              <img className="notification-image" src={NoNotificationImage} alt="No Notifications" /> 
            </>
          ) : (
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li key={notif.id} className="notification-item">
                  <div className="notification-content">
                    <strong>{notif.from}</strong><br />
                    <strong>{notif.title}</strong>
                    <p className="notification-preview">{notif.message.substring(0, 30)}...</p>
                  </div>
                  <div className="notification-right">
                    <div className="notification-date">{notif.date}</div>
                    <button className="expand-button" onClick={() => alert(notif.message)}>Oku</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
