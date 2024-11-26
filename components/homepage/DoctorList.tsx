'use client'
import React, { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

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
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctor')
        const data = await response.json()
        const activeDoctors = data.filter((doctor: Doctor) => doctor.isActive)
        setDoctors(activeDoctors)
      } catch (error) {
        console.error('Failed to fetch doctors:', error)
      }
    }

    fetchDoctors()
  }, [])

  return (
    <section className="w-full bg-[#F8F8F8]">
      <div className="container mx-auto py-16">
        <h2 className="font-bold text-4xl mb-12 text-center">
          <span className="text-primary">Bác sĩ nổi bật</span>
        </h2>

        <div className="doctor-swiper custom-swiper">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={24}
            slidesPerView={4}
            className="!static py-8"
          >
            {doctors.map((doctor) => (
              <SwiperSlide key={doctor.id} className="h-full py-8">
                <div className="w-[280px] h-full bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ease-in-out flex flex-col">
                  <div className="w-full h-[200px] overflow-hidden rounded-lg flex-shrink-0">
                    <CldImage
                      src={`${doctor.image}`}
                      alt={`Doctor ${doctor.name}`}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="mt-4 space-y-2">
                      <span className="inline-block text-[13px] bg-primary p-1 rounded-full px-2 text-white w-fit">
                        Bác sĩ
                      </span>
                      <div className="space-y-2">
                        <h2 className="font-semibold text-base line-clamp-1">
                          {doctor.name}
                        </h2>
                        <h2 className="text-sm line-clamp-1">
                          Chuyên khoa: {doctor.faculty.name}
                        </h2>
                        <h2 className="text-sm line-clamp-1">
                          Học hàm/học vị: {doctor.academicTitle}
                        </h2>
                        <h2 className="text-sm">
                          Giới tính: {doctor.gender ? 'Nam' : 'Nữ'}
                        </h2>
                      </div>
                    </div>
                    <button className="mt-4 p-2.5 border border-primary text-primary rounded-full w-full text-center text-sm hover:bg-primary hover:text-white transition-all duration-300">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default DoctorList
