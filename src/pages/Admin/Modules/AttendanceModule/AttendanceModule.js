import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentLesson, getLessonIndex } from '../../../../helpers/scheduleHelpers';
import '../../../../assets/styles/Admin/Modules/AttendanceModule/AttendanceModule.css'; 

const classes = ['12-A', '12-B', '12-C', '12-D', '12-E'];
const lessons = ["1. Ders", "2. Ders", "3. Ders", "4. Ders", "5. Ders", "6. Ders"];

const AttendanceModule = ({ attendanceRecords, setAttendanceRecords }) => {
  const [currentLesson, setCurrentLesson] = useState(getCurrentLesson());
  const navigate = useNavigate();

  useEffect(() => {
    const updateLesson = () => {
      const { lesson, nextUpdate } = getCurrentLesson();
      setCurrentLesson({ lesson, nextUpdate });
    };

    updateLesson();
    const interval = setInterval(updateLesson, 60 * 1000); // 1 dakika
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
    navigate(`/dashboard/attendance/${className}/${lesson}`);
  };

  const getClassButtonClass = (className, lesson) => {
    if (currentLesson.lesson === lesson && attendanceRecords[lesson]?.[className]) {
      return "class-button complete";
    } else if (currentLesson.lesson !== lesson && !attendanceRecords[lesson]?.[className]) {
      return "class-button missed";
    } else {
      return "class-button";
    }
  };

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
      <div className="attendance-summary">
        {lessons.map((lesson) => (
          <div key={lesson}>
            <h3>{lesson}</h3>
            <div className="lesson-row">
              {classes.map((className) => (
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
    </div>
  );
};

export default AttendanceModule;
