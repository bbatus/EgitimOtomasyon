import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddExam = ({ onSave, onCancel }) => {
  const [examDetails, setExamDetails] = useState({ title: '', date: null, type: '' });

  const handleExamDetailChange = (e) => {
    const { name, value } = e.target;
    setExamDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setExamDetails(prevDetails => ({
      ...prevDetails,
      date: date
    }));
  };

  const handleSaveClick = () => {
    if (!examDetails.title || !examDetails.date || !examDetails.type) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    onSave({
      ...examDetails,
      date: examDetails.date.toISOString().split('T')[0] // Tarihi ISO formatına çevirme
    });
  };

  return (
    <div className="add-exam-container">
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
        <DatePicker
          selected={examDetails.date}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="Tarih seçin"
          className="date-picker"
        />
      </div>
      <div className="form-group">
        <label>Sınav Türü</label>
        <div className="exam-type-options">
          <label className="radio-button">
            <input
              type="radio"
              name="type"
              value="TYT"
              checked={examDetails.type === 'TYT'}
              onChange={handleExamDetailChange}
            />
            TYT
          </label>
          <label className="radio-button">
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
        <button onClick={onCancel} className="cancel-button">İptal Et</button>
        <button onClick={handleSaveClick} className="save-button">Devam Et</button>
      </div>
    </div>
  );
};

export default AddExam;
