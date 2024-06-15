import React, { useState } from 'react';
import '../../assets/styles/Admin/VideoSolutionModule.css';

const UploadExcel = ({ onContinue, onBack }) => {
  const [selectedFile, setSelectedFile] = useState(null);

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
    onContinue(selectedFile);
  };

  return (
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
        <button onClick={onBack} className="back-button">Geri Dön</button>
        <button onClick={handleContinue} className="save-button">Devam Et</button>
      </div>
    </div>
  );
};

export default UploadExcel;
