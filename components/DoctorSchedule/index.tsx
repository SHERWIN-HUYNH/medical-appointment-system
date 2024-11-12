import { CalendarApi, DateSpanApi, EventDropArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import {
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
} from '@fullcalendar/core/index.js';
import interactionPlugin, {
  DateClickArg,
} from '@fullcalendar/interaction';
import { useState, useEffect, useRef } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import {
  fetchEventsFromApi,
  transformApiEventData,
} from '@/helpers/formatTimeSlots';
import { toast } from 'sonner';
import React from 'react';
interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  timeSlot: string;
  date: string;
  backgroundColor?: string;
}
interface DoctorScheduleProps {
  doctorId: string;
}
const DoctorSchedule = ({ doctorId }: DoctorScheduleProps) => {
  const [visibleRange, setVisibleRange] = useState({ start: '', end: '' });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]); // Track selected dates
  const [deletedDates, setDeletedDates] = useState<Event[]>([]);
  const [isSelectable, setIsSelectable] = useState(true); // Enable/disable date selection
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const updateEvents = (updatedEvents: Event[]) => {
    setAllEvents(updatedEvents);
  };
  const updateEventDeleted = (eventId: string) => {
    setAllEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== eventId);
      console.log('Updated all events after deletion:', updatedEvents);
      return updatedEvents;
    });
  };
  const today = new Date().toISOString().split('T')[0];
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
      const transformedEvents = apiData.map(transformApiEventData);
      updateEvents(transformedEvents);
    }
    loadEvents();
  }, []);
  const handleDateClassNames = (renderProps: any): string[] => {
    // const today = new Date();
    // const date = renderProps.date;
    // if (selectedDates.some(d => d.getTime() === date.getTime())) {
    //   return ["text-gray-300"]; // Đổi màu chữ thành xám cho các ngày đã chọn
    // }

    // // if (date < today) {
    // //   return ["text-[#cfd9df]"]; // Style cho các ngày đã qua
    // // }
    return [];
  };

  const handleSelect = (selectInfo: DateSelectArg) => {
    const date = selectInfo.startStr.split('T')[0]; // Lấy ngày
    const startTime = selectInfo.startStr.split('T')[1].slice(0, 5); // Get "HH:mm" for start time
    const endTime = selectInfo.endStr.split('T')[1].slice(0, 5); // Get "HH:mm" for end time
    const timeSlot = `${startTime}-${endTime}`;
    const newEvent: Event = {
      id: `${date}-${timeSlot}`,
      title: 'Trống',
      start: selectInfo.start,
      end: selectInfo.end,
      date: date,
      timeSlot: `${startTime}-${endTime}`,
      backgroundColor: '#00b5f1',
    };

    setAllEvents((prevEvents) => {
      const update = [...prevEvents, newEvent];
      console.log('UPDATE', update);
      return update;
    });
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventDate = clickInfo.event.startStr;
    if (eventDate < today) {
      clickInfo.jsEvent.preventDefault(); // Prevent clicking on past events
      return false;
    }
    const eventTitle = clickInfo.event.title;
    const isConfirmed = window.confirm(
      `Do you want to delete the timeslot ${eventTitle}?`,
    );

    if (isConfirmed) {
      const date = clickInfo.event.startStr.split('T')[0]; // Lấy ngày
      const startTime = clickInfo.event.startStr.split('T')[1].slice(0, 5); // Get "HH:mm" for start time
      const endTime = clickInfo.event.endStr.split('T')[1].slice(0, 5); // Get "HH:mm" for end time
      const timeSlot = `${startTime}-${endTime}`;

      const newEvent: Event = {
        id: `${date}-${timeSlot}`,
        title: timeSlot,
        start: clickInfo.event.start ?? new Date(),
        end: clickInfo.event.end ?? new Date(),
        timeSlot: `${startTime}-${endTime}`,
        date: date,
      };
      const eventIdToDelete = `${date}-${timeSlot}`;
      console.log('EVENTID TO DELETE', eventIdToDelete);
      updateEventDeleted(eventIdToDelete);
      setDeletedDates((prevEvents) => {
        const updatedDeletedDates = [...prevEvents, newEvent];
        return updatedDeletedDates;
      });

      clickInfo.event.remove();
    }
  };

  const handleDatesSet = (datesSetInfo: DatesSetArg) => {
    if (datesSetInfo.view.type === 'dayGridMonth') {
      setIsSelectable(false); // Disable selection in month view
    } else {
      setIsSelectable(true); // Enable selection in week and day views
    }
  };
  const handleDateClick = (dateClickInfo: DateClickArg) => {
    const calendarApi = calendarRef.current?.getApi() as CalendarApi;
    if (calendarApi) {
      calendarApi.changeView('timeGridDay', dateClickInfo.date); // Switches to day view on date click
    }
  };
  const saveSelectedTimeSlots = async () => {
    const selectedSchedules = allEvents.map((event) => ({
      date: event.date,
      timeSlot: event.timeSlot,
      isAvailable: true,
    }));

    console.log('Selected schedules to save:', selectedSchedules);

    try {
      // First, delete the events in the database
      if (deletedDates.length > 0) {
        try {
          const deleteResponse = await fetch(`/api/doctorschedule/${doctorId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedDates),
          });

          if (!deleteResponse.ok) {
            throw new Error('Failed to delete some timeslots');
          }
          console.log('Deleted timeslots:', deletedDates);
          setDeletedDates([]);
        } catch (error) {
          console.error('Error deleting timeslots:', error);
        }
      }

      const response = await fetch(`/api/doctorschedule/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSchedules),
      });

      if (!response.ok) {
        throw new Error('Failed to save timeslots');
      }
      setSelectedDates([]); // Clear selected dates after saving

      toast.success('Cập nhật lịch làm việc thành công!');
    } catch (error) {
      toast.error('Cập nhật lịch làm việc thất bại!');
      console.error('Error saving timeslots:', error);
    }
  };
  const handleEventDrop = (dropInfo: EventDropArg) => {
    const event = dropInfo.event;
    const eventId = event.id;
    const newStart = new Date(event.startStr);
    const newEnd = new Date(event.endStr);

    console.log('Event Dropped:');
    console.log('Title:', event.title);
    console.log('New Start Time:', newStart);
    console.log('New End Time:', newEnd);

    const newEvent: Event = {
      id: `${eventId}-${newStart.toISOString()}`,
      title: event.title,
      start: newStart,
      end: newEnd,
      timeSlot: `${newStart.toISOString().split('T')[1].slice(0, 5)}-${newEnd.toISOString().split('T')[1].slice(0, 5)}`,
      date: newStart.toISOString().split('T')[0],
    };

    setAllEvents((prevEvents) => {
      return prevEvents
        .filter((existingEvent) => existingEvent.id !== eventId)
        .concat(newEvent);
    });
    event.remove();
  };
  return (
    <div>
      <div className=" p-5 rounded-2xl">
        <div className={clsx('w-full', {})}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            ref={calendarRef}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
            height={650}
            visibleRange={visibleRange}
            select={handleSelect}
            // dayCellClassNames={handleDateClassNames}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
            editable={true}
            fixedWeekCount={false}
            selectable={isSelectable}
            events={allEvents}
            datesSet={handleDatesSet}
            allDaySlot={false}
            selectAllow={(selectInfo: DateSpanApi) => {
              const selectedDate = new Date(selectInfo.start);
              const today1 = new Date(today);
              return selectedDate >= today1;
            }}
            eventAllow={(span: DateSpanApi) => {
              const eventDate = new Date(span.start);
              const today1 = new Date(today);

              return eventDate >= today1;
            }}
          />
        </div>
      </div>
      <Button onClick={saveSelectedTimeSlots} className=" text-white hover:bg-primary/50">
        Save Timeslots
      </Button>
    </div>
  );
};

export default DoctorSchedule;
