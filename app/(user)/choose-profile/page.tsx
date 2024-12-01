'use client'

import UserLayout from '@/components/Layouts/userLayout'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  FaUser,
  FaBirthdayCake,
  FaPhone,
  FaEnvelope,
  FaVenusMars,
  FaTrash,
  FaEdit,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
} from 'react-icons/fa'
import { toast } from 'sonner'
import Modal from '@/components/Modal'
import Link from 'next/link'
import { useAppointmentContext } from '@/context/AppointmentContext'

interface Profile {
  id: string
  name: string
  birthDate?: Date
  gender: 'FEMALE' | 'MALE'
  email: string
  phone: string
  allergies?: string
  identificationType: string
  identificationNumber: string
  identificationDocumentUrl: string
  pastMedicalHistory: string
}

const ChooseProfile: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null)
  const router = useRouter()
  const { data } = useAppointmentContext()
  const searchParams = useSearchParams()
  const date = searchParams.get('date')
  const timeSlot = searchParams.get('timeSlot')
  const price = searchParams.get('price')
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`/api/profile/${session?.user?.id}/chooseProfile`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        if (!response.ok) throw new Error('Lỗi khi lấy dữ liệu hồ sơ')
        const data = await response.json()
        setProfiles(data)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hồ sơ:', error)
      }
    }
    if (session?.user?.id) fetchProfiles()
  }, [])

  const handleDeleteProfile = async () => {
    if (!profileToDelete) return
    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileValues: { id: profileToDelete } }),
      })
      if (!response.ok) throw new Error()
      setProfiles((prev) => prev.filter((p) => p.id !== profileToDelete))
      toast.success('Xóa hồ sơ thành công')
    } catch {
      toast.error('Lỗi khi xóa hồ sơ')
    } finally {
      setIsModalOpen(false)
      setProfileToDelete(null)
    }
  }

  const handleProfileClick = (profileId: string) => {
    setSelectedProfile(profileId)
    console.log('Selected profile:', profileId)
  }

  const handleContinue = (profileId: string) => {
    const { serviceId, facultyId, doctorId } = data
    const selectedProfileData = profiles.find((p) => p.id === profileId)
    console.log('Context data:', data)
    if (!date || !timeSlot) {
      toast.error('Thiếu thông tin đặt khám')
      console.log('Debug info:', {
        context: data,
        queryParams: { date, timeSlot },
      })
      return
    }

    // Chuyển đến trang payment với đầy đủ thông tin
    router.push(
      `/appointment?` +
        `date=${date}&` +
        `timeSlot=${timeSlot}&` +
        `price=${price}&` +
        `profileName=${selectedProfileData?.name}&` +
        `profileId=${profileId}&` +
        `doctorId=${doctorId}&` +
        `facultyId=${facultyId}&` +
        `userId=${session?.user?.id}&` +
        `serviceId=${serviceId}&`,
    )
  }

  return (
    <UserLayout>
      <div className="text-primary text-center font-semibold text-lg mt-2 mb-4">
        CHỌN HỒ SƠ BỆNH NHÂN
      </div>
      {profiles.length === 0 ? (
        <div className="text-center text-slate-400 mt-6">
          Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.
        </div>
      ) : (
        <div className="space-y-6 w-[550px] mx-auto px-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`text-sm border-2 border-white bg-white p-4 hover:border-primary transition-colors shadow-xs cursor-pointer ${selectedProfile === profile.id ? 'border-primary' : ''}`}
              onClick={() => handleProfileClick(profile.id)}
            >
              <div className="flex items-center text-primary font-bold mb-2">
                <FaUser className="mr-2" />
                {profile.name}
              </div>

              <div className="flex items-center mb-2">
                <FaBirthdayCake className="mr-2 text-slate-400" />
                <span className="text-slate-400">Ngày sinh: </span>
                <span className="ml-2">
                  {profile.birthDate
                    ? new Date(profile.birthDate).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>

              <div className="flex items-center mb-2">
                <FaPhone className="mr-2 text-slate-400" />
                <span className="text-slate-400">Số điện thoại: </span>
                <span className="ml-2">{profile.phone}</span>
              </div>

              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <FaEnvelope className="mr-2 text-slate-400" />
                  <span className="text-slate-400">Email: </span>
                  <span className="ml-2">{profile.email}</span>
                </div>
                <div className="flex items-center mb-4">
                  <FaVenusMars className="mr-2 text-slate-400" />
                  <span className="text-slate-400">Giới tính: </span>
                  <span className="ml-2">
                    {profile.gender === 'FEMALE' ? 'Nữ' : 'Nam'}
                  </span>
                </div>
                <hr className="text-slate-400 mt-2 mb-2" />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      className="flex items-center text-xs bg-red-50 text-red-400 py-1 px-4 rounded hover:bg-red-400 hover:text-white transition"
                      onClick={() => {
                        setProfileToDelete(profile.id)
                        setIsModalOpen(true)
                      }}
                    >
                      <FaTrash className="mr-2" />
                      Xóa
                    </Button>
                    <Link
                      href={{
                        pathname: `/patients/${profile.id}/profile/edit-profile`,
                        query: {
                          id: profile.id,
                          name: profile.name,
                          phone: profile.phone,
                        },
                      }}
                    >
                      <Button className="flex items-center text-xs bg-blue-50 text-blue-400 py-1 px-4 rounded hover:bg-blue-400 hover:text-white transition">
                        <FaEdit className="mr-2" />
                        Sửa
                      </Button>
                    </Link>
                  </div>
                  <Button
                    className="flex items-center bg-primary text-white py-1 px-4 rounded-lg shadow-md transform transition duration-200 "
                    onClick={() => handleContinue(profile.id)}
                  >
                    <FaArrowRight className="mr-2" />
                    Tiếp tục
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="mt-6 border-slate-400" />
      <div className="flex justify-between max-w-lg mx-auto mt-2 py-2">
        <Button
          className="text-slate-400 bg-slate-100 py-2 px-4 rounded-lg hover:bg-slate-200 shadow-md transform transition duration-200 hover:scale-105"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="mr-2" />
          Quay lại
        </Button>
        <Button
          className="bg-primary text-white py-2 px-4 rounded-lg shadow-md transform transition duration-200 hover:scale-105"
          onClick={() => router.push(`/patients/${session?.user.id}/profile/add-profile`)}
        >
          <FaPlus className="mr-2" />
          Thêm hồ sơ
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteProfile}
        message="Bạn có chắc chắn muốn xóa hồ sơ này không?"
      />
    </UserLayout>
  )
}

export default ChooseProfile
