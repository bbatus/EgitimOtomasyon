import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/CourseRegistration/CourseRegistration.css';

const CourseRegistration = ({ courses }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: '' });

  const tytCourses = courses.filter((course) => course.courseType === 'TYT');
  const aytCourses = courses.filter((course) => course.courseType === 'AYT');

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  const handleCourseAddClick = () => {
    setNotification({ message: 'Ders ekleme sayfasına yönlendiriliyorsunuz...', type: 'success' });
    setTimeout(() => navigate('/dashboard/registration/course/add'), 1500);
  };

  return (
    <div className="course-registration-container">
      <div className="course-header">
        <h1>Dersler</h1>
        <button className="add-course-button" onClick={handleCourseAddClick}>
          Ders Ekle +
        </button>
      </div>
      <div className="course-group">
        <h2>TEMEL YETERLİLİK TESTİ DERSLERİ</h2>
        <div className="course-list">
          {tytCourses.map((course) => (
            <div key={course.id} className="course-item">
              <h3>{course.courseName}</h3>
              <button
                className="see-topics-button"
                onClick={() => navigate(`/dashboard/registration/course/topics/${course.id}`)}
              >
                Konuları gör
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="course-group">
        <h2>ALAN YETERLİLİK TESTİ DERSLERİ</h2>
        <div className="course-list">
          {aytCourses.map((course) => (
            <div key={course.id} className="course-item">
              <h3>{course.courseName}</h3>
              <button
                className="see-topics-button"
                onClick={() => navigate(`/dashboard/registration/course/topics/${course.id}`)}
              >
                Konuları gör
              </button>
            </div>
          ))}
        </div>
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

CourseRegistration.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseName: PropTypes.string.isRequired,
      courseType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseRegistration;
