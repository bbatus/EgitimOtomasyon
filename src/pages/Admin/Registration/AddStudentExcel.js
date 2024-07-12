import React, { useState } from 'react';
import '../../../assets/styles/Admin/AddStudent.css';
import * as XLSX from 'xlsx';

const AddStudentExcel = ({ addStudentsFromExcel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [errorRows, setErrorRows] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setSelectedFile(file);
      setUploadError('');
    } else {
      setUploadError('Lütfen geçerli bir Excel dosyası yükleyin.');
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
      setUploadError('Lütfen bir dosya seçin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const students = [];
      const errors = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        const name = row[4]; // AD*
        const surname = row[5]; // SOYAD*
        const tc = row[6]; // KULLANICI ADI*
        const classroom = row[7]; // Sınıf bilgisi burada olacak (örneğin "9-A")

        if (name && surname && tc && classroom) {
          students.push({ name: `${name} ${surname}`, tc, classroom });
        } else {
          errors.push({ row: i + 1, data: row });
          console.error(`Row ${i + 1} is missing data: ${row}`);
        }
      }

      setErrorRows(errors);
      addStudentsFromExcel(students);
    };
    reader.readAsArrayBuffer(selectedFile);
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
      {uploadError && <p className="error-message">{uploadError}</p>}
      <button onClick={handleSubmit} className="submit-button">Kaydet</button>
      {errorRows.length > 0 && (
        <div className="error-container">
          <h3>Hatalı Satırlar</h3>
          {errorRows.map((error, index) => (
            <p key={index}>
              Satır {error.row}: {JSON.stringify(error.data)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddStudentExcel;
