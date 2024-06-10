// src/components/Logo.js
import React from 'react';
import logoImage from '../assets/images/logo.svg';

function Logo() {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" className="logo-image" />
    </div>
  );
}

export default Logo;
