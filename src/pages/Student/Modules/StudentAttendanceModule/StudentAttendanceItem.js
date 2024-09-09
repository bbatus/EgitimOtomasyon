import React from 'react';
import PropTypes from 'prop-types';

const StudentAttendanceItem = ({ date, lesson }) => {
  return (
    <tr className="attendance-item">
      <td>{date}</td>
      <td>{lesson}</td>
    </tr>
  );
};

StudentAttendanceItem.propTypes = {
  date: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
};

export default StudentAttendanceItem;
