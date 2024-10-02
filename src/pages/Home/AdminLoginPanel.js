import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axiosInstance from '../../api/axiosInstance';
import { AUTH_API } from '../../api/apiEndpoints';
import usernameIcon from '../../assets/images/personIcon.svg';
import passwordIcon from '../../assets/images/lockIcon.svg';
import warningIcon from '../../assets/images/delete.svg';
import NotificationDialog from '../../components/NotificationDialog';
import '../../assets/styles/NotificationDialog.css';

// Kullanıcı adı doğrulama fonksiyonu
const validateUsername = (username) => {
  if (username.length < 3) return 'Kullanıcı adı en az 3 karakter olmalı';
  if (username.length > 50) return 'Kullanıcı adı en fazla 50 karakter olabilir';
  const alphanumericRegex = /^[a-zA-Z0-9_]+$/;
  if (!alphanumericRegex.test(username)) return 'Kullanıcı adı sadece harf, rakam ve alt çizgi (_) içerebilir';
  if (!/^[a-zA-Z0-9]/.test(username)) return 'Kullanıcı adı harf veya rakamla başlamalıdır';
  if (!/[a-zA-Z0-9]$/.test(username)) return 'Kullanıcı adı harf veya rakamla bitmelidir';
  return '';
};

const AdminLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  // Kullanıcı adı input değişimini yönetmek için kullanılan fonksiyon
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setUsername(value); // Anında state güncellemesi yapılır
      const error = validateUsername(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
    } else {
      const error = 'Kullanıcı adı 50 haneden fazla olamaz';
      setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
    }
  };

  // Şifre input değişimini yönetmek için kullanılan fonksiyon
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  // Form gönderimini işleyen fonksiyon
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      username: validateUsername(username),
      password: password ? '' : 'Şifre alanı boş olamaz',
    };
    setFormErrors(errors);

    if (!errors.username && !errors.password) {
      try {
        // axiosInstance ve AUTH_API kullanılıyor
        const response = await axiosInstance.post(AUTH_API.LOGIN, {
          username,
          password,
        });

        localStorage.setItem('access_token', response.data.data.access_token);
        setNotification({ message: 'Giriş başarılı!', type: 'success' });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (error) {
        if (error.response) {
          setNotification({ message: 'Giriş başarısız: ' + error.response.data.message, type: 'error' });
        } else if (error.request) {
          setNotification({ message: 'Sunucudan yanıt alınamadı, lütfen daha sonra tekrar deneyin.', type: 'error' });
        } else {
          setNotification({ message: 'Beklenmedik bir hata oluştu: ' + error.message, type: 'error' });
        }
      }
    } else {
      if (errors.username) {
        setNotification({ message: errors.username, type: 'error' });
        usernameRef.current.focus();
      } else if (errors.password) {
        setNotification({ message: errors.password, type: 'error' });
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
            <img src={usernameIcon} alt="Kullanıcı Adı" className="input-icon" />
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={handleUsernameChange} // Input değişimlerinde anında state güncellemesi yapılır
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
              onChange={handlePasswordChange} // Input değişimlerinde anında state güncellemesi yapılır
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

      {notification.message && (
        <NotificationDialog
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </>
  );
};

AdminLoginPanel.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default React.memo(AdminLoginPanel);
