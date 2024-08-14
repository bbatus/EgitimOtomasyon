import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import '../../../assets/styles/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-dashboard-container"> {/* Kapsayıcı Container Eklendi */}
        <div className="dashboard-content">
          <h1>Hoş geldiniz Ref Kolej Admin Kullanıcısı!</h1>
          <div className="dashboard-buttons">
            <button onClick={() => navigate('/dashboard/notifications')} className="dashboard-button">
              Bildirim Gönderme
            </button>
            <button onClick={() => navigate('/dashboard/video-solution')} className="dashboard-button">
              Deneme Sınavları
            </button>
            <button onClick={() => navigate('/dashboard/attendance')} className="dashboard-button">
              Yoklama Takibi
            </button>
            <button onClick={() => navigate('/dashboard/registration')} className="dashboard-button">
              Kayıt İşlemleri
            </button>
            <button onClick={() => navigate('/dashboard/homework-tracking')} className="dashboard-button">
              Ödev Takibi
            </button>
            <button onClick={() => navigate('/dashboard/guidance')} className="dashboard-button">
              Rehberlik İşlemleri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
