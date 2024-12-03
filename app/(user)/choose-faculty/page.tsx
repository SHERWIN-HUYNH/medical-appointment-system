'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import UserLayout from '@/components/Layouts/userLayout'
import { useAppointmentContext } from '@/context/AppointmentContext'

interface Faculty {
  id: string
  name: string
  description?: string
}

const ChooseFaculty = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const { setData } = useAppointmentContext()

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty')
        const data = await response.json()
        setFaculties(data || [])
      } catch (error) {
        console.log(error)
        setFaculties([])
      }
    }
    fetchFaculties()
  }, [])

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFacultyClick = (facultyId: string) => {
    setData({ facultyId })
  }

  return (
    <UserLayout>
      <section className="flex space-x-7 max-w-screen-xl px-4 pb-4 mt-5">
        <div className="w-[300px] rounded-lg bg-white h-max flex-shrink-0">
          <h1 className="blue-header w-full">Thông tin khám</h1>
          <ul className="px-3 py-2 flex flex-col gap-2">
            <li className="text-16-normal flex">
              <div className="mr-2">
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
                  className="lucide lucide-hospital"
                >
                  <path d="M12 6v4" />
                  <path d="M14 14h-4" />
                  <path d="M14 18h-4" />
                  <path d="M14 8h-4" />
                  <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                  <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
                </svg>
              </div>
              <div className="flex justify-center flex-col text-sm">
                <p>
                  Bệnh Viện Quận Bình Thạnh
                  <br />
                  <span className="text-slate-600">
                    132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <main className="w-[700px] bg-white flex flex-col h-min justify-between overflow-hidden flex-shrink-0">
          <h1 className="blue-header w-full text-sm">Vui lòng chọn chuyên khoa</h1>
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Tìm nhanh chuyên khoa"
                className="w-full p-1.5 border rounded-md pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
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
            <div className="flex flex-col gap-1 h-[280px] overflow-y-auto custom-scrollbar bg-white">
              {filteredFaculties && filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <Link
                    key={faculty.id}
                    href={{
                      pathname: '/choose-doctor',
                      query: { facultyName: faculty.name },
                    }}
                    onClick={() => handleFacultyClick(faculty.id)}
                    className="py-2 px-3 hover:bg-gray-50 text-slate-500 hover:text-primary cursor-pointer border-b border-slate-200 transition-all duration-300 ease-in-out"
                  >
                    <div className="font-medium mb-0.5 text-sm">{faculty.name}</div>
                    {faculty.description && (
                      <div className="text-[11px] mt-1 italic line-clamp-2">{faculty.description}</div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Không tìm thấy chuyên khoa nào
                </div>
              )}
            </div>
            <div className="mt-3 border-t pt-3">
              <Button className="text-sm bg-transparent text-slate-500 hover:text-primary flex items-center gap-1">
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
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
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

export default ChooseFaculty
