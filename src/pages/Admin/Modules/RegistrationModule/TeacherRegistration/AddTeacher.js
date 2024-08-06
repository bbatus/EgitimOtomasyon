import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // PropTypes eklendi
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/TeacherRegistration/AddTeacher.css';
import warningIcon from '../../../../../assets/images/delete.svg'; // Warning icon import edildi

const AddTeacher = ({ addTeacher, updateTeacher }) => {
  const [formValues, setFormValues] = useState({ name: '', tc: '', department: '' });
  const [formErrors, setFormErrors] = useState({});
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

    // Ad Soyad doğrulama
    if (name === 'name') {
      if (value.length > 50) {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: 'Ad Soyad 50 karakterden fazla olamaz' }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    // TC Kimlik No doğrulama
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

    // Ad Soyad doğrulama
    if (!formValues.name) {
      errors.name = 'Ad Soyad boş olamaz';
    } else if (formValues.name.length > 50) {
      errors.name = 'Ad Soyad 50 karakterden fazla olamaz';
    } else {
      errors.name = '';
    }

    // TC Kimlik No doğrulama
    if (!formValues.tc) {
      errors.tc = 'TC Kimlik No boş olamaz';
    } else if (!/^\d{11}$/.test(formValues.tc) || formValues.tc[0] === '0') {
      errors.tc = 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır';
    } else {
      errors.tc = '';
    }

    // Bölüm doğrulama
    errors.department = formValues.department ? '' : 'Lütfen bir bölüm seçiniz';

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (teacherToEdit) {
        updateTeacher({ ...teacherToEdit, ...formValues });
      } else {
        addTeacher(formValues);
      }
      alert('Öğretmen başarıyla kaydedildi!');
      navigate('/dashboard/registration/teacher');
    } else {
      if (formErrors.name) {
        nameRef.current.focus();
      } else if (formErrors.tc) {
        tcRef.current.focus();
      } else {
        // Diğer hataları kontrol etme
        console.log('Diğer hatalar:', formErrors);
      }
    }
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
              <img src={warningIcon} alt="Uyarı" className="warning-icon" /> {/* İkon eklendi */}
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
              <img src={warningIcon} alt="Uyarı" className="warning-icon" /> {/* İkon eklendi */}
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
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {formErrors.department && (
            <p className="error-message">
              <img src={warningIcon} alt="Uyarı" className="warning-icon" /> {/* İkon eklendi */}
              {formErrors.department}
            </p>
          )}
        </div>
        <button type="submit" className="submit-button">Kaydet</button>
      </form>
    </div>
  );
};

// PropTypes validasyonu eklendi
AddTeacher.propTypes = {
  addTeacher: PropTypes.func.isRequired,
  updateTeacher: PropTypes.func.isRequired,
};

export default AddTeacher;
