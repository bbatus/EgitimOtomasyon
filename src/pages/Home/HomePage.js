import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/HomePage.css';
import schoolImage from '../../assets/images/school.svg';
import adminIcon from '../../assets/images/admin.svg';
import teacherIcon from '../../assets/images/teacher.svg';
import studentIcon from '../../assets/images/student.svg';
import parentIcon from '../../assets/images/parent.svg';
import AdminLoginPanel from './AdminLoginPanel';
import TeacherLoginPanel from './TeacherLoginPanel';
import StudentLoginPanel from './StudentLoginPanel';
import ParentLoginPanel from './ParentLoginPanel';
import Logo from '../../components/Logo';

const LoginButton = ({ icon, label, onClick }) => (
  <button className="login-button" onClick={onClick}>
    <img src={icon} alt={label} />
    {label}
  </button>
);

LoginButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const HomePage = () => {
  const [loginType, setLoginType] = useState('');

  const handleButtonClick = useCallback((type) => {
    setLoginType(type);
  }, []);

  const handleBackClick = useCallback(() => {
    setLoginType('');
  }, []);

  const renderLoginPanel = useCallback(() => {
    switch (loginType) {
      case 'admin':
        return <AdminLoginPanel handleBackClick={handleBackClick} />;
      case 'teacher':
        return <TeacherLoginPanel handleBackClick={handleBackClick} />;
      case 'student':
        return <StudentLoginPanel handleBackClick={handleBackClick} />;
      case 'parent':
        return <ParentLoginPanel handleBackClick={handleBackClick} />;
      default:
        return null;
    }
  }, [loginType, handleBackClick]);

  return (
    <div className="homepage">
      <Logo />
      <div className="image-container">
        <img src={schoolImage} alt="School" />
      </div>
      <div className="login-panel">
        <h2>Hoş Geldiniz</h2>
        {!loginType ? (
          <div className="button-container">
            <LoginButton icon={adminIcon} label="Yönetici Girişi" onClick={() => handleButtonClick('admin')} />
            <LoginButton icon={teacherIcon} label="Öğretmen Girişi" onClick={() => handleButtonClick('teacher')} />
            <LoginButton icon={studentIcon} label="Öğrenci Girişi" onClick={() => handleButtonClick('student')} />
            <LoginButton icon={parentIcon} label="Veli Girişi" onClick={() => handleButtonClick('parent')} />
          </div>
        ) : (
          renderLoginPanel()
        )}
      </div>
    </div>
  );
};

export default HomePage;
