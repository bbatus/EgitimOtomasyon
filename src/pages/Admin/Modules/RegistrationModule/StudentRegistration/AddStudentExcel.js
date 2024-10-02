import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../../../../../api/axiosInstance';
import { STUDENT_API } from '../../../../../api/apiEndpoints';
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/StudentRegistration/AddStudent.css';
import excelIcon from '../../../../../assets/images/excel.svg';

const AddStudentExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [errorRows, setErrorRows] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // Kayıt butonu kontrolü için state
  const navigate = useNavigate();

  // Dosya seçme işlemi
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (
      file &&
      (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
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

    // Dosya seçili değilse hata mesajı göster
    if (!selectedFile) {
      setUploadError('Lütfen bir dosya seçin.');
      return;
    }

    setIsSubmitting(true); // Kayıt işlemi başladığında butonu devre dışı bırak
    setUploadError('');
    setErrorRows([]);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Öğrenci verilerini parse et
        const students = jsonData.slice(1).map((row, i) => {
          const name = `${row[0] || ''} ${row[1] || ''}`; // AD ve SOYAD birleştirilmesi
          const tc = row[5] || 'Belirtilmedi'; // TC NUMARASI
          const classroom = `${row[6] || ''}-${row[7] || ''}`; // SINIF-ŞUBE birleştirilmesi

          // Eğer ad soyad ve TC numarası geçerli değilse hata olarak kaydet
          if (name.trim() && tc !== 'Belirtilmedi') {
            return { id: uuidv4(), name, tc, classroom };
          } else {
            setErrorRows((prev) => [...prev, { row: i + 2, data: row }]);
            return null;
          }
        }).filter(Boolean); // Null değerleri filtrele

        if (students.length === 0) {
          setNotification({ message: 'Geçerli bir öğrenci verisi bulunamadı.', type: 'error' });
          setIsSubmitting(false);
          return;
        }

        // Öğrencileri toplu eklemek için API'yi çağırıyoruz
        await axiosInstance.post(STUDENT_API.MULTIPLE_ADD, students);
        setNotification({ message: 'Öğrenciler başarıyla kaydedildi!', type: 'success' });
        navigate('/dashboard/registration/student');
      } catch (error) {
        setNotification({
          message: `Öğrenci eklenirken bir hata oluştu: ${error.response?.data?.message || error.message}`,
          type: 'error',
        });
      } finally {
        setIsSubmitting(false); // İşlem tamamlandığında butonu tekrar aktif et
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleBackClick = () => {
    navigate('/dashboard/registration/student');
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
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
      <button onClick={handleSubmit} className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'} {/* Buton metni değiştirildi */}
      </button>
      <button type="button" className="back-button" onClick={handleBackClick} disabled={isSubmitting}>
        Geri Dön
      </button>
      {errorRows.length > 0 && (
        <div className="error-container">
          <h3>Hatalı Satırlar</h3>
          {errorRows.map((error) => (
            <p key={error.row}>
              Satır {error.row}: {JSON.stringify(error.data)}
            </p>
          ))}
        </div>
      )}
      {notification.message && (
        <NotificationDialog
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </div>
  );
};

export default AddStudentExcel;
