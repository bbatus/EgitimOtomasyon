import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/CourseRegistration/CourseTopics.css';
import editIcon from '../../../../../assets/images/filter.svg';
import deleteIcon from '../../../../../assets/images/delete.svg';

const CourseTopics = () => {
  const [topics, setTopics] = useState([
    { id: 1, name: 'Sözcükte Anlam' },
    { id: 2, name: 'Cümlede Anlam' },
    { id: 3, name: 'Paragraf' },
    { id: 4, name: 'Ses Bilgisi' },
    { id: 5, name: 'Yazım Kuralları' },
    { id: 6, name: 'Noktalama İşaretleri' },
  ]);
  const [newTopic, setNewTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [editingTopicName, setEditingTopicName] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const topicsPerPage = 5;

  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, { id: topics.length + 1, name: newTopic.trim() }]);
      setNewTopic('');
    } else {
      alert('Lütfen geçerli bir konu başlığı giriniz.');
    }
  };

  const deleteTopic = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingTopicId(id);
    setEditingTopicName(name);
  };

  const saveEditing = () => {
    if (editingTopicName.trim()) {
      setTopics(
        topics.map((topic) =>
          topic.id === editingTopicId ? { ...topic, name: editingTopicName.trim() } : topic
        )
      );
      setEditingTopicId(null);
      setEditingTopicName('');
    } else {
      alert('Lütfen geçerli bir konu başlığı giriniz.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEditing(); // Enter tuşuna basıldığında düzenlemeyi kaydet
    }
  };

  const confirmDeleteCourse = () => {
    setShowDeleteConfirmation(false);
    alert('Ders silindi.');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = topics.slice(indexOfFirstTopic, indexOfLastTopic);
  const totalPages = Math.ceil(topics.length / topicsPerPage);

  const handleBackClick = () => {
    navigate('/dashboard/registration/course'); // Geri butonuna basıldığında ders kayıt sayfasına yönlendir
  };

  return (
    <div className="course-topics-container">
      <h1>Konu Başlıkları</h1>
      <table className="topics-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>KONU BAŞLIĞI</th>
            <th>DÜZENLE/SİL</th>
          </tr>
        </thead>
        <tbody>
          {currentTopics.map((topic, index) => (
            <tr key={topic.id}>
              <td>{indexOfFirstTopic + index + 1}</td>
              <td>
                {editingTopicId === topic.id ? (
                  <input
                    type="text"
                    value={editingTopicName}
                    onChange={(e) => setEditingTopicName(e.target.value)}
                    onKeyPress={handleKeyPress} // Enter tuşunu yakalamak için ekledik
                    autoFocus
                  />
                ) : (
                  topic.name
                )}
              </td>
              <td>
                {editingTopicId === topic.id ? (
                  null
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => startEditing(topic.id, topic.name)}
                    >
                      <img src={editIcon} alt="Edit" className="icon" />
                    </button>
                    <button className="delete-button" onClick={() => deleteTopic(topic.id)}>
                      <img src={deleteIcon} alt="Delete" className="icon" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
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
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </button>
      </div>
      <div className="delete-course">
        <button
          className="delete-course-button"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <img src={deleteIcon} alt="Delete Course" className="icon" />
        </button>
      </div>
      {showDeleteConfirmation && (
        <div className="confirmation-modal">
          <p>Dersi silmek istediğinizden emin misiniz?</p>
          <button onClick={confirmDeleteCourse}>Evet</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Hayır</button>
        </div>
      )}
      <div className="add-topic">
        <p>DERS: TYT-Türkçe</p>
        <input
          type="text"
          placeholder="Konu giriniz..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button className="add-button" onClick={addTopic}>
          Ekle
        </button>
      </div>
      <button type="button" className="back-button" onClick={handleBackClick}>
        Geri Dön
      </button>
    </div>
  );
};

export default CourseTopics;
