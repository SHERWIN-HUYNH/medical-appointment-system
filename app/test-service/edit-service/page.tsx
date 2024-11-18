'use client';
import React from 'react';
import DefaultLayout from '@/components/Layouts/defaultLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EditServiceForm from '@/components/forms/EditServiceForm';

const EditService = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <div>
        <section>
          <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
            <Button
              onClick={() => router.push('/test-service')}
              variant="ghost"
              className="flex items-center gap-2 hover:bg-transparent hover:text-primary"
            >
              <ArrowLeft size={16} />
              Quay lại
            </Button>

            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Sửa dịch vụ</h3>
            </div>
            <EditServiceForm />
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default EditService;
