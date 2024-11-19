import { StatCard } from '@/components/StatCard';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';
import { AppointmentRepository } from '@/repositories/appointment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const AdminPage = async () => {
  const appointments = await AppointmentRepository.getAllAppointments();
  const countAppointment = await AppointmentRepository.CountAppointment();
  const pendingCount =
    countAppointment.find((item) => item.status === 'PENDING')?.count || 0;
  const scheduledCount =
    countAppointment.find((item) => item.status === 'SCHEDULED')?.count || 0;
  const cancelledCount =
    countAppointment.find((item) => item.status === 'CANCELLED')?.count || 0;
  if (!appointments) return <div>Something went wrong</div>;
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
            label="Scheduled appointments"
            icon={'/assets/icons/appointments.svg'}
          />
          <StatCard
            type="pending"
            count={pendingCount}
            label="Pending appointments"
            icon={'/assets/icons/pending.svg'}
          />
          <StatCard
            type="cancelled"
            count={cancelledCount}
            label="Cancelled appointments"
            icon={'/assets/icons/cancelled.svg'}
          />
        </section>

        <DataTable columns={columns} data={appointments} />
      </main>
    </div>
  );
};

export default AdminPage;