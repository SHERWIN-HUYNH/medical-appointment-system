import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PasskeyModal } from '@/components/PasskeyModal'
import { RegisterForm } from '@/components/forms/RegisterForm'

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true'

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/login" className="text-green-500">
              Đăng nhập
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  )
}

export default Home
