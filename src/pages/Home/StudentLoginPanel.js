import React, { useState, useRef } from 'react';
import tcIcon from '../../assets/images/personIcon.svg';
import { validateTc } from '../../helpers/validation';

const StudentLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [tc, setTc] = useState('');

  const tcRef = useRef(null);

  const handleTcChange = (e) => {
    const value = e.target.value;
    setTc(value);
    if (value.startsWith('0')) {
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: 'TC Kimlik No 0 ile başlamamalıdır' }));
    } else if (value.length === 11) {
      const error = validateTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: error }));
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  };

  return (
    <>
      <h3>Giriş Yap</h3>
      <form className="login-form" onSubmit={handleFormSubmit} onKeyPress={handleKeyPress}>
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
          {formErrors.tc && <p className="error-message">{formErrors.tc}</p>}
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

export default StudentLoginPanel;
