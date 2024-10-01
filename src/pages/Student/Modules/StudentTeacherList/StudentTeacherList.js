import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../assets/styles/Student/Modules/StudentTeacherList/StudentTeacherList.css';

const StudentTeacherList = ({ teachers = [] }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5; // Sayfa başına gösterilecek öğretmen sayısı

  // Bölüm filtresi değiştiğinde sayfa numarasını sıfırla
  const handleDepartmentFilterChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  };

  // Öğretmenlerin filtrelenmiş listesi
  const filteredTeachers = teachers.filter((teacher) =>
    selectedDepartment ? teacher.department === selectedDepartment : true
  );

  // Sayfa başına öğretmenleri göster
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  // Sayfa değişim fonksiyonu
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="teacher-list-container">
      <h1>Öğretmen Listesi</h1>
      <div className="filter-container">
        <select className="filter-select" value={selectedDepartment} onChange={handleDepartmentFilterChange}>
          <option value="">Tüm Bölümler</option>
          {['Matematik', 'Fen Bilimleri', 'Türkçe', 'Sosyal Bilgiler', 'İngilizce'].map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="teacher-list">
        {currentTeachers.length > 0 ? (
          currentTeachers.map((teacher) => (
            <div key={teacher.id} className="teacher-item">
              <span>{teacher.name} / {teacher.department}</span>
            </div>
          ))
        ) : (
          <p className="no-teacher-message">Öğretmen bulunamadı.</p> // Boş mesaj için className eklendi
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Önceki
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

StudentTeacherList.propTypes = {
  teachers: PropTypes.array.isRequired,
};

export default StudentTeacherList;
