import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import tcIcon from '../../assets/images/idIcon.svg';
import warningIcon from '../../assets/images/delete.svg';
import { validateTc } from '../../helpers/validation';

const StudentLoginPanel = ({ handleBackClick }) => {
  const [formErrors, setFormErrors] = useState({});
  const [tc, setTc] = useState('');

  const tcRef = useRef(null);
  const navigate = useNavigate();

  const handleTcChange = useCallback((e) => {
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

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    const errors = { tc: validateTc(tc) };
    setFormErrors(errors);

    if (!errors.tc) {
      localStorage.setItem('tc', tc);
      navigate('/student/dashboard', { replace: true });
    } else {
      tcRef.current.focus();
    }
  }, [tc, navigate]);

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
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
              {formErrors.tc}
            </p>
          )}
        </div>
        <label className="remember-me">
          <input type="checkbox" style={{ marginRight: '8px' }} />
          Beni Hatırla
        </label>
        <button type="submit" className="submit-button">Giriş Yap</button>
      </form>
      <button className="back-button" onClick={handleBackClick}>
        Seçim ekranına geri dön
      </button>
    </>
  );
};

StudentLoginPanel.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default React.memo(StudentLoginPanel);
