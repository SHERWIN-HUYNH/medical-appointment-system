"use client"
import DefaultLayout from '@/components/Layouts/defaultLayout'
import React from 'react'
import AdminPage from '../admin/page'
import { useSession } from 'next-auth/react'

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