'use client'
import DefaultLayout from '@/components/Layouts/defaultLayout'
import SelectGroup from '@/components/SelectGroup'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { academicTitles } from '@/lib/data'
import { Faculty } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { uploadFileToCloudinary } from '@/helpers/upload-image'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DoctorFormValidation } from '@/validation/doctor'
import {
  FAILED_ADD_DOCTOR,
  SUCCESS_ADD_DOCTOR,
} from '@/validation/messageCode/apiMessageCode/doctor'
import { INVALID_IMAGE_DOCTOR } from '@/validation/messageCode/doctor'

const AddDoctorPage = () => {
  const router = useRouter()
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: '',
      image: '',
      academicTitle: '',
      faculty: '',
      description: '',
      isActive: true,
      gender: true,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const fetchFacultyData = async () => {
    try {
      const response = await fetch(`/api/faculty`)
      if (!response.ok) {
        throw new Error('Failed to fetch faculty data')
      }
      const data = await response.json()
      setFacultyData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFacultyData()
  }, [])

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
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
      const academicTitleName =
        academicTitles.find((title) => title.id === values.academicTitle)?.name ||
        values.academicTitle

      const response = await fetch(`/api/doctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          academicTitle: academicTitleName,
          image: uploadedUrl,
          description: values.description,
          facultyId: values.faculty,
          isActive: values.isActive,
          gender: values.gender,
        }),
      })

      if (!response.ok) {
        const message = await response.json()
        toast.error(message.error)
      }

      toast.success(SUCCESS_ADD_DOCTOR)
      // Reset form or redirect to doctor list page
      form.reset()
      setImagePreview(null)
    } catch (error) {
      console.log(error)
      toast.error(FAILED_ADD_DOCTOR)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Kiểm tra định dạng file
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (!validImageTypes.includes(file.type)) {
        toast.error(INVALID_IMAGE_DOCTOR)
        return
      }

      setSelectedFile(file)
      const previewUrl = URL.createObjectURL(file)

      form.setValue('image', previewUrl)
      form.clearErrors('image')

      setImagePreview(previewUrl)
    }
  }

  return (
    <FormProvider {...form}>
      <DefaultLayout>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Button
            onClick={() => router.push('/admin/doctor')}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-transparent hover:text-primary"
          >
            <ArrowLeft size={16} />
            Quay lại
          </Button>
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Thêm bác sĩ</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="mb-6 h-[90px]">
                    <Label className="mb-2.5 block font-medium text-black dark:text-white">
                      Họ và tên
                    </Label>
                    <Input
                      customProp={''}
                      type="text"
                      placeholder="Nhập họ tên bác sĩ"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-6 h-[90px]">
                    <SelectGroup
                      label="Chuyên khoa"
                      options={facultyData}
                      fieldName="faculty"
                    />
                    {errors.faculty && (
                      <span className="mt-10 text-sm text-red-500">
                        {errors.faculty.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label className="mb-2.5 block font-medium text-black dark:text-white">
                      Mô tả
                    </Label>
                    <Textarea
                      rows={5}
                      placeholder="Nhập mô tả"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      {...register('description')}
                    />
                    {errors.description && (
                      <span className="mt-1 text-sm text-red-500">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-6 h-[90px]">
                    <Label className="mb-4 block font-medium text-black dark:text-white">
                      Giới tính
                    </Label>
                    <RadioGroup
                      defaultValue={form.getValues('gender') ? 'true' : 'false'}
                      className="flex gap-4"
                      onValueChange={(value) => form.setValue('gender', value === 'true')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="male" />
                        <Label htmlFor="male">Nam</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="female" />
                        <Label htmlFor="female">Nữ</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && (
                      <span className="mt-1 text-sm text-red-500">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-6 h-[90px]">
                    <SelectGroup
                      label="Học hàm/học vị"
                      options={academicTitles}
                      fieldName="academicTitle"
                    />
                    {errors.academicTitle && (
                      <span className="mt-10 text-sm text-red-500">
                        {errors.academicTitle.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label className="mb-2.5 block font-medium text-black dark:text-white">
                      Hình ảnh
                    </Label>
                    <Input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="w-full rounded-md border border-stroke p-2 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                      onChange={handleImageChange}
                      customProp={''}
                    />
                    {errors.image && (
                      <span className="mt-1 text-sm text-red-500">
                        {errors.image.message}
                      </span>
                    )}
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={120}
                        height={120}
                        className="mt-4 object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Đang lưu...' : 'Thêm'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </DefaultLayout>
    </FormProvider>
  )
}

export default AddDoctorPage
