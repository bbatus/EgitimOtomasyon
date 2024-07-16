import React from 'react';
import Sidebar from '../../../components/Sidebar';
import '../../../assets/styles/AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Admin Anasayfa</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
