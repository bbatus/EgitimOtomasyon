import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../../api/axiosInstance'; // axios yerine axiosInstance kullanılıyor
import { STUDENT_API } from '../../../../../api/apiEndpoints'; // STUDENT_API kullanılıyor
import PropTypes from 'prop-types';
import RegistrationSearchBar from './RegistrationSearchBar';
import EditIcon from '../../../../../assets/images/pencil.svg';
import FilterIcon from '../../../../../assets/images/filter.svg';
import DeleteIcon from '../../../../../assets/images/delete.svg';
import NotificationDialog from '../../../../../components/NotificationDialog';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/RegistrationModule.css';

const StudentRegistration = ({ editStudent }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi state'i
  const [students, setStudents] = useState([]); // Öğrenci listesi state'i
  const [showAddOptions, setShowAddOptions] = useState(false); // Öğrenci ekleme seçeneği
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const [selectedClassroom, setSelectedClassroom] = useState(''); // Sınıf filtresi
  const [notification, setNotification] = useState({ message: '', type: '' }); // Bildirim state'i
  const studentsPerPage = 5; // Sayfa başına gösterilecek öğrenci sayısı

  // Öğrencileri listeleme fonksiyonu
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get(STUDENT_API.GET_ALL); // Öğrenci listesini al
      setStudents(response.data.students); // State'i güncelle
    } catch (error) {
      setNotification({ message: `Öğrenci bilgileri getirilemedi: ${error.message}`, type: 'error' }); // Hata bildirimi
    }
  };

  // Bileşen yüklendiğinde öğrencileri getir ve cleanup fonksiyonu ekle
  useEffect(() => {
    let isMounted = true; // Cleanup fonksiyonu için kontrol değişkeni

    const fetchData = async () => {
      if (isMounted) {
        await fetchStudents(); // Öğrenci bilgilerini çek
      }
    };

    fetchData();

    // Cleanup fonksiyonu: isMounted değişkenini false yap
    return () => {
      isMounted = false;
    };
  }, []);

  // Öğrenci silme işlemi
  const handleDeleteClick = async (student) => {
    const confirmed = window.confirm(`Öğrenci ${student.name} silmek istediğinize emin misiniz?`);
    if (confirmed) {
      try {
        await axiosInstance.delete(STUDENT_API.DELETE, {
          data: { tcNo: student.tc }, // Silinecek öğrencinin TC'sini gönder
        });
        // Öğrenciyi local state'den sil
        setStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
        setNotification({ message: 'Öğrenci başarıyla silindi!', type: 'success' });
      } catch (error) {
        setNotification({ message: `Öğrenci silinemedi: ${error.message}`, type: 'error' });
      }
    }
  };

  // Arama terimi değiştiğinde çalışacak fonksiyon
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Sınıf filtresi değiştiğinde çalışacak fonksiyon
  const handleClassroomFilterChange = (e) => setSelectedClassroom(e.target.value);

  // Sayfa değiştirildiğinde çalışacak fonksiyon
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Bildirim kapatıldığında çalışacak fonksiyon
  const handleNotificationClose = () => setNotification({ message: '', type: '' });

  // Öğrencileri filtreleme işlemi
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Arama terimi ile filtrele
    (selectedClassroom ? student.classroom === selectedClassroom : true) // Sınıf ile filtrele
  );

  // Sayfa başına gösterilecek öğrenci listesini hesapla
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage); // Toplam sayfa sayısını hesapla

  return (
    <div className="registration-module-container">
      <h1>Kayıt Modülü</h1>
      <div className="student-registration-container">
        <div className="student-header">
          <h2>Öğrenciler</h2>
          <div className="header-buttons">
            <button className="module-button" onClick={() => setShowAddOptions(!showAddOptions)}>
              Öğrenci Ekle
            </button>
            <div className="filter-container">
              <select className="filter-select" value={selectedClassroom} onChange={handleClassroomFilterChange}>
                <option value="">Tüm Sınıflar</option>
                {['9-A', '9-B', '9-C', '9-D', '10-A', '10-B', '10-C', '10-D', '11-A', '11-B', '11-C', '11-D', '12-A', '12-B', '12-C', '12-D'].map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <img src={FilterIcon} alt="Filter" className="filter-icon" />
            </div>
          </div>
        </div>
        <div className="search-container">
          <RegistrationSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="student-list">
          {currentStudents.map((student) => (
            <div key={student.id} className="student-item">
              <span>{student.name}</span>
              <button className="edit-button" onClick={() => editStudent(student)}>
                <img src={EditIcon} alt="Edit" />
              </button>
              <button className="delete-button" onClick={() => handleDeleteClick(student)}>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Önceki
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Sonraki
          </button>
        </div>
      </div>
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

StudentRegistration.propTypes = {
  editStudent: PropTypes.func.isRequired,
};

export default StudentRegistration;
