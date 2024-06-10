import React from 'react';
import '../assets/styles/HomePage.css';
import schoolImage from '../assets/images/blue.png';

function HomePage() {
  return (
    <div className="homepage">
      <div className="image-container">
        <img src={schoolImage} alt="School" />
      </div>
      <div className="login-panel">
        <h2>Hoş Geldiniz</h2>
        <button className="login-button">Yönetici Girişi</button>
        <button className="login-button">Öğretmen Girişi</button>
        <button className="login-button">Öğrenci Girişi</button>
      </div>
    </div>
  );
}

export default HomePage;
