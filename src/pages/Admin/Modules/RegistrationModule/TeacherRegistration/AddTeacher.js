import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/TeacherRegistration/AddTeacher.css';
import warningIcon from '../../../../../assets/images/delete.svg';

const AddTeacher = ({ addTeacher, updateTeacher }) => {
  const [formValues, setFormValues] = useState({ name: '', tc: '', department: '' });
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const teacherToEdit = location.state?.teacher;

  const nameRef = useRef(null);
  const tcRef = useRef(null);

  useEffect(() => {
    if (teacherToEdit) {
      setFormValues({ name: teacherToEdit.name, tc: teacherToEdit.tc, department: teacherToEdit.department });
    }
  }, [teacherToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === 'name') {
      if (value.length > 50) {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: 'Ad Soyad 50 karakterden fazla olamaz' }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    if (name === 'tc') {
      const isValidTc = /^\d{11}$/.test(value) && value[0] !== '0';
      if (!isValidTc && value.length > 0) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır',
        }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.name) {
      errors.name = 'Ad Soyad boş olamaz';
    } else if (formValues.name.length > 50) {
      errors.name = 'Ad Soyad 50 karakterden fazla olamaz';
    } else {
      errors.name = '';
    }

    if (!formValues.tc) {
      errors.tc = 'TC Kimlik No boş olamaz';
    } else if (!/^\d{11}$/.test(formValues.tc) || formValues.tc[0] === '0') {
      errors.tc = 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır';
    } else {
      errors.tc = '';
    }

    errors.department = formValues.department ? '' : 'Lütfen bir bölüm seçiniz';

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (teacherToEdit) {
        updateTeacher({ ...teacherToEdit, ...formValues });
        setNotification({ message: 'Öğretmen başarıyla güncellendi!', type: 'success' });
      } else {
        addTeacher(formValues);
        setNotification({ message: 'Öğretmen başarıyla kaydedildi!', type: 'success' });
      }
      setTimeout(() => {
        navigate('/dashboard/registration/teacher');
      }, 1500);
    } else {
      if (formErrors.name) {
        nameRef.current.focus();
        setNotification({ message: formErrors.name, type: 'error' });
      } else if (formErrors.tc) {
        tcRef.current.focus();
        setNotification({ message: formErrors.tc, type: 'error' });
      }
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard/registration/teacher');
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="add-teacher-container">
      <h2>Öğretmen {teacherToEdit ? 'Düzenle' : 'Ekle'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ad Soyad</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Ad Soyad"
            className="input-field"
            ref={nameRef}
          />
          {formErrors.name && (
            <p className="error-message">
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
              {formErrors.name}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="tc">TC Kimlik No</label>
          <input
            type="text"
            id="tc"
            name="tc"
            value={formValues.tc}
            onChange={handleChange}
            placeholder="TC Kimlik No"
            className="input-field"
            ref={tcRef}
          />
          {formErrors.tc && (
            <p className="error-message">
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
              {formErrors.tc}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="department">Bölüm</label>
          <select
            id="department"
            name="department"
            value={formValues.department}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Bölüm Seçin</option>
            {['Matematik', 'Fen Bilimleri', 'Türkçe', 'Sosyal Bilgiler', 'İngilizce'].map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {formErrors.department && (
            <p className="error-message">
              <img src={warningIcon} alt="Uyarı" className="warning-icon" />
              {formErrors.department}
            </p>
          )}
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Kaydet</button>
          <button type="button" className="back-button" onClick={handleBackClick}>Geri Dön</button>
        </div>
      </form>
      {notification.message && (
        <NotificationDialog
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

AddTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
  updateTeacher: PropTypes.func.isRequired,
};

export default AddTeacher;
