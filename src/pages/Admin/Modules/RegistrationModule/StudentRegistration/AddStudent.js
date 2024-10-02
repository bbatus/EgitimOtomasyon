import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../../../api/axiosInstance'; // axiosInstance import edildi
import { STUDENT_API } from '../../../../../api/apiEndpoints'; // API URL'leri import edildi
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/AddStudent.css';
import warningIcon from '../../../../../assets/images/delete.svg';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [tc, setTc] = useState('');
  const [classroom, setClassroom] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const studentToEdit = location.state?.student;

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
    setFormErrors((prevErrors) => ({ ...prevErrors, name: validateName(value) }));
  };

  const handleTcChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 11) { // Only allow numbers and max length of 11
      setTc(value);
      setFormErrors((prevErrors) => ({ ...prevErrors, tc: validateTc(value) }));
    }
  };

  const handleClassroomChange = (e) => {
    const value = e.target.value;
    setClassroom(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, classroom: validateClassroom(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tüm hata kontrollerini yap
    const nameError = validateName(name);
    const tcError = validateTc(tc);
    const classroomError = validateClassroom(classroom);

    if (nameError || tcError || classroomError) {
      setFormErrors({ name: nameError, tc: tcError, classroom: classroomError });
      setNotification({ message: 'Lütfen formu doğru doldurduğunuzdan emin olun.', type: 'error' });
      return;
    }

    const studentData = { name, tc, classroom };

    try {
      if (studentToEdit) {
        // Güncelleme işlemi
        await axiosInstance.put(STUDENT_API.ADD, { ...studentToEdit, ...studentData });
        setNotification({ message: 'Öğrenci başarıyla güncellendi!', type: 'success' });
      } else {
        // Yeni öğrenci ekleme işlemi
        await axiosInstance.post(STUDENT_API.ADD, studentData);
        setNotification({ message: 'Öğrenci başarıyla kaydedildi!', type: 'success' });
      }
      setTimeout(() => {
        navigate('/dashboard/registration/student');
      }, 1500);
    } catch (error) {
      setNotification({
        message: `Öğrenci eklenirken bir hata oluştu: ${error.response?.data?.message || error.message}`,
        type: 'error',
      });
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
            autoFocus
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

export default AddStudent;
