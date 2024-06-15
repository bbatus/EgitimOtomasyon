import React from 'react';
import SearchIcon from '../../assets/images/search.svg';

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

export default SearchBar;
