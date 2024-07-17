import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/RegistrationSearchBar.css';

const RegistrationSearchBarTeacher = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="registration-search-box">
      <input
        type="text"
        placeholder="Öğretmen adı veya TC kimlik no ile ara"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

RegistrationSearchBarTeacher.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default React.memo(RegistrationSearchBarTeacher);
