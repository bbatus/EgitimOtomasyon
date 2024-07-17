import React, { useState } from 'react';
import RegistrationSearchBar from './RegistrationSearchBar';
import EditIcon from '../../../../../assets/images/idIcon.svg';
import FilterIcon from '../../../../../assets/images/filter.svg';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/RegistrationModule.css';

const StudentRegistration = ({ addStudent, editStudent, students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const studentsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddClick = () => {
    setShowAddOptions(!showAddOptions);
  };

  const handleClassroomFilterChange = (e) => {
    setSelectedClassroom(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClassroom ? student.classroom === selectedClassroom : true)
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
          <div className="header-buttons">
            <button className="module-button" onClick={handleAddClick}>Öğrenci Ekle</button>
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
        </div>
        {showAddOptions && (
          <div className="add-options">
            <button className="module-button" onClick={() => window.location.href = '/dashboard/registration/student/excel'}>Excel</button>
            <button className="module-button" onClick={() => window.location.href = '/dashboard/registration/student/add'}>Manuel</button>
          </div>
        )}
        <div className="search-container">
          <RegistrationSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="student-list">
          {currentStudents.map((student) => (
            <div key={student.id} className="student-item">
              <span>{student.name}</span>
              <button className="edit-button" onClick={() => editStudent(student)}>
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
