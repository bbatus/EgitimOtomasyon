import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import usernameIcon from '../../assets/images/personIcon.svg';
import passwordIcon from '../../assets/images/lockIcon.svg';
import warningIcon from '../../assets/images/delete.svg';
import { validateUsername } from '../../helpers/validation';

const AdminLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleUsernameChange = useCallback((e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 50) {
      setUsername(value);
      const error = validateUsername(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
    } else {
      const error = 'Kullanıcı adı 50 haneden fazla olamaz';
      setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
    }
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  }, []);

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errors = {
        username: validateUsername(username),
        password: password ? '' : 'Şifre alanı boş olamaz',
      };
      setFormErrors(errors);

      if (!errors.username && !errors.password) {
        try {
          // Kullanıcı adını localStorage'a kaydediyoruz
          localStorage.setItem('username', username);

          // Doğrudan dashboard'a yönlendirme yapıyoruz
          navigate('/dashboard');
        } catch (error) {
          alert(error);
        }
      } else if (errors.username) {
        usernameRef.current.focus();
      } else if (errors.password) {
        passwordRef.current.focus();
      }
    },
    [username, password, navigate]
  );

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
              ref={usernameRef}
            />
          </div>
          {formErrors.username && (
            <p className="error-message">
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
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
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
              {formErrors.password}
            </p>
          )}
        </div>
        <label className="remember-me">
          <input type="checkbox" style={{ marginRight: '8px' }} />
          Beni Hatırla
        </label>
        <button type="submit" className="submit-button">Giriş Yap</button>
      </form>
      <button
        className="back-button"
        onClick={handleBackClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBackClick();
          }
        }}
      >
        Seçim ekranına geri dön
      </button>
    </>
  );
};

AdminLoginPanel.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default React.memo(AdminLoginPanel);
