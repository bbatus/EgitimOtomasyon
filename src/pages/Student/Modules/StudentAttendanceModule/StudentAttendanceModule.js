import React, { useState, useEffect } from 'react'; // Now includes useEffect for future use
import StudentAttendanceList from './StudentAttendanceList';
import StudentAttendanceSummary from './StudentAttendanceSummary';
import '../../../../assets/styles/Student/Modules/StudentAttendanceModule/StudentAttendanceModule.css';

const StudentAttendanceModule = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API call

  useEffect(() => {
    // Simulate fetching data from API
    const fetchAttendanceRecords = async () => {
      try {
        // Simulate API call here
        const fetchedRecords = [
          { id: 1, date: '2024-09-05', lesson: '1. Ders', absent: true },
          { id: 2, date: '2024-09-03', lesson: '2. Ders', absent: true },
          // More records...
        ];
        setAttendanceRecords(fetchedRecords);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setLoading(false);
      }
    };
    fetchAttendanceRecords();
  }, []);

  if (loading) return <div>Loading...</div>;

  const totalAbsences = attendanceRecords.filter(record => record.absent).length;

  return (
    <div className="student-attendance-module">
      <h1>Yoklamalarım</h1>
      <StudentAttendanceSummary totalAbsences={totalAbsences} />
      <StudentAttendanceList records={attendanceRecords} />
    </div>
  );
};

export default StudentAttendanceModule;
