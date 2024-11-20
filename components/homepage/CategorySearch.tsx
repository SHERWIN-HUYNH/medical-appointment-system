'use client'
import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// Định nghĩa type Faculty
type Faculty = {
  id: string
  name: string
  description: string
  image: string
}

const CategorySearch = () => {
  // State để lưu trữ danh sách faculty
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false)

  // Fetch dữ liệu faculty khi component mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty')
        const data = await response.json()
        setFaculties(data)
      } catch (error) {
        console.error('Failed to fetch faculties:', error)
      }
    }

    fetchFaculties()
  }, [])

  // Thêm console.log để kiểm tra state
  console.log('Current faculties:', faculties)
  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories)
  }

  // Hiển thị danh sách các faculty dựa vào trạng thái showAllCategories
  const displayFaculties = showAllCategories
    ? faculties.slice(0, 12)
    : faculties.slice(0, 6)

  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Tìm kiếm <span className="text-primary">Bác sĩ</span>
      </h2>
      <h2 className="text-xl">Tìm kiếm bác sĩ của bạn vào bắt đầu đặt lịch hẹn</h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." className="border-slate-400" customProp={''} />
        <Button className="text-white bg-primary hover:bg-[#56c2e6]" type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      {/* Faculty List */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
        {displayFaculties.map((faculty) => (
          <div key={faculty.id}>
            <div className="flex flex-col text-center items-center p-5 bg-white border-2 border-slate-400 m-2 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out gap-2">
              <div className="p-4 rounded-3xl bg-primary">
                <Image
                  src={`/assets/icons/${faculty.image}`}
                  alt={faculty.name}
                  width={24}
                  height={24}
                  className="text-white h-6 w-6"
                />
              </div>
              <p className="text-blue-900 text-sm mt-2">{faculty.name}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="bg-primary hover:bg-[#56c2e6] text-white mt-3"
        onClick={toggleShowAllCategories}
      >
        {showAllCategories ? 'Thu gọn' : 'Xem thêm'}
      </Button>
    </div>
  )
}

export default CategorySearch
