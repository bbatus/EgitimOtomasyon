import React, { useState, useRef } from 'react';
import phoneIcon from '../../assets/images/personIcon.svg';
import { validatePhone } from '../../helpers/validation';

const ParentLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [phone, setPhone] = useState('+90 ');
  const phoneRef = useRef(null);

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, ''); // Sadece rakamları al

    if (value.length === 0) {
      return '+90 ';
    }

    if (value.startsWith('90')) {
      value = value.slice(2);
    }

    if (value.length > 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    if (value.length > 6) {
      value = `${value.slice(0, 6)} ${value.slice(6)}`;
    }
    if (value.length > 9) {
      value = `${value.slice(0, 6)} ${value.slice(6, 9)} ${value.slice(9)}`;
    }
    if (value.length > 11) {
      value = value.slice(0, 14);
    }

    return `+90 ${value}`;
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = formatPhoneNumber(value);
    setPhone(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = { phone: validatePhone(phone) };
    setFormErrors(errors);

    if (!errors.phone) {
      // Form submission logic
    } else {
      phoneRef.current.focus();
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
            <img src={phoneIcon} alt="Phone" className="input-icon" />
            <input
              type="text"
              placeholder="+90 (___) ___ ____"
              value={phone}
              onChange={handlePhoneChange}
              ref={phoneRef}
            />
          </div>
          {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
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

export default ParentLoginPanel;
