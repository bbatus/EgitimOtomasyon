import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../../../assets/styles/Student/Modules/StudentClassList/StudentClassList.css';

const StudentClassList = ({ courses }) => {
  const navigate = useNavigate();

  const tytCourses = courses.filter((course) => course.courseType === 'TYT');
  const aytCourses = courses.filter((course) => course.courseType === 'AYT');

  return (
    <div className="student-class-list-container">
      <div className="class-header">
        <h1>Dersler</h1>
      </div>
      <div className="class-group">
        <h2>TEMEL YETERLİLİK TESTİ DERSLERİ</h2>
        <div className="class-list">
          {tytCourses.map((course) => (
            <div key={course.id} className="class-item">
              <h3>{course.courseName}</h3>
              <button
                className="see-topics-button"
                onClick={() => navigate(`/student/class/topics/${course.id}`)}
              >
                Konuları Gör
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="class-group">
        <h2>ALAN YETERLİLİK TESTİ DERSLERİ</h2>
        <div className="class-list">
          {aytCourses.map((course) => (
            <div key={course.id} className="class-item">
              <h3>{course.courseName}</h3>
              <button
                className="see-topics-button"
                onClick={() => navigate(`/student/class/topics/${course.id}`)}
              >
                Konuları Gör
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

StudentClassList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseName: PropTypes.string.isRequired,
      courseType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentClassList;
