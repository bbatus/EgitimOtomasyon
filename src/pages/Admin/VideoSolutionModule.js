import React, { useState } from 'react';
import '../../assets/styles/Admin/VideoSolutionModule.css';

const initialExams = [
  { title: "erçin", status: "Yayınlanmadı", date: "2024-01-01", type: "TYT" },
  { title: "TEST", status: "Yayınlandı", date: "2024-02-01", type: "AYT" },
  { title: "345 SON PROVA-AYT(26.05.2024)", status: "Yayınlandı", date: "2024-05-26", type: "AYT" },
  { title: "345 SON PROVA-TYT(25.05.2024)", status: "Yayınlandı", date: "2024-05-25", type: "TYT" },
];

const VideoSolutionModule = () => {
  const [exams, setExams] = useState(initialExams);
  const [isAdding, setIsAdding] = useState(false);
  const [examDetails, setExamDetails] = useState({ title: '', date: '', type: '' });
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddExamClick = () => {
    setIsAdding(true);
  };

  const handleExamDetailChange = (e) => {
    const { name, value } = e.target;
    setExamDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSaveExam = () => {
    if (!examDetails.title || !examDetails.date || !examDetails.type) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    setStep(2);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
    } else {
      alert('Lütfen geçerli bir Excel dosyası yükleyin.');
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin.');
      return;
    }
    const newExam = {
      title: examDetails.title,
      date: examDetails.date,
      type: examDetails.type,
      status: 'Yayınlanmadı'
    };
    setExams([newExam, ...exams]);
    setIsAdding(false);
    setStep(1);
  };

  const handleDetailsClick = (exam) => {
    setCurrentExam(exam);
    setIsViewingDetails(true);
  };

  const handleBackToList = () => {
    setIsViewingDetails(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setExamDetails({
      title: currentExam.title,
      date: currentExam.date,
      type: currentExam.type
    });
  };

  const handleSaveEdit = () => {
    if (!examDetails.title || !examDetails.date || !examDetails.type) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    const updatedExams = exams.map((exam) =>
      exam.title === currentExam.title ? { ...exam, ...examDetails } : exam
    );
    setExams(updatedExams);
    setIsEditing(false);
    setIsViewingDetails(false);
  };

  const handleDeleteExam = () => {
    const updatedExams = exams.filter((exam) => exam.title !== currentExam.title);
    setExams(updatedExams);
    setIsViewingDetails(false);
  };

  return (
    <div className="video-solution-module-container">
      {isAdding ? (
        <>
          {step === 1 ? (
            <div className="add-exam-container">
              <h2>Sınav Bilgilerini Tanımla</h2>
              <div className="form-group">
                <label>Sınav Adı</label>
                <input
                  type="text"
                  name="title"
                  value={examDetails.title}
                  onChange={handleExamDetailChange}
                  placeholder="Sınav adını girin"
                />
              </div>
              <div className="form-group">
                <label>Sınav Tarihi</label>
                <input
                  type="date"
                  name="date"
                  value={examDetails.date}
                  onChange={handleExamDetailChange}
                />
              </div>
              <div className="form-group">
                <label>Sınav Türü</label>
                <div className="exam-type-options">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="TYT"
                      checked={examDetails.type === 'TYT'}
                      onChange={handleExamDetailChange}
                    />
                    TYT
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="AYT"
                      checked={examDetails.type === 'AYT'}
                      onChange={handleExamDetailChange}
                    />
                    AYT
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <button onClick={() => setIsAdding(false)} className="cancel-button">İptal Et</button>
                <button onClick={handleSaveExam} className="save-button">Devam Et</button>
              </div>
            </div>
          ) : (
            <div className="upload-excel-container">
              <h2>Cevap Anahtarı Oluştur</h2>
              <div className="info-text">
                Cevap anahtarını Excel ile toplu yüklemek için aşağıdaki butona tıklayabilirsiniz. Kendiniz cevap anahtarı oluşturmak için bu adımı atlayabilirsiniz.
              </div>
              <div className="upload-area">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input" className="upload-label">
                  <div className="upload-icon">
                    <span role="img" aria-label="upload">&#x1f4c2;</span>
                  </div>
                  <div className="upload-text">
                    {selectedFile ? selectedFile.name : 'Excel tipinde olan cevap anahtarını aşağıdaki butona tıklayarak ya da sürükleyerek yükleyebilirsiniz.'}
                  </div>
                </label>
              </div>
              <div className="form-actions">
                <button onClick={() => setStep(1)} className="back-button">Geri Dön</button>
                <button onClick={handleContinue} className="save-button">Devam Et</button>
              </div>
            </div>
          )}
        </>
      ) : isViewingDetails ? (
        <div className="exam-details-container">
          {isEditing ? (
            <>
              <h2>Sınav Bilgilerini Düzenle</h2>
              <div className="form-group">
                <label>Sınav Adı</label>
                <input
                  type="text"
                  name="title"
                  value={examDetails.title}
                  onChange={handleExamDetailChange}
                />
              </div>
              <div className="form-group">
                <label>Sınav Tarihi</label>
                <input
                  type="date"
                  name="date"
                  value={examDetails.date}
                  onChange={handleExamDetailChange}
                />
              </div>
              <div className="form-group">
                <label>Sınav Türü</label>
                <div className="exam-type-options">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="TYT"
                      checked={examDetails.type === 'TYT'}
                      onChange={handleExamDetailChange}
                    />
                    TYT
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="AYT"
                      checked={examDetails.type === 'AYT'}
                      onChange={handleExamDetailChange}
                    />
                    AYT
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <button onClick={handleBackToList} className="cancel-button">İptal Et</button>
                <button onClick={handleSaveEdit} className="save-button">Kaydet</button>
              </div>
            </>
          ) : (
            <>
              <h2>Sınav Bilgileri</h2>
              <div className="form-group">
                <label>Sınav Adı</label>
                <p>{currentExam.title}</p>
              </div>
              <div className="form-group">
                <label>Sınav Tarihi</label>
                <p>{currentExam.date}</p>
              </div>
              <div className="form-group">
                <label>Sınav Türü</label>
                <p>{currentExam.type}</p>
              </div>
              <div className="form-group">
                <label>Yüklenen Cevap Anahtarı</label>
                <p>Cevap Anahtarı</p>
              </div>
              <div className="form-actions">
                <button onClick={handleBackToList} className="back-button">Geri Dön</button>
                <button onClick={handleEditClick} className="edit-button">Düzenle</button>
                <button onClick={handleDeleteExam} className="delete-button">Sınavı Sil</button>
                <button className="publish-button">Sınavı Yayınla</button>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="exam-header">
            <h1>Video Çözüm Modülü</h1>
            <button className="add-exam-button" onClick={handleAddExamClick}>Sınav Tanımla</button>
          </div>
          <div className="exam-list">
            {exams.map((exam, index) => (
              <div key={index} className="exam-item">
                <img src="exam-image-placeholder.jpg" alt="Exam" className="exam-image"/>
                <div className="exam-details">
                  <h2>{exam.title}</h2>
                  <span className={`exam-status ${exam.status === 'Yayınlandı' ? 'published' : 'unpublished'}`}>
                    {exam.status}
                  </span>
                  <button className="details-button" onClick={() => handleDetailsClick(exam)}>Detayları gör</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoSolutionModule;
