import { Schedule } from '@/types/interface';


export function formatTimeSlot(timeSlot: string): string {
  const [start, end] = timeSlot.split(' - ');

  const formattedStart = start.substring(0, 5);
  const formattedEnd = end.substring(0, 5);

  return `${formattedStart}-${formattedEnd}`;
}

export async function fetchEventsFromApi(
  doctorId: string,
): Promise<DoctorScheduleResult[]> {
  const response = await fetch(`/api/doctorschedule/${doctorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log('api data from fetch', data);
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch events');
  }
  return data;
}
export interface DoctorScheduleResult {
  isAvailable: boolean;
  schedule: Schedule;
}
export function transformApiEventData(data: DoctorScheduleResult) {
  const { isAvailable, schedule } = data;
  const [startTime, endTime] = schedule.timeSlot.split('-');
  const start = new Date(`${schedule.date}T${startTime}`);
  const end = new Date(`${schedule.date}T${endTime}`);
  return {
    id: `${schedule.date}-${schedule.timeSlot}`,
    title: isAvailable == true ? 'Trống' : 'Có hẹn',
    start: start,
    end: end,
    backgroundColor: isAvailable == true ? '#00b5f1' : 'red',
    date: schedule.date,
    timeSlot: schedule.timeSlot,
  };
}

type ApiResponse = { id: string; date: string; timeSlot: string };
type GroupedTimeSlots = { [date: string]: string[] };

export function groupTimeSlotsByDate(data: ApiResponse[]): GroupedTimeSlots {
  return data.reduce((acc: GroupedTimeSlots, item: ApiResponse) => {
    const { date, timeSlot } = item;
    if (!acc[date]) {
      acc[date] = []; // Khởi tạo mảng nếu chưa có ngày này
    }
    acc[date].push(timeSlot); // Thêm timeSlot vào mảng
    return acc;
  }, {});
}






