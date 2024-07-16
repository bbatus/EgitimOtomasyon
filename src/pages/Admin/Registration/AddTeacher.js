import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../assets/styles/Admin/AddTeacher.css';

const AddTeacher = ({ addTeacher, updateTeacher }) => {
  const [name, setName] = useState('');
  const [tc, setTc] = useState('');
  const [department, setDepartment] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const teacherToEdit = location.state?.teacher;

  const nameRef = useRef(null);
  const tcRef = useRef(null);

  useEffect(() => {
    if (teacherToEdit) {
      setName(teacherToEdit.name);
      setTc(teacherToEdit.tc);
      setDepartment(teacherToEdit.department);
    }
  }, [teacherToEdit]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setName(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, name: 'Ad Soyad 50 karakterden fazla olamaz' }));
    }
  };

  const handleTcChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 11) {
      setTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: '' }));
    }
    if (value.length === 11 && value[0] !== '0') {
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: '' }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        tc: 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır'
      }));
    }
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, department: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      name: name ? (name.length > 50 ? 'Ad Soyad 50 karakterden fazla olamaz' : '') : 'Ad Soyad boş olamaz',
      tc: tc ? (tc.length !== 11 || tc[0] === '0' ? 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır' : '') : 'TC Kimlik No boş olamaz',
      department: department ? '' : 'Lütfen bir bölüm seçiniz'
    };
    setFormErrors(errors);

    if (!errors.name && !errors.tc && !errors.department) {
      if (teacherToEdit) {
        updateTeacher({ ...teacherToEdit, name, tc, department });
      } else {
        addTeacher({ name, tc, department });
      }
      alert('Öğretmen başarıyla kaydedildi!');
      navigate('/dashboard/registration/teacher');
    } else {
      if (errors.name) {
        nameRef.current.focus();
      } else if (errors.tc) {
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
            value={name}
            onChange={handleNameChange}
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
            value={tc}
            onChange={handleTcChange}
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
            value={department}
            onChange={handleDepartmentChange}
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
