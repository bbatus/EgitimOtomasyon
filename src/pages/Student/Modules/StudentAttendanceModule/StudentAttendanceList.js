import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StudentAttendanceItem from './StudentAttendanceItem';

const StudentAttendanceList = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="attendance-list">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Ders</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(record => (
            <StudentAttendanceItem key={record.id} date={record.date} lesson={record.lesson} />
          ))}
        </tbody>
      </table>
      
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Önceki
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={`page-${index}`}
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

StudentAttendanceList.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      lesson: PropTypes.string.isRequired,
      absent: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default StudentAttendanceList;
