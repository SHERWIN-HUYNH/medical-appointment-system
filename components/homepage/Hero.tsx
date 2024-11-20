'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
function Hero() {
  const router = useRouter()

  return (
    <section className="mt-[80px]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt="doctorImg"
              src="/assets/images/doctors.jpg"
              width={800}
              height={800}
              className="absolute inset-0 h-full w-full rounded-3xl object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl text-primary">
              Đặt lịch khám dễ dàng, an tâm chăm sóc sức khỏe
            </h2>

            <p className="mt-4 text-gray-600">
              Giải pháp đặt lịch hẹn – Tiết kiệm thời gian, tối ưu trải nghiệm chăm sóc
              sức khỏe
            </p>

            <Button
              className="mt-10 bg-primary hover:bg-[#56c2e6] text-white"
              onClick={() => router.push('/choose-profile')}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
