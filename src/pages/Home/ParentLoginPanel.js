import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import phoneIcon from '../../assets/images/personIcon.svg';
import { useForm } from 'react-hook-form';

const ParentLoginPanel = ({ handleBackClick }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (value) => {
    if (value && value.length <= 16) { // Maximum length including country code
      setPhoneNumber(value);
      setValue('phoneNumber', value, { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    // Form submission logic
    console.log(data);
  };

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

export default ParentLoginPanel;