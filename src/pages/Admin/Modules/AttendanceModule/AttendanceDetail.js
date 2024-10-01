import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentLesson } from '../../../../helpers/scheduleHelpers';
import NotificationDialog from '../../../../components/NotificationDialog';
import '../../../../assets/styles/Admin/Modules/AttendanceModule/AttendanceModule.css';

const AttendanceDetail = ({ students, attendanceRecords, setAttendanceRecords }) => {
  const { className, lesson } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(
    students.filter(student => student.classroom === className).map(student => ({
      studentId: student.id,
      name: student.name,
      classroom: student.classroom, // Sınıf bilgisi eklendi
      lesson: lesson, // Ders bilgisi eklendi
      lessonTime: new Date().toLocaleTimeString(),
      present: null,
    }))
  );
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [currentLesson, setCurrentLesson] = useState(getCurrentLesson());

  useEffect(() => {
    const updateLesson = () => {
      const { lesson, nextUpdate } = getCurrentLesson();
      setCurrentLesson({ lesson, nextUpdate });
    };

    updateLesson();
    const interval = setInterval(updateLesson, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAttendance = (id, present) => {
    setAttendance(prevAttendance =>
      prevAttendance.map(student =>
        student.studentId === id ? { ...student, present } : student
      )
    );
  };

  const handleSaveAttendance = () => {
    const updatedRecords = { ...attendanceRecords };
    if (!updatedRecords[lesson]) {
      updatedRecords[lesson] = {};
    }
    updatedRecords[lesson][className] = attendance; // Tüm bilgiler kaydediliyor
    setAttendanceRecords(updatedRecords);
    setNotification({ message: 'Yoklama başarıyla kaydedildi!', type: 'success' });
    setTimeout(() => navigate('/dashboard/attendance'), 1500);
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="attendance-detail-container">
      <button className="back-button" onClick={() => navigate('/dashboard/attendance')}>
        Geri Dön
      </button>
      <h1>{className} - {lesson}</h1>
      <div className="date-time">
        <div>{new Date().toLocaleDateString()}</div>
        <div>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <span> ({currentLesson.lesson})</span>
        </div>
      </div>
      <div className="student-list">
        {attendance.map((student) => (
          <div key={student.studentId} className="student-item">
            <span>{student.name}</span>
            <button
              className={`attendance-button ${student.present === true ? 'present' : ''}`}
              onClick={() => handleToggleAttendance(student.studentId, true)}
            >
              Var
            </button>
            <button
              className={`attendance-button ${student.present === false ? 'absent' : ''}`}
              onClick={() => handleToggleAttendance(student.studentId, false)}
            >
              Yok
            </button>
          </div>
        ))}
      </div>
      <button className="save-attendance-button" onClick={handleSaveAttendance}>
        Yoklamayı Kaydet
      </button>
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
