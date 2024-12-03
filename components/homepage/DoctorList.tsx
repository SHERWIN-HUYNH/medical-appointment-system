'use client'
import React, { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Link from 'next/link'
import { useAppointmentContext } from '@/context/AppointmentContext'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import 'swiper/css'
import 'swiper/css/navigation'
import { Doctor } from '@/types/interface'

interface Rating {
  doctorId: string
  rating: number
}

function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { setData } = useAppointmentContext()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/doctor')
        const doctorsData = await response.json()

        const activeDoctors = doctorsData.filter((doctor: Doctor) => doctor.isActive)

        const ratingsData: Rating[] = []
        try {
          const ratingsResponse = await fetch('/api/comment')
          if (ratingsResponse.ok) {
            const data = await ratingsResponse.json()
            ratingsData.push(...data)
          }
        } catch (error) {
          console.error('Failed to fetch ratings:', error)
        }

        const doctorsWithRatings = activeDoctors.map((doctor: Doctor) => {
          const doctorRatings = ratingsData.filter(
            (rating: Rating) => rating.doctorId === doctor.id,
          )
          let averageRating = 0
          if (doctorRatings.length > 0) {
            const sum = doctorRatings.reduce(
              (acc: number, rating: Rating) => acc + rating.rating,
              0,
            )
            averageRating = sum / doctorRatings.length
          }

          return { ...doctor, averageRating }
        })

        setDoctors(doctorsWithRatings)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctors()
  }, [])

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

  const handleViewMoreClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      toast.error('Vui lòng đăng nhập để xem danh sách bác sĩ')
      setTimeout(() => {}, 1500)
      return
    }
  }

  return (
    <div className="w-full bg-slate-100 mb-5 items-center flex flex-col gap-2 py-12">
      <h2 className="font-bold text-4xl mb-12 text-center">
        <span className="text-primary">Bác sĩ nổi bật</span>
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="w-[1200px] custom-swiper">
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
                      onClick={(e) => handleDoctorClick(e, doctor.facultyId, doctor.id)}
                    >
                      <Button className="mt-4 p-2.5 bg-transparent border border-primary text-primary rounded-full w-full text-center text-sm hover:bg-primary hover:text-white transition-all duration-300">
                        Đặt ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <Link href="/doctor" onClick={handleViewMoreClick}>
        <Button className="mt-6 px-8 py-2.5 bg-transparent text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium">
          Xem thêm
        </Button>
      </Link>
    </div>
  )
}

export default DoctorList
