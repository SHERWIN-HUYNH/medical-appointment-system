'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { EventSourceInput } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

import React from 'react';
import UserLayout from '@/components/Layouts/userLayout';
interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

const CalendarPage = () => {
  
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <section className=" style_body flex  space-x-7  max-w-screen-xl px-4 pb-6 mt-8">
      <div className=" reset-css card basis-1/4 gap-y-5 max-w-1/4">
        <div>
          <h1 className="card-header">Thông tin bệnh nhân</h1>
          <ul className="card-body">
            <li className="card-item">
              <p className=' mt-[6px]'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              </p>
              <p>HUYNH TRUNG</p>
            </li>
            <li className="card-item">
            <p className=' mt-[6px]'>
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
              <p>0969239222</p>
            </li>
            <li className="card-item">
            <p className=' mt-[6px]'>
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
          </ul>
        </div>
        <div>
          <h1 className="card-header">Thông tin cơ sở y tế</h1>
          <ul className="card-body">
            <li className="card-item">
            <p className=' mt-[6px]'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-user"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
              </p>
              <p>Bệnh Viện Quận Bình Thạnh<br></br><span className=' text-[#8a8a8a]'>132 Lê Văn Duyệt, Phường 1, Bình Thạnh, Thành phố Hồ Chí Minh</span></p>
            </li>
          </ul>
        </div>
      </div>
        <div className="reset-css card basis-3/4 max-w-3/4">
          <h1 className="card-header">Vui lòng chọn ngày khám</h1>
          <div className="card-body card w-full bg-white h-full">
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
        </div>
      </section>
    </UserLayout>
  );
};

export default CalendarPage;
