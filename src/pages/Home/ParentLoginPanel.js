import React, { useState, useCallback } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import phoneIcon from '../../assets/images/phoneIcon.svg';

const ParentLoginPanel = ({ handleBackClick }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = useCallback((value) => {
    if (value && value.length <= 16) { 
      setPhoneNumber(value);
      setValue('phoneNumber', value, { shouldValidate: true });
    }
  }, [setValue]);

  const onSubmit = useCallback((data) => {
    // Form submission logic
    console.log(data);
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
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
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

ParentLoginPanel.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default React.memo(ParentLoginPanel);
