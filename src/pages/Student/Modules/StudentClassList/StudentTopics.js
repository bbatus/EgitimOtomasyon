import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../../assets/styles/Student/Modules/StudentClassList/StudentTopics.css';

const StudentTopics = ({ courses }) => {
  const [topics] = useState([
    { id: 1, name: 'Sözcükte Anlam' },
    { id: 2, name: 'Cümlede Anlam' },
    { id: 3, name: 'Paragraf' },
    { id: 4, name: 'Ses Bilgisi' },
    { id: 5, name: 'Yazım Kuralları' },
    { id: 6, name: 'Noktalama İşaretleri' },
  ]);
  const { courseId } = useParams();

  return (
    <div className="student-topics-container">
      <h1>Konu Başlıkları</h1>
      <table className="topics-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>KONU BAŞLIĞI</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic, index) => (
            <tr key={topic.id}>
              <td>{index + 1}</td>
              <td>{topic.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="selected-course">
        <p>DERS: {courses.find(course => course.id === parseInt(courseId))?.courseName || 'Ders Bulunamadı'}</p>
      </div>
    </div>
  );
};
////LoginMethod burada yazdıgın swaggere istek atmak login emthodunu alcann mesela burda çağırcan pamaretre değerlerini de burda methoda yolican bu method gitcek
StudentTopics.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseName: PropTypes.string.isRequired,
      courseType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StudentTopics;
