'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { RiEmpathizeFill, RiMoneyDollarCircleLine } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import { FaBookMedical, FaNewspaper, FaVenusMars } from 'react-icons/fa'
import {
  Cake,
  CircleDot,
  CircleUser,
  Mails,
  PencilLine,
  Smartphone,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import Modal from '@/components/Modal'
import { toast } from 'sonner'
import type { BillInfor, Profile } from '@/types/interface'
import Header from '@/components/homepage/Header'
import Footer from '@/components/homepage/Footer'
import MedicalRecord from '@/components/Patient/MedicalRecord'
import PaymentHistory from '@/components/Patient/PaymentHistory'
import ProfileDetailModal from '@/components/Patient/ProfileDetailModal'

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(1)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [bills, setBills] = useState<BillInfor[]>()
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`/api/profile/${session?.user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu hồ sơ')
        }
        const profiles = await response.json()
        setProfiles(profiles)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hồ sơ:', error)
      }
    }
    const fetchBills = async () => {
      try {
        const response = await fetch(`/api/bill/${session?.user?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu hồ sơ')
        }
        const bills = await response.json()
        setBills(bills)
      } catch (error) {
        console.log('ERROR', error)
      }
    }
    fetchBills()
    if (session?.user?.id) {
      fetchProfiles()
    }
  }, [])

  const handleDeleteProfile = async () => {
    if (profileToDelete === null) return

    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileValues: { id: profileToDelete },
        }),
      })
      if (!response.ok) {
        toast.error('Lỗi khi xóa hồ sơ, hồ sơ này đang có lịch hẹn.Vui lòng thử lại sau!')
      } else {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== profileToDelete),
        )
        toast.success('Xóa hồ sơ thành công')
      }
    } catch {
      toast.error('Lỗi khi xóa hồ sơ')
    } finally {
      setIsModalOpen(false)
      setProfileToDelete(null)
    }
  }
  const handleShowProfile = (profile: Profile) => {
    setSelectedProfile(profile)
    setIsDetailModalOpen(true)
  }

  const Buttons = [
    { id: 1, name: 'Hồ sơ bệnh nhân', icon: <FaBookMedical /> },
    { id: 2, name: 'Phiếu khám bệnh', icon: <FaNewspaper /> },
    { id: 3, name: 'Lịch sử thanh toán viện phí', icon: <RiMoneyDollarCircleLine /> },
  ]

  return (
    <div>
      <Header />
      <div className="mt-[80px] flex justify-center p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="rounded-lg flex flex-col items-center p-4 w-full lg:w-auto">
            <Link href={`/patients/${session?.user.id}/profile/add-profile`}>
              <Button className="group justify-start w-full gap-2 items-center p-3 rounded-3xl border-2 border-slate-50 bg-white hover:bg-gradient-to-r hover:from-[#00b5f1] hover:to-[#00e0ff] hover:text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
                <RiEmpathizeFill className="text-primary group-hover:text-white" />
                Thêm hồ sơ khám bệnh
              </Button>
            </Link>
            <hr className="w-full border-t-2 border-primary mt-4" />
            <ul className="mt-4 w-full">
              {Buttons.map((item) => (
                <li key={item.id} className="mt-2 w-full">
                  <Button
                    className={`w-full gap-2 flex items-center justify-start p-3 hover:bg-gradient-to-r hover:from-[#00b5f1] hover:to-[#00e0ff] bg-white hover:text-white ${
                      selectedOption === item.id ? 'bg-slate-100 text-primary' : ''
                    }`}
                    onClick={() => setSelectedOption(item.id)}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg lg:col-span-2 p-4 bg-white w-full">
            {selectedOption === 1 && (
              <div>
                <h2 className="text-lg font-bold">Danh sách hồ sơ bệnh nhân</h2>
                <hr className="w-full border-t-2 border-primary mt-4" />
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="mt-6 text-sm rounded-xl shadow-md border border-slate-200 border-solid mb-2"
                    >
                      <div className=" p-4 flex flex-col gap-4 lg:flex-row ">
                        <div className="rounded-lg flex-1">
                          <ul className="list-none space-y-2">
                            <li className="flex items-center gap-x-2 text-primary">
                              <CircleUser className="w-5 h-5" />
                              <span className=" uppercase font-medium">
                                {profile.name}
                              </span>
                            </li>
                            <li className="flex items-center gap-x-2 ">
                              <Mails className="w-5 h-5 text-slate-400" />
                              <span className="text-slate-400">Email:</span>
                              <span>{profile.email}</span>
                            </li>
                            <li className="flex items-center gap-x-2">
                              <Smartphone className="w-5 h-5 text-slate-400" />
                              <span className="text-slate-400">Số điện thoại:</span>
                              <span>
                                {profile.phone
                                  ? profile.phone.replace(
                                      /(\d{3})\d{4}(\d{3})/,
                                      '$1****$2',
                                    )
                                  : 'N/A'}
                              </span>
                            </li>
                            <li className="flex items-center gap-x-2">
                              <Cake className="w-5 h-5 text-slate-400" />
                              <span className="text-slate-400">Ngày sinh:</span>
                              <span>
                                {profile.birthDate
                                  ? new Date(profile.birthDate).toLocaleDateString()
                                  : 'N/A'}
                              </span>
                            </li>
                            <li className="flex items-center gap-x-2">
                              <FaVenusMars className="w-5 h-5 text-slate-400" />
                              <span className="text-slate-400">Giới tính:</span>
                              <span>{profile.gender === 'FEMALE' ? 'Nữ' : 'Nam'}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className=" flex bg-[#f5f5f5] justify-end px-4 py-2">
                        <Button
                          className=" text-red-400  bg-transparent hover:bg-transparent text-sm"
                          onClick={() => {
                            setProfileToDelete(profile.id)
                            setIsModalOpen(true)
                          }}
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Xóa hồ sơ
                        </Button>
                        <Link
                          href={{
                            pathname: `/patients/${profile.id}/profile/edit-profile`,
                            query: {
                              id: profile.id,
                              name: profile.name,
                              email: profile.email,
                              phone: profile.phone,
                              gender: profile.gender,
                              identificationType: profile.identificationType,
                              identificationNumber: profile.identificationNumber,
                              identificationDocumentUrl:
                                profile.identificationDocumentUrl,
                              pastMedicalHistory: profile.pastMedicalHistory,
                              symptom: profile.symptom,
                              birthDate: profile.birthDate
                                ? profile.birthDate.toString()
                                : '',
                            },
                          }}
                        >
                          <Button className=" text-primary bg-transparent hover:bg-transparent text-sm">
                            <PencilLine className="w-4 h-4 inline mr-1" />
                            Sửa hồ sơ
                          </Button>
                        </Link>
                        <Button
                          className=" text-black bg-transparent hover:bg-transparent text-sm px-4 py-2"
                          onClick={() => handleShowProfile(profile)}
                        >
                          <CircleDot className="w-4 h-4 inline mr-1" />
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="mt-4text-slate-400 text-base">
                    Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.
                  </p>
                )}
              </div>
            )}

            {selectedOption === 2 && (
              <div>
                <h2 className="text-lg font-bold">Danh sách phiếu khám bệnh</h2>
                <hr className="w-full border-t-2 border-blue-300 mt-4" />
                <br />
                <MedicalRecord appointments={bills} />
              </div>
            )}
            {selectedOption === 3 && (
              <div>
                <h2 className="text-lg font-bold">Lịch sử thanh toán viện phí</h2>
                <hr className="w-full border-t-2 border-blue-300 mt-4" />
                <br />
                <PaymentHistory bills={bills} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteProfile}
        message="Bạn có chắc chắn muốn xóa hồ sơ này không?"
      />
      {selectedProfile && (
        <ProfileDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          profile={selectedProfile}
        />
      )}
    </div>
  )
}

export default Profile
