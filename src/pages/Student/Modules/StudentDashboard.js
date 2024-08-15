import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/StudentSidebar';
import '../../../assets/styles/StudentDashboard.css'; // Öğrenciye özel stil dosyası

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">
      <Sidebar />
      <div className="student-dashboard-container"> {/* Kapsayıcı Container */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
