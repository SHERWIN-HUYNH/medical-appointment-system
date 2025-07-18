'use client'
import { Button } from '@/components/ui/button'
import { Undo2, PenLine } from 'lucide-react'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CldImage } from 'next-cloudinary'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import { uploadFileToCloudinary } from '@/helpers/upload-image'
import {
  capitalizeFirstLetterOfSentence,
  capitalizeWords,
  handleKeyPress,
  isValidIdentificationNumber,
} from '@/helpers/data_normalization'
import {
  FAILED_UPDATE_PROFILE,
  INCORRECT_IDENTIFICATION,
  SUCCESS_UPDATE_PROFILE,
} from '@/validation/messageCode/apiMessageCode/profile'
import { FAILED_UPLOAD_IMAGE } from '@/validation/messageCode/uploadImage'

const Edit_Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const email = searchParams.get('email')
  const name = searchParams.get('name')
  const phone = searchParams.get('phone')
  const gender = searchParams.get('gender')
  const identificationType = searchParams.get('identificationType')
  const identificationNumber = searchParams.get('identificationNumber')
  const identificationDocumentUrl = searchParams.get('identificationDocumentUrl')
  const pastMedicalHistory = searchParams.get('pastMedicalHistory')
  const birthDate = searchParams.get('birthDate')
  const symptom = searchParams.get('symptom')

  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    phone: phone || '',
    gender: gender || '',
    identificationType: identificationType || '',
    identificationNumber: identificationNumber || '',
    identificationDocumentUrl: identificationDocumentUrl || '',
    pastMedicalHistory: pastMedicalHistory || '',
    birthDate: birthDate || '',
    symptom: symptom || '',
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const today = new Date().toISOString().split('T')[0]
  const [errorMessage, setErrorMessage] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === 'identificationNumber' && isValidIdentificationNumber(value)) {
      setErrorMessage('')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const previewUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        identificationDocumentUrl: previewUrl,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValidIdentificationNumber(formData.identificationNumber)) {
      setErrorMessage(INCORRECT_IDENTIFICATION)
      return
    }

    let uploadedUrl = formData.identificationDocumentUrl
    if (selectedFile) {
      try {
        const result = await uploadFileToCloudinary(selectedFile)
        if (!result) {
          toast.error(FAILED_UPLOAD_IMAGE)
          return
        }
        uploadedUrl = result
      } catch (error) {
        toast.error(error instanceof Error ? error.message : FAILED_UPLOAD_IMAGE)
        return
      }
    }

    const formattedData = {
      ...formData,
      name: capitalizeWords(formData.name),
      symptom: capitalizeFirstLetterOfSentence(formData.symptom),
      pastMedicalHistory: capitalizeFirstLetterOfSentence(formData.pastMedicalHistory),
      identificationDocumentUrl: uploadedUrl,
      birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
    }

    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: {
            ...formattedData,
            id: id,
          },
        }),
      })

      if (response.ok) {
        toast.success(SUCCESS_UPDATE_PROFILE)
        router.back()
      } else {
        toast.error(FAILED_UPDATE_PROFILE)
      }
    } catch (error) {
      toast.error(FAILED_UPDATE_PROFILE)
    }
  }

  return (
    <div>
      <Header />
      <div className="flex justify-start mt-20 ml-24">
        <Button
          className="bg-slate-400 text-white rounded hover:bg-slate-300 px-4 py-2"
          onClick={() => router.back()}
        >
          <Undo2 className="w-4 h-4 inline mr-1" />
          Quay lại
        </Button>
      </div>

      <div className="mt-[30px] h-max mb-10">
        <div className="w-2/3 mx-auto h-max rounded-lg bg-slate-100 p-6 lg:col-span-2 text-center">
          <h1 className="text-lg mb-4">SỬA HỒ SƠ KHÁM BỆNH</h1>
          <hr className="w-2/3 mx-auto mt-10 border-slate-400 mb-4" />
          <h3 className="mt-4 font-bold">NHẬP THÔNG TIN BỆNH NHÂN</h3>
          <div className="mt-4 p-4 border border-blue-400 bg-blue-50 rounded-md text-left text-sm">
            <p>
              Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường
              hợp cung cấp sai thông tin bệnh nhân & số điện thoại, việc xác nhận cuộc hẹn
              sẽ không hiệu lực trước khi đặt khám.
            </p>
          </div>

          <form
            className="mt-4 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2 text-sm"
            onSubmit={handleSubmit}
          >
            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Họ và tên</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: '30px', fontSize: '14px' }}
                placeholder="Nhập họ và tên"
                customProp={''}
              />
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Ngày sinh</Label>
              <Input
                type="date"
                name="birthDate"
                value={
                  formData.birthDate
                    ? new Date(formData.birthDate).toISOString().slice(0, 10)
                    : ''
                }
                max={today}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: '30px', fontSize: '14px' }}
                customProp={''}
              />
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: '30px', fontSize: '14px' }}
                customProp={''}
              />
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Số điện thoại</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: '30px', fontSize: '14px' }}
                placeholder="Nhập số điện thoại"
                customProp={''}
              />
            </div>
            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Giới tính</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                required
              >
                <SelectTrigger
                  className="w-full p-1 border-slate-300 bg-white rounded text-sm"
                  style={{ height: '30px', fontSize: '14px' }}
                >
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white">
                  <SelectItem className="hover:text-primary" value="MALE">
                    Nam
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="FEMALE">
                    Nữ
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Loại giấy định danh</Label>
              <Select
                value={formData.identificationType}
                onValueChange={(value) =>
                  setFormData({ ...formData, identificationType: value })
                }
                required
              >
                <SelectTrigger
                  className="w-full p-1 border border-slate-300 bg-white rounded text-sm"
                  style={{ height: '30px', fontSize: '14px' }}
                >
                  <SelectValue placeholder="Chọn loại giấy" />
                </SelectTrigger>
                <SelectContent className="bg-white border-white">
                  <SelectItem className="hover:text-primary" value="CCCD">
                    Căn cước công dân
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="CMND">
                    Chứng minh nhân dân
                  </SelectItem>
                  <SelectItem className="hover:text-primary" value="PASSPORT">
                    Hộ chiếu
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-slate-100 p-1">
              <div>
                <Label className="block mb-1 text-left">Số giấy định danh</Label>
                <Input
                  type="text"
                  name="identificationNumber"
                  value={formData.identificationNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-1 border border-slate-300 rounded text-sm"
                  style={{ height: '30px', fontSize: '14px' }}
                  placeholder="Nhập số giấy định danh"
                  customProp={''}
                />
                {errorMessage && (
                  <p className="text-red-500 text-xs mt-1 text-left">{errorMessage}</p>
                )}
              </div>
              <div className="rounded-lg bg-slate-100 ">
                <Label className="block mt-1 mb-1 text-left">Lịch sử bệnh án</Label>
                <Textarea
                  name="pastMedicalHistory"
                  value={formData.pastMedicalHistory}
                  onChange={handleChange}
                  className="w-full mt-1 p-1 border border-slate-300 rounded text-sm"
                  style={{ fontSize: '14px' }}
                  placeholder="Nhập lịch sử bệnh án"
                />
              </div>
            </div>
            <div className="rounded-lg bg-slate-100 p-1">
              <Label className="block mb-1 text-left">Triệu chứng</Label>
              <Textarea
                name="symptom"
                value={formData.symptom}
                onChange={handleChange}
                required
                className="w-full p-1 border border-slate-300 rounded text-sm"
                style={{ height: '133px', fontSize: '14px' }}
                placeholder="Nhập triệu chứng bệnh"
              />
            </div>

            <div className="rounded-lg w-full bg-slate-100 p-1 lg:col-span-2">
              <Label className="block mb-1 text-left">Hình ảnh bảo hiểm y tế</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-1 border border-slate-300 rounded text-sm bg-white"
                style={{ height: '30px', fontSize: '14px' }}
                customProp={''}
              />
              {formData.identificationDocumentUrl && (
                <div className="mt-2">
                  <CldImage
                    src={formData.identificationDocumentUrl}
                    width="450"
                    height="250"
                    crop="auto"
                    style={{ aspectRatio: '16 / 9' }}
                    alt={'Identification Document'}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-2 text-right">
              <Button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-400 mr-2"
              >
                <PenLine className="w-4 h-4 inline mr-1" />
                Sửa hồ sơ
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Edit_Profile
