import React from 'react';

import AdminRegistration from './admin-registration/admin-registration';
import AdminLogin from './admin-login/admin-login';
import AdminStatistics from './admin-statistics/admin-statistics';
const AdminPanel = () => {

  return (
    <div>
      <h1>Admin Panel</h1>
      <AdminRegistration />
      <AdminLogin />
      <AdminStatistics />
    </div>
  );
};

export default AdminPanel;
