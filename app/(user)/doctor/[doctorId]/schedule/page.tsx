'use client'
import React from 'react'
import UserLayout from '@/components/Layouts/userLayout'
// import { useSession } from 'next-auth/react';
import { CalendarFold, HousePlus, MailMinus } from 'lucide-react'
import ChooseSchedule from '@/components/DoctorSchedule/choose-schedule/page'
import { useParams } from 'next/navigation'

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = React.useState<string>('')
  const params = useParams()

  const doctorId = params.doctorId
  return (
    <UserLayout>
      <section className=" style_body flex  space-x-7  max-w-screen-xl px-4 pb-6 mt-8">
        <div className=" reset-css card basis-1/4 gap-y-5 max-w-1/4">
          <div>
            <h1 className="card-header">Thông tin cơ sở y tế</h1>
            <ul className="card-body">
              <li className="card-item">
                <p className=" mt-[6px]">
                  <HousePlus />
                </p>
                <p>
                  Bệnh viện Đại học Y Dược TP.HCM<br></br>
                  <span className=" text-[#8a8a8a]">
                    215 Đ. Hồng Bàng, Phường 11, Quận 5, Hồ Chí Minh
                  </span>
                </p>
              </li>
              <li className="card-item">
                <p className=" mt-[6px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-smartphone"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </p>
                <p className="mt-1">Số hotline: 0969239222</p>
              </li>
              <li className="card-item">
                <p className=" mt-[6px]">
                  <MailMinus />
                </p>
                <p>Email liên hệ: huynhchitrung @gmail.com</p>
              </li>
              {selectedDate ? (
                <li className="card-item">
                  <p className=" mt-[6px]">
                    <CalendarFold />
                  </p>
                  <p className="mt-2">Ngày khám: {selectedDate}</p>
                </li>
              ) : (
                ''
              )}
            </ul>
          </div>
        </div>
        <div className="reset-css card basis-3/4 max-w-3/4">
          <h1 className="card-header">Vui lòng chọn ngày khám</h1>
          <div className="card-body card">
            <ChooseSchedule
              doctorId={doctorId as string}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </section>
    </UserLayout>
  )
}

export default CalendarPage
