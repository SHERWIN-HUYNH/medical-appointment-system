import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
type StatCardProps = {
  type: 'appointments' | 'pending' | 'cancelled'
  count: number
  label: string
  icon: string
}

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx('stat-card bg-[#e8f4fd]', {
        'bg-appointments ': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled',
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-highlight">{count}</h2>
      </div>

      <p className=" text-[#000000d9] font-medium text-lg">{label}</p>
    </div>
  )
}
