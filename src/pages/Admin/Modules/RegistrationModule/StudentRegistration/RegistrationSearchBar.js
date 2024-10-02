import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/RegistrationSearchBar.css';

const RegistrationSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="registration-search-box">
      <input
        type="text"
        placeholder="Öğrenci adı veya TC kimlik no ile ara"
        value={searchTerm}
        onChange={onSearchChange}
        className="registration-search-input" // Sınıf ekleyerek stilleri yönetiyoruz
      />
    </div>
  );
};

RegistrationSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default RegistrationSearchBar;
