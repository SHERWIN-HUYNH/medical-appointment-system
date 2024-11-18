import { Button } from '@/components/ui/button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import clsx from 'clsx';
import { fetchEventsFromApi } from '@/helpers/formatTimeSlots';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppointmentContext } from '@/context/AppointmentContext';
import { useRouter } from 'next/navigation';

type ChooseScheduleProps = {
  doctorId: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};
type TimeSlot = { id: string; date: string; timeSlot: string; isAvailable: boolean };

const ChooseSchedule = ({ doctorId, setSelectedDate }: ChooseScheduleProps) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: '', end: '' });
  const [morningTimeslot, setMorningTimeslot] = useState<TimeSlot[]>([]);
  const [eveningTimeslot, setEveningTimeslot] = useState<TimeSlot[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const updateAvailableDate = (date: string[]) => {
    setAvailableDates(date);
    console.log('AVAILABLE', availableDates);
  };
  let dateFromApi: string[] = [];
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    setVisibleRange({
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
    });
    async function loadEvents() {
      const apiData = await fetchEventsFromApi(doctorId as string);
      dateFromApi = apiData
        .filter((item) => item.isAvailable)
        .map((item) => item.schedule.date);
      updateAvailableDate(dateFromApi);
      const morningSchedules = apiData
        .filter(({ schedule }) => {
          const [startHour] = schedule.timeSlot.split('-')[0].split(':').map(Number);
          return startHour >= 7 && startHour < 12;
        })
        .map(({ isAvailable, schedule }) => ({
          ...schedule,
          isAvailable,
          period: 'morning' as const, // Thêm kiểu tường minh cho "period" mà không cần kiểu mở rộng
        }));
      setMorningTimeslot(morningSchedules);
      const afternoonSchedules = apiData
        .filter(({ schedule }) => {
          const [startHour] = schedule.timeSlot.split('-')[0].split(':').map(Number);
          return startHour >= 12;
        })
        .map(({ isAvailable, schedule }) => ({
          ...schedule,
          isAvailable,
          period: 'afternoon' as const, // Tương tự, định nghĩa kiểu cho buổi chiều
        }));
      setEveningTimeslot(afternoonSchedules);
    }
    loadEvents();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClassNames = (renderProps: any): string[] => {
    const dateStr = renderProps.date.toISOString().split('T')[0];
    if (renderProps.isPast || !availableDates.includes(dateStr)) {
      return ['text-[#cfd9df]'];
    }
    return [];
  };
  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    setShowTimeSlots(true);
  };
  const { data, setData } = useAppointmentContext();
  const router = useRouter();
  const handleSelectTimeSlot = (doctorId: string) => {
    setData({ doctorId });
    router.push('/appointment');
  };
  return (
    <div>
      {!showTimeSlots ? (
        <div className={clsx('w-full')}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            height={650}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'resourceTimelineWook, dayGridMonth',
            }}
            titleFormat={{
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }}
            locale={viLocale}
            visibleRange={visibleRange}
            dayCellClassNames={handleDateClassNames}
            dateClick={handleDateClick}
            nowIndicator={true}
            editable={true}
            fixedWeekCount={false}
            selectable={true}
            selectMirror={true}
          />
        </div>
      ) : (
        <div className={clsx('center flex-col items-start', {})}>
          <div>
            <h1 className=" text-[#000000d9] font-bold text-lg">Buổi sáng</h1>
            <ul className="center my-4 gap-x-4">
              {morningTimeslot.map((item, index) => (
                <li className="min-w-40 border border-solid border-[#00e0ff]" key={index}>
                  <Button
                    className={clsx(
                      'w-full timeSlot rounded-none hover:bg-gradient-to-r hover:from-[#00b5f1] hover:to-[#00e0ff] hover:text-white',
                      {
                        'bg-white ': item.isAvailable,
                      },
                    )}
                    onClick={() => handleSelectTimeSlot(doctorId as string)}
                  >
                    {/* <Link
                      href={{
                        pathname: '/appointment',
                        query: {
                          doctorId: doctorId,
                          scheduleId: item.id,
                          timeSlot: item.timeSlot,
                          date: item.date,
                        },
                      }}
                    >
                      {item.timeSlot}
                    </Link> */}
                    {item.timeSlot}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className=" text-[#000000d9] font-bold text-lg">Buổi chiều</h1>
            <ul className="center my-4 gap-x-4">
              {eveningTimeslot.map((item, index) => (
                <li className="min-w-40 border border-solid border-[#00e0ff]" key={index}>
                  <Button
                    className={clsx(
                      'w-full timeSlot rounded-none hover:bg-gradient-to-r hover:from-[#00b5f1] hover:to-[#00e0ff] hover:text-white',
                      {
                        'bg-white ': item.isAvailable,
                      },
                    )}
                  >
                    <Link
                      href={{
                        pathname: '/appointment',
                        query: {
                          doctorId: doctorId,
                          scheduleId: item.id,
                          timeSlot: item.timeSlot,
                          date: item.date,
                        },
                      }}
                    >
                      {item.timeSlot}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className=" text-[#d98634] text-base font-medium">
              Tất cả thời gian theo múi giờ Việt Nam GMT +7 <br />
              Nếu không chọn được khung giờ phù hợp, bạn có thể đặt khám tại Bệnh viện Đại
              học Y Dược Cơ sở 201 Nguyễn Chí Thanh, Phường 12, Quận 5
            </p>
            <div className="w-full">
              <Image
                src="/assets/images/image.png"
                alt="Banner"
                width={837}
                height={200}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '300px',
                }}
              ></Image>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseSchedule;
