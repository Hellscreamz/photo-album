import React from 'react';

import AdminRegistration from './admin-registration/admin-registration';
import AdminLogin from './admin-login/admin-login';

const AdminPanel = () => {

  return (
    <div>
      <h1>Admin Panel</h1>
      <AdminRegistration />
      <AdminLogin />
    </div>
  );
};

export default AdminPanel;
