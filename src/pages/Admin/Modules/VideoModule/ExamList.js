import React, { useState } from 'react';
import ExamIcon from '../../../../assets/images/exam.svg'; // Güncellenmiş yol
import '../../../../assets/styles/Admin/Modules/VideoModule/VideoSolutionModule.css'; // Güncellenmiş yol

const ExamList = ({ exams, onDetailsClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 5;

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(exams.length / examsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="exam-list-container">
      <div className="exam-list">
        {currentExams.map((exam, index) => (
          <div key={index} className="exam-item">
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
            key={index}
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

export default ExamList;
