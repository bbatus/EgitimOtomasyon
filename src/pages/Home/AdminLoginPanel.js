import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import usernameIcon from '../../assets/images/personIcon.svg';
import passwordIcon from '../../assets/images/lockIcon.svg';
import warningIcon from '../../assets/images/delete.svg';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase()) ? '' : 'Geçersiz email formatı';
};

const AdminLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setEmail(value);
      const error = validateEmail(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, email: error }));
    } else {
      const error = 'Email 50 haneden fazla olamaz';
      setFormErrors((prevErrors) => ({ ...prevErrors, email: error }));
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

      console.log('Form gönderildi, işlem başlatılıyor...');

      const errors = {
        email: validateEmail(email),
        password: password ? '' : 'Şifre alanı boş olamaz',
      };
      setFormErrors(errors);

      if (!errors.email && !errors.password) {
        console.log('Email ve şifre validasyonu başarılı, API isteği yapılıyor...');

        try {
          const response = await axios.post('http://localhost:3000/auth/login', {
            email,
            password,
          });

          console.log('Giriş başarılı:', response.data);
          console.log('Tam yanıt:', response);

          localStorage.setItem('access_token', response.data.data.access_token);

          navigate('/dashboard');
        } catch (error) {
          if (error.response) {
            console.error('API Hatası:', error.response.data.message);
            console.error('Tam hata yanıtı:', error.response);
            alert('Giriş başarısız: ' + error.response.data.message);
          } else if (error.request) {
            console.error('Sunucudan yanıt alınamadı:', error.request);
          } else {
            console.error('İstek yapılamadı:', error.message);
          }
        }
      } else {
        console.log('Validasyon başarısız, hatalar:', errors);

        if (errors.email) {
          emailRef.current.focus();
        } else if (errors.password) {
          passwordRef.current.focus();
        }
      }
    },
    [email, password, navigate]
  );

  return (
    <>
      <h3>Giriş Yap</h3>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="input-container">
          <div className="input-with-icon">
            <img src={usernameIcon} alt="Email" className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              ref={emailRef}
            />
          </div>
          {formErrors.email && (
            <p className="error-message">
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
              {formErrors.email}
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
