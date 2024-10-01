import React, { useState, useEffect } from 'react';
import StudentAttendanceList from './StudentAttendanceList';
import StudentAttendanceSummary from './StudentAttendanceSummary';
import NotificationDialog from '../../../../components/NotificationDialog';
import '../../../../assets/styles/Student/Modules/StudentAttendanceModule/StudentAttendanceModule.css';

const StudentAttendanceModule = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const fetchedRecords = [
          { id: 1, date: '2024-09-05', lesson: '1. Ders', absent: true },
          { id: 2, date: '2024-09-03', lesson: '2. Ders', absent: true },
        ];
        setAttendanceRecords(fetchedRecords);
        setNotification({ message: 'Yoklamalar başarıyla yüklendi.', type: 'success' });
      } catch (error) {
        console.error('Yoklamalar yüklenirken bir hata oluştu:', error);
        setNotification({ message: 'Yoklamalar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  if (loading) return <div>Loading...</div>;

  const totalAbsences = attendanceRecords.filter((record) => record.absent).length;

  return (
    <div className="student-attendance-module">
      <h1>Yoklamalarım</h1>
      <StudentAttendanceSummary totalAbsences={totalAbsences} />
      <StudentAttendanceList records={attendanceRecords} />
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

export default StudentAttendanceModule;
