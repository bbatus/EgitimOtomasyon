import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../../assets/styles/Admin/Modules/AttendanceModule/AttendanceModule.css';

const AbsentStudents = () => {
  const location = useLocation();
  const { absentStudents } = location.state || { absentStudents: [] };
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 7;

  // Sayfalama için öğrenci dilimini hesaplayın
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = absentStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Sayfa numarası değiştirici
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Toplam sayfa sayısını hesaplayın
  const totalPages = Math.ceil(absentStudents.length / studentsPerPage);

  const handleSendNotification = () => {
    alert('Bildirim gönderildi!');
    navigate('/dashboard/attendance');
  };

  const handleRemoveStudent = (id) => {
    const updatedAbsentStudents = absentStudents.filter(student => student.id !== id);
    navigate('/dashboard/absent-students', { state: { absentStudents: updatedAbsentStudents } });
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
            key={`page-${index}`} // Key değerini daha benzersiz hale getirin
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AbsentStudents;
