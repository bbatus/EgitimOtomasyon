import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../assets/styles/Admin/Modules/RegistrationModule/CourseRegistration/AddCourse.css';

const AddCourse = ({ addCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('TYT');
  const navigate = useNavigate();

  const handleAddCourse = () => {
    if (courseName.trim()) {
      addCourse({ courseName: courseName.trim(), courseType });
      navigate('/dashboard/registration/course');
    } else {
      alert('Lütfen ders adını giriniz');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/registration/course');
  };

  return (
    <div className="add-course-container">
      <h1>Ders Ekle</h1>
      <div className="form-group">
        <label>Ders Adı</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Ders adı giriniz..."
        />
      </div>
      <div className="form-group">
        <label>Ders Türü</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="TYT"
              checked={courseType === 'TYT'}
              onChange={(e) => setCourseType(e.target.value)}
            />
            TYT
          </label>
          <label>
            <input
              type="radio"
              value="AYT"
              checked={courseType === 'AYT'}
              onChange={(e) => setCourseType(e.target.value)}
            />
            AYT
          </label>
        </div>
      </div>
      <div className="button-group">
        <button type="button" className="cancel-button" onClick={handleCancel}>İptal Et</button>
        <button type="button" className="submit-button" onClick={handleAddCourse}>Devam Et</button>
      </div>
    </div>
  );
};

export default AddCourse;
