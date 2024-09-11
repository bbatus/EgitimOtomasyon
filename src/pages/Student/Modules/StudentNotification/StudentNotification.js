import React, { useState, useEffect } from 'react';
import NoNotificationImage from '../../../../assets/images/no notification.svg'; // Admin'deki yoksa gösterilen resim
import '../../../../assets/styles/Student/Modules/StudentNotification/StudentNotification.css';

const StudentNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 3; // Bir sayfada gösterilecek bildirim sayısı

  useEffect(() => {
    // Bildirimler burada API ya da localStorage ile alınabilir
    const sampleNotifications = [
      {
        id: 1,
        from: 'Admin',
        title: 'Sınav Tarihleri',
        message: '9. sınıf sınav tarihleri açıklanmıştır.',
        date: '2024-09-05 10:00',
      },
      {
        id: 2,
        from: 'Admin',
        title: 'Etkinlik Duyurusu',
        message: 'Okul gezisi etkinliği için kayıtlar açılmıştır.',
        date: '2024-09-06 15:00',
      },
      {
        id: 3,
        from: 'Admin',
        title: 'Ders Programı',
        message: 'Yeni dönem ders programı açıklandı.',
        date: '2024-09-07 12:00',
      },
      {
        id: 4,
        from: 'Admin',
        title: 'Sosyal Etkinlikler',
        message: 'Okul içi sosyal etkinlikler başlıyor.',
        date: '2024-09-08 09:00',
      },
      {
        id: 5,
        from: 'Admin',
        title: 'Kütüphane Duyurusu',
        message: 'Yeni kütüphane saatleri belirlendi.',
        date: '2024-09-09 15:00',
      },
      {
        id: 6,
        from: 'Admin',
        title: 'Burs Sonuçları',
        message: '2024 yılı burs sonuçları açıklandı.',
        date: '2024-09-10 14:00',
      }
    ];
    setNotifications(sampleNotifications); // Burada gerçek bildirim verileri olmalı
  }, []);

  // Bildirimlerin o anki sayfa için dilimlenmesi
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

  // Sayfa numaralarının hesaplanması
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Sayfa değiştirme fonksiyonları
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="notification-container">
      <h1>Bildirimler</h1>
      {notifications.length === 0 ? (
        <>
          <p className="notification-message">Henüz bir bildirim yok.</p>
          <img className="notification-image" src={NoNotificationImage} alt="No Notifications" />
        </>
      ) : (
        <>
          <ul className="notification-list">
            {currentNotifications.map((notif) => (
              <li key={notif.id} className="notification-item">
                <div className="notification-content">
                  <strong>{notif.from}</strong> - <strong>{notif.title}</strong>
                  <p>{notif.message}</p>
                  <span>{notif.date}</span>
                  <button
                    className="expand-button"
                    onClick={() => alert(notif.message)} // Bildirimi okuma butonu
                  >
                    Oku
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={() => paginate(currentPage - 1)}>Önceki</button>
            )}
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={number === currentPage ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => paginate(currentPage + 1)}>Sonraki</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentNotification;
