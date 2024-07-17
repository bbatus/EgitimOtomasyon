import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../../../assets/styles/Admin/Modules/VideoModule/VideoSolutionModule.css';

const UploadExcel = ({ onContinue, onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
    } else {
      alert('Lütfen geçerli bir Excel dosyası yükleyin.');
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleContinue = useCallback(() => {
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin.');
      return;
    }
    onContinue(selectedFile);
  }, [selectedFile, onContinue]);

  return (
    <div className="upload-excel-container">
      <h2>Cevap Anahtarı Oluştur</h2>
      <div className="info-text">
        Cevap anahtarını Excel ile toplu yüklemek için aşağıdaki butona tıklayabilirsiniz. Kendiniz cevap anahtarı oluşturmak için bu adımı atlayabilirsiniz.
      </div>
      <div
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
            {selectedFile ? selectedFile.name : 'Excel tipinde olan cevap anahtarını buraya tıklayarak ya da sürükleyerek yükleyebilirsiniz.'}
          </div>
        </label>
      </div>
      <div className="form-actions">
        <button onClick={onBack} className="back-button">Geri Dön</button>
        <button onClick={handleContinue} className="save-button">Devam Et</button>
      </div>
    </div>
  );
};

UploadExcel.propTypes = {
  onContinue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default UploadExcel;
