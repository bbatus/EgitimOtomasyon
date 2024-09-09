import React from 'react';
import '../../../../../assets/styles/Student/StudentTeacherSearchBar.css'; // CSS referansı

const StudentTeacherSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="teacher-search-bar">
      <input
        type="text"
        placeholder="Öğretmen adı ile ara"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default StudentTeacherSearchBar;
