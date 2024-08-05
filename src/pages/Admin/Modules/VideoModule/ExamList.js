import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import ExamIcon from '../../../../assets/images/exam.svg';
import '../../../../assets/styles/Admin/Modules/VideoModule/VideoSolutionModule.css';

const ExamList = ({ exams, onDetailsClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 5;

  const indexOfLastExam = useMemo(() => currentPage * examsPerPage, [currentPage, examsPerPage]);
  const indexOfFirstExam = useMemo(() => indexOfLastExam - examsPerPage, [indexOfLastExam, examsPerPage]);
  const currentExams = useMemo(() => exams.slice(indexOfFirstExam, indexOfLastExam), [exams, indexOfFirstExam, indexOfLastExam]);
  const totalPages = useMemo(() => Math.ceil(exams.length / examsPerPage), [exams.length, examsPerPage]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <div className="exam-list-container">
      <div className="exam-list">
        {currentExams.map((exam) => (
          <div key={exam.id} className="exam-item">
            <img src={ExamIcon} alt="Exam" className="exam-image" />
            <div className="exam-details">
              <div className="exam-header">
                <h2>
                  {exam.title}
                  <span className={`exam-status ${exam.status === 'Yayınlandı' ? 'published' : 'unpublished'}`}>
                    {exam.status}
                  </span>
                </h2>
              </div>
              <div className="exam-date">
                {exam.date}
              </div>
            </div>
            <button className="details-button" onClick={() => onDetailsClick(exam)}>Detayları gör</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Önceki</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={`page-${index + 1}`}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Sonraki</button>
      </div>
    </div>
  );
};

ExamList.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,  // Burada id'nin kullanılacağından emin olun
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired,
  onDetailsClick: PropTypes.func.isRequired
};

export default ExamList;
