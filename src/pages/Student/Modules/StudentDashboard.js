import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/StudentSidebar';
import '../../../assets/styles/StudentDashboard.css';

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="student-dashboard-container">
        <div className="dashboard-content">
          <h1>Hoş geldiniz Ref Kolej Öğrencisi!</h1>
          <div className="dashboard-buttons">
            <button onClick={() => navigate('/student/video-solution')} className="dashboard-button">
              Video Çözümleri
            </button>
            <button onClick={() => navigate('/student/attendance')} className="dashboard-button">
              Devamsızlık Takibi
            </button>
            <button onClick={() => navigate('/student/homework-tracking')} className="dashboard-button">
              Ödev Takibi
            </button>
            <button onClick={() => navigate('/student/student-list')} className="dashboard-button">
              Öğrenci Listesi
            </button>
            <button onClick={() => navigate('/student/teacher-list')} className="dashboard-button">
              Öğretmen Listesi
            </button>
            <button onClick={() => navigate('/student/class-list')} className="dashboard-button">
              Ders Listesi
            </button>
            <button onClick={() => navigate('/student/guidance')} className="dashboard-button">
              Rehberlik
            </button>
            <button onClick={() => navigate('/student/notifications')} className="dashboard-button">
              Bildirimler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
