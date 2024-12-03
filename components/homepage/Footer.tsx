'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function Footer() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleServiceClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      toast.error('Vui lòng đăng nhập để sử dụng dịch vụ')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
      return
    }
  }

  return (
    <footer className="bg-white w-full center items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-primary sm:justify-start gap-3">
              <Image
                src="/assets/icons/logo-icon.svg"
                alt="logo"
                width={50}
                height={85}
              />
              <h2 className="text-4xl font-bold">Care Pulse</h2>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-slate-500 sm:text-left">
              Chăm sóc sức khỏe toàn diện – Đồng hành cùng bạn từ đặt lịch hẹn đến phục
              hồi, giúp bạn an tâm trên hành trình bảo vệ sức khỏe.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold text-slate-900">Về chúng tôi</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <Link
                    href="/doctor"
                    onClick={handleServiceClick}
                    className="text-slate-700 hover:text-primary cursor-pointer"
                  >
                    Đội ngũ bác sĩ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold text-slate-900">Dịch vụ</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <Link
                    href="/dat-lich-kham"
                    onClick={handleServiceClick}
                    className="text-slate-700 hover:text-primary cursor-pointer"
                  >
                    Đặt lịch khám
                  </Link>
                </li>
                <li>
                  <Link
                    href="/goi-kham-dich-vu"
                    onClick={handleServiceClick}
                    className="text-slate-700 hover:text-primary cursor-pointer"
                  >
                    Gói khám dịch vụ sức khỏe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dat-kham-chuyen-khoa"
                    onClick={handleServiceClick}
                    className="text-slate-700 hover:text-primary cursor-pointer"
                  >
                    Đặt khám chuyên khoa
                  </Link>
                </li>
                <li>
                  <span className="text-slate-700">Thanh toán viện phí</span>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold text-slate-900">Liên hệ</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <div className="flex items-center gap-2 hover:text-primary cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-slate-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-slate-700">contact@carepulse.vn</span>
                  </div>
                </li>

                <li>
                  <div className="flex items-center gap-2 hover:text-primary cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-slate-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-slate-700">1900 1238</span>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-slate-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <address className="not-italic text-slate-700">
                      132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-300 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Privacy Policy
              </a>
            </p>
            <p className="mt-4 text-base text-slate-500 sm:order-first sm:mt-0">
              &copy; 2024 CarePulse
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
