import React, { useState, useCallback } from 'react';
import '../../../../assets/styles/Admin/Modules/NotificationModule/Notifications.css';
import NoNotificationImage from '../../../../assets/images/no notification.svg';

const Notifications = () => {
  const [isSending, setIsSending] = useState(false);
  const [from, setFrom] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [classSelection, setClassSelection] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSendNotificationClick = useCallback(() => {
    setIsSending(true);
  }, []);

  const handleBackClick = useCallback(() => {
    setIsSending(false);
    setFrom('');
    setTitle('');
    setMessage('');
    setRole('');
    setClassSelection('');
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

  const handleClassSelectionChange = useCallback((e) => {
    setClassSelection(e.target.value);
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
      classSelection,
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
  }, [from, title, message, role, classSelection, handleBackClick]);

  const renderClassOptions = () => {
    if (role === 'Öğrenci') {
      return (
        <select className="dropdown" value={classSelection} onChange={handleClassSelectionChange}>
          <option value="">Sınıf Seçin</option>
          <option value="9-A">9-A</option>
          <option value="9-B">9-B</option>
          <option value="9-C">9-C</option>
          <option value="9-D">9-D</option>
          <option value="9-E">9-E</option>
          <option value="10-A">10-A</option>
          <option value="10-B">10-B</option>
          <option value="10-C">10-C</option>
          <option value="10-D">10-D</option>
          <option value="10-E">10-E</option>
          <option value="11-A">11-A</option>
          <option value="11-B">11-B</option>
          <option value="11-C">11-C</option>
          <option value="11-D">11-D</option>
          <option value="11-E">11-E</option>
          <option value="12-A">12-A</option>
          <option value="12-B">12-B</option>
          <option value="12-C">12-C</option>
          <option value="12-D">12-D</option>
          <option value="12-E">12-E</option>
        </select>
      );
    } else if (role === 'Veli') {
      return (
        <select className="dropdown" value={classSelection} onChange={handleClassSelectionChange}>
          <option value="">Sınıf Grubu Seçin</option>
          <option value="9. Sınıf Velileri">9. Sınıf Velileri</option>
          <option value="10. Sınıf Velileri">10. Sınıf Velileri</option>
          <option value="11. Sınıf Velileri">11. Sınıf Velileri</option>
          <option value="12. Sınıf Velileri">12. Sınıf Velileri</option>
        </select>
      );
    }
    return null;
  };

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
            {renderClassOptions()}
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
              <p className="notification-message">
                Henüz hiçbir bildirim yok. Bildirim geldiği zaman size haber vereceğiz.
              </p>
              <img
                className="notification-image"
                src={NoNotificationImage}
                alt="No Notifications"
              />
            </>
          ) : (
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li key={notif.id} className="notification-item">
                  <div className="notification-content">
                    <strong>{notif.from}</strong>
                    <br />
                    <strong>{notif.title}</strong>
                    <p className="notification-preview">{notif.message.substring(0, 30)}...</p>
                  </div>
                  <div className="notification-right">
                    <div className="notification-date">{notif.date}</div>
                    <button
                      className="expand-button"
                      onClick={() => alert(notif.message)}
                    >
                      Oku
                    </button>
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
