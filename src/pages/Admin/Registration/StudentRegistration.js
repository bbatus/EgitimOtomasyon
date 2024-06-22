import React, { useState } from 'react';
import RegistrationSearchBar from './RegistrationSearchBar';
import EditIcon from '../../../assets/images/idIcon.svg';
import '../../../assets/styles/Admin/RegistrationModule.css';

const students = [
  { id: 1, name: 'Örnek Öğrenci 1' },
  { id: 2, name: 'Örnek Öğrenci 2' },
  { id: 3, name: 'Örnek Öğrenci 3' },
  { id: 4, name: 'Örnek Öğrenci 4' },
  { id: 5, name: 'Örnek Öğrenci 5' },
  { id: 6, name: 'Örnek Öğrenci 6' },
];

const StudentRegistration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddClick = () => {
    setShowAddOptions(!showAddOptions);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="registration-module-container">
      <h1>Kayıt Modülü</h1>
      <div className="student-registration-container">
        <div className="student-header">
          <h2>Öğrenciler</h2>
          <button className="module-button" onClick={handleAddClick}>Öğrenci Ekle</button>
        </div>
        {showAddOptions && (
          <div className="add-options">
            <button className="module-button">Excel</button>
            <button className="module-button">Manuel</button>
          </div>
        )}
        <div className="search-container">
          <RegistrationSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="student-list">
          {currentStudents.map((student) => (
            <div key={student.id} className="student-item">
              <span>{student.name}</span>
              <button className="edit-button">
                <img src={EditIcon} alt="Edit" />
              </button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Önceki</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Sonraki</button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
