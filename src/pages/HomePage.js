import React, { useState } from 'react';
import '../assets/styles/HomePage.css';
import schoolImage from '../assets/images/school.svg';
import adminIcon from '../assets/images/admin.svg';
import teacherIcon from '../assets/images/teacher.svg';
import studentIcon from '../assets/images/student.svg';
import parentIcon from '../assets/images/admin.svg';
import usernameIcon from '../assets/images/personIcon.svg';
import passwordIcon from '../assets/images/lockIcon.svg';
import tcIcon from '../assets/images/personIcon.svg';
import phoneIcon from '../assets/images/personIcon.svg';

function HomePage() {
  const [loginType, setLoginType] = useState('');

  const handleButtonClick = (type) => {
    setLoginType(type);
  };

  const handleBackClick = () => {
    setLoginType('');
  };

  const renderLoginForm = () => {
    const isAdmin = loginType === 'admin';
    const isTeacher = loginType === 'teacher';
    const isStudent = loginType === 'student';
    const isParent = loginType === 'parent';

    return (
      <>
        <h3>Giriş Yap</h3>
        <form className="login-form">
          {isAdmin && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={usernameIcon} alt="Username" className="input-icon" />
                <input type="text" placeholder="Kullanıcı Adı" />
              </div>
            </div>
          )}
          {(isTeacher || isStudent) && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={tcIcon} alt="TC" className="input-icon" />
                <input type="text" placeholder="TC Kimlik No" />
              </div>
            </div>
          )}
          {!isStudent && !isParent && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={passwordIcon} alt="Password" className="input-icon" />
                <input type="password" placeholder="Şifre" />
              </div>
            </div>
          )}
          {isParent && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={phoneIcon} alt="Phone" className="input-icon" />
                <input type="text" placeholder="Telefon No" />
              </div>
            </div>
          )}
          <label className="remember-me">
            <input type="checkbox" />
            Beni Hatırla
          </label>
          <button type="submit" className="submit-button">Giriş Yap</button>
        </form>
        <p className="back-button" onClick={handleBackClick}>Seçim ekranına geri dön</p>
      </>
    );
  };

  const renderButtons = () => (
    <div className="button-container">
      <button className="login-button" onClick={() => handleButtonClick('admin')}>
        <img src={adminIcon} alt="Admin" />
        Yönetici Girişi
      </button>
      <button className="login-button" onClick={() => handleButtonClick('teacher')}>
        <img src={teacherIcon} alt="Teacher" />
        Öğretmen Girişi
      </button>
      <button className="login-button" onClick={() => handleButtonClick('student')}>
        <img src={studentIcon} alt="Student" />
        Öğrenci Girişi
      </button>
      <button className="login-button" onClick={() => handleButtonClick('parent')}>
        <img src={parentIcon} alt="Parent" />
        Veli Girişi
      </button>
    </div>
  );

  return (
    <div className="homepage">
      <div className="image-container">
        <img src={schoolImage} alt="School" />
      </div>
      <div className="login-panel">
        <h2>Hoş Geldiniz</h2>
        {!loginType ? renderButtons() : renderLoginForm()}
      </div>
    </div>
  );
}

export default HomePage;
