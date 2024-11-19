'use client'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import DefaultLayout from '@/components/Layouts/defaultLayout'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FacultyFormValidation } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { Label } from '@/components/ui/label'

const EditFaculty = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  // Khởi tạo form với validation schema và giá trị mặc định
  const form = useForm<z.infer<typeof FacultyFormValidation>>({
    resolver: zodResolver(FacultyFormValidation),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
  })

  // Khởi tạo router và lấy id từ URL params
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  // Hook useEffect để fetch dữ liệu chuyên khoa khi component được mount
  useEffect(() => {
    const fetchFacultyData = async () => {
      const response = await fetch(`/api/faculty/${id}`)

      if (response.ok) {
        // Nếu fetch thành công, cập nhật form với dữ liệu từ server
        const facultyData = await response.json()
        form.reset({
          name: facultyData.name,
          description: facultyData.description,
          image: facultyData.image,
        })
        setImagePreview(facultyData.image)
        setFileName(facultyData.image || '')
      } else {
        // Hiển thị thông báo lỗi nếu fetch thất bại
        toast.error('Failed to fetch faculty details.')
      }
    }

    if (id) fetchFacultyData()
  }, [id, form])
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      toast.error('Vui lòng tải lên một tệp hình ảnh')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Chỉ cho phép tải lên các tệp hình ảnh')
      event.target.value = ''
      return
    }
    setImageFile(file)
    form.setValue('image', file.name)
    setImagePreview(file.name)
    setFileName(file.name)
  }

  // Xử lý khi form được submit
  const onSubmit = async (values: z.infer<typeof FacultyFormValidation>) => {
    const response = await fetch(`/api/faculty`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faculty: { id, ...values } }),
    })

    if (response.ok) {
      // Hiển thị thông báo thành công và chuyển hướng
      toast.success('Faculty updated successfully!')
      router.push('/test-faculty')
    } else {
      // Hiển thị thông báo lỗi nếu cập nhật thất bại
      toast.error('Failed to update faculty.')
    }
  }

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
              <div className="flex gap-6">
                {/* Cột 1: Chuyên khoa và Mô tả */}
                <div className="flex-1">
                  <div className="mb-4.5">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="name"
                      label="Chuyên khoa"
                      placeholder="Nhập tên chuyên khoa"
                    />
                  </div>

                  <div className="mb-4.5">
                    <CustomFormField
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="description"
                      label="Mô tả"
                      placeholder="Nhập mô tả chuyên khoa"
                    />
                  </div>
                </div>

                {/* Cột 2: Hình ảnh */}
                <div className="flex-1">
                  <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Hình ảnh
                  </Label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-md border border-stroke p-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary pr-[120px]"
                      value={fileName}
                      readOnly
                      placeholder="Chưa có file nào được chọn"
                    />
                    <label
                      htmlFor="file-input"
                      className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-4 bg-[#EEEEEE] rounded-r-md cursor-pointer"
                    >
                      Chọn file
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-4 flex rounded-lg">
                      <img
                        src={`/assets/icons/${imagePreview}`}
                        alt="Image Preview"
                        className="w-30 h-30 object-cover bg-slate-300"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>
              </div>

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
  )
}

export default EditFaculty
