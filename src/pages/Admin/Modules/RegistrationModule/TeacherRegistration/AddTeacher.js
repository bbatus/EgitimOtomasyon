import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/TeacherRegistration/AddTeacher.css';

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

    if (name === 'name' && value.length > 50) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: 'Ad Soyad 50 karakterden fazla olamaz' }));
    } else if (name === 'tc' && (!/^[0-9]*$/.test(value) || value.length > 11 || (value.length === 11 && value[0] === '0'))) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır',
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: formValues.name ? (formValues.name.length > 50 ? 'Ad Soyad 50 karakterden fazla olamaz' : '') : 'Ad Soyad boş olamaz',
      tc: formValues.tc ? (formValues.tc.length !== 11 || formValues.tc[0] === '0' ? 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır' : '') : 'TC Kimlik No boş olamaz',
      department: formValues.department ? '' : 'Lütfen bir bölüm seçiniz'
    };
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
              <span role="img" aria-label="warning">⚠️</span>
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
              <span role="img" aria-label="warning">⚠️</span>
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
              <span role="img" aria-label="warning">⚠️</span>
              {formErrors.department}
            </p>
          )}
        </div>
        <button type="submit" className="submit-button">Kaydet</button>
      </form>
    </div>
  );
};

export default AddTeacher;
