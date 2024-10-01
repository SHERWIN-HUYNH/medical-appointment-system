import DefaultLayout from '@/components/Layouts/defaultLayout'
import React from 'react'
import AdminPage from '../admin/page'


const TestAdmin = () => {
  return (
    <DefaultLayout>
      <div>
        <AdminPage/>
      </div>
    </DefaultLayout>
  )
}

export default TestAdmin