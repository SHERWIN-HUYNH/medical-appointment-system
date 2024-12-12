'use client'
import React from 'react'
import DefaultLayout from '@/components/Layouts/defaultLayout'
import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import { Form } from '@/components/ui/form'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { uploadFileToCloudinary } from '@/helpers/upload-image'
import { Input } from '@/components/ui/input'
import { FacultyFormValidation } from '@/validation/faculty'
import {
  FAILED_ADD_FACULTY,
  SUCCESS_ADD_FACULTY,
} from '@/validation/messageCode/apiMessageCode/faculty'
import { INVALID_IMAGE_FACULTY } from '@/validation/messageCode/faculty'

const AddFaculty = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof FacultyFormValidation>>({
    resolver: zodResolver(FacultyFormValidation),
    defaultValues: {
      name: '',
      description: '',
      image: '',
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Kiểm tra định dạng file
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (!validImageTypes.includes(file.type)) {
        toast.error(INVALID_IMAGE_FACULTY)
        return
      }

      setSelectedFile(file)
      const previewUrl = URL.createObjectURL(file)

      form.setValue('image', previewUrl)
      form.clearErrors('image')

      setImagePreview(previewUrl)
    }
  }

  const onSubmit = async (values: z.infer<typeof FacultyFormValidation>) => {
    setLoading(true)
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

      const response = await fetch('/api/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, image: uploadedUrl }),
      })

      if (!response.ok) {
        const message = await response.json()
        toast.error(message.error)
        return
      }

      toast.success(SUCCESS_ADD_FACULTY)
    } catch (error) {
      console.error(error)
      toast.error(FAILED_ADD_FACULTY)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark">
        <Button
          onClick={() => router.push('/admin/faculty')}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft size={16} />
          Quay lại
        </Button>

        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Thêm chuyên khoa</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="flex gap-6">
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
                <div className="flex-1">
                  <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Hình ảnh
                  </Label>
                  <div className="mt-3 bg-slate-50">
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-full rounded-md border border-stroke p-2 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                      onChange={handleImageChange}
                      customProp={''}
                    />
                    {form.formState.errors.image && (
                      <span className="text-red-500">
                        {form.formState.errors.image.message}
                      </span>
                    )}
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="mt-4 object-cover bg-slate-300"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DefaultLayout>
  )
}

export default AddFaculty
