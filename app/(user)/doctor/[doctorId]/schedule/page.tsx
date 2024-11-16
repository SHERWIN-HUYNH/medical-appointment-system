'use client';
import React from 'react';
import UserLayout from '@/components/Layouts/userLayout';
// import { useSession } from 'next-auth/react';
import { HousePlus } from 'lucide-react';
import ChooseSchedule from '@/components/DoctorSchedule/choose-schedule/page';
import { useParams } from 'next/navigation';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const params = useParams();
  const doctorId = params.doctorId;
 
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
                  Bệnh Viện Quận Bình Thạnh<br></br>
                  <span className=" text-[#8a8a8a]">
                    132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh
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
                <p className="mt-1">0969239222</p>
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
                    className="lucide lucide-map-pin-house"
                  >
                    <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                    <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                    <path d="M18 22v-3" />
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                </p>
                <p>
                  11 Nguyễn Đình Chiểu, phường Đa Kao quận 1, Phường 01, Quận Tân Bình,
                  Thành phố Hồ Chí Minh
                </p>
              </li>
              {selectedDate ? (
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
                      className="lucide lucide-map-pin-house"
                    >
                      <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                      <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                      <path d="M18 22v-3" />
                      <circle cx="10" cy="10" r="3" />
                    </svg>
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
  );
};

export default CalendarPage;
