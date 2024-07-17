import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '../../../../assets/images/search.svg';
import '../../../../assets/styles/Admin/Modules/VideoModule/VideoSolutionModule.css';
import { memo } from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-box">
      <img src={SearchIcon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Deneme sınavı ara"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default memo(SearchBar);
