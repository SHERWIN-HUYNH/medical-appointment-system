'use client';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import DefaultLayout from '@/components/Layouts/defaultLayout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FacultyFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { FacultyRepository } from '@/repositories/faculty';

const EditFaculty = () => {
  // Khởi tạo form với validation schema và giá trị mặc định
  const form = useForm<z.infer<typeof FacultyFormValidation>>({
    resolver: zodResolver(FacultyFormValidation),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Khởi tạo router và lấy id từ URL params
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Hook useEffect để fetch dữ liệu chuyên khoa khi component được mount
  useEffect(() => {
    const fetchFacultyData = async () => {
      const response = await fetch(`/api/faculty/${id}`);

      if (response.ok) {
        // Nếu fetch thành công, cập nhật form với dữ liệu từ server
        const facultyData = await response.json();
        form.reset({
          name: facultyData.name,
          description: facultyData.description,
        });
      } else {
        // Hiển thị thông báo lỗi nếu fetch thất bại
        toast.error('Failed to fetch faculty details.');
      }
    };

    if (id) fetchFacultyData();
  }, [id, form]);

  // Xử lý khi form được submit
  const onSubmit = async (values: z.infer<typeof FacultyFormValidation>) => {
    const response = await fetch(`/api/faculty`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faculty: { id, ...values } }),
    });

    if (response.ok) {
      // Hiển thị thông báo thành công và chuyển hướng
      toast.success('Faculty updated successfully!');
      router.push('/test-faculty');
    } else {
      // Hiển thị thông báo lỗi nếu cập nhật thất bại
      toast.error('Failed to update faculty.');
    }
  };

  // Render giao diện form chỉnh sửa
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
        {/* Tiêu đề form */}
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Sửa chuyên khoa</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-6.5">
              {/* Trường nhập tên chuyên khoa */}
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Chuyên khoa"
                  placeholder="Nhập tên chuyên khoa"
                />
              </div>

              {/* Trường nhập mô tả */}
              <div className="mb-4.5">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="description"
                  label="Mô tả"
                  placeholder="Nhập mô tả chuyên khoa"
                />
              </div>
              {/* Nút lưu */}
              <div className="flex justify-end">
                <Button className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Lưu
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default EditFaculty;
