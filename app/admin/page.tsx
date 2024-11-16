import AdminPage from '@/components/admin/Adminpage';
import DefaultLayout from '@/components/Layouts/defaultLayout';
import React from 'react';

const TestAdmin = () => {
  return (
    <DefaultLayout>
      <div>
        <AdminPage />
      </div>
    </DefaultLayout>
  );
};

export default TestAdmin;
