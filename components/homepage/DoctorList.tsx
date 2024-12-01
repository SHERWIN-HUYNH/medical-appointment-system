'use client'
import React, { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Link from 'next/link'
import { useAppointmentContext } from '@/context/AppointmentContext'
import { Button } from '@/components/ui/button'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { Doctor } from '@/types/interface'

function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const { setData } = useAppointmentContext()

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctor')
        const data: Doctor[] = await response.json()
        const activeDoctors = data.filter((doctor) => doctor.isActive)

        // Lấy tất cả các đánh giá một lần
        const ratingsResponse = await fetch('/api/comment')
        const ratings = await ratingsResponse.json()

        // Tính toán điểm trung bình cho từng bác sĩ
        const doctorsWithRatings = activeDoctors.map((doctor: Doctor) => {
          const doctorRatings = ratings.filter(
            (rating: { doctorId: string }) => rating.doctorId === doctor.id,
          )
          let averageRating: number
          if (doctorRatings.length > 0) {
            const sum = doctorRatings.reduce(
              (sum: number, rating: { rating: number }) => sum + rating.rating,
              0,
            )
            averageRating = sum / doctorRatings.length
          } else {
            averageRating = 0
          }

          return { ...doctor, averageRating }
        })

        setDoctors(doctorsWithRatings)
      } catch (error) {
        console.error('Failed to fetch doctors:', error)
      }
    }

    fetchDoctors()
  }, [])

  const handleDoctorClick = (facultyId: string, doctorId: string) => {
    setData({ facultyId, doctorId })
  }

  return (
    <section className="w-full bg-[#F8F8F8]">
      <div className="container mx-auto py-12">
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
                <div className="w-[280px] h-full bg-white border border-slate-200 rounded-lg p-4 cursor-pointer shadow-lg hover:scale-105 transition-all ease-in-out flex flex-col">
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
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-[13px] p-1 rounded-full px-2 bg-primary text-white w-fit">
                          {doctor.academicTitle}
                        </span>
                        <span className="text-sm text-orange-500">
                          Đánh giá:{' '}
                          {doctor.averageRating ? doctor.averageRating.toFixed(1) : '0'}{' '}
                          ⭐
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-semibold text-base line-clamp-1">
                          {doctor.name}
                        </h2>
                        <h2 className="text-sm line-clamp-1">
                          Chuyên khoa: {doctor.faculty.name}
                        </h2>
                        <h2 className="text-sm">
                          Giới tính: {doctor.gender ? 'Nam' : 'Nữ'}
                        </h2>
                        <h2 className="text-sm line-clamp-1">
                          Giới thiệu: {doctor.description}
                        </h2>
                      </div>
                    </div>
                    <Link
                      href={{
                        pathname: '/choose-service',
                        query: {
                          doctorName: doctor.name,
                          facultyName: doctor.faculty.name,
                        },
                      }}
                    >
                      <Button
                        className="mt-4 p-2.5 bg-transparent border border-primary text-primary rounded-full w-full text-center text-sm hover:bg-primary hover:text-white transition-all duration-300"
                        onClick={() => handleDoctorClick(doctor.facultyId, doctor.id)}
                      >
                        Đặt ngay
                      </Button>
                    </Link>
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
