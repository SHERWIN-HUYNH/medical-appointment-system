import { Button } from '@/components/ui/button'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'
import timeGridPlugin from '@fullcalendar/timegrid'
import viLocale from '@fullcalendar/core/locales/vi'
import clsx from 'clsx'
import { DoctorScheduleResult, fetchEventsFromApi } from '@/helpers/formatTimeSlots'
import React from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Schedule } from '@prisma/client'
import { useAppointmentContext } from '@/context/AppointmentContext'
import { DateSpanApi } from '@fullcalendar/core'

type ChooseScheduleProps = {
  doctorId: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}
type TimeSlot = { id: string; date: string; timeSlot: string; isAvailable: boolean }
const ChooseSchedule = ({ doctorId, setSelectedDate }: ChooseScheduleProps) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false)
  const [visibleRange, setVisibleRange] = useState({ start: '', end: '' })
  const [morningTimeslot, setMorningTimeslot] = useState<TimeSlot[]>([])
  const [eveningTimeslot, setEveningTimeslot] = useState<TimeSlot[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [apiData, setApiData] = useState<DoctorScheduleResult[]>()
  const router = useRouter()
  const { data, setData } = useAppointmentContext()
  const searchParams = useSearchParams()
  const price = searchParams.get('price')
  const today = new Date().toISOString().split('T')[0]
  const updateAvailableDate = (date: string[]) => {
    setAvailableDates(date)
  }
  const handleUpdateSchedule = (newData: DoctorScheduleResult[]) => {
    setApiData(newData)
  }

  useEffect(() => {
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0)
    let dateFromApi: string[] = []
    setVisibleRange({
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
    })
    async function loadEvents() {
      const data = await fetchEventsFromApi(doctorId as string)
      handleUpdateSchedule(data)
      dateFromApi = data
        .filter((item) => item.isAvailable)
        .map((item) => item.schedule.date)
      updateAvailableDate(dateFromApi)
    }
    loadEvents()
    console.log('dateFromApi', dateFromApi)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClassNames = (renderProps: any): string[] => {
    const dateStr = renderProps.date
    const year = dateStr.getFullYear()
    const month = String(dateStr.getMonth() + 1).padStart(2, '0') 
    const day = String(dateStr.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    if (renderProps.isPast || !availableDates.includes(formattedDate)) {
      return ['text-[#cfd9df]']
    }

    return ['valid-date-class']
  }
 const handleDateClick = (info: DateClickArg) => {
    const selectedDate = info.date
    const today = new Date()

    // So sánh ngày (chỉ tính ngày, bỏ qua giờ phút giây)
    const isFutureDate = selectedDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0)
    setSelectedDate(info.dateStr)
    const date = info.dateStr
    const schedules = apiData?.filter((schedule) => schedule.schedule.date === date)

    if (availableDates.includes(date) && schedules) {
      const morningSchedules = schedules
        .filter(({ schedule }) => {
          const [startHour] = schedule.timeSlot.split('-')[0].split(':').map(Number)
          return startHour >= 7 && startHour < 12
        })
        .map(({ isAvailable, schedule }) => ({
          ...schedule,
          isAvailable,
          period: 'morning' as const,
        }))
      setMorningTimeslot(morningSchedules)
      const afternoonSchedules = schedules
        .filter(({ schedule }) => {
          const [startHour] = schedule.timeSlot.split('-')[0].split(':').map(Number)
          return startHour >= 12
        })
        .map(({ isAvailable, schedule }) => ({
          ...schedule,
          isAvailable,
          period: 'afternoon' as const,
        }))
      setEveningTimeslot(afternoonSchedules)
      setShowTimeSlots(isFutureDate)
    }
  }

  const handleSelectTimeSlot = (item: Schedule) => {
    const { serviceId, facultyId, doctorId } = data
    const doctorName = searchParams.get('doctorName')
    const facultyName = searchParams.get('facultyName')
    const serviceName = searchParams.get('serviceName')

    setData({
      serviceId,
      facultyId,
      doctorId,
    })
    router.push(
      `/choose-profile?` +
        `date=${item.date}&` +
        `timeSlot=${item.timeSlot}&` +
        `doctorName=${doctorName}&` +
        `facultyName=${facultyName}&` +
        `serviceName=${serviceName}&` +
        `price=${price}`,
    )
  }

  console.log('TIME SLOT',morningTimeslot, eveningTimeslot)
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
            fixedWeekCount={true}
            selectable={true}
            selectMirror={true}
            dayCellClassNames={handleDateClassNames}
            dateClick={handleDateClick}
            selectAllow={(selectInfo: DateSpanApi) => {
              const selectedDate = new Date(selectInfo.start)
              const today1 = new Date(today)
              return selectedDate >= today1
            }}
            eventAllow={(span: DateSpanApi) => {
              const eventDate = new Date(span.start)
              const today1 = new Date(today)
              return eventDate >= today1
            }}
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
          <div className="mt-3  pt-3">
            <Button
              className="text-sm bg-transparent text-slate-500 hover:text-primary flex items-center gap-1"
              onClick={() => setShowTimeSlots(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Quay lại
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChooseSchedule
