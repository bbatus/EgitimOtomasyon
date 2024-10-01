import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import tcIcon from '../../assets/images/idIcon.svg';
import passwordIcon from '../../assets/images/lockIcon.svg';
import warningIcon from '../../assets/images/delete.svg';
import { validateTc } from '../../helpers/validation';
import NotificationDialog from '../../components/NotificationDialog';
import '../../assets/styles/NotificationDialog.css';

const TeacherLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [tc, setTc] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const tcRef = useRef(null);
  const navigate = useNavigate();

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  const handleTcChange = useCallback((e) => {
    const value = e.target.value;
    setTc(value);
    if (value.length === 11) {
      const error = validateTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: error }));
    } else if (value.startsWith('0')) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        tc: 'TC Kimlik No 0 ile başlamamalıdır',
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: '' }));
    }
  }, []);

  const handleTcBlur = useCallback(() => {
    const error = validateTc(tc);
    setFormErrors((prevErrors) => ({ ...prevErrors, tc: error }));
  }, [tc]);

  const handleTcKeyPress = useCallback((e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = { tc: validateTc(tc) };
      setFormErrors(errors);

      if (!errors.tc && password) {
        setNotification({ message: 'Giriş başarılı!', type: 'success' });
        setTimeout(() => {
          navigate('/teacher/dashboard', { replace: true });
        }, 1500);
      } else {
        if (errors.tc) {
          setNotification({ message: errors.tc, type: 'error' });
          tcRef.current.focus();
        } else if (!password) {
          setNotification({ message: 'Şifre zorunludur', type: 'error' });
        }
      }
    },
    [tc, password, navigate]
  );

  return (
    <>
      <h3>Giriş Yap</h3>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="input-container">
          <div className="input-with-icon">
            <img src={tcIcon} alt="TC" className="input-icon" />
            <input
              type="text"
              placeholder="TC Kimlik No"
              value={tc}
              onChange={handleTcChange}
              onBlur={handleTcBlur}
              onKeyPress={handleTcKeyPress}
              maxLength={11}
              ref={tcRef}
            />
          </div>
          {formErrors.tc && (
            <p className="error-message">
              <img src={warningIcon} alt="Warning" className="warning-icon" />
              {formErrors.tc}
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
            />
          </div>
          {formErrors.password && (
            <p className="error-message">
              <img src={warningIcon} alt="Warning" className="warning-icon" />
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

TeacherLoginPanel.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default React.memo(TeacherLoginPanel);
