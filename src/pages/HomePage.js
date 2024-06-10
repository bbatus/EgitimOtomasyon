import React, { useState } from 'react'; //gerekli react kütüphanesi iceri aktariyor
import '../assets/styles/HomePage.css';
import schoolImage from '../assets/images/blue.png';
import adminIcon from '../assets/images/red.png';
import teacherIcon from '../assets/images/red.png';

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

    return (
      <>
        <h3>Giriş Yap</h3>
        <form className="login-form">
          {isAdmin && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={adminIcon} alt="Username" className="input-icon" />
                <input type="text" placeholder="Kullanıcı Adı" />
              </div>
            </div>
          )}
          {(isTeacher || isStudent) && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={adminIcon} alt="TC" className="input-icon" />
                <input type="text" placeholder="TC Kimlik No" />
              </div>
            </div>
          )}
          {!isStudent && (
            <div className="input-container">
              <div className="input-with-icon">
                <img src={adminIcon} alt="Password" className="input-icon" />
                <input type="password" placeholder="Şifre" />
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
        <img src={adminIcon} alt="Teacher" />
        Öğretmen Girişi
      </button>
      <button className="login-button" onClick={() => handleButtonClick('student')}>
        <img src={adminIcon} alt="Student" />
        Öğrenci Girişi
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
