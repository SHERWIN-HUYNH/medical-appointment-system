'use client'
import { CldImage } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import FacultyLayout from './Layouts/facultyLayout'
import Link from 'next/link'
import Pagination from './Pagination'

interface Faculty {
  id: string
  name: string
  image: string
  description: string
}

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentFaculties = facultyData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(facultyData.length / itemsPerPage)

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty')
        if (response.ok) {
          const data = await response.json()
          setFacultyData(data)
        } else {
          setError('Không thể tải dữ liệu chuyên khoa')
        }
      } catch (error) {
        console.error(error)
        setError('Đã có lỗi xảy ra')
      } finally {
        setLoading(false)
      }
    }

    fetchFaculties()
  }, [])

  return (
    <FacultyLayout>
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
          </div>
        </div>
        {/* Title */}
        <div className="flex justify-center mt-2 mb-2 uppercase">
          <h1 className="text-2xl font-bold text-primary">Chuyên khoa</h1>
        </div>
        {/* Faculty Grid */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 w-full px-32 py-8">
          {loading ? (
            <div className="flex justify-center items-center col-span-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 col-span-2">{error}</div>
          ) : currentFaculties.length === 0 ? (
            <div className="text-center text-gray-500 col-span-2">
              Không có dữ liệu chuyên khoa
            </div>
          ) : (
            currentFaculties.map((faculty) => (
              <a
                key={faculty.id}
                href={`/faculty/${faculty.id}`}
                className="bg-white hover:bg-blue-50 transition-colors rounded-lg border border-slate-200 shadow-md h-auto flex flex-col"
              >
                <div className="flex items-center w-full">
                  {/* Icon */}
                  <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0 bg-gradient-to-b from-[#00b5f1] to-[#00a2ff] flex items-center justify-center">
                    <CldImage
                      src={`${faculty.image}`}
                      alt={faculty.name}
                      width={35}
                      height={35}
                      className="object-cover w-15 h-15"
                    />
                  </div>
                  {/* Content */}
                  <div className="ml-4 flex-grow">
                    <h3 className="text-base font-semibold text-blue-800 mb-1 uppercase">
                      {faculty.name}
                    </h3>
                    <Link
                      href={`/faculty/${faculty.id}`}
                      className="inline-flex items-center text-sm text-slate-700 hover:text-red-700 transition-colors"
                    >
                      <span>Xem chi tiết</span>
                    </Link>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4 mb-4">
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </FacultyLayout>
  )
}

export default FacultyPage
