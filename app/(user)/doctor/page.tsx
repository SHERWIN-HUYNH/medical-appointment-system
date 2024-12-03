'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Pagination from '@/components/Pagination'
import DoctorLayout from '@/components/Layouts/doctorLayout'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { useAppointmentContext } from '@/context/AppointmentContext'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Doctor {
  id: string
  name: string
  academicTitle: string
  image: string
  description: string
  rating: number
  facultyName: string
  facultyId: string
}

interface Faculty {
  id: string
  name: string
}

const Doctor = () => {
  const formMethods = useForm()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const { data: session } = useSession()
  const { data, setData } = useAppointmentContext()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctor/user')
        const data = await response.json()
        if (response.ok) {
          console.log('DOCTOR USER', data)
          setDoctors(data)
          setFilteredDoctors(data)
        }
      } catch (error) {
        console.log('ERROR', error)
        toast.error('Lỗi khi kết nối với máy chủ')
      }
    }

    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty')
        const data = await response.json()
        setFaculties(data)
      } catch (error) {
        console.log('ERROR', error)
      }
    }

    fetchDoctors()
    fetchFaculties()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    filterDoctors(e.target.value, selectedTitle, selectedFaculty)
  }

  const handleTitleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value)
    filterDoctors(searchQuery, e.target.value, selectedFaculty)
  }

  const handleFacultyFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value)
    filterDoctors(searchQuery, selectedTitle, e.target.value)
  }

  const filterDoctors = (query: string, title: string, faculty: string) => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(query.toLowerCase())
      const matchesTitle = title ? doctor.academicTitle === title : true
      const matchesFaculty = faculty ? doctor.facultyName === faculty : true
      return matchesSearch && matchesTitle && matchesFaculty
    })
    setFilteredDoctors(filtered)
    setCurrentPage(1)
  }

  const handleDoctorClick = (
    e: React.MouseEvent,
    facultyId: string,
    doctorId: string,
  ) => {
    if (!session) {
      e.preventDefault()
      toast.error('Vui lòng đăng nhập để đặt lịch khám')
      setTimeout(() => {}, 1500)
      return
    }
    setData({ facultyId, doctorId })
  }

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage)
  const displayedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div>
      <div className="relative mt-16 w-full h-[250px] bg-sky-100 bg-cover bg-center">
        <div className="absolute inset-0 flex items-center ml-45 bg-opacity-25">
          <div className="text-left text-black p-6 bg-white bg-opacity-90 rounded-xl max-w-2xl shadow-lg">
            <h1 className="text-4xl font-semibold text-primary">ĐẶT KHÁM THEO BÁC SĨ</h1>
            <p className="mt-2 text-xl mb-4">
              Chủ động chọn bác sĩ mà bạn tin tưởng, an tâm khám bệnh
            </p>
          </div>
        </div>
        <Image
          src="https://cdn.medpro.vn/prod-partner/9a085fa0-374e-4aca-9ffe-6e6d2c5c03e7-dat-kham-theo-bac-si.webp"
          alt="Doctor and Nurse"
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-1/4 max-w-[350px] mr-35"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <DoctorLayout>
        <div className="flex justify-center mt-2 px-2 pt-1.5 pb-4">
          <div className="w-full bg-white p-1 rounded-2xl shadow-md">
            <FormProvider {...formMethods}>
              <form className="flex justify-center items-center gap-4">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Tìm kiếm bác sĩ"
                  className="p-2 w-5/6 text-sm border-white rounded-xl focus:ring-white"
                  customProp={''}
                />
                <select
                  value={selectedTitle}
                  onChange={handleTitleFilter}
                  className="p-2 text-sm text-primary border-white focus:ring-white rounded-xl"
                >
                  <option value="">Học hàm</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                  <option value="Giáo sư">Giáo sư</option>
                </select>
                <select
                  value={selectedFaculty}
                  onChange={handleFacultyFilter}
                  className="p-2 text-sm text-primary border-white focus:ring-white rounded-xl"
                >
                  <option value="">Chuyên khoa</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.name}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10">
            {displayedDoctors.length > 0 ? (
              displayedDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white p-2 rounded-lg shadow-md hover:scale-105 hover:border-primary border border-transparent"
                  style={{
                    width: '550px',
                    height: '190px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="flex items-center">
                    <CldImage
                      src={doctor.image}
                      alt={doctor.name}
                      width={100}
                      height={100}
                      crop="auto"
                      className="w-24 h-24 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-primary flex items-center">
                        {doctor.name}
                        <Star size={20} fill="gold" stroke="none" className="ml-2" />
                        <span className="ml-1 text-slate-500">{doctor.rating}</span>
                      </h3>

                      <ul className="text-sm text-slate-500 mt-2">
                        <li>
                          <span className="font-bold">Học hàm:</span>{' '}
                          {doctor.academicTitle}
                        </li>
                        <li>
                          <span className="font-bold">Chuyên khoa:</span>{' '}
                          {doctor.facultyName}
                        </li>
                        <li>
                          <span className="font-bold ">Giới thiệu:</span>{' '}
                          <span className="line-clamp-1">{doctor.description}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr className="mt-2 text-slate-300" />
                  <div className="flex justify-end mt-2">
                    <Link
                      href={{
                        pathname: '/choose-service',
                        query: {
                          doctorName: doctor.name,
                          facultyName: doctor.facultyName,
                        },
                      }}
                    >
                      <Button
                        className="w-32 text-white bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-3xl"
                        onClick={(e) => handleDoctorClick(e, doctor.facultyId, doctor.id)}
                      >
                        Đặt khám ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="flex justify-center text-center text-slate-500">
                Không có dữ liệu bác sĩ.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </DoctorLayout>
    </div>
  )
}

export default Doctor
