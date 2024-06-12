import React, { useState, useRef } from 'react';
import tcIcon from '../../assets/images/idIcon.svg';
import passwordIcon from '../../assets/images/lockIcon.svg';
import { validateTc } from '../../helpers/validation';

const TeacherLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [tc, setTc] = useState('');
  const [password, setPassword] = useState('');

  const tcRef = useRef(null);

  const handleTcChange = (e) => {
    const value = e.target.value;
    setTc(value);
    if (value.length === 11) {
      const error = validateTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: error }));
    } else if (value.startsWith('0')) {
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: 'TC Kimlik No 0 ile başlamamalıdır' }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: '' }));
    }
  };

  const handleTcBlur = () => {
    const error = validateTc(tc);
    setFormErrors((prevErrors) => ({ ...prevErrors, tc: error }));
  };

  const handleTcKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = { tc: validateTc(tc) };
    setFormErrors(errors);

    if (!errors.tc) {
      // Form submission logic
    } else {
      tcRef.current.focus();
    }

    if (!password) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: 'Şifre zorunludur' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

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
              <span role="img" aria-label="warning">⚠️</span>
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

export default TeacherLoginPanel;
