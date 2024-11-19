'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Doctor = {
  id: string
  name: string
  facultyId: string
  faculty: {
    name: string
  }
  image: string
  academicTitle: string
  gender: boolean
  isActive: boolean
}

function DoctorList() {
  const [showAll, setShowAll] = useState(false)
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctor')
        const data = await response.json()
        // Lọc chỉ lấy các bác sĩ đang active
        const activeDoctors = data.filter((doctor: Doctor) => doctor.isActive)
        setDoctors(activeDoctors)
      } catch (error) {
        console.error('Failed to fetch doctors:', error)
      }
    }

    fetchDoctors()
  }, [])

  const displayedDoctors = showAll ? doctors : doctors.slice(0, 4)

  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl">Popular Doctors</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {displayedDoctors.map((doctor) => (
          <div
            className="border-[1px] rounded-lg p-3 cursor-pointer border-slate-600 hover:shadow-sm hover:scale-105 transition-all ease-in-out"
            key={doctor.id}
          >
            <Image
              src={`/assets/doctor/${doctor.image}`}
              alt={`Doctor ${doctor.name}`}
              width={500}
              height={200}
              className="h-[250px] w-full object-cover rounded-lg"
            />
            <div className="mt-3 items-baseline flex flex-col gap-1">
              <h2 className="text-[15px] bg-primary p-1 rounded-full px-2 text-white">
                Bác sĩ
              </h2>
              <h2 className="font-semibold">{doctor.name}</h2>
              <h2 className="text-sm">Chuyên khoa: {doctor.faculty.name}</h2>
              <h2 className="text-sm">Học hàm/học vị: {doctor.academicTitle}</h2>
              <h2 className="text-sm">Giới tính: {doctor.gender ? 'Nam' : 'Nữ'}</h2>
              <h2
                className="p-2 px-3 border-[1px] border-primary text-primary rounded-full 
                w-full text-center text-[14px] mt-2 cursor-pointer hover:bg-primary hover:text-white"
              >
                Đặt ngay
              </h2>
            </div>
          </div>
        ))}
      </div>
      {doctors.length > 4 && (
        <div className="flex justify-center mt-10">
          <Button
            className="bg-primary hover:bg-[#56c2e6] text-white"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default DoctorList
