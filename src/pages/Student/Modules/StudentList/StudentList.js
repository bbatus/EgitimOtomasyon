import React, { useState } from 'react';
import StudentSearchBar from './StudentSearchBar';
import PropTypes from 'prop-types';
import '../../../../assets/styles/Student/Modules/StudentList/StudentList.css';
import FilterIcon from '../../../../assets/images/filter.svg'; // Filtre ikonu ekliyoruz

const StudentList = ({ students = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState(''); // Sınıf filtresi için state
  const [currentPage, setCurrentPage] = useState(1); // Sayfalama için state

  const studentsPerPage = 5; // Her sayfada gösterilecek öğrenci sayısı

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClassroomFilterChange = (e) => {
    setSelectedClassroom(e.target.value); // Sınıf filtresini günceller
  };

  // Filtreleme işlemi: Arama ve sınıf filtresini uygula
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClassroom ? student.classroom === selectedClassroom : true)
  );

  // Pagination için hesaplama
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="student-list-container">
      <h1>Öğrenci Listesi</h1>

      {/* Filtreleme ve Arama Çubuğu */}
      <div className="search-container">
        <StudentSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="filter-container">
          <select className="filter-select" value={selectedClassroom} onChange={handleClassroomFilterChange}>
            <option value="">Tüm Sınıflar</option>
            {['9-A', '9-B', '9-C', '9-D', '10-A', '10-B', '10-C', '10-D', '11-A', '11-B', '11-C', '11-D', '12-A', '12-B', '12-C', '12-D'].map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <img src={FilterIcon} alt="Filter" className="filter-icon" />
        </div>
      </div>

      {/* Öğrenci Listesi */}
      <div className="student-list">
        {currentStudents.length > 0 ? (
          currentStudents.map((student) => (
            <div key={student.id} className="student-item">
              <span>{student.name} - {student.classroom}</span>
            </div>
          ))
        ) : (
          <p>Öğrenci bulunamadı.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Önceki
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

// PropTypes ile students prop'unun dizi olduğunu kontrol ediyoruz
StudentList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default StudentList;
