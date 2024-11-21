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
import { CldImage } from 'next-cloudinary'
import { uploadFileToCloudinary } from '@/helpers/upload-image'
import { Input } from '@/components/ui/input'

const EditFaculty = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string>('')
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
    if (id) {
      fetchFacultyData()
    }
  }, [id])

  const fetchFacultyData = async () => {
    const response = await fetch(`/api/faculty/${id}`)
    if (response.ok) {
      const facultyData = await response.json()
      form.reset({
        name: facultyData.name,
        description: facultyData.description,
        image: facultyData.image,
      })
      if (!selectedFile) {
        setImagePreview(facultyData.image)
        setFileUrl(facultyData.image)
      }
    } else {
      toast.error('Failed to fetch faculty details.')
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const previewUrl = URL.createObjectURL(file)

      form.setValue('image', previewUrl)
      form.clearErrors('image')

      setImagePreview(previewUrl)
      setFileUrl(previewUrl)
    }
  }

  // Xử lý khi form được submit
  const onSubmit = async (values: z.infer<typeof FacultyFormValidation>) => {
    try {
      let uploadedUrl = values.image
      if (selectedFile) {
        const result = await uploadFileToCloudinary(selectedFile)
        if (result) {
          uploadedUrl = result
        } else {
          toast.error('Tải ảnh lên thất bại. Vui lòng thử lại!')
          return
        }
      }

      const response = await fetch(`/api/faculty`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          faculty: {
            id,
            ...values,
            image: uploadedUrl,
          },
        }),
      })

      if (response.ok) {
        toast.success('Faculty updated successfully!')
        router.push('/admin/faculty')
      } else {

        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.error(error)
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
                    <Input
                      type="text"
                      className="w-full rounded-md border border-stroke p-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary pr-[120px]"
                      value={fileUrl}
                      readOnly
                      placeholder="Chưa có file nào được chọn"
                      customProp={''}
                    />
                    <Label
                      htmlFor="file-input"
                      className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-4 bg-[#EEEEEE] rounded-r-md cursor-pointer"
                    >
                      Chọn file
                    </Label>
                    <Input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      customProp={''}
                    />
                    {form.formState.errors.image && (
                      <span className="text-red-500">
                        {form.formState.errors.image.message}
                      </span>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <CldImage
                        src={imagePreview}
                        width="80"
                        height="80"
                        crop="auto"
                        alt="Faculty Image"
                        className="bg-slate-400"
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
