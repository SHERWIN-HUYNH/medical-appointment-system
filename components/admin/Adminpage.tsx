'use client'
import { StatCard } from '@/components/StatCard'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'
import { AppointmentSchedule } from '@/types/interface'
import { AppointmentStatus } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
interface countAppointment {
  count: number
  status: AppointmentStatus
}
const AdminPage = () => {
  const [appointments, setAppointments] = React.useState<AppointmentSchedule[]>()
  const [countAppointment, setCountAppointment] = React.useState<countAppointment[]>()
  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch('/api/appointments')
      const data: AppointmentSchedule[] = await res.json()
      setAppointments(data)
      const count = await fetch('/api/appointments/count')
      const countData: countAppointment[] = await count.json()
      setCountAppointment(countData)
    }

    fetchAppointments()
  }, [])
  const pendingCount =
    countAppointment?.find((item) => item.status === 'PENDING')?.count || 0
  const scheduledCount =
    countAppointment?.find((item) => item.status === 'SCHEDULED')?.count || 0
  const cancelledCount =
    countAppointment?.find((item) => item.status === 'CANCELLED')?.count || 0
  console.log('APPOINTMENTS', appointments)
  if (!appointments) return <div>Something went wrong</div>
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-4 md:p-6 2xl:p-10">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold dark:text-red text-white">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Start the day with managing new appointments</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={scheduledCount}
            label="Cuộc hẹn đã lên lịch"
            icon={'/assets/icons/appointments.svg'}
          />
          <StatCard
            type="pending"
            count={pendingCount}
            label="Cuộc hẹn sắp diễn ra"
            icon={'/assets/icons/pending.svg'}
          />
          <StatCard
            type="cancelled"
            count={cancelledCount}
            label="Cuộc hẹn đã hủy"
            icon={'/assets/icons/cancelled.svg'}
          />
        </section>

        <DataTable
          columns={columns}
          data={appointments as unknown as AppointmentSchedule[]}
        />
      </main>
    </div>
  )
}

export default AdminPage
