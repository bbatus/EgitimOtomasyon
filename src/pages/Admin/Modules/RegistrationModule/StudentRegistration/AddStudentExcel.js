import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { addStudent } from '../../../../../api/studentApi';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/AddStudent.css';
import excelIcon from '../../../../../assets/images/excel.svg';

const AddStudentExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [errorRows, setErrorRows] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (
      file &&
      (file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel')
    ) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Lütfen bir dosya seçin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const students = [];
      const errors = [];
      jsonData.slice(1).forEach((row, i) => {
        const [name, surname, tc, classroom] = [row[4], row[5], row[6], row[7]];
        if (name && surname && tc && classroom) {
          students.push({ name: `${name} ${surname}`, tc, classroom });
        } else {
          errors.push({ row: i + 2, data: row });
          console.error(`Satır ${i + 2} veri eksik: ${row}`);
        }
      });

      setErrorRows(errors);

      // Öğrenci verilerini API üzerinden ekle
      for (const student of students) {
        try {
          await addStudent(student);
        } catch (error) {
          console.error('Öğrenci ekleme hatası:', error);
        }
      }

      alert('Öğrenciler başarıyla kaydedildi!');
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="add-student-container">
      <h2>Excel ile Öğrenci Ekle</h2>
      <button
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
            <img src={excelIcon} alt="Upload" />
          </div>
          <div className="upload-text">
            {selectedFile
              ? selectedFile.name
              : 'Excel dosyasını buraya tıklayarak ya da sürükleyerek yükleyebilirsiniz.'}
          </div>
        </label>
      </button>
      {uploadError && <p className="error-message">{uploadError}</p>}
      <button onClick={handleSubmit} className="submit-button">
        Kaydet
      </button>
      {errorRows.length > 0 && (
        <div className="error-container">
          <h3>Hatalı Satırlar</h3>
          {errorRows.map((error) => (
            <p key={error.row}> {/* Array index yerine row numarası kullanılıyor */}
              Satır {error.row}: {JSON.stringify(error.data)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddStudentExcel;
