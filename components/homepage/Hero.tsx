'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

const Hero = () => {
  const { data: session } = useSession()
  const handleBookingClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      toast.error('Vui lòng đăng nhập để đặt lịch khám')
      setTimeout(() => {}, 1500)
      return
    }
  }

  return (
    <section className="bg-slate-100 dark:bg-slate-900 p-15">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-2xl font-semibold text-primary tracking-tight leading-none md:text-4xl xl:text-5xl ">
            Đặt lịch dễ dàng, chăm sóc sức khỏe trọn vẹn!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-slate-500 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-400">
            Nền tảng đặt lịch khám tiện lợi, kết nối bạn với bác sĩ hàng đầu, đảm bảo chăm
            sóc sức khỏe nhanh chóng và hiệu quả.
          </p>
          <Link
            href="/choose-faculty"
            onClick={handleBookingClick}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary-900"
          >
            Đặt ngay
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src="/assets/images/doctor.jpg"
            alt="mockup"
            width={500}
            height={300}
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
