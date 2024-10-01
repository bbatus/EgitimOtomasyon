import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/CourseRegistration/AddCourse.css';

const AddCourse = ({ addCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('TYT');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleAddCourse = () => {
    if (courseName.trim()) {
      addCourse({ courseName: courseName.trim(), courseType });
      setNotification({ message: 'Ders başarıyla eklendi!', type: 'success' });
      setTimeout(() => navigate('/dashboard/registration/course'), 1500);
    } else {
      setNotification({ message: 'Lütfen ders adını giriniz', type: 'error' });
    }
  };

  const handleCancel = () => {
    setNotification({ message: 'Ders ekleme işlemi iptal edildi.', type: 'error' });
    setTimeout(() => navigate('/dashboard/registration/course'), 1500);
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="add-course-container">
      <h1>Ders Ekle</h1>
      <div className="form-group">
        <label htmlFor="courseName">Ders Adı</label>
        <input
          id="courseName"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Ders adı giriniz..."
        />
      </div>
      <fieldset className="form-group">
        <legend>Ders Türü</legend>
        <div className="radio-group">
          <label htmlFor="tytRadio">
            <input
              id="tytRadio"
              type="radio"
              value="TYT"
              checked={courseType === 'TYT'}
              onChange={(e) => setCourseType(e.target.value)}
            />
            TYT
          </label>
          <label htmlFor="aytRadio">
            <input
              id="aytRadio"
              type="radio"
              value="AYT"
              checked={courseType === 'AYT'}
              onChange={(e) => setCourseType(e.target.value)}
            />
            AYT
          </label>
        </div>
      </fieldset>
      <div className="button-group">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          İptal Et
        </button>
        <button type="button" className="submit-button" onClick={handleAddCourse}>
          Devam Et
        </button>
      </div>
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

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
};

export default AddCourse;
