import React from 'react';
import PropTypes from 'prop-types';

const StudentAttendanceSummary = ({ totalAbsences }) => {
  return (
    <div className="attendance-summary">
      <h2>Toplam Yok Yazıldığın Ders Sayısı: {totalAbsences}</h2>
    </div>
  );
};

StudentAttendanceSummary.propTypes = {
  totalAbsences: PropTypes.number.isRequired,
};

export default StudentAttendanceSummary;
