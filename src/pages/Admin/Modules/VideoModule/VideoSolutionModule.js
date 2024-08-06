import React, { useState, useCallback, useMemo } from 'react';
import ExamList from './ExamList';
import AddExam from './AddExam';
import UploadExcel from './UploadExcel';
import SearchBar from './SearchBar';
import NoExamsIcon from '../../../../assets/images/no exam.svg';
import '../../../../assets/styles/Admin/Modules/VideoModule/VideoSolutionModule.css';

const initialExams = [];

const VideoSolutionModule = () => {
  const [exams, setExams] = useState(initialExams);
  const [isAdding, setIsAdding] = useState(false);
  const [step, setStep] = useState(1);
  const [currentExam, setCurrentExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddExamClick = useCallback(() => {
    setIsAdding(true);
    setStep(1);
  }, []);

  const handleSaveExam = useCallback((examDetails) => {
    setCurrentExam(examDetails);
    setStep(2);
  }, []);

  const handleContinue = useCallback((selectedFile) => {
    const newExam = {
      ...currentExam,
      status: 'Yayınlanmadı'
    };
    setExams((prevExams) => [newExam, ...prevExams]);
    setIsAdding(false);
  }, [currentExam]);

  const handleDetailsClick = useCallback((exam) => {
    setCurrentExam(exam);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, []);

  const filteredExams = useMemo(() => {
    return exams.filter(exam => exam.title.toLowerCase().includes(searchTerm));
  }, [exams, searchTerm]);

  return (
    <div className="video-solution-module-container">
      {isAdding && step === 1 && (
        <AddExam onSave={handleSaveExam} onCancel={() => setIsAdding(false)} />
      )}
      {isAdding && step === 2 && (
        <UploadExcel onContinue={handleContinue} onBack={() => setStep(1)} />
      )}
      {!isAdding && (
        <>
          <div className="search-filter-container">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <button className="add-exam-button" onClick={handleAddExamClick}>Sınav Tanımla</button>
          </div>
          {filteredExams.length === 0 ? (
            <div className="no-exams-container">
              <img src={NoExamsIcon} alt="No Exams" className="no-exams-icon" />
              <p>Henüz hiçbir deneme sınavı yok.</p>
            </div>
          ) : (
            <ExamList exams={filteredExams} onDetailsClick={handleDetailsClick} />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(VideoSolutionModule);
