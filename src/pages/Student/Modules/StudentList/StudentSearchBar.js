import React from 'react';
import PropTypes from 'prop-types';
import '../../../../assets/styles/Student/Modules/StudentList/StudentSearchBar.css';
import SearchIcon from '../../../../assets/images/search.svg';

const StudentSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="student-search-box">
      <img src={SearchIcon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Öğrenci adı ile ara"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

StudentSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default StudentSearchBar;
