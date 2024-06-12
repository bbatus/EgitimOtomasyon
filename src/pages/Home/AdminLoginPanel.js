import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import usernameIcon from '../../assets/images/personIcon.svg';
import passwordIcon from '../../assets/images/lockIcon.svg';
import { validateUsername } from '../../helpers/validation';

const AdminLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 50) {
      setUsername(value);
      const error = validateUsername(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
    } else {
      const error = 'Kullanıcı adı 50 karakterden fazla olamaz';
      setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
    }
  };

  const handleUsernameKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      e.preventDefault();
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {
      username: validateUsername(username),
      password: password ? '' : 'Şifre alanı boş olamaz'
    };
    setFormErrors(errors);

    if (!errors.username && !errors.password) {
      // Giriş başarılı, dashboard'a yönlendirin
      navigate('/dashboard');
    } else {
      if (errors.username) {
        usernameRef.current.focus();
      } else if (errors.password) {
        passwordRef.current.focus();
      }
    }
  };

  return (
    <>
      <h3>Giriş Yap</h3>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="input-container">
          <div className="input-with-icon">
            <img src={usernameIcon} alt="Username" className="input-icon" />
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={handleUsernameChange}
              onKeyPress={handleUsernameKeyPress}
              ref={usernameRef}
            />
          </div>
          {formErrors.username && (
            <p className="error-message">
              <span role="img" aria-label="warning">⚠️</span>
              {formErrors.username}
            </p>
          )}
        </div>
        <div className="input-container">
          <div className="input-with-icon">
            <img src={passwordIcon} alt="Password" className="input-icon" />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={handlePasswordChange}
              ref={passwordRef}
            />
          </div>
          {formErrors.password && (
            <p className="error-message">
              <span role="img" aria-label="warning">⚠️</span>
              {formErrors.password}
            </p>
          )}
        </div>
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

export default AdminLoginPanel;
