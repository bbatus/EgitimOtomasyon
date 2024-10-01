import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/AddStudent.css';
import warningIcon from '../../../../../assets/images/delete.svg';

const AddStudent = ({ addStudent, updateStudent }) => {
  const [name, setName] = useState('');
  const [tc, setTc] = useState('');
  const [classroom, setClassroom] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const studentToEdit = location.state?.student;

  const nameRef = useRef(null);
  const tcRef = useRef(null);
  const classRef = useRef(null);

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setTc(studentToEdit.tc);
      setClassroom(studentToEdit.classroom);
    }
  }, [studentToEdit]);

  // Validation functions
  const validateName = (name) => {
    if (!name) return 'Ad Soyad boş olamaz';
    if (name.length > 50) return 'Ad Soyad 50 karakterden fazla olamaz';
    return '';
  };

  const validateTc = (tc) => {
    if (!tc) return 'TC Kimlik No boş olamaz';
    if (tc.length !== 11 || !/^[1-9]\d{10}$/.test(tc)) {
      return 'TC Kimlik No 11 haneli olmalı ve 0 ile başlamamalıdır';
    }
    return '';
  };

  const validateClassroom = (classroom) => {
    return classroom ? '' : 'Lütfen bir sınıf seçiniz';
  };

  // Handle input changes
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const error = validateName(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, name: error }));
  };

  const handleTcChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 11) { // Only allow numbers and max length of 11
      setTc(value);
      const error = validateTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: error }));
    }
  };

  const handleClassroomChange = (e) => {
    const value = e.target.value;
    setClassroom(value);
    const error = validateClassroom(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, classroom: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const tcError = validateTc(tc);
    const classroomError = validateClassroom(classroom);

    const errors = { name: nameError, tc: tcError, classroom: classroomError };
    setFormErrors(errors);

    if (nameError) {
      nameRef.current.focus();
      setNotification({ message: nameError, type: 'error' });
      return;
    }

    if (tcError) {
      tcRef.current.focus();
      setNotification({ message: tcError, type: 'error' });
      return;
    }

    if (classroomError) {
      classRef.current.focus();
      setNotification({ message: classroomError, type: 'error' });
      return;
    }

    const studentData = { name, tc, classroom };

    try {
      if (studentToEdit) {
        updateStudent({ ...studentToEdit, ...studentData });
        setNotification({ message: 'Öğrenci başarıyla güncellendi!', type: 'success' });
      } else {
        addStudent(studentData);
        setNotification({ message: 'Öğrenci başarıyla kaydedildi!', type: 'success' });
      }
      setTimeout(() => {
        navigate('/dashboard/registration/student');
      }, 1500);
    } catch (error) {
      setNotification({ message: `Öğrenci eklenirken bir hata oluştu: ${error.message}`, type: 'error' });
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard/registration/student');
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
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
              <img src={warningIcon} alt="Uyarı" />
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
              <img src={warningIcon} alt="Uyarı" />
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
            ref={classRef}
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
              <img src={warningIcon} alt="Uyarı" />
              {formErrors.classroom}
            </p>
          )}
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            Kaydet
          </button>
          <button type="button" className="back-button" onClick={handleBackClick}>
            Geri Dön
          </button>
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

AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired,
  updateStudent: PropTypes.func.isRequired,
};

export default AddStudent;
