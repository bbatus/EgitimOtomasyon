import React, { useState } from 'react';
import ExamList from './Video/ExamList';
import AddExam from './Video/AddExam';
import UploadExcel from './Video/UploadExcel';
import SearchBar from './Video/SearchBar';
import NoExamsIcon from '../../assets/images/no exam.svg';
import '../../assets/styles/Admin/VideoSolutionModule.css';

const initialExams = [];

const VideoSolutionModule = () => {
  const [exams, setExams] = useState(initialExams);
  const [isAdding, setIsAdding] = useState(false);
  const [step, setStep] = useState(1);
  const [currentExam, setCurrentExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddExamClick = () => {
    setIsAdding(true);
    setStep(1);
  };

  const handleSaveExam = (examDetails) => {
    setCurrentExam(examDetails);
    setStep(2);
  };

  const handleContinue = (selectedFile) => {
    const newExam = {
      ...currentExam,
      status: 'Yayınlanmadı'
    };
    setExams([newExam, ...exams]);
    setIsAdding(false);
  };

  const handleDetailsClick = (exam) => {
    setCurrentExam(exam);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredExams = exams.filter(exam => exam.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="video-solution-module-container">
      {isAdding ? (
        step === 1 ? (
          <AddExam onSave={handleSaveExam} onCancel={() => setIsAdding(false)} />
        ) : (
          <UploadExcel onContinue={handleContinue} onBack={() => setStep(1)} />
        )
      ) : (
        <>
          <div className="search-filter-container">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <button className="add-exam-button" onClick={handleAddExamClick}>Sınav Tanımla</button>
          </div>
          {filteredExams.length === 0 ? (
            <div className="no-exams-container">
              <img src={NoExamsIcon} alt="No Exams" className="no-exams-icon" />
              <p>Henüz hiç deneme sınavı yok.</p>
            </div>
          ) : (
            <ExamList exams={filteredExams} onDetailsClick={handleDetailsClick} />
          )}
        </>
      )}
    </div>
  );
};

export default VideoSolutionModule;
