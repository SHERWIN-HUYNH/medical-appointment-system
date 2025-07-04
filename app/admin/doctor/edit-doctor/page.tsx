'use client'
import DefaultLayout from '@/components/Layouts/defaultLayout'
import SelectGroup from '@/components/SelectGroup'
import SwitcherToggle from '@/components/SwitcherToggle'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { academicTitles } from '@/lib/data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Faculty } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ConfirmModal from '@/components/ConfirmModal'
import { uploadFileToCloudinary } from '@/helpers/upload-image'
import { CldImage } from 'next-cloudinary'
import { DoctorFormValidation } from '@/validation/doctor'
import {
  DOCTOR_FACULTY_ACTIVE_APPOINTMENT,
  DOCTOR_STATUS_ACTIVE_APPOINTMENT_EXIST,
  FAILED_UPDATE_STATUS_DOCTOR,
  SUCCESS_UPDATE_DOCTOR,
  SUCCESS_UPDATE_STATUS_DOCTOR,
} from '@/validation/messageCode/apiMessageCode/doctor'
import { INVALID_IMAGE_DOCTOR } from '@/validation/messageCode/doctor'

const EditDoctor = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(false)
  const [gender, setGender] = useState<boolean>(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null)
  // State để lưu trữ faculty ban đầu
  const [initialFaculty, setInitialFaculty] = useState<string>('')
  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: '',
      image: '',
      academicTitle: '',
      faculty: '',
      description: '',
      isActive: false,
      gender: true,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const getAcademicTitleId = useCallback((name: string) => {
    const title = academicTitles.find((title) => title.name === name)
    return title?.id || ''
  }, [])

  const fetchFacultyData = useCallback(async () => {
    const response = await fetch(`/api/faculty`)
    if (response.ok) {
      const data = await response.json()
      setFacultyData(data)
    }
  }, [])

  const fetchDoctorData = useCallback(async () => {
    const response = await fetch(`/api/doctor/${id}`)
    if (response.ok) {
      const doctor = await response.json()
      // Tìm ID của academic title dựa trên tên
      const academicTitleId = getAcademicTitleId(doctor.academicTitle)
      setInitialFaculty(doctor.facultyId)
      form.reset({
        name: doctor.name,
        academicTitle: academicTitleId, // Sử dụng ID thay vì name
        faculty: doctor.facultyId,
        image: doctor.image,
        description: doctor.description,
        isActive: doctor.isActive,
        gender: doctor.gender,
      })

      if (!selectedFile) {
        setImagePreview(doctor.image)
        setFileUrl(doctor.image)
      }
      setIsActive(doctor.isActive)
      setGender(doctor.gender)
    }
  }, [id, selectedFile, form, getAcademicTitleId])

  useEffect(() => {
    fetchFacultyData()
    if (id) {
      fetchDoctorData()
    }
  }, [id, fetchFacultyData, fetchDoctorData])

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
      setFileUrl(previewUrl)
    }
  }

  const handleToggle = (value: boolean) => {
    if (!value) {
      setPendingStatus(value)
      setShowConfirmModal(true)
    } else {
      setIsActive(value)
      form.setValue('isActive', value)
    }
  }

  const handleGenderChange = (value: string) => {
    const genderValue = value === 'true'
    setGender(genderValue)
    form.setValue('gender', genderValue)
  }

  const handleConfirmStatusChange = async () => {
    if (pendingStatus === null) return

    try {
      const response = await fetch('/api/doctor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor: {
            id: id,
            ...form.getValues(),
            isActive: pendingStatus,
          },
        }),
      })

      if (response.ok) {
        setIsActive(pendingStatus)
        form.setValue('isActive', pendingStatus)
        toast.success(SUCCESS_UPDATE_STATUS_DOCTOR)
      } else {
        const message = await response.json()
        toast.error(message.error)
      }
    } catch (error) {
      console.log(error)
      toast.error(FAILED_UPDATE_STATUS_DOCTOR)
    } finally {
      setShowConfirmModal(false)
      setPendingStatus(null)
    }
  }

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
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

    // Lấy tên của academic title từ ID
    const academicTitleName = academicTitles.find(
      (title) => title.id === values.academicTitle,
    )?.name

    if (!academicTitleName) {
      toast.error('Học hàm/học vị không hợp lệ')
      return
    }

    const response = await fetch(`/api/doctor`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctor: {
          id,
          ...values,
          image: uploadedUrl,
          academicTitle: academicTitleName, // Gửi tên thay vì ID
        },
      }),
    })

    if (response.ok) {
      toast.success(SUCCESS_UPDATE_DOCTOR)
      router.push('/admin/doctor')
    } else {
      const message = await response.json()
      toast.error(message.error)
      // Nếu cập nhật thất bại do bác sĩ có lịch hẹn, reset trạng thái
      if (message.error === DOCTOR_STATUS_ACTIVE_APPOINTMENT_EXIST) {
        setIsActive(true)
        form.setValue('isActive', true)
      }
      if (message.error === DOCTOR_FACULTY_ACTIVE_APPOINTMENT) {
        form.setValue('faculty', initialFaculty)
      }
    }
  }

  return (
    <DefaultLayout>
      <FormProvider {...form}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sửa thông tin bác sĩ
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="grid grid-cols-2 gap-8">
                {/* Cột trái */}
                <div className="space-y-8">
                  {/* Họ và tên */}
                  <div className="h-[90px]">
                    <Label className="mb-2.5 block font-medium text-black dark:text-white">
                      Họ và tên
                    </Label>
                    <Input
                      customProp={''}
                      type="text"
                      placeholder="Nhập họ tên bác sĩ"
                      {...register('name')}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.name && (
                      <span className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Học hàm/học vị */}
                  <div className="h-[90px]">
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

                  {/* Chuyên khoa */}
                  <div className="h-[90px]">
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

                  {/* Mô tả - đặt ở cuối */}
                  <div>
                    <Label className="mb-2.5 block font-medium text-black dark:text-white">
                      Mô tả
                    </Label>
                    <Textarea
                      rows={6}
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

                {/* Cột phải */}
                <div className="space-y-8">
                  {/* Trạng thái hoạt động */}
                  <div className="h-[90px]">
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Trạng thái hoạt động
                    </Label>
                    <SwitcherToggle enabled={isActive} onToggle={handleToggle} />
                  </div>

                  {/* Giới tính */}
                  <div className="h-[90px]">
                    <Label className="mb-6 block font-medium text-black dark:text-white">
                      Giới tính
                    </Label>
                    <RadioGroup
                      defaultValue={gender ? 'true' : 'false'}
                      value={gender ? 'true' : 'false'}
                      className="flex gap-8"
                      onValueChange={handleGenderChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="true"
                          id="male"
                          checked={gender === true}
                        />
                        <Label htmlFor="male">Nam</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="false"
                          id="female"
                          checked={gender === false}
                        />
                        <Label htmlFor="female">Nữ</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Hình ảnh */}
                  <div className="h-[90px]">
                    <Label className="mb-2.5 block font-medium text-black dark:text-white">
                      Hình ảnh
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        className="w-full rounded-md border border-stroke p-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary pr-[120px]"
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
                    </div>
                    {/* Preview ảnh */}
                    {imagePreview && (
                      <div className="relative w-[100px] h-[100px]">
                        <CldImage
                          src={`${imagePreview}`}
                          alt="Image Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Nút submit */}
              <div className="mt-6 flex justify-end">
                <button className="w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Thêm Modal */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false)
            setPendingStatus(null)
          }}
          onConfirm={handleConfirmStatusChange}
          title="Xác nhận thay đổi trạng thái"
          description="Bạn có chắc muốn thay đổi trạng thái hoạt động của bác sĩ này không?"
        />
      </FormProvider>
    </DefaultLayout>
  )
}

export default EditDoctor
