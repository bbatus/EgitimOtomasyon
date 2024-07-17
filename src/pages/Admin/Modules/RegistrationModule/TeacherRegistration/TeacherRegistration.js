import React, { useState } from 'react';
import RegistrationSearchBarTeacher from './RegistrationSearchBarTeacher';
import EditIcon from '../../../../../assets/images/idIcon.svg';
import FilterIcon from '../../../../../assets/images/filter.svg';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/RegistrationModule.css';
import { useNavigate } from 'react-router-dom';

const TeacherRegistration = ({ addTeacher, editTeacher, teachers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search Term:", e.target.value); // Debug log eklendi
  };

  const handleDepartmentFilterChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const teacherName = teacher.name ? teacher.name.toLowerCase() : '';
    const teacherTc = teacher.tc ? teacher.tc : '';
    return (teacherName.includes(searchTerm.toLowerCase()) ||
      teacherTc.includes(searchTerm)) &&
    (selectedDepartment ? teacher.department === selectedDepartment : true);
  });

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddTeacher = () => {
    navigate('/dashboard/registration/teacher/add');
  };

  const handleEditTeacher = (teacher) => {
    navigate('/dashboard/registration/teacher/edit', { state: { teacher } });
  };

  return (
    <div className="registration-module-container">
      <h1>Kayıt Modülü</h1>
      <div className="teacher-registration-container">
        <div className="teacher-header">
          <h2>Öğretmenler</h2>
          <div className="header-buttons">
            <button className="module-button" onClick={handleAddTeacher}>Öğretmen Ekle</button>
            <div className="filter-container">
              <select className="filter-select" value={selectedDepartment} onChange={handleDepartmentFilterChange}>
                <option value="">Tüm Bölümler</option>
                {['Matematik', 'Fen Bilimleri', 'Türkçe', 'Sosyal Bilgiler', 'İngilizce'].map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <img src={FilterIcon} alt="Filter" className="filter-icon" />
            </div>
          </div>
        </div>
        <div className="search-container">
          <RegistrationSearchBarTeacher searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="teacher-list">
          {currentTeachers.map((teacher) => (
            <div key={teacher.id} className="teacher-item">
              <span>{teacher.name}</span>
              <button className="edit-button" onClick={() => handleEditTeacher(teacher)}>
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

export default TeacherRegistration;
