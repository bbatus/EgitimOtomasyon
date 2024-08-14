import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCurrentLesson, isWithinLessonTime, isLessonOver } from '../../../../helpers/scheduleHelpers';
import '../../../../assets/styles/Admin/Modules/AttendanceModule/AttendanceModule.css';

const gradeLevels = ['9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D', 'E'];
const lessons = ["1. Ders", "2. Ders", "3. Ders", "4. Ders", "5. Ders", "6. Ders"];  // Bu satırı ekledik

const AttendanceModule = ({ attendanceRecords, setAttendanceRecords }) => {
  const [currentLesson, setCurrentLesson] = useState(getCurrentLesson());
  const [selectedGrade, setSelectedGrade] = useState('12');
  const navigate = useNavigate();

  useEffect(() => {
    const updateLesson = () => {
      const { lesson, nextUpdate } = getCurrentLesson();
      setCurrentLesson({ lesson, nextUpdate });
    };

    updateLesson();
    const interval = setInterval(updateLesson, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentLesson.nextUpdate) {
      const timeout = currentLesson.nextUpdate - new Date();
      const timer = setTimeout(() => setCurrentLesson(getCurrentLesson()), timeout);
      return () => clearTimeout(timer);
    }
  }, [currentLesson.nextUpdate]);

  const handleClassClick = (className, lesson) => {
    if (isLessonOver(lesson)) {
      alert('Bu dersin yoklama saati geçmiştir.');
    } else {
      navigate(`/dashboard/attendance/${className}/${lesson}`);
    }
  };

  const getClassButtonClass = (className, lesson) => {
    if (attendanceRecords[lesson]?.[className]) {
      return "class-button complete";
    } else if (isLessonOver(lesson)) {
      return "class-button missed";
    } else if (isWithinLessonTime(lesson)) {
      return "class-button active";
    } else {
      return "class-button";
    }
  };

  const handleViewAbsentStudents = () => {
    const absentStudents = [];

    for (const lesson in attendanceRecords) {
      for (const className in attendanceRecords[lesson]) {
        attendanceRecords[lesson][className].forEach(student => {
          if (student.present === false) {
            absentStudents.push({ name: student.name, classroom: student.classroom, lesson });
          }
        });
      }
    }

    navigate('/dashboard/absent-students', { state: { absentStudents } });
  };

  const selectedClasses = sections.map(section => `${selectedGrade}-${section}`);

  return (
    <div className="attendance-container">
      <h1>Sınıf Seçin</h1>
      <div className="date-time">
        <div>{new Date().toLocaleDateString()}</div>
        <div>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <span> ({currentLesson.lesson})</span>
        </div>
      </div>

      <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
        {gradeLevels.map(grade => (
          <option key={grade} value={grade}>
            {grade}. Sınıf
          </option>
        ))}
      </select>

      <div className="attendance-summary">
        {lessons.map((lesson) => (
          <div key={lesson}>
            <h3>{lesson}</h3>
            <div className="lesson-row">
              {selectedClasses.map((className) => (
                <button
                  key={`${lesson}-${className}`}
                  className={getClassButtonClass(className, lesson)}
                  onClick={() => handleClassClick(className, lesson)}
                >
                  {className}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="view-absent-students-button" onClick={handleViewAbsentStudents}>
        Yok Yazılanları Gör
      </button>
    </div>
  );
};

// PropTypes tanımlaması
AttendanceModule.propTypes = {
  attendanceRecords: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          classroom: PropTypes.string.isRequired,
          present: PropTypes.bool.isRequired,
        })
      )
    )
  ).isRequired,
  setAttendanceRecords: PropTypes.func.isRequired,
};

export default AttendanceModule;
