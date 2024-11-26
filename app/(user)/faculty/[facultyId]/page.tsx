'use client'
import React, { useEffect, useState } from 'react'
import FacultyLayout from '@/components/Layouts/facultyLayout'
import Link from 'next/link'

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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch faculty details
        const facultyResponse = await fetch(`/api/faculty/${params.facultyId}`)
        const facultyData = await facultyResponse.json()

        if (!facultyResponse.ok) {
          throw new Error(facultyData.error || 'Không thể tải thông tin chuyên khoa')
        }
        setFaculty(facultyData)

        // Fetch faculty services
        const servicesResponse = await fetch(`/api/service/faculty/${params.facultyId}`)
        const servicesData = await servicesResponse.json()

        if (servicesResponse.ok) {
          setServices(servicesData)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setError(error instanceof Error ? error.message : 'Đã có lỗi xảy ra')
        setLoading(false)
      }
    }

    fetchData()
  }, [params.facultyId])

  if (loading) {
    return (
      <FacultyLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
        </div>
      </FacultyLayout>
    )
  }

  if (error || !faculty) {
    return (
      <FacultyLayout>
        <div className="text-center text-red-500">
          {error || 'Không tìm thấy thông tin chuyên khoa'}
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
        <div className="rounded-lg shadow-md p-8">
          {/* Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">I. Giới thiệu chung</h2>
            <div
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faculty.description }}
            ></div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">II. Dịch vụ</h2>
            <div className="max-w-3xl">
              {services.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table-base">
                    <thead>
                      <tr>
                        <th className="table-cell table-header w-[250px]">TÊN DỊCH VỤ</th>
                        <th className="table-cell table-header">MÔ TẢ</th>
                        <th className="table-cell table-header w-[150px]">GIÁ DỊCH VỤ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id} className="hover:bg-slate-50">
                          <td className="table-cell primary-text">{service.name}</td>
                          <td className="table-cell text-slate-600">
                            {service.description}
                          </td>
                          <td className="table-cell text-blue-600 text-right">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(service.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-md">
                  <p className="text-slate-500">
                    Chuyên khoa này chưa có dịch vụ nào được cung cấp
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FacultyLayout>
  )
}
