import React, { useState } from 'react';
import AdminRegistration from './admin-registration/admin-registration';
import AdminLogin from './admin-login/admin-login';
import AdminStatistics from './admin-statistics/admin-statistics';
import './AdminPanel.css'
const AdminPanel = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  return (
    <div className={`admin-panel ${showAdminPanel ? 'show-admin-panel' : ''}`}>
      <h1>Admin Panel</h1>
      <button className="admin-toggle-button" onClick={toggleAdminPanel}>
        Toggle Admin Panel
      </button>

      {showAdminPanel && (
        <div className="admin-content">
          <AdminRegistration className="admin-component" />
          <AdminLogin className="admin-component" />
          <AdminStatistics className="admin-component" />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
