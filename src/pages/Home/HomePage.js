import React, { useState } from 'react';
import '../../assets/styles/HomePage.css';
import schoolImage from '../../assets/images/school.svg';
import adminIcon from '../../assets/images/admin.svg';
import teacherIcon from '../../assets/images/teacher.svg';
import studentIcon from '../../assets/images/student.svg';
import parentIcon from '../../assets/images/admin.svg';
import AdminLoginPanel from './AdminLoginPanel';
import TeacherLoginPanel from './TeacherLoginPanel';
import StudentLoginPanel from './StudentLoginPanel';
import ParentLoginPanel from './ParentLoginPanel';

function HomePage() {
  const [loginType, setLoginType] = useState('');

  const handleButtonClick = (type) => {
    setLoginType(type);
  };

  const handleBackClick = () => {
    setLoginType('');
  };

  const renderLoginPanel = () => {
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
        {!loginType ? renderButtons() : renderLoginPanel()}
      </div>
    </div>
  );
}

export default HomePage;
