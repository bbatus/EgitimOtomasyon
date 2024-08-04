import React from 'react';
import PropTypes from 'prop-types'; // PropTypes eklendi
import { useNavigate } from 'react-router-dom';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/CourseRegistration/CourseRegistration.css';

const CourseRegistration = ({ courses }) => {
  const navigate = useNavigate();

  // Filtreleme fonksiyonları
  const tytCourses = courses.filter((course) => course.courseType === 'TYT');
  const aytCourses = courses.filter((course) => course.courseType === 'AYT');

  return (
    <div className="course-registration-container">
      <div className="course-header">
        <h1>Dersler</h1>
        <button className="add-course-button" onClick={() => navigate('/dashboard/registration/course/add')}>
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
    </div>
  );
};

// PropTypes tanımlaması
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
