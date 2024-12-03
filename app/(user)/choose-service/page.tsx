'use client'
import React from 'react'
import UserLayout from '@/components/Layouts/userLayout'
import { Button } from '@/components/ui/button'
import { Service } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAppointmentContext } from '@/context/AppointmentContext'
import Link from 'next/link'

const ChooseService = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const router = useRouter()
  const { data, setData } = useAppointmentContext()
  const searchParams = useSearchParams()
  const doctorName = searchParams.get('doctorName')
  const facultyName = searchParams.get('facultyName')
  const facultyId = data.facultyId
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      if (!facultyId) {
        router.push('/choose-faculty')
        return
      }
      try {
        setIsLoading(true)
        const response = await fetch(`/api/service/faculty/${facultyId}`)
        const serviceData = await response.json()

        if (Array.isArray(serviceData)) {
          setServices(serviceData)
        } else {
          console.error('API returned invalid data:', serviceData)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  const filteredServices = services.filter((service) =>
    String(service.name || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  )

  return (
    <UserLayout>
      <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
        {/* Sidebar */}
        <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
          <h1 className="blue-header w-full">Thông tin khám</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className="mt-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6v4" />
                  <path d="M14 14h-4" />
                  <path d="M14 18h-4" />
                  <path d="M14 8h-4" />
                  <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                  <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
                </svg>
              </p>
              <p>
                Bệnh Viện Quận Bình Thạnh
                <br />
                <span className="text-slate-600">
                  132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh
                </span>
              </p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 2v2" />
                  <path d="M5 2v2" />
                  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                  <path d="M8 15a6 6 0 0 0 12 0v-3" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </p>
              <p>
                Chuyên khoa: <span className="text-slate-600">{facultyName}</span>
              </p>
            </li>
            <li className="card-item">
              <p className="mt-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 22h13a2.5 2.5 0 0 0 2.5-2.5v-1a4 4 0 0 0-4-4h-10a4 4 0 0 0-4 4v1A2.5 2.5 0 0 0 5.5 22z" />
                  <path d="M10 12v3m4-3v3m-2-1.5h2m-2 0h-2" />
                </svg>
              </p>
              <p>
                Bác sĩ: <span className="text-slate-600">{doctorName}</span>
              </p>
            </li>
          </ul>
        </div>

        <main className="w-[700px] bg-white flex flex-col h-min justify-between overflow-hidden flex-shrink-0">
          <h1 className="blue-header w-full text-sm">Vui lòng chọn dịch vụ</h1>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Tìm nhanh dịch vụ"
                className="w-full p-1.5 border rounded-md pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div className="flex flex-col gap-3 h-[280px] overflow-y-auto custom-scrollbar bg-white px-1">
              {isLoading ? (
                <div className="text-center text-slate-400 py-6">Đang tải...</div>
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <Link
                    key={service.id}
                    href={{
                      pathname: `/doctor/${data.doctorId}/schedule`,
                      query: {
                        facultyName,
                        doctorName,
                        serviceName: service.name,
                        price: service.price,
                      },
                    }}
                    className="p-4 border border-slate-200 rounded-lg hover:bg-slate-100"
                    onClick={() => {
                      setData({
                        ...data,
                        serviceId: service.id,
                      })
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-semibold">{service.name}</h3>
                        <p className="text-sm text-slate-600">{service.description}</p>
                        <p className="text-sm text-primary mt-1">
                          Giá: {service.price.toLocaleString('vi-VN')} VNĐ
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center text-slate-400 py-6">
                  Không có dịch vụ nào
                </div>
              )}
            </div>
            <div className="mt-3 border-t pt-3">
              <Button
                onClick={() => router.back()}
                className="text-sm bg-transparent text-slate-500 hover:text-primary flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 5-7 7 7 7" />
                </svg>
                Quay lại
              </Button>
            </div>
          </div>
        </main>
      </section>
    </UserLayout>
  )
}

export default ChooseService
