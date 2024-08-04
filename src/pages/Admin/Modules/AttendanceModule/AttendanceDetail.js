import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes import edildi
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentLesson } from '../../../../helpers/scheduleHelpers';
import '../../../../assets/styles/Admin/Modules/AttendanceModule/AttendanceModule.css';

const AttendanceDetail = ({ students, attendanceRecords, setAttendanceRecords }) => {
  const { className, lesson } = useParams(); // Ders parametresini de alıyoruz.
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(
    students.filter((student) => student.classroom === className).map((student) => ({ ...student, present: null }))
  );
  const [currentLesson, setCurrentLesson] = useState(getCurrentLesson());

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

  const handleToggleAttendance = (id, present) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((student) =>
        student.id === id ? { ...student, present } : student
      )
    );
  };

  const handleSaveAttendance = () => {
    const updatedRecords = { ...attendanceRecords };
    if (!updatedRecords[lesson]) {
      updatedRecords[lesson] = {};
    }
    updatedRecords[lesson][className] = attendance;
    setAttendanceRecords(updatedRecords);
    alert('Yoklama kaydedildi!');
    navigate('/dashboard/attendance');
  };

  return (
    <div className="attendance-detail-container">
      <button className="back-button" onClick={() => navigate('/dashboard/attendance')}>
        Geri Dön
      </button>
      <h1>{className} - {lesson}</h1> {/* Ders bilgisi de gösteriliyor */}
      <div className="date-time">
        <div>{new Date().toLocaleDateString()}</div>
        <div>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <span> ({currentLesson.lesson})</span>
        </div>
      </div>
      <div className="student-list">
        {attendance.map((student) => (
          <div key={student.id} className="student-item">
            <span>{student.name}</span>
            <button
              className={`attendance-button ${student.present === true ? 'present' : ''}`}
              onClick={() => handleToggleAttendance(student.id, true)}
            >
              Var
            </button>
            <button
              className={`attendance-button ${student.present === false ? 'absent' : ''}`}
              onClick={() => handleToggleAttendance(student.id, false)}
            >
              Yok
            </button>
          </div>
        ))}
      </div>
      <button className="save-attendance-button" onClick={handleSaveAttendance}>
        Yoklamayı Kaydet
      </button>
    </div>
  );
};

// PropTypes tanımlaması
AttendanceDetail.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      classroom: PropTypes.string.isRequired,
    })
  ).isRequired,
  attendanceRecords: PropTypes.object.isRequired,
  setAttendanceRecords: PropTypes.func.isRequired,
};

export default AttendanceDetail;
