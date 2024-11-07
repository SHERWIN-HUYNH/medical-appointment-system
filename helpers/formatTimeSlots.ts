import { Schedule } from "@/types/interface";
import { time } from "console";

export function formatTimeSlot(timeSlot: string): string {

    const [start, end] = timeSlot.split(' - ');
  
    const formattedStart = start.substring(0, 5); 
    const formattedEnd = end.substring(0, 5); 
  
    return `${formattedStart}-${formattedEnd}`;
  }
  
  
export async function fetchEventsFromApi(doctorId:string): Promise<Schedule[]> {
    const response = await fetch(`/api/doctorschedule/${doctorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error(data.message || "Failed to fetch events");
    }
    return data;
  }
  export function transformApiEventData(data: Schedule) {
    const [startTime, endTime] = data.timeSlot.split('-');
    const start = new Date(`${data.date}T${startTime}`);
    const end = new Date(`${data.date}T${endTime}`);
    return {
      id:`${data.date}-${data.timeSlot}`,
      title: 'Available Slot',  // or customize based on your requirements
      start: start,
      end: end,
      backgroundColor: data.isAvailable ? 'blue' : 'red',
      date: data.date,
      timeSlot: data.timeSlot,

    };
  
  }