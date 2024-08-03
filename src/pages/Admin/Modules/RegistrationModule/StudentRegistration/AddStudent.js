// src/pages/Admin/Modules/RegistrationModule/StudentRegistration/AddStudent.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addStudent, updateStudent } from '../../../../../api/studentApi'; // API fonksiyonlarını import edin
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/AddStudent.css';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [tc, setTc] = useState('');
  const [classroom, setClassroom] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const studentToEdit = location.state?.student;

  const nameRef = useRef(null);
  const tcRef = useRef(null);

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setTc(studentToEdit.tc);
      setClassroom(studentToEdit.classroom);
    }
  }, [studentToEdit]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setName(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Ad Soyad 50 karakterden fazla olamaz',
      }));
    }
  };

  const handleTcChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 11 && value[0] !== '0') {
      setTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: '' }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        tc: 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır',
      }));
    }
  };

  const handleClassroomChange = (e) => {
    setClassroom(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, classroom: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      name: name
        ? name.length > 50
          ? 'Ad Soyad 50 karakterden fazla olamaz'
          : ''
        : 'Ad Soyad boş olamaz',
      tc: tc
        ? tc.length !== 11 || tc[0] === '0'
          ? 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır'
          : ''
        : 'TC Kimlik No boş olamaz',
      classroom: classroom ? '' : 'Lütfen bir sınıf seçiniz',
    };
    setFormErrors(errors);

    if (!errors.name && !errors.tc && !errors.classroom) {
      try {
        if (studentToEdit) {
          // Mevcut öğrenciyi güncelleme isteği
          await updateStudent(studentToEdit.id, { name, tc, classroom });
        } else {
          // Yeni öğrenci ekleme isteği
          await addStudent({ name, tc, classroom });
        }
        alert('Öğrenci başarıyla kaydedildi!');
        navigate('/dashboard/registration/student');
      } catch (error) {
        alert('Öğrenci eklenirken bir hata oluştu: ' + error.message);
      }
    } else {
      if (errors.name) {
        nameRef.current.focus();
      } else if (errors.tc) {
        tcRef.current.focus();
      }
    }
  };

  return (
    <div className="add-student-container">
      <h2>Öğrenci {studentToEdit ? 'Düzenle' : 'Ekle'}</h2>
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
              <span role="img" aria-label="warning">
                ⚠️
              </span>
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
              <span role="img" aria-label="warning">
                ⚠️
              </span>
              {formErrors.tc}
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="classroom">Sınıf</label>
          <select
            id="classroom"
            value={classroom}
            onChange={handleClassroomChange}
            className="input-field"
          >
            <option value="">Sınıf Seçin</option>
            {[
              '9-A',
              '9-B',
              '9-C',
              '9-D',
              '10-A',
              '10-B',
              '10-C',
              '10-D',
              '11-A',
              '11-B',
              '11-C',
              '11-D',
              '12-A',
              '12-B',
              '12-C',
              '12-D',
            ].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          {formErrors.classroom && (
            <p className="error-message">
              <span role="img" aria-label="warning">
                ⚠️
              </span>
              {formErrors.classroom}
            </p>
          )}
        </div>
        <button type="submit" className="submit-button">
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
