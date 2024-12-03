'use client'
import React, { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Button } from '../ui/button'
import Link from 'next/link'
type Faculty = {
  id: string
  name: string
  description: string
  image: string
}

const CategorySearch = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/faculty')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        if (Array.isArray(data)) {
          setFaculties(data)
        } else {
          console.error('Data is not an array:', data)
          setFaculties([])
        }
      } catch (error) {
        console.error('Failed to fetch faculties:', error)
        setFaculties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFaculties()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="mb-10 items-center flex flex-col gap-2 py-12">
      <h2 className="font-bold text-4xl tracking-wide mb-8">
        <span className="text-primary uppercase">Chuyên khoa</span>
      </h2>
      <div className="w-[1000px] mt-5 custom-swiper">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={5}
          className="!static py-8"
        >
          {Array.isArray(faculties) &&
            faculties.map((faculty) => (
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
      <Link href="/faculty">
        <Button className="mt-6 px-8 py-2.5 bg-transparent text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium">
          Xem thêm
        </Button>
      </Link>
    </div>
  )
}

export default CategorySearch
