'use client'
import React, { useEffect, useState } from 'react'
import FacultyLayout from '@/components/Layouts/facultyLayout'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { CldImage } from 'next-cloudinary'
import 'swiper/css'
import 'swiper/css/navigation'
import { toast } from 'sonner'
import { useAppointmentContext } from '@/context/AppointmentContext'
import { useSession } from 'next-auth/react'

interface Service {
  id: string
  name: string
  description: string
  price: number
  facultyId: string
}

interface FacultyDetail {
  id: string
  name: string
  description: string
  image: string
}

export default function FacultyDetailPage({ params }: { params: { facultyId: string } }) {
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [otherFaculties, setOtherFaculties] = useState<FacultyDetail[]>([])
  const { setData } = useAppointmentContext()
  const { data: session } = useSession()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyResponse = await fetch(`/api/faculty/${params.facultyId}`)
        const facultyData = await facultyResponse.json()

        if (!facultyResponse.ok) {
          throw new Error(facultyData.error || 'Không thể tải thông tin chuyên khoa')
        }
        setFaculty(facultyData)
        const servicesResponse = await fetch(`/api/service/faculty/${params.facultyId}`)
        const servicesData = await servicesResponse.json()

        if (servicesResponse.ok) {
          setServices(servicesData)
        }
        const otherFacultiesResponse = await fetch('/api/faculty')
        const otherFacultiesData = await otherFacultiesResponse.json()

        if (otherFacultiesResponse.ok) {
          const filteredFaculties = otherFacultiesData.filter(
            (f: FacultyDetail) => f.id !== params.facultyId,
          )
          setOtherFaculties(filteredFaculties)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        toast.error(error instanceof Error ? error.message : 'Đã có lỗi xảy ra')
        setLoading(false)
      }
    }

    fetchData()
  }, [params.facultyId])

  const handleServiceClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      toast.error('Vui lòng đăng nhập để đặt lịch khám')
      setTimeout(() => {}, 1500)
      return
    }
    setData({ facultyId: params.facultyId })
  }

  if (loading) {
    return (
      <FacultyLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
        </div>
      </FacultyLayout>
    )
  }

  if (!faculty) {
    return (
      <FacultyLayout>
        <div className="text-center text-red-500">
          {'Không tìm thấy thông tin chuyên khoa'}
        </div>
      </FacultyLayout>
    )
  }

  return (
    <FacultyLayout>
      {/* Content */}
      <div className="w-full flex flex-col h-full bg-slate-50">
        {/* Breadcrumb */}
        <div className="py-4 mb-6 shadow-sm bg-blue-50">
          <div className="flex items-center gap-2 text-sm text-slate-700 px-8">
            <Link href="/" className="hover:text-blue-700 hover:underline">
              Trang chủ
            </Link>
            <span className="text-slate-400">|</span>
            <Link href="/faculty" className="hover:text-blue-700 hover:underline">
              Chuyên khoa
            </Link>
            <span className="text-slate-400">|</span>
            <span className="text-blue-600">{faculty.name}</span>
          </div>
        </div>
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 uppercase mb-4">
            {faculty.name}
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Main Content Container */}
        <div className="rounded-lg p-8">
          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">I. Giới thiệu chung</h2>
            <div
              className="text-slate-700 text-lg leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: faculty.description }}
            ></div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">II. Dịch vụ</h2>
            <div className="w-full">
              <p className="mb-4 text-lg text-slate-700">
                Bạn có thể đặt lịch hẹn với chuyên khoa này{' '}
                <Link
                  href={{
                    pathname: '/choose-doctor',
                    query: { facultyName: faculty.name },
                  }}
                  className="text-primary hover:underline font-medium"
                  onClick={handleServiceClick}
                >
                  tại đây
                </Link>
                .
              </p>

              {services.length > 0 ? (
                <ul className="pl-6 space-y-4 list-none">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className="text-lg text-slate-700 before:content-['-'] before:mr-2"
                    >
                      {service.name}: {service.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-md">
                  <p className="text-lg text-slate-500">
                    Chuyên khoa này chưa có dịch vụ nào được cung cấp
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thêm divider */}
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="h-[1px] bg-slate-400"></div>
        </div>

        {/* Other Faculties Section */}
        <div className="mt-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 uppercase">
              Chuyên Khoa Khác
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </div>

          <div className="w-full mx-auto custom-swiper">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={20}
              slidesPerView={5}
              className="!static py-8"
            >
              {otherFaculties.map((faculty) => (
                <SwiperSlide key={faculty.id} className="py-4">
                  <Link href={`/faculty/${faculty.id}`}>
                    <div className="w-[160px] h-[160px] flex flex-col text-center items-center p-4 bg-white border border-slate-200 rounded-lg cursor-pointer shadow-lg hover:scale-105 transition-all ease-in-out gap-3">
                      <div className="p-4 rounded-2xl bg-primary">
                        <CldImage
                          src={`${faculty.image}`}
                          alt={faculty.name}
                          width={35}
                          height={35}
                          className="text-white h-9 w-9"
                        />
                      </div>
                      <p className="text-sm text-blue-900 mt-1 min-h-[40px] line-clamp-2 break-words hyphens-auto">
                        {faculty.name}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </FacultyLayout>
  )
}
