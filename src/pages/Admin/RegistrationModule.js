import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Admin/RegistrationModule.css';

const RegistrationModule = () => {
  const navigate = useNavigate();

  return (
    <div className="registration-module-container">
      <h1>Kayıt Modülü</h1>
      <div className="button-container">
        <button className="module-button" onClick={() => navigate('/dashboard/registration/student')}>Öğrenci Ekle</button>
        <button className="module-button" onClick={() => navigate('/dashboard/registration/teacher')}>Öğretmen Ekle</button>
        <button className="module-button" onClick={() => navigate('/dashboard/registration/course')}>Ders Ekle</button>
        <button className="module-button" onClick={() => alert('TestButton')}>TestButton</button>
      </div>
    </div>
  );
};

export default RegistrationModule;
