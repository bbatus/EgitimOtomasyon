import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationDialog from '../../../../components/NotificationDialog';
import '../../../../assets/styles/Admin/Modules/AttendanceModule/AttendanceModule.css';

const AbsentStudents = ({ absentStudents: initialAbsentStudents }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [absentStudents, setAbsentStudents] = useState(location.state?.absentStudents || initialAbsentStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const studentsPerPage = 7;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = absentStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(absentStudents.length / studentsPerPage);

  const handleSendNotification = () => {
    setNotification({ message: 'Bildirim gönderildi!', type: 'success' });
    setTimeout(() => navigate('/dashboard/attendance'), 1500);
  };

  const handleRemoveStudent = (id) => {
    const updatedAbsentStudents = absentStudents.filter(student => student.id !== id);
    setAbsentStudents(updatedAbsentStudents); // State güncellemesi
    setNotification({ message: 'Öğrenci başarıyla silindi.', type: 'success' });
    navigate('/dashboard/absent-students', { state: { absentStudents: updatedAbsentStudents } });
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="attendance-container">
      <h1>Yok Yazılan Öğrenciler</h1>
      <button className="back-button" onClick={() => navigate('/dashboard/attendance')}>Geri Dön</button>
      <button className="send-notification-button" onClick={handleSendNotification}>
        Bildirim Gönder
      </button>
      <div className="absent-students-list">
        {currentStudents.length > 0 ? (
          currentStudents.map((student) => (
            <div key={student.id} className="absent-student-item">
              <span>{student.name} - {student.classroom} - {student.lesson}</span>
              <button className="remove-button" onClick={() => handleRemoveStudent(student.id)}>Sil</button>
            </div>
          ))
        ) : (
          <p>Hiç yok yazılan öğrenci yok.</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={`page-${index}`}
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {notification.message && (
        <NotificationDialog
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

export default AbsentStudents;
