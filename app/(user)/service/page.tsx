'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Pagination from '@/components/Pagination'
import DoctorLayout from '@/components/Layouts/doctorLayout'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FAILED_GET_SERVICE } from '@/validation/messageCode/apiMessageCode/service'
import { FAILED_GET_FACULTY } from '@/validation/messageCode/apiMessageCode/faculty'
import { LOGIN_REQUIRED } from '@/validation/messageCode/authentication'

interface Service {
  id: string
  name: string
  price: number
  description: string
  facultyName: string
}

interface Faculty {
  id: string
  name: string
}

const ServiceList = () => {
  const formMethods = useForm()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const { data: session } = useSession()
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const itemsPerPage = 6

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/service/user')
        const data = await response.json()
        if (response.ok) {
          setServices(data)
          setFilteredServices(data)
        } else {
          toast.error(FAILED_GET_SERVICE)
        }
      } catch (error) {
        toast.error(FAILED_GET_SERVICE)
      }
    }
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/faculty')
        const data = await response.json()
        setFaculties(data)
      } catch (error) {
        toast.error(FAILED_GET_FACULTY)
      }
    }

    fetchServices()
    fetchFaculties()
  }, [])

  const filterServices = (query: string, faculty: string) => {
    const filtered = services.filter((service) => {
      const matchesQuery = service.name.toLowerCase().includes(query.toLowerCase())
      const matchesFaculty = faculty ? service.facultyName === faculty : true
      return matchesQuery && matchesFaculty
    })
    setFilteredServices(filtered)
    setCurrentPage(1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterServices(query, selectedFaculty)
  }

  const handleFacultyFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const faculty = e.target.value
    setSelectedFaculty(faculty)
    filterServices(searchQuery, faculty)
  }

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleBookingClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      toast.error(LOGIN_REQUIRED)
      setTimeout(() => {}, 1500)
      return
    }
  }

  return (
    <div>
      <div className="relative mt-16 w-full h-[250px] bg-cyan-50 bg-cover bg-center">
        <div className="absolute inset-0 flex items-center ml-45 bg-opacity-25">
          <div className="text-left text-black p-6 bg-white bg-opacity-90 rounded-xl max-w-2xl shadow-lg">
            <h1 className="text-4xl font-semibold text-primary">
              DỊCH VỤ Y TẾ TOÀN DIỆN
            </h1>
            <p className="mt-2 text-xl mb-4">
              Khám phá và tận hưởng sự tiện lợi của dịch vụ y tế tại Care Pulse.
            </p>
          </div>
        </div>
        <Image
          src="https://cdn.medpro.vn/prod-partner/9a085fa0-374e-4aca-9ffe-6e6d2c5c03e7-dat-kham-theo-bac-si.webp"
          alt="Doctor and Nurse"
          width={250}
          height={250}
          className="absolute bottom-0 right-0 w-1/4 max-w-[350px] mr-35"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <DoctorLayout>
        <div className="flex justify-center mt-2 px-2 pt-1.5 pb-4">
          <div className="w-full bg-white p-1 rounded-2xl shadow-md">
            <FormProvider {...formMethods}>
              <form className="flex justify-center items-center gap-4">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Tìm kiếm dịch vụ"
                  customProp={''}
                  className="p-2 w-5/6 text-sm border-white rounded-xl focus:ring-white"
                />
                <select
                  value={selectedFaculty}
                  onChange={handleFacultyFilter}
                  className="p-2 text-sm text-primary border-white focus:ring-white rounded-xl"
                >
                  <option value="">Chuyên khoa</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.name}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {displayedServices.length > 0 ? (
              displayedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-2 rounded-lg shadow-md hover:scale-105 hover:border-primary border-transparent"
                  style={{
                    width: '550px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="flex items-center w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3dd6f5"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-earth"
                    >
                      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                      <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                      <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <div className="flex-grow px-4 w-3/4 ">
                      <h3 className="text-xl font-semibold text-black ml-2 mt-2  line-clamp-1">
                        {service.name}
                      </h3>
                      <ul className="text-sm text-slate-500 mt-2 ml-2 space-y-1">
                        <li className="flex items-center">
                          <span
                            className="block overflow-hidden text-ellipsis whitespace-normal line-clamp-1"
                            style={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 1,
                            }}
                          >
                            {service.description}
                          </span>
                        </li>

                        <li className="flex items-center">
                          <span>
                            <span className="font-bold">Chuyên khoa:</span>{' '}
                            {service.facultyName}
                          </span>
                        </li>
                        <li className="flex items-center text-base text-yellow-400">
                          <span>
                            <span className="font-bold ">Giá:</span>{' '}
                            {service.price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr className="mt-2 text-slate-300" />
                  <div className="flex justify-end mt-2">
                    <Link
                      href={{
                        pathname: '/choose-faculty',
                      }}
                    >
                      <Button
                        className="w-32 mb-2 text-white bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-3xl"
                        onClick={(e) => handleBookingClick(e)}
                      >
                        Đặt khám ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500">Không có dịch vụ nào!</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </DoctorLayout>
    </div>
  )
}

export default ServiceList
