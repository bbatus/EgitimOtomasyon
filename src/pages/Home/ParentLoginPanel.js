import React, { useState, useCallback } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import phoneIcon from '../../assets/images/phoneIcon.svg';
import warningIcon from '../../assets/images/delete.svg';
import NotificationDialog from '../../components/NotificationDialog';
import '../../assets/styles/NotificationDialog.css';

const ParentLoginPanel = ({ handleBackClick }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  const handlePhoneNumberChange = useCallback((value) => {
    if (value && value.length <= 16) {
      setPhoneNumber(value);
      setValue('phoneNumber', value, { shouldValidate: true });
    }
  }, [setValue]);

  const onSubmit = useCallback((data) => {
    setNotification({ message: 'Giriş başarılı!', type: 'success' });
  }, []);

  return (
    <>
      <h3>Giriş Yap</h3>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <div className="input-with-icon">
            <img src={phoneIcon} alt="Phone" className="input-icon" />
            <PhoneInput
              placeholder="Telefon numaranızı girin"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              defaultCountry="TR"
              {...register('phoneNumber', {
                required: 'Telefon numarası zorunludur',
                validate: value => value.length >= 13 || 'Geçerli bir telefon numarası girin'
              })}
            />
          </div>
          {errors.phoneNumber && (
            <p className="error-message">
              <img src={warningIcon} alt="Warning" className="warning-icon" />
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="remember-me">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe" style={{ marginLeft: '8px' }}>Beni Hatırla</label>
        </div>
        <button type="submit" className="submit-button">Giriş Yap</button>
      </form>
      <button className="back-button" onClick={handleBackClick}>
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

ParentLoginPanel.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default React.memo(ParentLoginPanel);
