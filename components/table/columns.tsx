'use client'

import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { AppointmentModal } from '../AppointmentModal'
import { StatusBadge } from '../StatusBadge'
import { AppointmentSchedule } from '@/types/interface'

export const columns: ColumnDef<AppointmentSchedule>[] = [
  {
    header: 'STT',
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>
    },
  },
  {
    accessorKey: 'patient',
    header: 'Bệnh nhân',
    cell: ({ row }) => {
      const appointment = row.original
      return <p className="text-14-medium ">{appointment.profile.name}</p>
    },
    filterFn: (row, columnId, filterValue) => {
      // Access the patient's name for filtering
      const patientName = (row.getValue(columnId) as { name: string })?.name
      return patientName?.toLowerCase().includes(filterValue.toLowerCase())
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const appointment = row.original
      const status = appointment.status.toLowerCase() as Status
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={status} />
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: 'Ngày',
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <p className="text-14-regular min-w-[100px]">
          {appointment.doctorSchedule.schedule.date}
        </p>
      )
    },
  },
  {
    accessorKey: 'timeSlot',
    header: 'Thời gian',
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <p className="text-14-regular min-w-[100px]">
          {appointment.doctorSchedule.schedule.timeSlot}
        </p>
      )
    },
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Bác sĩ',
    cell: ({ row }) => {
      const appointment = row.original
      const doctor = appointment.doctorSchedule.doctor

      return (
        <div className="flex items-center gap-3">
          {/* <Image
            src={doctor?.image ?? '/default-image.jpg'}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          /> */}
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Xem chi tiết</div>,
    cell: ({ row }) => {
      const appointment = row.original

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.profile.id}
            userId={appointment.profile.userId}
            appointment={appointment}
            type="Chi tiết"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.profile.id}
            userId={appointment.profile.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      )
    },
  },
]
