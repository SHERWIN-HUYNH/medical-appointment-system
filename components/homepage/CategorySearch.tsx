'use client'
import React, { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { Button } from '../ui/button'

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

  return (
    <div className="mb-10 items-center flex flex-col gap-2 py-12">
      <h2 className="font-bold text-4xl tracking-wide mb-8">
        <span className="text-primary uppercase">Chuyên khoa</span>
      </h2>
      {/* Faculty List with Swiper */}
      <div className="w-[1000px] mt-5 custom-swiper">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={5}
          className="!static py-8"
        >
          {faculties.map((faculty) => (
            <SwiperSlide key={faculty.id} className="py-4">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thêm button Xem thêm */}
      <Button className="mt-6 px-8 py-2.5 bg-transparent text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium">
        Xem thêm
      </Button>
    </div>
  )
}

export default CategorySearch
