import React, { useState } from 'react';
import '../../../assets/styles/Admin/AddStudent.css';

const AddStudentExcel = ({ addStudentsFromExcel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
    } else {
      alert('Lütfen geçerli bir Excel dosyası yükleyin.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Lütfen bir dosya seçin.');
      return;
    }
    addStudentsFromExcel(selectedFile);
  };

  return (
    <div className="add-student-container">
      <h2>Excel ile Öğrenci Ekle</h2>
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
            {selectedFile ? selectedFile.name : 'Excel dosyasını buraya tıklayarak ya da sürükleyerek yükleyebilirsiniz.'}
          </div>
        </label>
      </div>
      <button onClick={handleSubmit} className="submit-button">Kaydet</button>
    </div>
  );
};

export default AddStudentExcel;
