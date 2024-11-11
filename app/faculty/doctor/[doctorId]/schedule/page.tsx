'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { EventSourceInput } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import Footer from '../../../../homepage/Footer';
import Header from '../../../../homepage/Header';
import React from 'react';
import UserLayout from '@/components/Layouts/userLayout';
interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    { title: 'event 3', id: '3' },
    { title: 'event 4', id: '4' },
    { title: 'event 5', id: '5' },
  ]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: '', end: '' });
  const [clickedDate, setClickedDate] = useState<string | null>(null);
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    setVisibleRange({
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
    });
  }, []);
  const handleDateClassNames = (renderProps: any): string[] => {
    const today = new Date();
    const date = renderProps.date;
    if (date < today) {
      return ['text-[#cfd9df]'];
    }
    return [];
  };

  const handleDateClick = (info: any) => {
    const today = new Date();
    const clickedDate = info.date;

    if (clickedDate > today) {
      const formattedDate = `${clickedDate.getDate()}/${clickedDate.getMonth() + 1}/${clickedDate.getFullYear()}`;
      console.log('CLICKED', formattedDate);
      setClickedDate(formattedDate);
      setShowTimeSlots(true);
    }
  };
  console.log('TIME SLOT', showTimeSlots);
  return (
    <UserLayout>
      <section className=" flex  space-x-7  max-w-screen-xl px-4 pb-6 mt-8">
        <div className=" w-67 rounded-lg bg-white h-max">
          <h1 className="blue-header w-full">Thông tin cơ sở y tế</h1>
          <ul className="px-3 py-4 flex flex-col gap-3">
            <li className="text-16-normal flex ">
              <div className=" mr-2">
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
                  className="lucide lucide-hospital"
                >
                  <path d="M12 6v4" />
                  <path d="M14 14h-4" />
                  <path d="M14 18h-4" />
                  <path d="M14 8h-4" />
                  <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                  <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
                </svg>
              </div>
              <div className="flex justify-center flex-col">
                <p>Bệnh viện Đại học Y Dược TP.HCM</p>
                <p className=" text-[#858585]">
                  Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh
                </p>
              </div>
            </li>
            <li className="text-16-normal flex ">
              <div className=" mr-2">
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
                  className="lucide lucide-clipboard-plus"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M9 14h6" />
                  <path d="M12 17v-6" />
                </svg>
              </div>
              <div className="flex justify-center flex-col">
                <p>Chuyên khoa: Khám xương khớp</p>
              </div>
            </li>
            <li className="text-16-normal flex ">
              <div className=" mr-2">
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
                  className="lucide lucide-stethoscope"
                >
                  <path d="M11 2v2" />
                  <path d="M5 2v2" />
                  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
                  <path d="M8 15a6 6 0 0 0 12 0v-3" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </div>
              <div className="flex justify-center flex-col">
                <p>Bác sĩ: Cao Thỉ</p>
              </div>
            </li>
            <li className="text-16-normal flex ">
              <div className=" mr-2">
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
                  className="lucide lucide-house-plus"
                >
                  <path d="M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354" />
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M15 6h6" />
                  <path d="M18 3v6" />
                </svg>
              </div>
              <div className="flex justify-center flex-col">
                <p>Dịch vụ: Khám dịch vụ</p>
              </div>
            </li>
            {clickedDate && (
              <li className="text-16-normal flex ">
                <div className=" mr-2">
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
                    className="lucide lucide-house-plus"
                  >
                    <path d="M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354" />
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M15 6h6" />
                    <path d="M18 3v6" />
                  </svg>
                </div>
                <div className="flex justify-center flex-col">
                  <p>Ngày khám: {clickedDate}</p>
                </div>
              </li>
            )}
          </ul>
        </div>
        <main className="bg-white flex flex-col min-w-[825px] h-min justify-between overflow-hidden">
          <h1 className="blue-header w-full">Vui lòng chọn ngày khám</h1>
          <div className=" p-5 rounded-2xl">
            {!showTimeSlots ? (
              <div className={clsx('w-full', {})}>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  // validRange={visibleRange}
                  height={650}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineWook, dayGridMonth',
                  }}
                  visibleRange={visibleRange}
                  events={allEvents as EventSourceInput}
                  dayCellClassNames={handleDateClassNames}
                  nowIndicator={true}
                  editable={true}
                  fixedWeekCount={false}
                  selectable={true}
                  selectMirror={true}
                  dateClick={handleDateClick}
                />
              </div>
            ) : (
              <div className={clsx('center flex-col items-start', {})}>
                <div>
                  <h1 className=" text-[#000000d9] font-bold text-lg">Buổi sáng</h1>
                  <ul className="center my-4">
                    <li className=" min-w-40">
                      <Button className=" timeSlot">07:30 - 08:30</Button>
                    </li>
                    <li className=" min-w-40">
                      <Button className=" activeTimeSlot">08:30 - 09:00</Button>
                    </li>
                    <li className=" min-w-40">
                      <Button className=" timeSlot">09:00 - 09:30</Button>
                    </li>
                    <li className=" min-w-40">
                      <Button className=" timeSlot">09:30 - 10:00</Button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h1 className=" text-[#000000d9] font-bold text-lg">Buổi chiều</h1>
                  <ul className="center my-4">
                    <li className=" min-w-40">
                      <Button className=" timeSlot">07:30 - 08:30</Button>
                    </li>
                    <li className=" min-w-40">
                      <Button className=" timeSlot">08:30 - 09:00</Button>
                    </li>
                    <li className=" min-w-40">
                      <Button className=" activeTimeSlot">09:00 - 09:30</Button>
                    </li>
                    <li className=" min-w-40">
                      <Button className="activeTimeSlot">09:30 - 10:00</Button>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className=" text-[#d98634] text-base font-medium">
                    Tất cả thời gian theo múi giờ Việt Nam GMT +7 <br />
                    Nếu không chọn được khung giờ phù hợp, bạn có thể đặt khám tại Bệnh
                    viện Đại học Y Dược Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </section>
    </UserLayout>
  );
};

export default CalendarPage;
