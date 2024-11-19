import { Button } from '@/components/ui/button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import clsx from 'clsx';
import { DoctorScheduleResult, fetchEventsFromApi } from '@/helpers/formatTimeSlots';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Schedule } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { set } from 'zod';

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
  const [apiData, setApiData] = useState<DoctorScheduleResult[]>();
  const updateAvailableDate = (date: string[]) => {
    setAvailableDates(date);
  };
  const handleUpdateSchedule = (newData: DoctorScheduleResult[]) => {
    setApiData(newData);
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
      const data = await fetchEventsFromApi(doctorId as string);
      // setApiData(data);
      handleUpdateSchedule(data);
      dateFromApi = data
        .filter((item) => item.isAvailable)
        .map((item) => item.schedule.date);
      updateAvailableDate(dateFromApi);
    }
    loadEvents();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClassNames = (renderProps: any): string[] => {
    const dateStr = renderProps.date;
    const year = dateStr.getFullYear();
    const month = String(dateStr.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateStr.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    if (renderProps.isPast || !availableDates.includes(formattedDate)) {
      return ['text-[#cfd9df]'];
    }

    return ['valid-date-class'];
  };
  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    const date = info.dateStr;
    const schedules = apiData?.filter((schedule) => schedule.schedule.date === date);

    console.log('schedules', schedules);
    if (availableDates.includes(date) && schedules) {
      const morningSchedules = schedules
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
      const afternoonSchedules = schedules
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
      setShowTimeSlots(true);
    }
  };
  const router = useRouter();
  const { data: session } = useSession();

  const handleSelectTimeSlot = (item: Schedule) => {
    const scheduleId = item.id;
    const facultyId = 'b0990c2e-0784-4781-b03e-b12c4fedee6e';
    const userId = session?.user.id;
    const serviceId = 'cb407f19-b77e-493f-bd01-185991811840';

    // Set gia tri tam thoi de thuc hien goi du lieu
    const profileId = 'dfb8c741-dedc-44d7-a734-23b16812ebe2';
    router.push(
      `/appointment?date=${item.date}&timeSlot=${item.timeSlot}&doctorId=${doctorId}&userId=${userId}&serviceId=${serviceId}&scheduleId=${scheduleId}&facultyId=${facultyId}&profileId=${profileId}`,
    );
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
            editable={true}
            fixedWeekCount={false}
            selectable={true}
            selectMirror={true}
            dayCellClassNames={handleDateClassNames}
            dateClick={handleDateClick}
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
                    onClick={() => handleSelectTimeSlot(item)}
                  >
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
                    onClick={() => handleSelectTimeSlot(item)}
                  >
                    {item.timeSlot}
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