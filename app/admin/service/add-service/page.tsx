'use client'
import React from 'react'
import CreateServiceForm from '@/components/forms/CreateServiceForm'
import DefaultLayout from '@/components/Layouts/defaultLayout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AddService = () => {
  const router = useRouter()
  return (
    <DefaultLayout>
      <div>
        <section className="sub-container">
          <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
            <Button
              onClick={() => router.push('/admin/service')}
              variant="ghost"
              className="flex items-center gap-2 hover:bg-transparent hover:text-primary"
            >
              <ArrowLeft size={16} />
              Quay lại
            </Button>

            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Thêm dịch vụ</h3>
            </div>
            <CreateServiceForm />
          </div>
        </section>
      </div>
    </DefaultLayout>
  )
}

export default AddService
