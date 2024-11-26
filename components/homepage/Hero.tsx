'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useAppointmentContext } from '@/context/AppointmentContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Faculty {
  id: string
  name: string
  description?: string
  isActive?: boolean
  isDeleted?: boolean
}

const Hero = () => {
  const { data: session } = useSession()
  const { setData } = useAppointmentContext()
  const router = useRouter()

  const handleTestService = async () => {
    try {
      // Fetch faculty data to get the ID of "Xét nghiệm" faculty
      const response = await fetch('/api/faculty')
      const faculties: Faculty[] = await response.json()
      const testFaculty = faculties.find((faculty) => faculty.name == 'Xét nghiệm')

      if (testFaculty) {
        // Set the facultyId in context
        setData({ facultyId: testFaculty.id })
        router.push('/choose-doctor?facultyName=Xét+nghiệm')
      } else {
        toast.error('Không tìm thấy chuyên khoa Xét nghiệm')
      }
    } catch (error) {
      console.error('Error fetching faculty:', error)
    }
  }

  const services = [
    {
      name: 'Đặt khám theo chuyên khoa',
      icon: '/assets/icons/dat_kham_theo_chuyen_khoa.webp',
      href: '/choose-faculty',
    },
    {
      name: 'Đặt khám theo bác sĩ',
      icon: '/assets/icons/dat_kham_theo_bac_si.webp',
      href: '/doctor',
    },
    {
      name: 'Đặt lịch xét nghiệm',
      icon: '/assets/icons/xet_nghiem.webp',
      onClick: handleTestService, // Use onClick instead of href
    },
    {
      name: 'Gói khám sức khỏe',
      icon: '/assets/icons/goi_kham.webp',
      href: '/goi-kham-suc-khoe',
    },
    {
      name: 'Tra cứu thông tin',
      icon: '/assets/icons/search_info.svg',
      href: session?.user?.id ? `/patients/${session.user.id}/profile` : '/login',
    },
  ]

  return (
    <section className="relative bg-[#EBF5FB] pt-15">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center w-[1040px]">
            <div className="relative">
              <Image
                src="/assets/images/doctors.jpg"
                alt="Doctor consulting patient"
                width={500}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="space-y-6">
              <Image
                src="/assets/images/banner.png"
                alt="Medical Network"
                width={500}
                height={250}
                className="rounded-lg shadow-md w-full"
              />
              <Image
                src="/assets/images/banner_advise.png"
                alt="UMC Hospital"
                width={500}
                height={250}
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-5 gap-6 w-[1040px]">
            {services.map((service, index) =>
              service.onClick ? (
                // For services with onClick handler
                <div
                  key={index}
                  onClick={service.onClick}
                  className="w-full cursor-pointer"
                >
                  <div className="bg-white aspect-[4/3] p-4 rounded-xl shadow-md hover:shadow-lg border border-transparent hover:border-primary transition-all duration-200 w-full h-full">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-[30%] aspect-square mb-3">
                        <Image
                          src={service.icon}
                          alt={service.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-center text-gray-700 line-clamp-2">
                        {service.name}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // For services with href
                <Link key={index} href={service.href} className="w-full">
                  <div className="bg-white aspect-[4/3] p-4 rounded-xl shadow-md hover:shadow-lg border border-transparent hover:border-primary transition-all duration-200 w-full h-full">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-[30%] aspect-square mb-3">
                        <Image
                          src={service.icon}
                          alt={service.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-center text-gray-700 line-clamp-2">
                        {service.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
